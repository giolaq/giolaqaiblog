import { NextResponse } from "next/server";

export async function GET() {
  const serverCard = {
    name: "giolaq-dev",
    description:
      "Read-only MCP server for Giovanni Laquidara's blog and developer content at giolaq.dev.",
    version: "1.0.0",
    url: "https://giolaq.dev/.well-known/mcp",
    capabilities: {
      resources: true,
      tools: false,
      prompts: false,
    },
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
