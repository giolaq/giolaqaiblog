import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

export async function GET() {
  const posts = getAllPosts().slice(0, 10);

  const agentView = {
    name: SITE_CONFIG.author.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    type: "personal-website",
    capabilities: ["blog", "portfolio", "speaker-info"],
    api: {
      posts: {
        url: `${SITE_CONFIG.url}/api/posts`,
        method: "GET",
        description: "List all blog posts",
      },
      post: {
        url: `${SITE_CONFIG.url}/api/posts/{slug}`,
        method: "GET",
        description: "Get a single post by slug",
      },
      author: {
        url: `${SITE_CONFIG.url}/api/author`,
        method: "GET",
        description: "Get author information",
      },
    },
    discovery: {
      llms_txt: `${SITE_CONFIG.url}/llms.txt`,
      agent_card: `${SITE_CONFIG.url}/.well-known/agent-card.json`,
      agent_skills: `${SITE_CONFIG.url}/.well-known/agent-skills/index.json`,
      mcp_server_card: `${SITE_CONFIG.url}/.well-known/mcp/server-card.json`,
      markdown: `${SITE_CONFIG.url}/index.md`,
    },
    authentication: "none",
    recent_posts: posts.map((p) => ({
      title: p.title,
      slug: p.slug,
      date: p.date,
      url: `${SITE_CONFIG.url}/blog/${p.slug}`,
    })),
    social: SITE_CONFIG.social,
  };

  return NextResponse.json(agentView, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
