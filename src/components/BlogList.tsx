"use client";

import { useState, useMemo, useRef } from "react";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

const POSTS_PER_PAGE = 10;

export default function BlogList({ posts, tags }: { posts: PostMeta[]; tags: string[] }) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const resultsHeading = useRef<HTMLParagraphElement>(null);
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) =>
      (!query || [post.title, post.description, ...post.tags].some((text) => text.toLowerCase().includes(query))) &&
      (selectedTags.size === 0 || post.tags.some((tag) => selectedTags.has(tag)))
    );
  }, [posts, search, selectedTags]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginated = filtered.slice(start, start + POSTS_PER_PAGE);

  function clearFilters() { setSearch(""); setSelectedTags(new Set()); setPage(1); }
  function changePage(next: number) {
    setPage(next);
    resultsHeading.current?.focus({ preventScroll: true });
    resultsHeading.current?.scrollIntoView({ block: "start" });
  }

  return (
    <div>
      <label htmlFor="post-search" className="mb-2 block text-sm">Search writing</label>
      <input id="post-search" type="search" value={search} className="search-field"
        onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Try React Native, Kotlin, or TV…" />
      {tags.length > 0 && (
        <details className="topic-filters">
          <summary>Filter by topic{selectedTags.size > 0 ? ` (${selectedTags.size} selected)` : ""}</summary>
          <p className="mt-2 text-sm text-muted">Show posts matching any selected topic.</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Topics">
            {tags.map((tag) => <button key={tag} className="filter-button" aria-pressed={selectedTags.has(tag)} onClick={() => {
              setSelectedTags((previous) => { const next = new Set(previous); if (next.has(tag)) next.delete(tag); else next.add(tag); return next; });
              setPage(1);
            }}>{tag}</button>)}
          </div>
        </details>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <p ref={resultsHeading} tabIndex={-1} role="status" className="text-sm text-muted">
          {filtered.length > 0 ? `${start + 1}–${Math.min(start + POSTS_PER_PAGE, filtered.length)} of ${filtered.length} posts` : "No posts found"}
        </p>
        {(search || selectedTags.size > 0) && <button onClick={clearFilters} className="text-link py-2">Clear filters</button>}
      </div>
      <div>{paginated.map((post) => <PostCard key={post.slug} post={post} headingLevel={2} />)}</div>
      {filtered.length === 0 && <p className="py-10 text-base text-muted">Try a different search or clear the filters to see all posts.</p>}
      {totalPages > 1 && <nav className="pagination" aria-label="Writing pages">
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>← Previous</button>
        <span className="text-muted">Page {currentPage} of {totalPages}</span>
        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Next →</button>
      </nav>}
    </div>
  );
}
