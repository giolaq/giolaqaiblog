import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post, headingLevel = 3 }: { post: PostMeta; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="post-row">
      <div className="post-meta">
        <time dateTime={post.date}>{format(new Date(post.date), "d MMM yyyy")}</time>
        <span>{post.readingTime}</span>
      </div>
      <div className="min-w-0">
        <Heading className="post-title"><Link href={`/blog/${post.slug}`}>{post.title}</Link></Heading>
        <p className="post-description">{post.description}</p>
        {post.tags.length > 0 && <p className="post-topics">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</p>}
      </div>
    </article>
  );
}
