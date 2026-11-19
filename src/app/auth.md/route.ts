import { NextResponse } from "next/server";

export async function GET() {
  const md = `# Authentication — giolaq.dev

## Overview

giolaq.dev is a **fully public, read-only API**. No authentication is required to access any endpoint.

## Access Model

All API endpoints are freely accessible without credentials:

- \`GET /api/posts\` — List all blog posts
- \`GET /api/posts/{slug}\` — Get a specific post
- \`GET /api/author\` — Get author information

## Agent Authentication

Since no authentication is required, agents can call the API directly without any credential exchange:

\`\`\`
curl https://giolaq.dev/api/posts
\`\`\`

No API keys, OAuth tokens, or registration is needed.

## Rate Limits

Rate limiting is handled at the infrastructure level by Vercel. There are no application-level rate limits. Standard Vercel serverless function limits apply (see Vercel docs for current thresholds).

If you receive a 429 response, wait and retry after the duration indicated in the \`Retry-After\` header.

## Errors

Errors are returned as structured JSON:

\`\`\`json
{
  "error": "not_found",
  "message": "Post \\"nonexistent\\" not found."
}
\`\`\`

## Status

The site is hosted on Vercel with automatic failover. There is no dedicated status page; check [Vercel Status](https://www.vercel-status.com/) for platform-level incidents.
`;

  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
