import type { Metadata } from "next";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_CONFIG.author.name}, developer advocate at Amazon in London, writing about AI agents, mobile development, and TV apps.`,
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
      <h1 className="page-title">About me</h1>
      <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted">
        I’m Giovanni, a developer advocate at Amazon in London.
      </p>

      <div className="mt-14 grid gap-10 md:grid-cols-[180px_1fr]">
        <div>
          <Image
            src="/headshot.jpg"
            alt={SITE_CONFIG.author.name}
            width={180}
            height={235}
            className="rounded-2xl object-cover border border-[var(--border)]"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-muted max-w-[62ch]">
          <p>
            These days I work on AI agents: connecting models to tools, giving
            them useful context, and checking what they produce. I also write
            tutorials and run workshops on TV apps and cross-platform development.
          </p>
          <p>
            My work has taken me through Android, VR/AR, real-time defence systems,
            and TV. That mix is part of why I like trying unfamiliar tools and
            figuring out how they fit together.
          </p>
          <p>
            I studied at Università di Roma Tor Vergata and have been building
            across mobile, VR/AR, real-time defence systems, and IoT. For fun:
            low-level programming, IoT hacking, and command-line toys.
          </p>
        </div>
      </div>

      <section className="mt-24">
        <div className="font-mono-xs">What I do</div>
        <h2 className="mt-2 font-display text-4xl tracking-tight">
          Work, talks, and writing
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "AI agents",
              body: "Tools, context, and feedback for agents, with working examples built on AWS Bedrock and Strands.",
              featured: true,
            },
            {
              n: "02",
              title: "Developer Advocacy",
              body: "Talks, workshops, and sample apps for developers working on mobile and TV.",
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
              <p className="mt-3 text-base leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="font-mono-xs">Get in touch</div>
        <h2 className="mt-2 font-display text-4xl tracking-tight">
          Say hi.
        </h2>
        <p className="mt-4 max-w-[50ch] text-base text-muted">
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
              className="liquid-glass hover-lift rounded-full px-5 py-2.5 text-sm"
            >
              {link.label} →
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
