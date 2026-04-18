import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles about mobile development, TV apps, Kotlin, React Native, and emerging technologies.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8 py-20">
      <div className="font-mono-xs">§ Writing</div>
      <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-tight leading-[0.95] max-w-[14ch]">
        Field notes from <em className="not-italic text-muted italic">the platforms I live in.</em>
      </h1>
      <p className="mt-6 max-w-[56ch] text-[15px] text-muted">
        Thoughts on software development, mobile apps, TV development, and
        whatever new technology catches my eye.
      </p>

      <div className="mt-12">
        <BlogList posts={posts} tags={tags} />
      </div>
    </div>
  );
}
