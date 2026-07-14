import type { Metadata } from "next";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

const WORKSHOP_TITLE =
  "Past the Vibes: Build an Agent Harness for Your React Native App";
const WORKSHOP_DESCRIPTION =
  "Hands-on workshop at Chain React 2026, July 29 in Portland, led by Giovanni Laquidara and Kourtney Meiss. Build a harness of focused agents that plan, implement, and verify each other's work, backed by reusable tools, project memory, and checkpoints.";
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

const BUILD_STEPS = [
  "A harness of focused agents that plan, implement, and verify each other's work.",
  "The backbone behind them: reusable tools, project memory, and checkpoints.",
  "One piece at a time, starting from a single agent and ending with a working pipeline you run against your own app.",
  "A final layer: a context-aware agent powered by Bee that records the conversations you have about the app you want to build and feeds them back into the harness when it runs.",
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
    performer: [
      { "@type": "Person", name: SITE_CONFIG.author.name, url: SITE_CONFIG.url },
      { "@type": "Person", name: "Kourtney Meiss" },
    ],
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
        <p className="font-display text-2xl leading-snug text-foreground italic">
          &quot;Stop writing prompts. Start building the loop that writes them
          for you.&quot;
        </p>
        <p>
          You&apos;ve probably heard some version of that line by now. In this
          workshop we&apos;ll actually explain what it means, and build one
          with you, for your React Native app and your use case.
        </p>
        <p>
          You&apos;ll leave with a forkable repo and a clear mental model for
          building development systems instead of babysitting prompts.
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
          {BUILD_STEPS.map((t) => (
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
        <div className="font-mono-xs">§ 02 — Why TV is the live target</div>
        <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-muted">
          We use TV as the live target because it&apos;s a genuinely
          non-trivial adaptation: focus navigation, 10-foot layouts, remote
          input, and many different operating systems. But the target is just
          the example; the harness you build works for your use case.
        </p>
      </section>

      <section className="mt-20">
        <div className="font-mono-xs">§ 03 — Who&apos;s teaching</div>
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
          <div className="glass-card p-6 flex items-start gap-5">
            <Image
              src="/kourtney.jpg"
              alt="Kourtney Meiss"
              width={72}
              height={72}
              className="rounded-full object-cover border border-[var(--border-strong)]"
            />
            <div>
              <h2 className="font-display text-2xl tracking-tight text-foreground">
                Kourtney Meiss
              </h2>
              <p className="mt-1 text-[13px] text-muted">
                Workshop co-instructor
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
