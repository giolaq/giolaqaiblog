import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE_CONFIG.author.name} — Developer Advocate, Builder, and Generalist.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 md:px-8 py-20">
      <div className="font-mono-xs">§ Contact</div>
      <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
        Get in touch.
      </h1>

      <div className="mt-14 space-y-8 text-[15px] leading-relaxed text-muted max-w-[62ch]">
        <p>
          I&apos;m always happy to connect with fellow developers, tech
          enthusiasts, and anyone interested in agentic AI, mobile, or TV
          development. Whether it&apos;s for a conference talk, a collaboration,
          open-source contributions, or just a chat — reach out through any of
          the channels below.
        </p>

        <div className="space-y-4">
          <h2 className="font-display text-2xl tracking-tight text-foreground">
            Social & Professional
          </h2>
          <ul className="space-y-3">
            <li>
              <strong className="text-foreground">GitHub:</strong>{" "}
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--accent] hover:underline"
              >
                github.com/giolaq
              </a>{" "}
              — Open-source projects, contributions, and experiments.
            </li>
            <li>
              <strong className="text-foreground">X (Twitter):</strong>{" "}
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--accent] hover:underline"
              >
                @giolaq
              </a>{" "}
              — Tech thoughts, announcements, and quick takes.
            </li>
            <li>
              <strong className="text-foreground">LinkedIn:</strong>{" "}
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--accent] hover:underline"
              >
                Giovanni Laquidara
              </a>{" "}
              — Professional connections and speaking inquiries.
            </li>
            <li>
              <strong className="text-foreground">Medium:</strong>{" "}
              <a
                href={SITE_CONFIG.social.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--accent] hover:underline"
              >
                @giolaq
              </a>{" "}
              — Long-form technical writing.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-2xl tracking-tight text-foreground">
            Speaking & Conferences
          </h2>
          <p>
            I speak at conferences and meetups about agentic AI, cross-platform
            TV development, React Native, and developer tooling. If you&apos;d
            like me to speak at your event, please reach out via LinkedIn or
            Twitter/X.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-2xl tracking-tight text-foreground">
            Open Source
          </h2>
          <p>
            For bug reports, feature requests, or contributions to my
            open-source projects, please open an issue or PR on the relevant
            GitHub repository.
          </p>
        </div>
      </div>
    </div>
  );
}
