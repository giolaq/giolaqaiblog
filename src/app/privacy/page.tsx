import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_CONFIG.url}`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 md:px-8 py-20">
      <div className="font-mono-xs">§ Privacy</div>
      <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
        Privacy Policy
      </h1>

      <div className="mt-14 space-y-8 text-[15px] leading-relaxed text-muted max-w-[62ch]">
        <p>
          <strong className="text-foreground">Last updated:</strong> July 2026
        </p>

        <section className="space-y-4">
          <h2 className="font-display text-2xl tracking-tight text-foreground">
            Overview
          </h2>
          <p>
            giolaq.dev is a personal website and blog operated by Giovanni
            Laquidara. This site is designed primarily as a portfolio and
            technical blog. I respect your privacy and aim to collect as little
            data as possible.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl tracking-tight text-foreground">
            Data Collection
          </h2>
          <p>
            This site uses Google Analytics to understand how visitors interact
            with content. Google Analytics collects anonymized data such as page
            views, session duration, and approximate geographic location. No
            personally identifiable information is intentionally collected.
          </p>
          <p>
            This site does not use cookies for tracking beyond what Google
            Analytics requires. There are no sign-ups, no accounts, and no forms
            that collect personal data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl tracking-tight text-foreground">
            Third-Party Services
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong className="text-foreground">Google Analytics</strong> —
              For anonymized traffic analysis.
            </li>
            <li>
              <strong className="text-foreground">Vercel</strong> — Hosting
              provider. See{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--accent] hover:underline"
              >
                Vercel&apos;s privacy policy
              </a>
              .
            </li>
            <li>
              <strong className="text-foreground">Google Fonts</strong> — Served
              via Google&apos;s CDN. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--accent] hover:underline"
              >
                Google&apos;s privacy policy
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl tracking-tight text-foreground">
            API Usage
          </h2>
          <p>
            The public API endpoints (/api/posts, /api/author) serve read-only
            content and do not collect or store any user data. No authentication
            is required and no request data is logged beyond standard server
            access logs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl tracking-tight text-foreground">
            AI & Bot Access
          </h2>
          <p>
            This site welcomes AI crawlers and bots. Content is freely
            accessible for indexing and training purposes. The robots.txt file
            explicitly allows AI User-Agents including GPTBot, ClaudeBot,
            ChatGPT-User, PerplexityBot, and others.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl tracking-tight text-foreground">
            Contact
          </h2>
          <p>
            For privacy-related questions, reach out via{" "}
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[--accent] hover:underline"
            >
              LinkedIn
            </a>{" "}
            or{" "}
            <a
              href={SITE_CONFIG.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[--accent] hover:underline"
            >
              X/Twitter
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
