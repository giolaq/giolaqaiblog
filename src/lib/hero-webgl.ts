/** A small, dependency-free scene: immutable geometry, four draw calls, no textures. */
export type HeroSceneController = {
  setPaused(value: boolean): void;
  setActive(value: boolean): void;
  destroy(): void;
};

const vertexSource = `
  attribute vec3 aPosition;
  attribute vec3 aColor;
  uniform float uTime, uAspect, uSize, uSpin;
  uniform vec2 uPointer;
  varying vec3 vColor;
  varying float vDepth;
  void main() {
    float yaw = uTime * .22 * uSpin + .55 + uPointer.x * .35;
    float tilt = .38 + uPointer.y * .24 + sin(uTime * .13) * .06;
    vec3 p = aPosition;
    p = vec3(p.x * cos(yaw) + p.z * sin(yaw), p.y, -p.x * sin(yaw) + p.z * cos(yaw));
    p = vec3(p.x, p.y * cos(tilt) - p.z * sin(tilt), p.y * sin(tilt) + p.z * cos(tilt));
    float depth = 4.8 - p.z;
    gl_Position = vec4(p.x * 2.3 / (depth * uAspect), p.y * 2.3 / depth, 0., 1.);
    gl_PointSize = uSize * 4.8 / depth;
    vColor = aColor;
    vDepth = clamp(.65 + p.z * .17, .22, 1.);
  }
`;

const fragmentSource = `
  precision mediump float;
  uniform float uPoints, uOpacity;
  varying vec3 vColor;
  varying float vDepth;
  void main() {
    float alpha = uOpacity * vDepth;
    if (uPoints > .5) {
      float radius = length(gl_PointCoord - vec2(.5)) * 2.;
      if (radius > 1.) discard;
      float core = 1. - smoothstep(.05, .32, radius);
      alpha *= core * .9 + pow(1. - radius, 2.) * .55;
    }
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function createHeroScene(canvas: HTMLCanvasElement, host: HTMLElement, onFailure: () => void): HeroSceneController | null {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, depth: false, stencil: false, powerPreference: "low-power" });
  if (!gl) return null;

  function compile(type: number, source: string) {
    const shader = gl!.createShader(type);
    if (!shader) return null;
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    if (gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) return shader;
    gl!.deleteShader(shader);
    return null;
  }

  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    if (program) gl.deleteProgram(program);
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { gl.deleteProgram(program); return null; }

  const position = gl.getAttribLocation(program, "aPosition");
  const color = gl.getAttribLocation(program, "aColor");
  const uniforms = Object.fromEntries(["Time", "Aspect", "Pointer", "Points", "Size", "Spin", "Opacity"].map(name => [name, gl.getUniformLocation(program, `u${name}`)]));
  const lime = [.75, .96, .42];
  const ice = [.35, .7, .8];
  const edges: number[] = [], nodes: number[] = [], rings: number[] = [], stars: number[] = [];
  const point = (list: number[], p: number[], c: number[]) => list.push(...p, ...c);
  const corners = Array.from({ length: 8 }, (_, i) => [i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1]);
  for (const scale of [1, .62, .28]) {
    for (let i = 0; i < 8; i++) {
      const p = corners[i].map(v => v * scale);
      point(nodes, p, lime);
      for (const bit of [1, 2, 4]) {
        const j = i ^ bit;
        if (j > i) {
          point(edges, p, lime);
          point(edges, corners[j].map(v => v * scale), lime);
        }
      }
    }
  }
  for (let ring = 0; ring < 2; ring++) {
    const orbit = (a: number) => ring === 0
      ? [Math.cos(a) * 1.72, 0, Math.sin(a) * 1.72]
      : [Math.cos(a) * 1.35, Math.sin(a) * 1.65, Math.cos(a) * .7];
    for (let i = 0; i < 80; i++) {
      point(rings, orbit(i * Math.PI / 40), ice);
      point(rings, orbit((i + 1) * Math.PI / 40), ice);
      if (i % 10 === 0) point(stars, orbit(i * Math.PI / 40), lime);
    }
  }
  // Deterministic stars avoid random movement or hydration differences.
  for (let i = 0; i < 40; i++) {
    const a = i * 2.39996;
    const r = 1.6 + (i % 7) * .1;
    point(stars, [Math.cos(a) * r, Math.sin(a) * r, Math.sin(i * 1.7) * .8], ice);
  }

  const layers = [
    { data: rings, mode: gl.LINES, size: 1, spin: -.35, opacity: .45 },
    { data: edges, mode: gl.LINES, size: 1, spin: 1, opacity: .9 },
    { data: stars, mode: gl.POINTS, size: 14, spin: -.35, opacity: .6 },
    { data: nodes, mode: gl.POINTS, size: 10, spin: 1, opacity: .8 },
  ].map(layer => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(layer.data), gl.STATIC_DRAW);
    return { ...layer, buffer, count: layer.data.length / 6 };
  });
  if (layers.some(layer => !layer.buffer)) {
    layers.forEach(layer => gl.deleteBuffer(layer.buffer));
    gl.deleteProgram(program);
    return null;
  }

  let frame = 0, elapsed = 0, previous = 0, ratio = 1;
  let paused = false, active = true, destroyed = false;
  const pointer = [0, 0], target = [0, 0];
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.clearColor(0, 0, 0, 0);

  function draw() {
    if (destroyed || gl!.isContextLost()) return;
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    gl!.useProgram(program);
    gl!.uniform1f(uniforms.Time, elapsed);
    gl!.uniform1f(uniforms.Aspect, canvas.width / canvas.height);
    gl!.uniform2f(uniforms.Pointer, pointer[0], pointer[1]);
    gl!.enableVertexAttribArray(position);
    gl!.enableVertexAttribArray(color);
    for (const layer of layers) {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, layer.buffer);
      gl!.vertexAttribPointer(position, 3, gl!.FLOAT, false, 24, 0);
      gl!.vertexAttribPointer(color, 3, gl!.FLOAT, false, 24, 12);
      gl!.uniform1f(uniforms.Points, layer.mode === gl!.POINTS ? 1 : 0);
      gl!.uniform1f(uniforms.Size, layer.size * ratio);
      gl!.uniform1f(uniforms.Spin, layer.spin);
      gl!.uniform1f(uniforms.Opacity, layer.opacity);
      gl!.drawArrays(layer.mode, 0, layer.count);
    }
  }

  function tick(now: number) {
    if (destroyed || paused || !active) return;
    if (!previous) previous = now;
    const delta = now - previous;
    // Cap GPU updates at 30fps, and don't catch up time after suspension.
    if (delta >= 1000 / 30) {
      elapsed += Math.min(delta, 100) / 1000;
      previous = now - delta % (1000 / 30);
      pointer[0] += (target[0] - pointer[0]) * .09;
      pointer[1] += (target[1] - pointer[1]) * .09;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    cancelAnimationFrame(frame);
    previous = 0;
    if (!destroyed && active && !paused) frame = requestAnimationFrame(tick);
  }
  function resize() {
    const rect = host.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 1.5, 900 / Math.max(rect.width, 1));
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    gl!.viewport(0, 0, canvas.width, canvas.height);
    draw();
  }
  function move(event: PointerEvent) {
    if (event.pointerType === "touch" || paused || !active) return;
    const rect = host.getBoundingClientRect();
    target[0] = (event.clientX - rect.left) / rect.width * 2 - 1;
    target[1] = (event.clientY - rect.top) / rect.height * 2 - 1;
  }
  function leave() { target[0] = target[1] = 0; }
  function lost(event: Event) {
    event.preventDefault();
    cancelAnimationFrame(frame);
    onFailure();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  host.addEventListener("pointermove", move, { passive: true });
  host.addEventListener("pointerleave", leave);
  canvas.addEventListener("webglcontextlost", lost);
  resize();
  sync();

  return {
    setPaused(value) { paused = value; sync(); },
    setActive(value) { active = value; sync(); },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("webglcontextlost", lost);
      layers.forEach(layer => gl!.deleteBuffer(layer.buffer));
      gl!.deleteProgram(program);
    },
  };
}
