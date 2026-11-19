import type { Metadata } from "next";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Terminal",
  description:
    "Interactive terminal — explore Giovanni's blog, projects, and more through a command-line interface.",
};

export default function TerminalPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <InteractiveTerminal posts={posts} tags={tags} />
    </div>
  );
}
