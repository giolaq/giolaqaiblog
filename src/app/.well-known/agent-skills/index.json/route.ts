import { NextResponse } from "next/server";

export async function GET() {
  const skills = {
    $schema:
      "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "get-blog-posts",
        type: "skill-md",
        url: "https://giolaq.dev/api/posts",
        description:
          "Retrieve published blog posts about agentic AI, mobile development, TV apps, React Native, and emerging technologies.",
        method: "GET",
        parameters: [],
        returns:
          "JSON array of blog posts with title, slug, date, description, and tags.",
      },
      {
        name: "get-post-by-slug",
        type: "skill-md",
        url: "https://giolaq.dev/api/posts/{slug}",
        description:
          "Retrieve a specific blog post by its URL slug, including full HTML content.",
        method: "GET",
        parameters: [
          {
            name: "slug",
            type: "string",
            required: true,
            description: "The URL slug of the blog post.",
          },
        ],
        returns:
          "JSON object with post title, content (HTML), date, tags, and reading time.",
      },
      {
        name: "get-author-info",
        type: "skill-md",
        url: "https://giolaq.dev/api/author",
        description:
          "Get information about Giovanni Laquidara — bio, role, social links, and expertise areas.",
        method: "GET",
        parameters: [],
        returns:
          "JSON object with author name, bio, role, social links, and areas of expertise.",
      },
    ],
  };

  return NextResponse.json(skills, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
