"use client";

import { useState, useEffect } from "react";

const FRAMES = [
  `
    ╔══════════════╗
    ║  > giolaq_   ║
    ║  ┌─────────┐ ║
    ║  │ ◉     ◉ │ ║
    ║  │    ▽    │ ║
    ║  │  ╰───╯  │ ║
    ║  └─────────┘ ║
    ║   /|     |\\  ║
    ╚══════════════╝`,
  `
    ╔══════════════╗
    ║  > giolaq    ║
    ║  ┌─────────┐ ║
    ║  │ ◉     ◉ │ ║
    ║  │    ▽    │ ║
    ║  │  ╰───╯  │ ║
    ║  └─────────┘ ║
    ║   /|     |\\  ║
    ╚══════════════╝`,
];

export default function AsciiArt() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <pre className="text-[9px] leading-[1.1] text-accent sm:text-[11px] select-none">
      {FRAMES[frame]}
    </pre>
  );
}
