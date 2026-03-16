"use client";

import { useEffect } from "react";
import Script from "next/script";

interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
}

interface WebMCPProps {
  posts: PostData[];
  tags: string[];
}

declare global {
  interface Navigator {
    modelContext?: {
      registerTool(tool: {
        name: string;
        description: string;
        inputSchema: object;
        execute: (params: Record<string, string>) => {
          content: { type: string; text: string }[];
        };
      }): void;
    };
  }
  interface Window {
    WebMCP?: new (opts: Record<string, string>) => {
      registerTool(
        name: string,
        description: string,
        schema: object,
        handler: (args: Record<string, string>) => {
          content: { type: string; text: string }[];
        }
      ): void;
    };
    __webmcpPosts?: PostData[];
    __webmcpTags?: string[];
  }
}

function buildToolHandlers(posts: PostData[], tags: string[]) {
  return {
    search_posts: {
      description:
        "Search Giovanni Laquidara's blog posts by keyword. Returns matching posts with title, date, description, tags, and URL.",
      schema: {
        properties: {
          query: {
            type: "string",
            description:
              "Search keyword to match against post titles, descriptions, and tags",
          },
        },
        required: ["query"],
      },
      handler({ query }: { query: string }) {
        const q = query.toLowerCase();
        const results = posts.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q))
        );
        return {
          content: [
            {
              type: "text",
              text:
                results.length === 0
                  ? `No posts found matching "${query}".`
                  : results
                      .map(
                        (p) =>
                          `- **${p.title}** (${p.date}, ${p.readingTime})\n  ${p.description}\n  Tags: ${p.tags.join(", ")}\n  URL: https://giolaq.dev/blog/${p.slug}`
                      )
                      .join("\n\n"),
            },
          ],
        };
      },
    },
    list_posts: {
      description:
        "List all blog posts on giolaq.dev, ordered by date. Returns title, date, reading time, tags, and URL for each post.",
      schema: { properties: {} },
      handler() {
        return {
          content: [
            {
              type: "text",
              text: posts
                .map(
                  (p) =>
                    `- **${p.title}** (${p.date}, ${p.readingTime})\n  Tags: ${p.tags.join(", ")}\n  URL: https://giolaq.dev/blog/${p.slug}`
                )
                .join("\n\n"),
            },
          ],
        };
      },
    },
    list_tags: {
      description: "List all available blog post tags/topics on giolaq.dev.",
      schema: { properties: {} },
      handler() {
        return {
          content: [
            { type: "text", text: `Available tags: ${tags.join(", ")}` },
          ],
        };
      },
    },
    get_posts_by_tag: {
      description: "Get all blog posts with a specific tag on giolaq.dev.",
      schema: {
        properties: {
          tag: {
            type: "string",
            description:
              "The tag to filter posts by (e.g. 'AI', 'React Native', 'MWC')",
          },
        },
        required: ["tag"],
      },
      handler({ tag }: { tag: string }) {
        const t = tag.toLowerCase();
        const results = posts.filter((p) =>
          p.tags.some((pt) => pt.toLowerCase() === t)
        );
        return {
          content: [
            {
              type: "text",
              text:
                results.length === 0
                  ? `No posts found with tag "${tag}".`
                  : results
                      .map(
                        (p) =>
                          `- **${p.title}** (${p.date}, ${p.readingTime})\n  ${p.description}\n  URL: https://giolaq.dev/blog/${p.slug}`
                      )
                      .join("\n\n"),
            },
          ],
        };
      },
    },
    about_giovanni: {
      description:
        "Get information about Giovanni Laquidara — who he is, what he does, his role, and how to connect with him.",
      schema: { properties: {} },
      handler() {
        return {
          content: [
            {
              type: "text",
              text: [
                "**Giovanni Laquidara** — Senior Developer Advocate at Amazon, based in London.",
                "",
                "Builder and generalist who crosses disciplines — connecting dots across mobile, TV, agentic AI, and developer communities.",
                "",
                'He believes the title "software engineer" is giving way to "builder" — generalists who overlap across traditional roles and connect ideas from completely unrelated domains.',
                "",
                "**Links:**",
                "- Website: https://giolaq.dev",
                "- GitHub: https://github.com/giolaq",
                "- Twitter/X: https://x.com/giolaq",
                "- LinkedIn: https://www.linkedin.com/in/glaquidara/",
                "- Medium: https://medium.com/@giolaq",
              ].join("\n"),
            },
          ],
        };
      },
    },
  };
}

function registerWithModelContext(posts: PostData[], tags: string[]) {
  if (!("modelContext" in navigator) || !navigator.modelContext) return false;
  const mc = navigator.modelContext;
  const tools = buildToolHandlers(posts, tags);

  for (const [name, tool] of Object.entries(tools)) {
    mc.registerTool({
      name,
      description: tool.description,
      inputSchema: { type: "object", ...tool.schema },
      execute: tool.handler as (
        params: Record<string, string>
      ) => { content: { type: string; text: string }[] },
    });
  }
  return true;
}

function registerWithWidgetMCP(posts: PostData[], tags: string[]) {
  if (!window.WebMCP) return false;
  const mcp = new window.WebMCP({
    color: "#e8845c",
    position: "bottom-right",
    size: "36px",
    padding: "12px",
  });
  const tools = buildToolHandlers(posts, tags);

  for (const [name, tool] of Object.entries(tools)) {
    mcp.registerTool(
      name,
      tool.description,
      tool.schema,
      tool.handler as (
        args: Record<string, string>
      ) => { content: { type: string; text: string }[] }
    );
  }
  return true;
}

export default function WebMCP({ posts, tags }: WebMCPProps) {
  useEffect(() => {
    // Try W3C standard
    registerWithModelContext(posts, tags);

    // Poll for jasonjmcghee/WebMCP widget class after script loads
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window.WebMCP) {
        clearInterval(interval);
        registerWithWidgetMCP(posts, tags);
      }
      if (attempts > 50) clearInterval(interval); // give up after 5s
    }, 100);

    return () => clearInterval(interval);
  }, [posts, tags]);

  return (
    <Script src="/webmcp.js" strategy="lazyOnload" />
  );
}
