"use client";

import { useEffect } from "react";

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
}

export default function WebMCP({ posts, tags }: WebMCPProps) {
  useEffect(() => {
    if (!("modelContext" in navigator) || !navigator.modelContext) return;

    const mc = navigator.modelContext;

    mc.registerTool({
      name: "search_posts",
      description:
        "Search Giovanni Laquidara's blog posts by keyword. Returns matching posts with title, date, description, tags, and URL.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search keyword to match against post titles, descriptions, and tags",
          },
        },
        required: ["query"],
      },
      execute({ query }) {
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
    });

    mc.registerTool({
      name: "list_posts",
      description:
        "List all blog posts on giolaq.dev, ordered by date. Returns title, date, reading time, tags, and URL for each post.",
      inputSchema: {
        type: "object",
        properties: {},
      },
      execute() {
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
    });

    mc.registerTool({
      name: "list_tags",
      description:
        "List all available blog post tags/topics on giolaq.dev.",
      inputSchema: {
        type: "object",
        properties: {},
      },
      execute() {
        return {
          content: [
            {
              type: "text",
              text: `Available tags: ${tags.join(", ")}`,
            },
          ],
        };
      },
    });

    mc.registerTool({
      name: "get_posts_by_tag",
      description:
        "Get all blog posts with a specific tag on giolaq.dev.",
      inputSchema: {
        type: "object",
        properties: {
          tag: {
            type: "string",
            description: "The tag to filter posts by (e.g. 'AI', 'React Native', 'MWC')",
          },
        },
        required: ["tag"],
      },
      execute({ tag }) {
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
    });

    mc.registerTool({
      name: "about_giovanni",
      description:
        "Get information about Giovanni Laquidara — who he is, what he does, his role, and how to connect with him.",
      inputSchema: {
        type: "object",
        properties: {},
      },
      execute() {
        return {
          content: [
            {
              type: "text",
              text: [
                "**Giovanni Laquidara** — Senior Developer Advocate at Amazon, based in London.",
                "",
                "Builder and generalist who crosses disciplines — connecting dots across mobile, TV, agentic AI, and developer communities.",
                "",
                "He believes the title \"software engineer\" is giving way to \"builder\" — generalists who overlap across traditional roles and connect ideas from completely unrelated domains.",
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
    });
  }, [posts, tags]);

  return null;
}
