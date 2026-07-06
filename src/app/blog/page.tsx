import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles on TV apps, React Native, Kotlin, mobile development, and AI agents.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8 py-20">
      <div className="font-mono-xs">§ Writing</div>
      <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-tight leading-[0.95] max-w-[16ch]">
        Notes on agentic AI, TV apps, React Native,{" "}
        <span className="italic">and Kotlin.</span>
      </h1>
      <p className="mt-6 max-w-[56ch] text-[15px] text-muted">
        Mostly TV and cross-platform work, with the occasional hardware detour.
      </p>

      <div className="mt-12">
        <BlogList posts={posts} tags={tags} />
      </div>
    </div>
  );
}
