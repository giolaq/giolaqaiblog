"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Ocarina = dynamic(() => import("./Ocarina"));

export default function OcarinaEgg() {
  const [open, setOpen] = useState(false);
  const previousFocus = useRef<HTMLElement | null>(null);
  const taps = useRef({ count: 0, startedAt: 0 });

  function reveal() {
    taps.current.count = 0;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  }

  useEffect(() => {
    if (!open) {
      previousFocus.current?.focus({ preventScroll: true });
      previousFocus.current = null;
    }
  }, [open]);

  useEffect(() => {
    let sequence = "";
    let lastKey = 0;
    function unlock(event: KeyboardEvent) {
      const target = event.target;
      if (open || event.repeat || event.isComposing || event.ctrlKey || event.metaKey || event.altKey ||
        (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select, [role='textbox']")))) {
        sequence = "";
        return;
      }
      if (Date.now() - lastKey > 2000) sequence = "";
      lastKey = Date.now();
      sequence = (sequence + event.key.toLowerCase()).slice(-7);
      if (sequence === "ocarina") {
        sequence = "";
        reveal();
      }
    }
    document.addEventListener("keydown", unlock);
    return () => document.removeEventListener("keydown", unlock);
  }, [open]);

  return <>
    <button
      type="button"
      className="min-h-11 touch-manipulation select-none text-foreground"
      aria-label="GIOLAQ.DEV — activate five times quickly to open the secret ocarina"
      onClick={() => {
        const now = Date.now();
        if (taps.current.count === 0 || now - taps.current.startedAt > 3000) {
          taps.current = { count: 1, startedAt: now };
        } else {
          taps.current.count += 1;
        }
        if (taps.current.count === 5) reveal();
      }}
    >GIOLAQ.DEV</button>
    {open && <Ocarina onClose={() => {
      setOpen(false);
    }} />}
  </>;
}
