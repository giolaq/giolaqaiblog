import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Speaker Kit",
  description:
    "Ready-to-use speaker bio, headshot, title line, and talk topics for Giovanni Laquidara. Copy what you need.",
};

const ONE_LINER =
  "Developer advocate and builder at Amazon, teaching AI agents to ship.";

const SHORT_BIO =
  "Giovanni Laquidara is a developer advocate and builder at Amazon in London, focused on agentic AI and harness engineering. He wrote Mastering the Big Screen: React Native for TV, and has spoken at React Conf, App.js, Droidcon, and CityJS.";

const LONG_BIO =
  "Giovanni Laquidara is a developer advocate and builder at Amazon in London. His current focus is agentic AI and harness engineering: the tools, context, and feedback loops that let AI agents ship real software. Over twenty years he has built for Android, VR/AR, real-time defence systems, IoT, and TV, and he wrote Mastering the Big Screen: React Native for TV. He runs hands-on React Native for TV workshops and has spoken at React Conf, App.js, Droidcon London and Berlin, CityJS Medellin, and Codemotion Milan, with podcast appearances on Rocket Ship and React Universe On Air.";

const TITLE_LINE =
  "Giovanni Laquidara · Developer Advocate & Builder, Amazon (London)";

const LINKS_TEXT = [
  `Site: ${SITE_CONFIG.url}`,
  `LinkedIn: ${SITE_CONFIG.social.linkedin}`,
  `X: ${SITE_CONFIG.social.twitter}`,
  "Email: glaquidara@gmail.com",
].join("\n");

const TOPICS = [
  "Agentic AI & harness engineering",
  "React Native for TV and big-screen apps",
  "Cross-platform development",
  "Developer advocacy & communities",
];

export default function SpeakerPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 md:px-8 py-20">
      <div className="font-mono-xs">§ Speaker kit</div>
      <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
        Speaker <span className="italic">kit.</span>
      </h1>

      {/* Headshot + facts */}
      <div className="mt-14 grid gap-5 md:grid-cols-[220px_1fr]">
        <div className="glass-card p-6 flex flex-col items-center gap-5">
          <Image
            src="/headshot.jpg"
            alt="Giovanni Laquidara headshot"
            width={172}
            height={224}
            className="rounded-xl object-cover border border-[var(--border)]"
            priority
          />
          <a
            href="/headshot.jpg"
            download="giovanni-laquidara-headshot.jpg"
            className="liquid-glass rounded-full px-4 py-1.5 text-[12px] uppercase tracking-[0.14em] text-muted hover:text-foreground transition-colors"
          >
            Download headshot
          </a>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono-xs">Title line</span>
            <CopyButton text={TITLE_LINE} />
          </div>
          <p className="mt-3 text-[15px] text-foreground">{TITLE_LINE}</p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="font-mono-xs">Links</span>
            <CopyButton text={LINKS_TEXT} />
          </div>
          <ul className="mt-2 space-y-1 text-[14px]">
            <li>
              Site:{" "}
              <a href={SITE_CONFIG.url} className="text-[var(--accent)] hover:underline">
                giolaq.dev
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                Giovanni Laquidara
              </a>
            </li>
            <li>
              X:{" "}
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                @giolaq
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:glaquidara@gmail.com"
                className="text-[var(--accent)] hover:underline"
              >
                glaquidara@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bios */}
      <section className="mt-14 space-y-5">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono-xs">One-liner</span>
            <CopyButton text={ONE_LINER} />
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-foreground">
            {ONE_LINER}
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono-xs">Short bio · ~45 words</span>
            <CopyButton text={SHORT_BIO} />
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {SHORT_BIO}
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono-xs">Long bio · ~110 words</span>
            <CopyButton text={LONG_BIO} />
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {LONG_BIO}
          </p>
        </div>
      </section>

      {/* Topics */}
      <section className="mt-14">
        <div className="font-mono-xs">§ 01 — Talk topics</div>
        <div className="mt-5 flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-[var(--border)] bg-white/[0.02] px-4 py-1.5 text-[13px] text-foreground"
            >
              {topic}
            </span>
          ))}
        </div>
        <p className="mt-6 text-[14px] text-muted">
          Past talks, workshops, and podcasts are on the{" "}
          <Link href="/talks" className="text-[var(--accent)] hover:underline">
            talks page
          </Link>
          , most with recordings.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-14">
        <div className="font-mono-xs">§ 02 — Booking</div>
        <p className="mt-4 max-w-[52ch] text-[15px] text-muted">
          To invite me to your event, email{" "}
          <a
            href="mailto:glaquidara@gmail.com"
            className="text-[var(--accent)] hover:underline"
          >
            glaquidara@gmail.com
          </a>{" "}
          or message me on{" "}
          <a
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            LinkedIn
          </a>
          . I answer fast.
        </p>
      </section>
    </div>
  );
}
