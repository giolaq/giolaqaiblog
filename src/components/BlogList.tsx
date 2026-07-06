"use client";

import { useState, useMemo } from "react";
import PostCard from "@/components/PostCard";
import FadeIn from "@/components/FadeIn";
import type { PostMeta } from "@/lib/posts";

const POSTS_PER_PAGE = 10;

export default function BlogList({ posts, tags }: { posts: PostMeta[]; tags: string[] }) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = posts;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedTags.size > 0) {
      result = result.filter((p) => p.tags.some((t) => selectedTags.has(t)));
    }
    return result;
  }, [posts, search, selectedTags]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag); else next.add(tag);
      return next;
    });
    setPage(1);
  }

  return (
    <div>
      <div className="glass-card p-4 mb-6 flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search posts…"
          className="flex-1 bg-transparent text-foreground placeholder:text-muted outline-none text-[14px]"
        />
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedTags.size > 0 && (
            <button
              onClick={() => { setSelectedTags(new Set()); setPage(1); }}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              Clear
            </button>
          )}
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-widest transition-colors ${
                selectedTags.has(tag)
                  ? "bg-[var(--accent)] text-background"
                  : "border border-[var(--border)] text-muted hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <p className="font-mono-xs mb-6">
        Showing {filtered.length} of {posts.length} posts
      </p>

      <div className="grid gap-5 md:grid-cols-2 min-w-0">
        {paginated.map((post, i) => (
          <FadeIn key={post.slug} delay={Math.min(i * 60, 500)} className="min-w-0">
            <PostCard post={post} />
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-[14px] text-muted mt-12">No posts match your search.</p>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12 font-mono-xs">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full border border-[var(--border)] px-4 py-1.5 transition-colors hover:text-foreground disabled:opacity-30"
          >
            ← prev
          </button>
          <span>page {currentPage}/{totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full border border-[var(--border)] px-4 py-1.5 transition-colors hover:text-foreground disabled:opacity-30"
          >
            next →
          </button>
        </div>
      )}
    </div>
  );
}
