import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
});

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="post-card">
      <div className="post-card-top">
        <span className="post-category">{post.tags[0] || "Field notes"}</span><span className="post-arrow" aria-hidden="true">↗</span>
      </div>
      <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p>{post.description}</p>
      <div className="post-card-meta">
        <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
        <span aria-hidden="true">/</span><span>{post.readingTime}</span>
      </div>
    </article>
  );
}
