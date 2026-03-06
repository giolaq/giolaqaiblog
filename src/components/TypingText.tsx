"use client";

import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onDone?: () => void;
}

export default function TypingText({
  text,
  speed = 50,
  delay = 0,
  className = "",
  cursor = true,
  onDone,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      onDone?.();
      return;
    }
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [started, displayed, text, speed, onDone]);

  return (
    <span className={className}>
      {displayed}
      {cursor && !done && (
        <span className="cursor-blink text-accent">█</span>
      )}
      {cursor && done && (
        <span className="cursor-blink text-accent">█</span>
      )}
    </span>
  );
}
