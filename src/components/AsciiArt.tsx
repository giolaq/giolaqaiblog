"use client";

import { useState, useEffect, useCallback } from "react";

// Idle frames: subtle cursor blink
const IDLE_A = `
    ╔══════════════╗
    ║  > giolaq_   ║
    ║  ┌─────────┐ ║
    ║  │ ◉     ◉ │ ║
    ║  │    ▽    │ ║
    ║  │  ╰───╯  │ ║
    ║  └─────────┘ ║
    ║   /|     |\\  ║
    ╚══════════════╝`;

const IDLE_B = `
    ╔══════════════╗
    ║  > giolaq    ║
    ║  ┌─────────┐ ║
    ║  │ ◉     ◉ │ ║
    ║  │    ▽    │ ║
    ║  │  ╰───╯  │ ║
    ║  └─────────┘ ║
    ║   /|     |\\  ║
    ╚══════════════╝`;

// Blink frames
const BLINK = `
    ╔══════════════╗
    ║  > giolaq_   ║
    ║  ┌─────────┐ ║
    ║  │ ─     ─ │ ║
    ║  │    ▽    │ ║
    ║  │  ╰───╯  │ ║
    ║  └─────────┘ ║
    ║   /|     |\\  ║
    ╚══════════════╝`;

// Look left
const LOOK_L = `
    ╔══════════════╗
    ║  > giolaq_   ║
    ║  ┌─────────┐ ║
    ║  │◉     ◉  │ ║
    ║  │    ▽    │ ║
    ║  │  ╰───╯  │ ║
    ║  └─────────┘ ║
    ║   /|     |\\  ║
    ╚══════════════╝`;

// Look right
const LOOK_R = `
    ╔══════════════╗
    ║  > giolaq_   ║
    ║  ┌─────────┐ ║
    ║  │  ◉     ◉│ ║
    ║  │    ▽    │ ║
    ║  │  ╰───╯  │ ║
    ║  └─────────┘ ║
    ║   /|     |\\  ║
    ╚══════════════╝`;

// Happy
const HAPPY = `
    ╔══════════════╗
    ║  > giolaq_   ║
    ║  ┌─────────┐ ║
    ║  │ ^     ^ │ ║
    ║  │    ▽    │ ║
    ║  │  ╰▬▬▬╯  │ ║
    ║  └─────────┘ ║
    ║  \\|     |/   ║
    ╚══════════════╝`;

// Coding
const CODE_A = `
    ╔══════════════╗
    ║  > coding..  ║
    ║  ┌─────────┐ ║
    ║  │ ◉     ◉ │ ║
    ║  │    ▽    │ ║
    ║  │  ╰───╯  │ ║
    ║  └─────────┘ ║
    ║   /| ⌨️  |\\  ║
    ╚══════════════╝`;

const CODE_B = `
    ╔══════════════╗
    ║  > coding... ║
    ║  ┌─────────┐ ║
    ║  │ ◉     ◉ │ ║
    ║  │    ▽    │ ║
    ║  │  ╰───╯  │ ║
    ║  └─────────┘ ║
    ║   /| ⌨️  |\\  ║
    ╚══════════════╝`;

// Wave
const WAVE_A = `
    ╔══════════════╗
    ║  > hey! 👋  ║
    ║  ┌─────────┐ ║
    ║  │ ◉     ◉ │ ║
    ║  │    ▽    │ ║
    ║  │  ╰▬▬▬╯  │ ║
    ║  └─────────┘ ║
    ║   /|     |/  ║
    ╚══════════════╝`;

const WAVE_B = `
    ╔══════════════╗
    ║  > hey! 👋  ║
    ║  ┌─────────┐ ║
    ║  │ ◉     ◉ │ ║
    ║  │    ▽    │ ║
    ║  │  ╰▬▬▬╯  │ ║
    ║  └─────────┘ ║
    ║   /|     |\\  ║
    ╚══════════════╝`;

type Animation = { frames: string[]; interval: number; duration: number };

const ANIMATIONS: Animation[] = [
  { frames: [IDLE_A, IDLE_B], interval: 600, duration: 3000 },
  { frames: [BLINK, IDLE_A], interval: 150, duration: 300 },
  { frames: [LOOK_L, LOOK_L, IDLE_A, LOOK_R, LOOK_R, IDLE_A], interval: 400, duration: 2400 },
  { frames: [HAPPY, HAPPY, IDLE_A], interval: 500, duration: 1500 },
  { frames: [CODE_A, CODE_B], interval: 400, duration: 2400 },
  { frames: [WAVE_A, WAVE_B, WAVE_A, WAVE_B, IDLE_A], interval: 350, duration: 1750 },
  { frames: [BLINK, IDLE_A], interval: 150, duration: 300 },
  { frames: [IDLE_A, IDLE_B], interval: 600, duration: 4000 },
];

export default function AsciiArt() {
  const [currentFrame, setCurrentFrame] = useState(IDLE_A);

  const runLoop = useCallback(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const playAnimation = (index: number) => {
      if (cancelled) return;
      const anim = ANIMATIONS[index % ANIMATIONS.length];
      let frameIdx = 0;

      const tick = () => {
        if (cancelled) return;
        setCurrentFrame(anim.frames[frameIdx % anim.frames.length]);
        frameIdx++;

        if (frameIdx * anim.interval < anim.duration) {
          timeoutId = setTimeout(tick, anim.interval);
        } else {
          // Pause between animations (1-3s random)
          const pause = 1000 + Math.random() * 2000;
          timeoutId = setTimeout(() => playAnimation(index + 1), pause);
        }
      };

      tick();
    };

    playAnimation(0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Skip animation loop if user prefers reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const cleanup = runLoop();
    return cleanup;
  }, [runLoop]);

  return (
    <pre
      className="text-[9px] leading-[1.1] text-accent sm:text-[11px] select-none"
      aria-hidden="true"
      role="img"
    >
      {currentFrame}
    </pre>
  );
}
