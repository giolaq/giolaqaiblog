import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = { alternates: { canonical: SITE_CONFIG.url } };

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 3);
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
    <div className="site-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <HeroSection />
      <div className="focus-strip">
        <span className="font-mono-xs">The intersection of</span>
        <span>AI &amp; agents</span><span aria-hidden="true">+</span>
        <span>Developer experience</span><span aria-hidden="true">+</span><span>Apps everywhere</span>
      </div>
      <section className="home-section" aria-labelledby="writing-title">
        <div className="section-heading">
          <div><p className="eyebrow">01 / Field notes</p>
            <h2 id="writing-title">From the workbench<span className="text-accent">.</span></h2>
            <p>Experiments, practical guides, and things learned along the way.</p>
          </div>
          <Link href="/blog" className="text-link">All writing <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="posts-grid home-posts">{recentPosts.map((post) => <PostCard key={post.slug} post={post} />)}</div>
        {posts.length === 0 && <p className="text-muted">New writing is on its way.</p>}
      </section>
      <section id="projects" className="home-section projects-section" aria-labelledby="projects-title">
        <div className="section-heading">
          <div><p className="eyebrow">02 / Build in the open</p>
            <h2 id="projects-title">Less slide deck.<br />More source code.</h2>
            <p>Small experiments. Real problems. Open for you to explore.</p>
          </div>
          <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="text-link">All repositories <span aria-hidden="true">↗</span></a>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <a href={project.url} key={project.name} target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-index" aria-hidden="true">0{index + 1}</div>
              <div className="min-w-0">
                <span className="project-language"><span className={project.language === "Python" ? "language-dot python" : "language-dot"} />{project.language}</span>
                <h3>{project.name}</h3><p>{project.description}</p>
              </div>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
      <section className="speaking-banner" aria-labelledby="speaking-title">
        <div><p className="eyebrow">03 / Beyond the keyboard</p>
          <h2 id="speaking-title">Ideas are better in good company.</h2>
          <p>Talks, workshops, and conversations with the developer community.</p>
        </div>
        <Link href="/talks" className="button-secondary">Explore the talks <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}
