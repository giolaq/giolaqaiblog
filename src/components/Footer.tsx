"use client";

import { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((u) => u + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const links = [
    { href: SITE_CONFIG.social.github, label: "GitHub" },
    { href: SITE_CONFIG.social.twitter, label: "Twitter" },
    { href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
    { href: SITE_CONFIG.social.medium, label: "Medium" },
  ];

  return (
    <footer className="mt-8">
      <div className="mx-auto max-w-5xl px-6">
        <div className="border-t border-dashed border-border" />
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>
              <span className="text-accent">&copy;</span>{" "}
              {new Date().getFullYear()} {SITE_CONFIG.name}
            </span>
            <span className="text-border">|</span>
            <span>
              uptime: <span className="text-term-green">{formatUptime(uptime)}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted transition-all duration-200 hover:text-accent hover:drop-shadow-[0_0_4px_var(--accent)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
