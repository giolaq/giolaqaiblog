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
    <div className="mx-auto max-w-5xl px-6 md:px-8 py-12 md:py-16">
      <h1 className="page-title">Writing</h1>
      <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">
        Tutorials, conference notes, and things I’ve been trying.
        Mostly TV apps, React Native, Kotlin, and AI agents.
      </p>

      <div className="mt-12">
        <BlogList posts={posts} tags={tags} />
      </div>
    </div>
  );
}
