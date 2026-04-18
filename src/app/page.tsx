import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import PostCard from "@/components/PostCard";
import FadeIn from "@/components/FadeIn";
import { getAllPosts } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 4);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.author.name,
    url: SITE_CONFIG.url,
    jobTitle: "Senior Developer Advocate",
    worksFor: { "@type": "Organization", name: "Amazon" },
    image: `${SITE_CONFIG.url}${SITE_CONFIG.author.avatar}`,
    sameAs: [
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.medium,
      SITE_CONFIG.social.hashnode,
    ],
  };

  const projects = [
    {
      name: "ad-genius-system",
      description:
        "Multi-agent AI system for generating personalized video advertisements using AWS Bedrock and Strands.",
      language: "Python",
      url: "https://github.com/giolaq/ad-genius-system",
    },
    {
      name: "tv-mcp-app",
      description:
        "AI-powered TV streaming assistant with interactive widget for browsing, filtering, recommending, and playing content.",
      language: "TypeScript",
      url: "https://github.com/giolaq/tv-mcp-app",
    },
    {
      name: "devtoagent",
      description:
        "A Dev.to article generator agent built with Strands — from idea to published post via AI.",
      language: "Python",
      url: "https://github.com/giolaq/devtoagent",
    },
    {
      name: "react-native-multi-tv-app-sample",
      description:
        "React Native TV app sample for Android TV, Fire TV, tvOS, and web — one codebase, every screen.",
      language: "TypeScript",
      url: "https://github.com/giolaq/react-native-multi-tv-app-sample",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HeroSection />

      {/* Writing */}
      <section className="pb-24">
        <FadeIn>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="font-mono-xs">§ 01</div>
              <h2 className="mt-2 font-display text-4xl md:text-5xl tracking-tight">
                Latest writing
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-[12px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
            >
              All posts →
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-2 min-w-0">
          {recentPosts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 100} className="min-w-0">
              <PostCard post={post} />
            </FadeIn>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="mt-8 text-sm text-muted">No posts yet. Check back soon!</p>
        )}
      </section>

      {/* Projects */}
      <section className="pb-24">
        <FadeIn>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="font-mono-xs">§ 02</div>
              <h2 className="mt-2 font-display text-4xl md:text-5xl tracking-tight">
                Featured projects
              </h2>
              <p className="mt-3 max-w-xl text-[14px] text-muted">
                Open-source experiments across agentic AI, TV, and cross-platform mobile.
              </p>
            </div>
            <a
              href="https://github.com/giolaq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
            >
              All repos →
            </a>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-2 min-w-0">
          {projects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 80} className="min-w-0">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card block overflow-hidden p-6 min-w-0"
              >
                <div className="font-mono-xs flex items-center gap-3">
                  <span>{project.language}</span>
                  <span className="text-[--border-strong]">·</span>
                  <span className="truncate">github.com/giolaq</span>
                </div>
                <h3 className="mt-3 font-display text-[26px] leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-[--accent]">
                  {project.name}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-foreground">
                  <span>View repo</span>
                  <span aria-hidden>↗</span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
