"use client";

import { useEffect } from "react";

/** Opt-in visual feedback for screen recordings; never intercepts input. */
export default function DemoTapIndicator() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("demo") !== "1") return;
    const ripples = new Map<HTMLElement, ReturnType<typeof setTimeout>>();

    function clearRipples() {
      ripples.forEach((timer, ripple) => {
        clearTimeout(timer);
        ripple.remove();
      });
      ripples.clear();
    }

    function showTap(event: PointerEvent) {
      if (event.button !== 0 || new URLSearchParams(window.location.search).get("demo") !== "1") return;
      // A modal lives in the browser's top layer, above ordinary page overlays.
      const modal = event.target instanceof Element ? event.target.closest("dialog[open]") : null;
      const host = modal ?? document.body;
      const ripple = document.createElement("span");
      ripple.className = "demo-tap-ripple";
      ripple.setAttribute("aria-hidden", "true");
      if (modal) {
        const bounds = modal.getBoundingClientRect();
        ripple.style.position = "absolute";
        ripple.style.left = `${event.clientX - bounds.left + modal.scrollLeft - modal.clientLeft}px`;
        ripple.style.top = `${event.clientY - bounds.top + modal.scrollTop - modal.clientTop}px`;
      } else {
        ripple.style.left = `${event.clientX}px`;
        ripple.style.top = `${event.clientY}px`;
      }
      host.appendChild(ripple);
      ripples.set(ripple, setTimeout(() => {
        ripple.remove();
        ripples.delete(ripple);
      }, 650));
    }

    document.addEventListener("pointerdown", showTap, { capture: true, passive: true });
    window.addEventListener("pagehide", clearRipples);
    return () => {
      document.removeEventListener("pointerdown", showTap, true);
      window.removeEventListener("pagehide", clearRipples);
      clearRipples();
    };
  }, []);

  return null;
}
