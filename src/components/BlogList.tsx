"use client";

import { useState, useMemo } from "react";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

export default function BlogList({ posts, tags }: { posts: PostMeta[]; tags: string[] }) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery = !query || [post.title, post.description, ...post.tags]
        .some((text) => text.toLowerCase().includes(query));
      const matchesTags = selectedTags.size === 0 || post.tags.some((tag) => selectedTags.has(tag));
      return matchesQuery && matchesTags;
    });
  }, [posts, search, selectedTags]);
  const hasFilters = search.length > 0 || selectedTags.size > 0;

  function clearFilters() {
    setSearch("");
    setSelectedTags(new Set());
  }
  function toggleTag(tag: string) {
    setSelectedTags((previous) => {
      const next = new Set(previous);
      if (next.has(tag)) next.delete(tag); else next.add(tag);
      return next;
    });
  }

  return (
    <div>
      <label htmlFor="post-search" className="mb-3 block text-sm">Find something worth building</label>
      <div className="search-box">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-muted">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input id="post-search" type="search" value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search articles, topics, ideas…" aria-controls="post-results" />
      </div>
      {tags.length > 0 && (
        <details className="tag-filters mt-4">
          <summary>Filter by topic{selectedTags.size > 0 ? ` · ${selectedTags.size} selected` : ""}</summary>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter articles by topic; multiple topics match any selected topic">
            {tags.map((tag) => (
              <button type="button" key={tag} className="filter-tag"
                aria-pressed={selectedTags.has(tag)} aria-controls="post-results" onClick={() => toggleTag(tag)}>{tag}</button>
            ))}
          </div>
        </details>
      )}
      <div className="blog-toolbar">
        <p role="status" aria-live="polite" aria-atomic="true" className="font-mono-xs">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}{hasFilters ? ` of ${posts.length}` : " in the notebook"}
        </p>
        {hasFilters && <button type="button" className="blog-clear" onClick={clearFilters}>Clear filters</button>}
      </div>
      <section id="post-results" aria-label="Articles">
        <h2 className="sr-only">Articles</h2>
        <div className="posts-grid">
          {filtered.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
        {filtered.length === 0 && (
          <div className="glass-card p-8">
            <p className="text-lg">No articles found.</p>
            <p className="mt-2 text-sm text-muted">Try a different search, or clear the filters to explore all the writing.</p>
          </div>
        )}
      </section>
      <noscript><p className="mt-6 text-muted">All articles are shown. Enable JavaScript to use search and topic filters.</p></noscript>
    </div>
  );
}
