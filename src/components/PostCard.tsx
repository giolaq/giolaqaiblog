import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group glass-card relative overflow-hidden p-6 min-w-0">
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read {post.title}</span>
      </Link>

      <div className="font-mono-xs flex items-center gap-3">
        <time dateTime={post.date}>
          {format(new Date(post.date), "MMM d, yyyy")}
        </time>
        <span className="text-[var(--border-strong)]">·</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="mt-3 font-display text-[26px] leading-[1.15] tracking-tight text-foreground transition-colors duration-300 group-hover:text-[var(--accent)]">
        {post.title}
      </h3>

      <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-muted">
        {post.description}
      </p>

      {post.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[11px] uppercase tracking-widest text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-foreground">
        <span>Read</span>
        <span aria-hidden>→</span>
      </div>
    </article>
  );
}
