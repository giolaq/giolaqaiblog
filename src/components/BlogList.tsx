"use client";

import { useState, useMemo } from "react";
import PostCard from "@/components/PostCard";
import FadeIn from "@/components/FadeIn";
import type { PostMeta } from "@/lib/posts";

const POSTS_PER_PAGE = 10;

export default function BlogList({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: string[];
}) {
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
      result = result.filter((p) =>
        p.tags.some((t) => selectedTags.has(t))
      );
    }

    return result;
  }, [posts, search, selectedTags]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
    setPage(1);
  }

  return (
    <div>
      {/* Search */}
      <div className="terminal-box p-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="text-accent">$</span>
          <span className="text-term-green">grep -i</span>
          <span>&quot;</span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="search posts..."
            className="flex-1 bg-transparent text-foreground placeholder:text-border outline-none text-xs"
          />
          <span>&quot;</span>
        </div>
      </div>

      {/* Tag filter */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {selectedTags.size > 0 && (
            <button
              onClick={() => {
                setSelectedTags(new Set());
                setPage(1);
              }}
              className="rounded-md border border-dashed border-border px-2 py-0.5 text-[10px] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              clear
            </button>
          )}
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-md px-2 py-0.5 text-[10px] transition-colors ${
                selectedTags.has(tag)
                  ? "bg-accent text-background"
                  : "bg-surface text-muted hover:text-accent"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Result count */}
      <p className="text-[10px] text-muted mb-4">
        Showing {filtered.length} of {posts.length} posts
      </p>

      {/* Post grid */}
      <div className="grid gap-4 md:grid-cols-2 min-w-0">
        {paginated.map((post, i) => (
          <FadeIn key={post.slug} delay={Math.min(i * 60, 500)} className="min-w-0">
            <PostCard post={post} />
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted mt-8">
          No posts match your search.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 text-xs text-muted">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="terminal-box px-3 py-1.5 transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted"
          >
            &lt; prev
          </button>
          <span>
            page {currentPage}/{totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="terminal-box px-3 py-1.5 transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted"
          >
            next &gt;
          </button>
        </div>
      )}
    </div>
  );
}
