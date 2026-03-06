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
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
          Thoughts on software development, mobile apps, TV development, and
          more.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400">
          No posts yet. Check back soon!
        </p>
      )}
    </div>
  );
}
