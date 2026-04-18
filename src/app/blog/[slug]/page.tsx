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
    <div className="mx-auto max-w-3xl px-6 md:px-8 py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Link href="/blog" className="font-mono-xs inline-flex items-center gap-2 transition-colors hover:text-foreground">
        <span>←</span> Back to writing
      </Link>

      <article className="mt-10">
        <header className="mb-10">
          <div className="font-mono-xs flex items-center gap-3">
            <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.02] tracking-tight text-foreground max-w-[20ch]">
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[--border] px-3 py-1 text-[10.5px] uppercase tracking-widest text-muted">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.coverImage && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-[--border]">
            <Image src={post.coverImage} alt={post.title} width={900} height={500} className="w-full object-cover" priority />
          </div>
        )}

        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
