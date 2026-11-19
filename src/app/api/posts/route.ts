import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  const data = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    date: post.date,
    description: post.description || "",
    tags: post.tags || [],
    readingTime: post.readingTime,
    url: `https://giolaq.dev/blog/${post.slug}`,
  }));

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/json",
    },
  });
}
