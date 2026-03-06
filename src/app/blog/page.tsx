import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles about mobile development, TV apps, Kotlin, React Native, and emerging technologies.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-foreground">
          <span className="text-accent">$</span> cat blog/*
        </h1>
        <p className="mt-2 text-sm text-muted">
          Thoughts on software development, mobile apps, TV development, and
          more.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-sm text-muted">
          No posts yet. Check back soon!
        </p>
      )}
    </div>
  );
}
