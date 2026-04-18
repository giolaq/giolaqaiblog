"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Cinematic hero — full-bleed video bg (inherited from layout), glass CTA,
 * Instrument Serif display headline.
 */
export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <section className="relative pt-12 pb-28 md:pt-20 md:pb-40">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center md:px-8">
        {/* Eyebrow */}
        <div className="animate-fade-rise d1 mb-8 inline-flex items-center gap-3 rounded-full px-4 py-1.5 font-mono-xs">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[--accent] pulse-dot"
            style={{ boxShadow: "0 0 8px 1px var(--accent)" }}
          />
          <span>Developer Advocate · Amazon · London</span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="animate-fade-rise d2 font-display text-[44px] leading-[0.95] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[112px] max-w-[18ch] text-balance"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Building{" "}
          <em className="not-italic text-muted italic">bridges</em> between
          developers{" "}
          <em className="not-italic text-muted italic">
            and the platforms they dream in.
          </em>
        </h1>

        {/* Sub */}
        <p className="animate-fade-rise d3 mt-8 max-w-[44ch] text-[15px] leading-relaxed text-muted sm:text-[17px]">
          {SITE_CONFIG.author.bio}
        </p>

        {/* CTAs */}
        <div className="animate-fade-rise d4 mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/blog"
            className="liquid-glass hover-lift inline-flex items-center gap-3 rounded-full px-10 py-4 text-[15px]"
          >
            <span>Read the writing</span>
            <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/10">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
          <Link
            href="/talks"
            className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-[14px] text-muted hover:text-foreground transition-colors"
          >
            <span>See talks</span>
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Meta row */}
        <div className="animate-fade-rise d5 mt-20 flex flex-wrap justify-center gap-x-14 gap-y-7 font-mono-xs">
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-display text-2xl text-foreground tracking-tight normal-case">15+</span>
            <span>Years shipping</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-display text-2xl text-foreground tracking-tight normal-case">Android · RN · XR</span>
            <span>Stack breadth</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-display text-2xl text-foreground tracking-tight normal-case">Amazon</span>
            <span>Currently</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-display text-2xl text-foreground tracking-tight normal-case">2026</span>
            <span>Chapter</span>
          </div>
        </div>

        {loaded ? null : null}
      </div>
    </section>
  );
}
