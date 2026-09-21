"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

export default function TiltSurface({ children, className = "", strength = 7 }: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const surface = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  function reset() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    const element = surface.current;
    if (!element) return;
    for (const property of ["--tilt-x", "--tilt-y", "--shine-x", "--shine-y", "--shine-opacity"])
      element.style.removeProperty(property);
  }

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", reset);
    window.addEventListener("blur", reset);
    return () => {
      preference.removeEventListener("change", reset);
      window.removeEventListener("blur", reset);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--tilt-x", `${(0.5 - y) * strength * 2}deg`);
      element.style.setProperty("--tilt-y", `${(x - 0.5) * strength * 2}deg`);
      element.style.setProperty("--shine-x", `${x * 100}%`);
      element.style.setProperty("--shine-y", `${y * 100}%`);
      element.style.setProperty("--shine-opacity", "1");
      frame.current = null;
    });
  }

  return (
    <div ref={surface} className={`tilt-surface ${className}`} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
      <div className="tilt-face">{children}</div>
    </div>
  );
}
