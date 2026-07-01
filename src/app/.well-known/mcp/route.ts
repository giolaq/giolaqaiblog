import { NextResponse } from "next/server";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

export async function GET() {
  return NextResponse.json(
    {
      jsonrpc: "2.0",
      result: {
        protocolVersion: "2024-11-05",
        serverInfo: {
          name: "giolaq-dev",
          version: "1.0.0",
        },
        capabilities: {
          resources: {},
          tools: {},
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}

export async function POST(request: Request) {
  let body: { jsonrpc?: string; method?: string; id?: number | string; params?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { jsonrpc: "2.0", error: { code: -32700, message: "Parse error" }, id: null },
      { status: 400 }
    );
  }

  const { method, id, params } = body;

  if (method === "initialize") {
    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        serverInfo: { name: "giolaq-dev", version: "1.0.0" },
        capabilities: { resources: {}, tools: {} },
      },
    });
  }

  if (method === "tools/list") {
    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      result: {
        tools: [
          {
            name: "list_posts",
            description: "List all published blog posts.",
            inputSchema: { type: "object", properties: {} },
          },
          {
            name: "get_post",
            description: "Get a blog post by slug with full content.",
            inputSchema: {
              type: "object",
              properties: {
                slug: { type: "string", description: "Post URL slug" },
              },
              required: ["slug"],
            },
          },
          {
            name: "get_author",
            description: "Get author bio, expertise, and social links.",
            inputSchema: { type: "object", properties: {} },
          },
        ],
      },
    });
  }

  if (method === "tools/call") {
    const toolName = (params as Record<string, unknown>)?.name as string;
    const args = (params as Record<string, unknown>)?.arguments as Record<string, unknown> | undefined;

    if (toolName === "list_posts") {
      const posts = getAllPosts();
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(posts) }],
        },
      });
    }

    if (toolName === "get_post") {
      const slug = args?.slug as string;
      if (!slug) {
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          error: { code: -32602, message: "Missing required parameter: slug" },
        });
      }
      const post = await getPostBySlug(slug);
      if (!post) {
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: `Post "${slug}" not found.` }],
            isError: true,
          },
        });
      }
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(post) }],
        },
      });
    }

    if (toolName === "get_author") {
      const author = {
        name: SITE_CONFIG.author.name,
        role: SITE_CONFIG.author.role,
        bio: SITE_CONFIG.author.bio,
        url: SITE_CONFIG.url,
        expertise: [
          "Agentic AI",
          "Mobile Development",
          "TV Applications",
          "React Native",
          "Cross-platform Development",
        ],
        social: SITE_CONFIG.social,
      };
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(author) }],
        },
      });
    }

    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Unknown tool: ${toolName}` },
    });
  }

  if (method === "resources/list") {
    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      result: {
        resources: [
          { uri: "blog://posts", name: "Blog Posts", mimeType: "application/json" },
          { uri: "blog://author", name: "Author Info", mimeType: "application/json" },
        ],
      },
    });
  }

  return NextResponse.json({
    jsonrpc: "2.0",
    id,
    error: { code: -32601, message: `Method not found: ${method}` },
  });
}
