import { NextResponse } from "next/server";

export async function GET() {
  const serverCard = {
    name: "giolaq-dev",
    description:
      "Read-only MCP server for Giovanni Laquidara's blog and developer content at giolaq.dev.",
    version: "1.0.0",
    serverUrl: "https://giolaq.dev/.well-known/mcp",
    capabilities: {
      resources: true,
      tools: true,
      prompts: false,
    },
    tools: [
      {
        name: "list_posts",
        description:
          "List all published blog posts with title, slug, date, description, tags, and reading time.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_post",
        description:
          "Get a specific blog post by slug, including full HTML content.",
        inputSchema: {
          type: "object",
          properties: {
            slug: {
              type: "string",
              description: "The URL slug of the blog post.",
            },
          },
          required: ["slug"],
        },
      },
      {
        name: "get_author",
        description:
          "Get author information including bio, role, expertise, and social links.",
        inputSchema: { type: "object", properties: {} },
      },
    ],
    resources: [
      {
        uri: "blog://posts",
        name: "Blog Posts",
        description: "All published blog posts.",
        mimeType: "application/json",
      },
      {
        uri: "blog://author",
        name: "Author Info",
        description: "Author biography, expertise, and contact information.",
        mimeType: "application/json",
      },
    ],
    authentication: "none",
    contact: {
      name: "Giovanni Laquidara",
      url: "https://github.com/giolaq",
    },
  };

  return NextResponse.json(serverCard, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
