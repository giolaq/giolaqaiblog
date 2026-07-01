import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const fullPath = path.join("/");

  if (fullPath.startsWith("blog/") && fullPath.endsWith(".md")) {
    const slug = fullPath.replace("blog/", "").replace(".md", "");
    const post = await getPostBySlug(slug);

    if (!post) {
      return new NextResponse("# Not Found\n\nPost not found.", {
        status: 404,
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
      });
    }

    const md = `# ${post.title}

**Date:** ${post.date} | **Reading time:** ${post.readingTime}${post.tags.length > 0 ? `\n**Tags:** ${post.tags.join(", ")}` : ""}

${post.description ? `> ${post.description}\n` : ""}
---

${post.content}
`;

    return new NextResponse(md, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        Vary: "Accept",
      },
    });
  }

  if (fullPath === "developers.md") {
    const md = `# giolaq.dev Developer Resources

## Public API

giolaq.dev exposes a free, read-only JSON API. No authentication required.

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/posts | List all blog posts |
| GET | /api/posts/{slug} | Get a specific post with full content |
| GET | /api/author | Get author bio, expertise, social links |

### Quick Start

\`\`\`bash
curl https://giolaq.dev/api/posts
curl https://giolaq.dev/api/posts/{slug}
curl https://giolaq.dev/api/author
\`\`\`

## AI Agent Integration

- [/llms.txt](https://giolaq.dev/llms.txt) — LLM-friendly site overview
- [/.well-known/agent-card.json](https://giolaq.dev/.well-known/agent-card.json) — A2A agent card
- [/.well-known/mcp](https://giolaq.dev/.well-known/mcp) — Streamable HTTP MCP endpoint
- [/openapi.json](https://giolaq.dev/openapi.json) — OpenAPI 3.1 spec
- [/auth.md](https://giolaq.dev/auth.md) — Authentication guide

## Authentication

None. All endpoints are public and free.

## Source Code

[GitHub](${SITE_CONFIG.social.github}/giolaqaiblog)
`;

    return new NextResponse(md, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
        Vary: "Accept",
      },
    });
  }

  return new NextResponse("# Not Found\n\nPage not found.", {
    status: 404,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
