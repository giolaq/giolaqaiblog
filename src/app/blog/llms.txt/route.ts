import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  const postList = posts
    .map((p) => `- [${p.title}](https://giolaq.dev/blog/${p.slug}) — ${p.date} — ${p.tags.join(", ")}`)
    .join("\n");

  const md = `# giolaq.dev Blog

> Technical articles by Giovanni Laquidara on agentic AI, mobile development, TV apps, React Native, and emerging technologies.

## Topics

- Agentic AI and multi-agent systems
- React Native and cross-platform mobile
- TV app development (Android TV, Fire TV, tvOS)
- Developer advocacy and community
- IoT, VR/AR, and hardware hacking

## All Posts

${postList || "No posts published yet."}

## API Access

Fetch posts programmatically:
- [All posts JSON](https://giolaq.dev/api/posts) — \`GET /api/posts\`
- [Single post JSON](https://giolaq.dev/api/posts/{slug}) — \`GET /api/posts/{slug}\`
`;

  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
