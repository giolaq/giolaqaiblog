import Link from "next/link";
import TiltSurface from "@/components/TiltSurface";
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
      name: "tv-build-harness",
      description:
        "An AI coding harness that turns a content manifest and brand kit into a TV app, with phased builds and automated checks.",
      language: "TypeScript",
      url: "https://github.com/giolaq/tv-build-harness",
    },
    {
      name: "porthole",
      description:
        "A browser window into Android and TV emulators, with CLI and MCP tools for agents to navigate apps, capture screens, and inspect crashes.",
      language: "TypeScript",
      url: "https://github.com/giolaq/porthole",
    },
    {
      name: "xingu",
      description:
        "An unofficial Amazon Appstore CLI for people and agents. Manage app uploads, store listings, and releases with structured JSON output.",
      language: "Rust",
      url: "https://github.com/giolaq/xingu",
    },
    {
      name: "react-native-multi-tv-app-sample",
      description:
        "A sample React Native app for Android TV, Fire TV, tvOS, and the web.",
      language: "TypeScript",
      url: "https://github.com/giolaq/react-native-multi-tv-app-sample",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HeroSection />

      {/* Writing */}
      <section className="home-section">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>

              <h2 className="section-heading">
                Latest writing
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-link shrink-0"
            >
              All posts →
            </Link>
          </div>
        </FadeIn>

        <div className="post-list">
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
      <section id="projects" className="home-section">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>

              <h2 className="section-heading">
                Selected projects
              </h2>
              <p className="mt-3 max-w-xl text-base text-muted">
                Tools for building, testing, and releasing apps with AI agents, plus a cross-platform TV starter.
              </p>
            </div>
            <a
              href="https://github.com/giolaq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link shrink-0"
            >
              GitHub ↗
            </a>
          </div>
        </FadeIn>

        <div className="project-list">
          {projects.map((project) => (
            <TiltSurface key={project.name} className="project-depth" strength={2.5}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-row group block min-w-0"
              >
                <div className="font-mono-xs flex flex-wrap items-center gap-3">
                  <span>{project.language}</span>
                  <span className="text-[var(--border-strong)]">·</span>
                  <span className="truncate">github.com/giolaq</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-medium leading-snug break-words text-foreground group-hover:text-accent">
                  {project.name}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-accent">
                  <span>View repo</span>
                  <span aria-hidden>↗</span>
                </div>
              </a>
            </TiltSurface>
          ))}
        </div>
      </section>
    </div>
  );
}
