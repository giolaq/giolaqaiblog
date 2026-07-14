import type { Metadata } from "next";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

const WORKSHOP_TITLE =
  "Past the Vibes: Build an Agent Harness for Your React Native App";
const WORKSHOP_DESCRIPTION =
  "A hands-on workshop at Chain React 2026 in Portland, July 29. Go from vibe coding to a real agent harness: tools, context, and feedback loops that let AI agents ship features in your React Native app.";
const REGISTER_URL = "https://chainreactconf.com/workshops";

export const metadata: Metadata = {
  title: "Past the Vibes — Chain React 2026 Workshop",
  description: WORKSHOP_DESCRIPTION,
  openGraph: {
    title: WORKSHOP_TITLE,
    description: WORKSHOP_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: WORKSHOP_TITLE,
    description: WORKSHOP_DESCRIPTION,
  },
};

const TAKEAWAYS = [
  "Set up an agent harness around a real React Native codebase, not a toy repo.",
  "Give agents the context they need: project docs, conventions, and the right tools.",
  "Build feedback loops so agents verify their own work before you review it.",
  "Ship an actual feature with an agent and know when to trust the result.",
];

export default function ChainReactWorkshopPage() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: WORKSHOP_TITLE,
    description: WORKSHOP_DESCRIPTION,
    startDate: "2026-07-29",
    location: {
      "@type": "Place",
      name: "The Armory",
      address: { "@type": "PostalAddress", addressLocality: "Portland", addressRegion: "OR", addressCountry: "US" },
    },
    superEvent: { "@type": "Event", name: "Chain React 2026", url: "https://chainreactconf.com" },
    performer: [{ "@type": "Person", name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
    url: `${SITE_CONFIG.url}/workshops/chain-react-2026`,
  };

  return (
    <div className="mx-auto max-w-4xl px-6 md:px-8 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <div className="font-mono-xs">§ Workshop · Chain React 2026</div>
      <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight leading-[1.02] max-w-[22ch]">
        Past the Vibes:{" "}
        <span className="italic text-[var(--accent)]">
          Build an Agent Harness
        </span>{" "}
        for Your React Native App
      </h1>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono-xs">
        <span>July 29, 2026</span>
        <span className="text-[var(--border-strong)]">·</span>
        <span>The Armory · Portland, OR</span>
        <span className="text-[var(--border-strong)]">·</span>
        <span>Hands-on · Bring a laptop</span>
      </div>

      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-muted max-w-[62ch]">
        <p>
          Vibe coding gets you a demo. A harness gets you software you can
          ship. In this workshop we take a React Native app and build the
          scaffolding that lets AI agents do dependable work in it: the tools
          they can call, the context they read, and the feedback loops that
          catch their mistakes before you do.
        </p>
        <p>
          You leave with a working harness for your own project and a clear
          sense of which parts of your workflow to hand to an agent first.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass hover-lift inline-flex items-center gap-3 rounded-full px-10 py-4 text-[15px]"
        >
          <span>Register at Chain React</span>
          <span aria-hidden>→</span>
        </a>
        <span className="font-mono-xs">Workshop seats are limited</span>
      </div>

      <section className="mt-20">
        <div className="font-mono-xs">§ 01 — What you&apos;ll build</div>
        <ul className="mt-6 space-y-3 max-w-[62ch]">
          {TAKEAWAYS.map((t) => (
            <li
              key={t}
              className="flex items-start gap-3 text-[15px] leading-relaxed text-muted"
            >
              <span className="mt-2 h-1 w-3 shrink-0 bg-[var(--accent-dim)]" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <div className="font-mono-xs">§ 02 — Who&apos;s teaching</div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="glass-card p-6 flex items-start gap-5">
            <Image
              src="/avatar.jpg"
              alt={SITE_CONFIG.author.name}
              width={72}
              height={72}
              className="rounded-full object-cover border border-[var(--border-strong)]"
            />
            <div>
              <h2 className="font-display text-2xl tracking-tight text-foreground">
                {SITE_CONFIG.author.name}
              </h2>
              <p className="mt-1 text-[13px] text-muted">
                Developer Advocate &amp; Builder, Amazon
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                Author of Mastering the Big Screen: React Native for TV.
                Focused on agentic AI and harness engineering.
              </p>
            </div>
          </div>
          {/* Co-presenter card goes here once name and photo are confirmed. */}
        </div>
      </section>

      <section className="mt-20">
        <div className="font-mono-xs">§ 03 — Who it&apos;s for</div>
        <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-muted">
          React Native developers who have tried AI coding tools and want more
          than autocomplete. You should be comfortable with a React Native
          codebase; no prior agent experience needed.
        </p>
      </section>
    </div>
  );
}
