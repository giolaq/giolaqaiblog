import { NextResponse } from "next/server";

export async function GET() {
  const md = `# giolaq.dev API

> Free, read-only JSON API for blog posts and author information. No authentication required.

## Endpoints

- [List posts](https://giolaq.dev/api/posts) — \`GET /api/posts\` — Returns all posts sorted by date
- [Get post](https://giolaq.dev/api/posts/{slug}) — \`GET /api/posts/{slug}\` — Returns a single post with full HTML content
- [Author info](https://giolaq.dev/api/author) — \`GET /api/author\` — Returns bio, role, expertise, social links
- [OpenAPI spec](https://giolaq.dev/openapi.json) — Full schema definition

## Authentication

None. All endpoints are public.

## Rate Limits

Infrastructure-level (Vercel). No application rate limits.

## Error Format

\`\`\`json
{"error": "not_found", "message": "Post \\"slug\\" not found."}
\`\`\`

## Example

\`\`\`bash
curl -s https://giolaq.dev/api/posts | jq '.[0]'
\`\`\`
`;

  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
