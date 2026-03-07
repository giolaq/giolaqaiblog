import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import PostCard from "@/components/PostCard";
import FadeIn from "@/components/FadeIn";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-6 overflow-hidden">
      <HeroSection />

      <section className="pb-20">
        <FadeIn>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-accent">
              Latest Posts
            </h2>
            <Link
              href="/blog"
              className="text-xs text-muted transition-colors hover:text-accent"
            >
              View all &rarr;
            </Link>
          </div>
        </FadeIn>

        <div className="mt-6 grid gap-4 md:grid-cols-2 min-w-0">
          {recentPosts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 100} className="min-w-0">
              <PostCard post={post} />
            </FadeIn>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="mt-8 text-sm text-muted">
            No posts yet. Check back soon!
          </p>
        )}
      </section>

      <section className="pb-20">
        <FadeIn>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-accent">
              Featured Projects
            </h2>
            <a
              href="https://github.com/giolaq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted transition-colors hover:text-accent"
            >
              All repos &rarr;
            </a>
          </div>
          <p className="mt-1 text-xs text-muted">
            Open-source projects with a focus on agentic AI and cross-platform development.
          </p>
        </FadeIn>

        <div className="mt-6 grid gap-4 md:grid-cols-2 min-w-0">
          {[
            {
              name: "ad-genius-system",
              description: "Multi-agent AI system for generating personalized video advertisements using AWS Bedrock and Strands.",
              language: "Python",
              url: "https://github.com/giolaq/ad-genius-system",
            },
            {
              name: "tv-mcp-app",
              description: "AI-powered TV streaming assistant with interactive widget for browsing, filtering, recommending, and playing content.",
              language: "TypeScript",
              url: "https://github.com/giolaq/tv-mcp-app",
            },
            {
              name: "devtoagent",
              description: "A Dev.to article generator agent built with Strands — from idea to published post via AI.",
              language: "Python",
              url: "https://github.com/giolaq/devtoagent",
            },
            {
              name: "vibepope",
              description: "A vibe-coded experience — built entirely through creative prompting and agentic AI.",
              language: "HTML",
              url: "https://github.com/giolaq/vibepope",
            },
            {
              name: "react-native-multi-tv-app-sample",
              description: "React Native TV app sample for Android TV, Fire TV, tvOS, and web — one codebase, every screen.",
              language: "TypeScript",
              url: "https://github.com/giolaq/react-native-multi-tv-app-sample",
            },
            {
              name: "gio-comic",
              description: "An AI-powered comic generator — turn ideas into visual stories automatically.",
              language: "Python",
              url: "https://github.com/giolaq/gio-comic",
            },
          ].map((project, i) => (
            <FadeIn key={project.name} delay={i * 80} className="min-w-0">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block terminal-box p-5 overflow-hidden min-w-0 transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_-5px_var(--accent)]"
              >
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="text-accent">$</span>
                  <span className="text-term-green">git clone</span>
                  <span className="truncate">{project.name}</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
                  {project.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-3">
                  <span className="rounded-md bg-surface px-2 py-0.5 text-[10px] text-muted transition-colors duration-300 group-hover:text-accent">
                    {project.language}
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
