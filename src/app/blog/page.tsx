import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import FadeIn from "@/components/FadeIn";
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
      <div className="mb-10 boot-flicker">
        <h1 className="text-2xl font-bold text-foreground">
          <span className="text-accent" aria-hidden="true">$</span> <span aria-label="Blog">cat blog/*</span>
        </h1>
        <p className="mt-2 text-sm text-muted">
          Thoughts on software development, mobile apps, TV development, and
          more.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 min-w-0">
        {posts.map((post, i) => (
          <FadeIn key={post.slug} delay={Math.min(i * 60, 500)} className="min-w-0">
            <PostCard post={post} />
          </FadeIn>
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
