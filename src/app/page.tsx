import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <HeroSection />

      <section className="pb-20">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Latest Posts
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <p className="mt-8 text-zinc-500 dark:text-zinc-400">
            No posts yet. Check back soon!
          </p>
        )}
      </section>
    </div>
  );
}
