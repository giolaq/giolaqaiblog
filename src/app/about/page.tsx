import type { Metadata } from "next";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_CONFIG.author.name} — Developer Advocate, Technologist, and Software Engineer.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-foreground">
        <span className="text-accent">$</span> cat about.md
      </h1>

      <div className="mt-8 terminal-box overflow-hidden">
        <div className="flex items-center gap-2 border-b border-dashed border-border px-4 py-3">
          <span className="text-xs text-muted">about.md</span>
        </div>

        <div className="p-6">
          <div className="flex justify-center sm:justify-start">
            <Image
              src={SITE_CONFIG.author.avatar}
              alt={SITE_CONFIG.author.name}
              width={140}
              height={140}
              className="rounded-lg border border-dashed border-border"
              priority
            />
          </div>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted">
            <p>
              Hi! I&apos;m <strong className="text-foreground">Giovanni Laquidara</strong>,
              a Senior Developer Advocate at Amazon, based in London, England. I&apos;m focused on
              devices, mobile apps, and developer communities.
            </p>

            <p>
              I&apos;m passionate about working with cutting-edge technologies and people. I studied at
              Universit&agrave; di Roma Tor Vergata and have been building software across mobile, VR/AR,
              real-time defence systems, and IoT. For fun, I enjoy low-level programming, IoT hacking,
              and command-line apps.
            </p>

            <h2 className="!mt-10 text-base font-semibold text-accent">
              ## What I Do
            </h2>

            <ul className="space-y-3 pl-4">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-accent">-</span>
                <span>
                  <strong className="text-foreground">Developer Advocacy</strong> —
                  Creating content, giving talks, and building tools to help developers succeed. I focus
                  on mobile development, TV apps, and cross-platform solutions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-accent">-</span>
                <span>
                  <strong className="text-foreground">Software Engineering</strong> —
                  Building applications with modern technologies including React Native, Kotlin,
                  TypeScript, and more. I have experience across mobile, VR/AR, and real-time systems.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-accent">-</span>
                <span>
                  <strong className="text-foreground">Technical Writing</strong> —
                  Writing articles and tutorials about software development, covering topics from
                  functional programming to hardware hacking.
                </span>
              </li>
            </ul>

            <h2 className="!mt-10 text-base font-semibold text-accent">
              ## Background
            </h2>

            <p>
              Over the years, I&apos;ve worn many hats: software engineer, VR and mobile developer,
              real-time software architect, and developer advocate. This diverse background gives me
              a unique perspective on building technology that truly serves developers and users.
            </p>

            <p>
              I write about Kotlin, React Native, TV app development, hardware hacking (like
              Flipper Zero), and whatever new technology catches my eye. You can find my writing
              on this blog and across platforms like Medium and Hashnode.
            </p>

            <h2 className="!mt-10 text-base font-semibold text-accent">
              ## Get in Touch
            </h2>

            <p>
              I&apos;m always happy to connect with fellow developers and tech enthusiasts.
            </p>

            <div className="flex flex-wrap gap-2">
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
                  className="rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
