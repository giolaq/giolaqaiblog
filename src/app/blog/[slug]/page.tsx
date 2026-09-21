import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title, description: post.description, type: "article",
      publishedTime: post.date, authors: [SITE_CONFIG.author.name], tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: post.title, description: post.description, datePublished: post.date,
    author: { "@type": "Person", name: SITE_CONFIG.author.name, url: SITE_CONFIG.url },
    keywords: post.tags, url: `${SITE_CONFIG.url}/blog/${slug}`,
  };

  return (
    <div className="article-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Link href="/blog" className="font-mono-xs inline-flex items-center gap-2 transition-colors hover:text-foreground">
        <span>←</span> Back to writing
      </Link>

      <article className="mt-10">
        <header className="article-header mb-10">
          <div className="font-mono-xs flex flex-wrap items-center gap-3">
            <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="article-title">
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-sm text-muted">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.coverImage && (
          <div className="mb-12 overflow-hidden rounded border border-[var(--border)]">
            <Image src={post.coverImage} alt={post.title} width={900} height={500} sizes="(max-width: 768px) 100vw, 720px" className="w-full object-cover" priority />
          </div>
        )}

        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <nav aria-label="Article navigation" className="mt-16 border-t border-border pt-6">
        <Link href="/blog" className="text-link">← More writing</Link>
      </nav>
    </div>
  );
}
