import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative terminal-box p-5 transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_-5px_var(--accent)]">
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read {post.title}</span>
      </Link>

      {/* Prompt prefix */}
      <div className="flex items-center gap-2 text-xs text-muted">
        <span className="text-accent">$</span>
        <span className="text-term-green">cat</span>
        <span className="truncate">{post.slug}.md</span>
      </div>

      <div className="mt-2 flex items-center gap-3 text-[10px] text-muted">
        <time dateTime={post.date}>
          {format(new Date(post.date), "MMM d, yyyy")}
        </time>
        <span className="text-border">&middot;</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="mt-2 text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
        {post.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
        {post.description}
      </p>

      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface px-2 py-0.5 text-[10px] text-muted transition-colors duration-300 group-hover:text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
