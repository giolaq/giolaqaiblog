"use client";

import { useEffect, useRef, useState } from "react";

const CHARS_FULL = ".:+-=*#@&~<>{}[]|/\\";
const CHARS_MOBILE = "01";
const SPRING = 0.04;
const DAMP = 0.88;

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  char: string;
  a: number;
  ta: number;
  text: boolean;
  phase: number;
  delay: number;
};

type State = {
  particles: Particle[];
  parentW: number;
  scaledH: number;
  CHARS: string;
  CHAR_SIZE: number;
  MOUSE_R: number;
  MOUSE_F: number;
  font: string;
  charFont: string;
};

export default function AsciiParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d")!;

    // Mutable state object that frame() reads from
    const s: State = {
      particles: [],
      parentW: 0,
      scaledH: 0,
      CHARS: CHARS_FULL,
      CHAR_SIZE: 6,
      MOUSE_R: 100,
      MOUSE_F: 3,
      font: "monospace",
      charFont: "500 6px monospace",
    };

    const cv = canvas;
    const ct = container;

    function rebuild() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const isMobile = window.innerWidth <= 600;
      s.CHARS = isMobile ? CHARS_MOBILE : CHARS_FULL;
      const STEP = isMobile ? 3 : 4;
      s.CHAR_SIZE = isMobile ? 4 : 6;
      s.MOUSE_R = isMobile ? 50 : 100;
      s.MOUSE_F = isMobile ? 5 : 3;
      s.font = "monospace";
      s.charFont = `500 ${s.CHAR_SIZE}px ${s.font}`;

      s.parentW = ct.offsetWidth;
      if (s.parentW === 0) return false;

      const displayText = "giolaq";
      const baseFontSize = 80;

      const tmp = document.createElement("canvas").getContext("2d")!;
      tmp.font = `700 ${baseFontSize}px ${s.font}`;
      const naturalW = tmp.measureText(displayText).width;
      const scaledSize = Math.floor(baseFontSize * (s.parentW / naturalW) * 0.9);
      const sampleFont = `700 ${scaledSize}px ${s.font}`;
      s.scaledH = Math.max(80, Math.ceil(scaledSize * 1.3));

      cv.style.width = s.parentW + "px";
      cv.style.height = s.scaledH + "px";
      cv.width = s.parentW * dpr;
      cv.height = s.scaledH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rasterize text to offscreen canvas
      const off = document.createElement("canvas");
      off.width = s.parentW;
      off.height = s.scaledH;
      const oc = off.getContext("2d")!;
      oc.font = sampleFont;
      oc.fillStyle = "#fff";
      oc.textBaseline = "middle";
      oc.fillText(displayText, 0, s.scaledH / 2);

      const img = oc.getImageData(0, 0, s.parentW, s.scaledH);
      const oldParticles = s.particles;
      s.particles = [];

      // Build new target positions from rasterized text
      const newTargets: { tx: number; ty: number }[] = [];
      for (let y = 0; y < s.scaledH; y += STEP) {
        for (let x = 0; x < s.parentW; x += STEP) {
          const i = (y * s.parentW + x) * 4;
          if (img.data[i + 3] > 100) {
            newTargets.push({ tx: x, ty: y });
          }
        }
      }

      // Reuse existing text particles where possible — they smoothly
      // spring to the new target positions instead of jumping
      const oldTextParticles = oldParticles.filter(p => p.text);
      for (let i = 0; i < newTargets.length; i++) {
        const { tx, ty } = newTargets[i];
        if (i < oldTextParticles.length) {
          // Reuse — keep current position, update target
          const p = oldTextParticles[i];
          p.tx = tx;
          p.ty = ty;
          s.particles.push(p);
        } else {
          // New particle — scatter from random position
          s.particles.push({
            x: tx + (Math.random() - 0.5) * s.parentW * 0.5,
            y: ty + (Math.random() - 0.5) * s.scaledH * 2.5,
            tx, ty, vx: 0, vy: 0,
            char: s.CHARS[Math.floor(Math.random() * s.CHARS.length)],
            a: 0,
            ta: isMobile ? 0.95 + Math.random() * 0.05 : 0.85 + Math.random() * 0.15,
            text: true,
            phase: Math.random() * Math.PI * 2,
            delay: 0,
          });
        }
      }

      // Ambient floating particles
      const ambientCount = Math.max(30, Math.floor(s.particles.length * 0.15));
      const oldAmbient = oldParticles.filter(p => !p.text);
      for (let i = 0; i < ambientCount; i++) {
        if (i < oldAmbient.length) {
          // Clamp existing ambient particles to new bounds
          const p = oldAmbient[i];
          if (p.x > s.parentW) { p.x = p.tx = Math.random() * s.parentW; }
          if (p.y > s.scaledH) { p.y = p.ty = Math.random() * s.scaledH; }
          s.particles.push(p);
        } else {
          const px = Math.random() * s.parentW;
          const py = Math.random() * s.scaledH;
          s.particles.push({
            x: px, y: py, tx: px, ty: py,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            char: s.CHARS[Math.floor(Math.random() * s.CHARS.length)],
            a: 0, ta: 0.04 + Math.random() * 0.07,
            text: false,
            phase: Math.random() * Math.PI * 2,
            delay: 0,
          });
        }
      }

      return true;
    }

    if (!rebuild()) return;

    // Pointer tracking
    let mx = -9999;
    let my = -9999;

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };
    const onTouchMove = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mx = t.clientX - r.left;
      my = t.clientY - r.top;
    };
    const onTouchEnd = () => { mx = -9999; my = -9999; };

    canvas.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchstart", onTouchMove, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);

    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent").trim() || "#e8845c";

    const t0 = performance.now();
    let animId = 0;

    function frame(now: number) {
      const elapsed = (now - t0) / 1000;
      ctx.clearRect(0, 0, s.parentW, s.scaledH);
      ctx.font = s.charFont;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = accent;

      for (const p of s.particles) {
        const t = Math.max(0, elapsed - p.delay);

        if (p.text && t < 0.01) {
          ctx.globalAlpha = 0.02;
          ctx.fillText(p.char, p.x, p.y);
          continue;
        }

        p.vx += (p.tx - p.x) * SPRING;
        p.vy += (p.ty - p.y) * SPRING;

        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < s.MOUSE_R && d > 0) {
          const f = ((1 - d / s.MOUSE_R) ** 2) * s.MOUSE_F;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }

        p.vx *= DAMP;
        p.vy *= DAMP;
        p.x += p.vx;
        p.y += p.vy;

        if (p.text) {
          p.a = p.ta + Math.sin(elapsed * 0.8 + p.phase) * 0.08;
          if (t < 0.8 || Math.random() < 0.0008) {
            p.char = s.CHARS[Math.floor(Math.random() * s.CHARS.length)];
          }
        } else {
          p.a += (p.ta - p.a) * 0.04;
          p.tx += (Math.random() - 0.5) * 0.2;
          p.ty += (Math.random() - 0.5) * 0.2;
          if (p.x < -20) p.x = p.tx = s.parentW + 10;
          if (p.x > s.parentW + 20) p.x = p.tx = -10;
          if (p.y < -20) p.y = p.ty = s.scaledH + 10;
          if (p.y > s.scaledH + 20) p.y = p.ty = -10;
          if (Math.random() < 0.003) {
            p.char = s.CHARS[Math.floor(Math.random() * s.CHARS.length)];
          }
        }

        ctx.globalAlpha = Math.max(0, p.a);
        ctx.fillText(p.char, p.x, p.y);
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => rebuild(), 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchstart", onTouchMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [mounted]);

  return (
    <div className="mb-4" aria-hidden="true">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
