"use client";

import { useState } from "react";

export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. non-secure context); leave the button as-is.
    }
  };

  return (
    <button
      onClick={copy}
      className="liquid-glass rounded-full px-4 py-1.5 text-[12px] uppercase tracking-[0.14em] text-muted hover:text-foreground transition-colors"
      aria-live="polite"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
