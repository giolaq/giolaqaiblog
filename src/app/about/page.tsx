import type { Metadata } from "next";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_CONFIG.author.name}, developer advocate and builder focused on agentic AI and harness engineering.`,
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
        I never picked <span className="italic">a lane.</span>
      </h1>
      <div className="mt-7 inline-flex items-center gap-3 rounded-full liquid-glass px-4 py-1.5 font-mono-xs">
        <span
          className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] pulse-dot"
          style={{ boxShadow: "0 0 8px 1px var(--accent)" }}
        />
        <span>Current focus · AI · Agents · Harnesses</span>
      </div>
      <p className="mt-5 max-w-[56ch] text-[15px] text-muted">
        Mobile, VR, defence systems, TV, and now the tooling that lets AI
        agents ship real software.
      </p>

      <div className="mt-14 grid gap-10 md:grid-cols-[180px_1fr]">
        <div>
          <Image
            src={SITE_CONFIG.author.avatar}
            alt={SITE_CONFIG.author.name}
            width={160}
            height={160}
            className="rounded-2xl object-cover border border-[var(--border)]"
            priority
          />
        </div>

        <div className="space-y-6 text-[15px] leading-relaxed text-muted max-w-[62ch]">
          <p>
            Hi, I&apos;m{" "}
            <strong className="text-foreground">Giovanni Laquidara</strong>, a
            developer advocate and builder at Amazon in London. My focus these
            days is agentic AI and harness engineering: the scaffolding of
            tools, context, and feedback loops that lets agents do real work.
            I&apos;m happiest when the work sits at the seam between two
            disciplines.
          </p>
          <p>
            I think the title &quot;software engineer&quot; is giving way to
            &quot;builder.&quot; Agents have lowered the cost of trying things
            enough that PMs, designers, and data scientists ship working code,
            and the people who get the most out of that are generalists who can
            carry an idea across role boundaries.
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
          The work.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Agentic AI & Harness Engineering",
              body: "Building the harnesses around AI agents: tools, context, and feedback loops that turn a model into something that ships software.",
              featured: true,
            },
            {
              n: "02",
              title: "Developer Advocacy",
              body: "Content, talks, and tools that help developers succeed on mobile, TV, and cross-platform stacks.",
            },
            {
              n: "03",
              title: "Technical Writing",
              body: "Articles and tutorials on functional programming, hardware hacking, and whatever new tech catches my eye.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`glass-card p-6 ${
                item.featured ? "border-[var(--accent-dim)]" : ""
              }`}
            >
              <div className="font-mono-xs flex items-center justify-between">
                <span>{item.n}</span>
                {item.featured && (
                  <span className="text-[var(--accent)]">Now</span>
                )}
              </div>
              <h3 className="mt-3 font-display text-2xl tracking-tight text-foreground">
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
          For talks, collaborations, or a chat about TV apps and agents, any of
          these works.
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
