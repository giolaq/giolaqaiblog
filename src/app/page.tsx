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
          <h2 className="text-lg font-bold text-accent">
            Latest Posts
          </h2>
          <Link
            href="/blog"
            className="text-xs text-muted transition-colors hover:text-accent"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <p className="mt-8 text-sm text-muted">
            No posts yet. Check back soon!
          </p>
        )}
      </section>
    </div>
  );
}
