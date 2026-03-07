import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [SITE_CONFIG.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <nav aria-label="Breadcrumb">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
          aria-label="Back to blog"
        >
          <span className="text-accent" aria-hidden="true">&larr;</span> cd ../blog
        </Link>
      </nav>

      <article className="mt-8">
        <header className="terminal-box mb-10 p-5">
          <div className="flex items-center gap-3 text-xs text-muted">
            <time dateTime={post.date}>
              {format(new Date(post.date), "MMMM d, yyyy")}
            </time>
            <span className="text-border" aria-hidden="true">&middot;</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5" role="list" aria-label="Post tags">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-surface px-2 py-0.5 text-[10px] text-accent"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
