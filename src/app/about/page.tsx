import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_CONFIG.author.name} — Developer Advocate, Technologist, and Software Engineer.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
        About Me
      </h1>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        <p>
          Hi! I&apos;m <strong className="text-zinc-900 dark:text-zinc-100">Giovanni Laquidara</strong>,
          a Senior Developer Advocate at Amazon, based in London, England. I&apos;m focused on
          devices, mobile apps, and developer communities.
        </p>

        <p>
          I&apos;m passionate about working with cutting-edge technologies and people. I studied at
          Universit&agrave; di Roma Tor Vergata and have been building software across mobile, VR/AR,
          real-time defence systems, and IoT. For fun, I enjoy low-level programming, IoT hacking,
          and command-line apps.
        </p>

        <h2 className="!mt-12 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          What I Do
        </h2>

        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Developer Advocacy</strong> —
            Creating content, giving talks, and building tools to help developers succeed. I focus
            on mobile development, TV apps, and cross-platform solutions.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Software Engineering</strong> —
            Building applications with modern technologies including React Native, Kotlin,
            TypeScript, and more. I have experience across mobile, VR/AR, and real-time systems.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Technical Writing</strong> —
            Writing articles and tutorials about software development, covering topics from
            functional programming to hardware hacking.
          </li>
        </ul>

        <h2 className="!mt-12 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Background
        </h2>

        <p>
          Over the years, I&apos;ve worn many hats: software engineer, VR and mobile developer,
          real-time software architect, and developer advocate. This diverse background gives me
          a unique perspective on building technology that truly serves developers and users.
        </p>

        <p>
          I write about Kotlin, React Native, TV app development, hardware hacking (like
          Flipper Zero), and whatever new technology catches my eye. You can find my writing
          on this blog and across platforms like Medium and Hashnode.
        </p>

        <h2 className="!mt-12 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Get in Touch
        </h2>

        <p>
          I&apos;m always happy to connect with fellow developers and tech enthusiasts. You can
          find me on:
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
          >
            GitHub
          </a>
          <a
            href={SITE_CONFIG.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
          >
            X (Twitter)
          </a>
          <a
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
          >
            LinkedIn
          </a>
          <a
            href={SITE_CONFIG.social.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Medium
          </a>
        </div>
      </div>
    </div>
  );
}
