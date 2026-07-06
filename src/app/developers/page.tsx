import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Developer resources for giolaq.dev — API docs, endpoints, and integration guides.",
};

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 md:px-8 py-20">
      <div className="font-mono-xs">§ Developers</div>
      <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
        Developer Resources
      </h1>

      <div className="mt-14 space-y-12 text-[15px] leading-relaxed text-muted max-w-[62ch]">
        <section className="space-y-4">
          <h2 className="font-display text-3xl tracking-tight text-foreground">
            Public API
          </h2>
          <p>
            giolaq.dev exposes a free, read-only JSON API. No authentication
            required. Use it to fetch blog posts, author info, or integrate
            content into your own projects.
          </p>
          <p>
            <a
              href="/openapi.json"
              className="text-[var(--accent)] hover:underline"
            >
              View OpenAPI spec →
            </a>
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-3xl tracking-tight text-foreground">
            Quickstart
          </h2>

          <div className="space-y-4">
            <h3 className="font-display text-xl text-foreground">
              List all posts
            </h3>
            <pre className="glass-card p-4 text-[13px] font-mono overflow-x-auto">
              <code>{`curl https://giolaq.dev/api/posts`}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl text-foreground">
              Get a specific post
            </h3>
            <pre className="glass-card p-4 text-[13px] font-mono overflow-x-auto">
              <code>{`curl https://giolaq.dev/api/posts/{slug}`}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl text-foreground">
              Get author info
            </h3>
            <pre className="glass-card p-4 text-[13px] font-mono overflow-x-auto">
              <code>{`curl https://giolaq.dev/api/author`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-3xl tracking-tight text-foreground">
            AI Agent Integration
          </h2>
          <p>
            This site is optimized for AI agent consumption. Discover
            capabilities through these endpoints:
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <a href="/llms.txt" className="text-[var(--accent)] hover:underline">
                /llms.txt
              </a>{" "}
              — LLM-friendly site overview
            </li>
            <li>
              <a
                href="/.well-known/agent-card.json"
                className="text-[var(--accent)] hover:underline"
              >
                /.well-known/agent-card.json
              </a>{" "}
              — A2A agent card
            </li>
            <li>
              <a
                href="/.well-known/agent-skills/index.json"
                className="text-[var(--accent)] hover:underline"
              >
                /.well-known/agent-skills/index.json
              </a>{" "}
              — Agent skills index
            </li>
            <li>
              <a
                href="/.well-known/mcp/server-card.json"
                className="text-[var(--accent)] hover:underline"
              >
                /.well-known/mcp/server-card.json
              </a>{" "}
              — MCP server card
            </li>
            <li>
              <a href="/index.md" className="text-[var(--accent)] hover:underline">
                /index.md
              </a>{" "}
              — Markdown homepage
            </li>
            <li>
              <code className="text-[var(--accent)]">?mode=agent</code> — Machine-readable homepage view
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-3xl tracking-tight text-foreground">
            Authentication
          </h2>
          <p>
            None required. All endpoints are public and rate-limited only by the
            hosting provider (Vercel). No API keys needed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-3xl tracking-tight text-foreground">
            Response Format
          </h2>
          <p>
            All API responses are JSON. Errors return structured JSON with{" "}
            <code className="text-foreground">error</code> and{" "}
            <code className="text-foreground">message</code> fields:
          </p>
          <pre className="glass-card p-4 text-[13px] font-mono overflow-x-auto">
            <code>{`{
  "error": "not_found",
  "message": "Post \\"nonexistent\\" not found."
}`}</code>
          </pre>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-3xl tracking-tight text-foreground">
            Source Code
          </h2>
          <p>
            This site is open source. Check out the code on{" "}
            <a
              href={`${SITE_CONFIG.social.github}/giolaqaiblog`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
