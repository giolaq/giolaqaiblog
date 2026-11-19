import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Practical field notes on AI agents, TV apps, React Native, Kotlin, and building things that work.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  return (
    <div className="site-container py-14 md:py-20">
      <p className="eyebrow">The notebook / Writing</p>
      <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[1.08]">
        Notes from<br /><span className="text-accent">the build.</span>
      </h1>
      <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted">
        AI agents, apps on the big screen, and everything in between.
        Practical guides and honest lessons from getting things to work.
      </p>
      <div className="mt-12 md:mt-16"><BlogList posts={posts} tags={tags} /></div>
    </div>
  );
}
