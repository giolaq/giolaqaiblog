import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

export async function GET() {
  const posts = getAllPosts().slice(0, 10);

  const postList = posts
    .map((p) => `- [${p.title}](https://giolaq.dev/blog/${p.slug}) — ${p.date}`)
    .join("\n");

  const md = `# ${SITE_CONFIG.author.name}

${SITE_CONFIG.author.bio}

## Links

- [Blog](https://giolaq.dev/blog)
- [About](https://giolaq.dev/about)
- [Talks](https://giolaq.dev/talks)
- [Resume](https://giolaq.dev/resume)
- [GitHub](${SITE_CONFIG.social.github})
- [X/Twitter](${SITE_CONFIG.social.twitter})
- [LinkedIn](${SITE_CONFIG.social.linkedin})

## Recent Posts

${postList || "No posts yet."}

## Featured Projects

- [ad-genius-system](https://github.com/giolaq/ad-genius-system) — Multi-agent AI system for generating personalized video ads using AWS Bedrock and Strands.
- [tv-mcp-app](https://github.com/giolaq/tv-mcp-app) — AI-powered TV streaming assistant with interactive widget.
- [devtoagent](https://github.com/giolaq/devtoagent) — Dev.to article generator agent built with Strands.
- [react-native-multi-tv-app-sample](https://github.com/giolaq/react-native-multi-tv-app-sample) — React Native TV app sample for Android TV, Fire TV, tvOS, and web.

## API

- Posts: \`GET https://giolaq.dev/api/posts\`
- Single post: \`GET https://giolaq.dev/api/posts/{slug}\`
- Author info: \`GET https://giolaq.dev/api/author\`
`;

  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
