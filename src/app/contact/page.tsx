import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach ${SITE_CONFIG.author.name} for speaking, open source, and everything else.`,
};

export default function ContactPage() {
  const channels = [
    { label: "GitHub", handle: "github.com/giolaq", href: SITE_CONFIG.social.github },
    { label: "X (Twitter)", handle: "@giolaq", href: SITE_CONFIG.social.twitter },
    { label: "LinkedIn", handle: "Giovanni Laquidara", href: SITE_CONFIG.social.linkedin },
    { label: "Medium", handle: "@giolaq", href: SITE_CONFIG.social.medium },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 md:px-8 py-20">
      <div className="font-mono-xs">§ Contact</div>
      <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
        Get in touch.
      </h1>

      <div className="mt-14 space-y-10 text-[15px] leading-relaxed text-muted max-w-[62ch]">
        <p>
          For speaking invitations, message me on LinkedIn or X. For bugs and
          contributions to my open-source projects, open an issue or PR on the
          relevant GitHub repository. For everything else, email works:{" "}
          <a href="mailto:glaquidara@gmail.com" className="text-[var(--accent)] hover:underline">
            glaquidara@gmail.com
          </a>
          .
        </p>

        <ul className="space-y-3">
          {channels.map((c) => (
            <li key={c.label}>
              <span className="text-foreground">{c.label}:</span>{" "}
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                {c.handle}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
