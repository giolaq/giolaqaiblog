"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { HeroSceneController } from "@/lib/hero-webgl";

/** The server-rendered illustration remains the default; WebGL is optional. */
export default function HeroScene({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HeroSceneController | null>(null);
  const pausedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const colors = window.matchMedia("(forced-colors: active)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let disposed = false;
    let visible = false;
    let loaded = document.readyState === "complete";
    let loading = false;
    let failed = false;
    let idle = 0;
    let timer = 0;
    const disabled = () => motion.matches || colors.matches || connection?.saveData === true;

    function stop() {
      sceneRef.current?.destroy();
      sceneRef.current = null;
      setReady(false);
    }

    async function enhance() {
      if (disposed || disabled() || !visible || document.hidden || failed || loading || sceneRef.current) return;
      loading = true;
      try {
        const { createHeroScene } = await import("@/lib/hero-webgl");
        if (disposed || disabled() || !visible || document.hidden) return;
        const scene = createHeroScene(canvas!, host!, () => {
          failed = true;
          stop();
        });
        if (!scene) { failed = true; return; }
        sceneRef.current = scene;
        scene.setPaused(pausedRef.current);
        setReady(true);
      } catch {
        // A blocked chunk or unavailable GPU must never affect the page itself.
        failed = true;
        stop();
      } finally {
        loading = false;
      }
    }

    function schedule() {
      if (!loaded || disposed || disabled() || !visible || document.hidden || failed || loading || sceneRef.current || idle || timer) return;
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => { idle = 0; void enhance(); }, { timeout: 1800 });
      } else {
        timer = window.setTimeout(() => { timer = 0; void enhance(); }, 350);
      }
    }

    function cancelPending() {
      if (idle) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
      idle = timer = 0;
    }

    function onPreference() {
      if (disabled()) { cancelPending(); stop(); }
      else schedule();
    }
    function onLoad() { loaded = true; schedule(); }
    function onVisibility() {
      sceneRef.current?.setActive(visible && !document.hidden);
      schedule();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      onVisibility();
    });
    observer.observe(host);
    motion.addEventListener("change", onPreference);
    colors.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      disposed = true;
      cancelPending();
      observer.disconnect();
      motion.removeEventListener("change", onPreference);
      colors.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("load", onLoad);
      sceneRef.current?.destroy();
      sceneRef.current = null;
    };
  }, []);

  function toggleMotion() {
    pausedRef.current = !pausedRef.current;
    sceneRef.current?.setPaused(pausedRef.current);
    setPaused(pausedRef.current);
  }

  return (
    <div className="hero-scene">
      <div ref={hostRef} className="hero-visual" data-webgl={ready ? "ready" : undefined}>
        {children}
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      </div>
      <div className="hero-motion-slot">
      {ready && (
        <button type="button" className="hero-motion-control" onClick={toggleMotion}>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="currentColor">
            {paused ? <path d="m3 1 8 5-8 5Z" /> : <path d="M2 1h3v10H2zm5 0h3v10H7z" />}
          </svg>
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      )}
      </div>
    </div>
  );
}
