import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return NextResponse.json(
      { error: "not_found", message: `Post "${slug}" not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      title: post.title,
      slug: post.slug,
      date: post.date,
      description: post.description || "",
      tags: post.tags || [],
      readingTime: post.readingTime,
      content: post.content,
      url: `https://giolaq.dev/blog/${post.slug}`,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "application/json",
      },
    }
  );
}
