import { NextResponse } from "next/server";

export async function GET() {
  const md = `# giolaq.dev Developer Portal

> Integration guide for developers and AI agents connecting to giolaq.dev.

## Quick Start

\`\`\`bash
# List all posts
curl https://giolaq.dev/api/posts

# Get a specific post
curl https://giolaq.dev/api/posts/building-your-career-in-ai-real-talk-from-the-trenches

# Get author info
curl https://giolaq.dev/api/author
\`\`\`

## Resources

- [OpenAPI spec](https://giolaq.dev/openapi.json) — Full API schema (OpenAPI 3.1)
- [Agent card](https://giolaq.dev/.well-known/agent-card.json) — A2A discovery
- [MCP server](https://giolaq.dev/.well-known/mcp) — Streamable HTTP MCP endpoint
- [MCP server card](https://giolaq.dev/.well-known/mcp/server-card.json) — Server metadata
- [Agent skills](https://giolaq.dev/.well-known/agent-skills/index.json) — Capability index
- [API catalog](https://giolaq.dev/.well-known/api-catalog) — RFC 9727 catalog
- [auth.md](https://giolaq.dev/auth.md) — Authentication guide (none required)

## Authentication

None required. All endpoints are public and free.

## Agent Integration

Add \`?mode=agent\` to the homepage for a structured JSON view of all capabilities.
Use \`Accept: text/markdown\` on the homepage to receive markdown content.
Append \`.md\` to content pages for markdown versions.
`;

  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
