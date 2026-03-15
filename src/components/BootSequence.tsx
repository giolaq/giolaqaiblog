"use client";

import { useState, useEffect, useCallback } from "react";

const BOOT_LINES = [
  { text: "BIOS v3.14.159 — giolaq.dev", delay: 0, color: "text-muted" },
  { text: "Checking memory... 1024MB OK", delay: 150, color: "text-muted" },
  { text: "[  OK  ] Loading kernel modules", delay: 300, color: "text-term-green" },
  { text: "[  OK  ] Mounting /dev/blog", delay: 450, color: "text-term-green" },
  { text: "[  OK  ] Starting network interfaces", delay: 600, color: "text-term-green" },
  { text: "[  OK  ] Syncing posts from /content/posts/*", delay: 800, color: "text-term-green" },
  { text: "[  OK  ] Loading 32 markdown files", delay: 1000, color: "text-term-green" },
  { text: "[  OK  ] Compiling terminal UI", delay: 1150, color: "text-term-green" },
  { text: "[  OK  ] Initializing ASCII art engine", delay: 1300, color: "text-term-green" },
  { text: "[WARN ] Coffee levels critically low", delay: 1500, color: "text-term-yellow" },
  { text: "[  OK  ] Starting giolaq.dev on port 443", delay: 1700, color: "text-term-green" },
  { text: "", delay: 1900, color: "" },
  { text: "Welcome to giolaq.dev — boot complete.", delay: 2000, color: "text-accent" },
];

const TOTAL_DURATION = 2600;

export default function BootSequence({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState<boolean | null>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadyBooted = sessionStorage.getItem("giolaq-booted");
    if (alreadyBooted) {
      setBooted(true);
      return;
    }
    setBooted(false);
  }, []);

  const runBoot = useCallback(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });

    setTimeout(() => setFading(true), TOTAL_DURATION);
    setTimeout(() => {
      sessionStorage.setItem("giolaq-booted", "1");
      setBooted(true);
    }, TOTAL_DURATION + 500);
  }, []);

  useEffect(() => {
    if (booted === false) {
      runBoot();
    }
  }, [booted, runBoot]);

  // SSR / already booted — render children immediately
  if (booted === null || booted === true) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Boot overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        style={{
          opacity: fading ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}
      >
        <div className="w-full max-w-xl px-6">
          <div className="terminal-box p-6 font-mono text-xs leading-relaxed">
            <div className="mb-3 flex items-center gap-2 border-b border-dashed border-border pb-3">
              <span className="h-2 w-2 rounded-full bg-term-red" />
              <span className="h-2 w-2 rounded-full bg-term-yellow" />
              <span className="h-2 w-2 rounded-full bg-term-green" />
              <span className="ml-2 text-muted">boot.log</span>
            </div>
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={`${line.color} ${i === visibleLines - 1 ? "boot-flicker" : ""}`}>
                {line.text || "\u00A0"}
              </div>
            ))}
            {visibleLines < BOOT_LINES.length && (
              <span className="inline-block w-2 h-3 bg-accent cursor-blink" />
            )}
          </div>
        </div>
      </div>

      {/* Hidden children that appear after boot */}
      <div style={{ visibility: "hidden" }}>{children}</div>
    </>
  );
}
