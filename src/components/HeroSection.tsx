"use client";

import { useState } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import TypingText from "./TypingText";
import AsciiArt from "./AsciiArt";

export default function HeroSection() {
  const [cmdDone, setCmdDone] = useState(false);

  return (
    <section className="pb-16 pt-20" aria-label="About Giovanni Laquidara">
      <div className="terminal-box scanlines relative overflow-hidden">
        {/* Terminal title bar (decorative) */}
        <div className="flex items-center gap-2 border-b border-dashed border-border px-4 py-3" aria-hidden="true">
          <span className="text-xs text-muted">~/giolaq</span>
          <span className="text-xs text-accent">$</span>
          <span className="text-xs text-foreground">
            <TypingText text="whoami" speed={80} onDone={() => setCmdDone(true)} cursor={!cmdDone} />
          </span>
        </div>

        <div
          className="flex flex-col gap-8 p-6 sm:flex-row sm:items-start"
          style={{
            opacity: cmdDone ? 1 : 0,
            transform: cmdDone ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
          }}
        >
          {/* Avatar + ASCII art */}
          <div className="shrink-0 flex flex-col items-center gap-3 sm:items-start">
            <Image
              src={SITE_CONFIG.author.avatar}
              alt={`Photo of ${SITE_CONFIG.author.name}`}
              width={120}
              height={120}
              className="rounded-full object-cover border border-dashed border-border boot-flicker"
              priority
            />
            <AsciiArt />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 min-w-0">
            <div className="flex items-center gap-2 animate-fade-in-up stagger-1">
              <span className="h-2 w-2 rounded-full bg-term-green pulse-glow" aria-hidden="true" />
              <span className="text-xs text-term-green">
                Available for speaking &amp; collaborations
              </span>
            </div>

            <div className="animate-fade-in-up stagger-2">
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                Hi, I&apos;m{" "}
                <span className="text-accent">Giovanni</span>
              </h1>
              <p className="mt-1 text-xs text-muted">
                {SITE_CONFIG.author.role}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-muted animate-fade-in-up stagger-3">
              {SITE_CONFIG.author.bio}
            </p>

            <nav aria-label="Social media links" className="animate-fade-in-up stagger-4">
              <ul className="flex flex-wrap gap-2" role="list">
                {[
                  { href: SITE_CONFIG.social.github, label: "GitHub" },
                  { href: SITE_CONFIG.social.twitter, label: "Twitter" },
                  { href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
                  { href: SITE_CONFIG.social.medium, label: "Medium" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-muted transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_10px_-3px_var(--accent)]"
                    >
                      {link.label}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
