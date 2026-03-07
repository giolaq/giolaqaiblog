import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles about mobile development, TV apps, Kotlin, React Native, and emerging technologies.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10 boot-flicker">
        <h1 className="text-2xl font-bold text-foreground">
          <span className="text-accent">$</span> cat blog/*
        </h1>
        <p className="mt-2 text-sm text-muted">
          Thoughts on software development, mobile apps, TV development, and
          more.
        </p>
      </div>

      <BlogList posts={posts} tags={tags} />
    </div>
  );
}
