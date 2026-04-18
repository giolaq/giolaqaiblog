import type { Metadata } from "next";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_CONFIG.author.name} — Developer Advocate, Builder, and Generalist.`,
};

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.author.name,
    url: SITE_CONFIG.url,
    jobTitle: "Senior Developer Advocate",
    worksFor: { "@type": "Organization", name: "Amazon" },
    image: `${SITE_CONFIG.url}${SITE_CONFIG.author.avatar}`,
    sameAs: [
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.medium,
      SITE_CONFIG.social.hashnode,
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-6 md:px-8 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="font-mono-xs">§ About</div>
      <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-tight leading-[0.95] max-w-[14ch]">
        A <em className="not-italic text-muted italic">builder</em> who refuses
        to pick one lane.
      </h1>

      <div className="mt-14 grid gap-10 md:grid-cols-[180px_1fr]">
        <div>
          <Image
            src={SITE_CONFIG.author.avatar}
            alt={SITE_CONFIG.author.name}
            width={160}
            height={160}
            className="rounded-2xl object-cover border border-[--border]"
            priority
          />
        </div>

        <div className="space-y-6 text-[15px] leading-relaxed text-muted max-w-[62ch]">
          <p>
            Hi — I&apos;m{" "}
            <strong className="text-foreground">Giovanni Laquidara</strong>, a
            Senior Developer Advocate at Amazon based in London. I work across
            mobile, TV, agentic AI, and developer communities, and I&apos;m
            happiest when the work sits at the seam between two disciplines.
          </p>
          <p>
            I think the title &quot;software engineer&quot; is giving way to
            &quot;builder.&quot; With agentic AI as a force multiplier,
            everyone codes now — the PM, the designer, the data scientist. The
            strongest people are generalists who overlap across traditional
            roles and connect ideas from unrelated domains.
          </p>
          <p>
            I studied at Università di Roma Tor Vergata and have been building
            across mobile, VR/AR, real-time defence systems, and IoT. For fun:
            low-level programming, IoT hacking, and command-line toys.
          </p>
        </div>
      </div>

      <section className="mt-24">
        <div className="font-mono-xs">§ 01 — What I do</div>
        <h2 className="mt-2 font-display text-4xl tracking-tight">
          Three modes of work.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Developer Advocacy",
              body: "Content, talks, and tools that help developers succeed on mobile, TV, and cross-platform stacks.",
            },
            {
              title: "Building with Agentic AI",
              body: "Using AI agents as a force multiplier to ship faster across React Native, Kotlin, TS — mobile, TV, XR, real-time.",
            },
            {
              title: "Technical Writing",
              body: "Articles and tutorials across functional programming, hardware hacking, and whatever catches my eye.",
            },
          ].map((item) => (
            <div key={item.title} className="glass-card p-6">
              <h3 className="font-display text-2xl tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="font-mono-xs">§ 02 — Get in touch</div>
        <h2 className="mt-2 font-display text-4xl tracking-tight">
          Say hi.
        </h2>
        <p className="mt-4 max-w-[50ch] text-[15px] text-muted">
          Happy to connect with fellow developers and tech enthusiasts — for
          talks, collabs, or just a chat about TV apps and agents.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { href: SITE_CONFIG.social.github, label: "GitHub" },
            { href: SITE_CONFIG.social.twitter, label: "X (Twitter)" },
            { href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
            { href: SITE_CONFIG.social.medium, label: "Medium" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass hover-lift rounded-full px-5 py-2.5 text-[13px]"
            >
              {link.label} →
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
