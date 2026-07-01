import { NextResponse } from "next/server";

export async function GET() {
  const skills = {
    version: "1.0",
    skills: [
      {
        name: "get-blog-posts",
        description:
          "Retrieve published blog posts about agentic AI, mobile development, TV apps, React Native, and emerging technologies.",
        endpoint: "https://giolaq.dev/api/posts",
        method: "GET",
        parameters: [],
        returns: "JSON array of blog posts with title, slug, date, excerpt, and tags.",
      },
      {
        name: "get-post-by-slug",
        description:
          "Retrieve a specific blog post by its URL slug, including full HTML content.",
        endpoint: "https://giolaq.dev/api/posts/{slug}",
        method: "GET",
        parameters: [
          {
            name: "slug",
            type: "string",
            required: true,
            description: "The URL slug of the blog post.",
          },
        ],
        returns: "JSON object with post title, content (HTML), date, tags, and reading time.",
      },
      {
        name: "get-author-info",
        description:
          "Get information about Giovanni Laquidara — bio, role, social links, and expertise areas.",
        endpoint: "https://giolaq.dev/api/author",
        method: "GET",
        parameters: [],
        returns: "JSON object with author name, bio, role, social links, and areas of expertise.",
      },
    ],
  };

  return NextResponse.json(skills, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
