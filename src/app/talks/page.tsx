import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talks",
  description:
    "Conference talks and presentations by Giovanni Laquidara on mobile development, TV apps, and more.",
};

const talks = [
  {
    title: "React Native for TV Workshop",
    event: "Workshop",
    date: "2024-11",
    description:
      "A hands-on workshop guiding developers through building TV apps with React Native for Apple TV, Android TV, and Fire TV. Available at rntv.giolaq.dev.",
    link: "https://rntv.giolaq.dev",
    type: "Workshop",
  },
  {
    title: "React Native TV Apps with Giovanni Laquidara",
    event: "Rocket Ship Podcast - Episode 046",
    date: "2024-07",
    description:
      "Discussion about TV app development with React Native, covering the unique challenges of 10-foot UI, seamless navigation, and remote control interaction.",
    link: "https://giolaq.dev/developing-react-native-tv-apps-with-giovanni-laquidara-rocket-ship-046",
    type: "Podcast",
  },
  {
    title: "Building TV Apps with React Native",
    event: "App.js 2024",
    date: "2024-05",
    description:
      "Talk at App.js conference about building cross-platform TV applications with React Native.",
    type: "Talk",
  },
  {
    title: "Creating Engaging Android TV and Fire TV Apps",
    event: "AppDevCon 2024",
    date: "2024-05",
    description:
      "Expert tips for creating engaging TV applications on Android TV and Fire TV using native and cross-device development tools.",
    type: "Talk",
  },
  {
    title: "TV Apps in React Native",
    event: "React Native London",
    date: "2024-03",
    description:
      "Building TV apps with React Native — a lesser-known but increasingly mature use case reaching a new stage of popularity.",
    type: "Talk",
  },
  {
    title: "Developer Experience Updates for Amazon Appstore",
    event: "devDay 2023",
    date: "2024-02",
    description:
      "Overview of new tools and features to simplify testing, submitting apps, and engaging with millions of Amazon Appstore customers.",
    type: "Talk",
  },
  {
    title: "Game Development for Smart TVs",
    event: "Conference Talk",
    date: "2023",
    description:
      "A look at game development for Smart TVs — the challenges and opportunities of building engaging experiences for the big screen.",
    type: "Talk",
  },
  {
    title: "Amazon Appstore: Reaching Millions of Customers",
    event: "Droidcon Berlin 2022",
    date: "2022-07",
    description:
      "How Amazon Appstore reaches millions of customers worldwide on Fire TV, Fire tablets, mobile platforms, and Windows 11 devices.",
    type: "Talk",
  },
];

export default function TalksPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
        Talks & Presentations
      </h1>
      <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
        Conference talks, podcasts, and workshops I&apos;ve been part of.
      </p>

      <div className="mt-12 space-y-8">
        {talks.map((talk, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-zinc-200 p-6 transition-all hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:shadow-zinc-900/50"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {talk.type}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {talk.date}
              </span>
            </div>

            <h2 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {talk.link ? (
                <a
                  href={talk.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {talk.title}
                </a>
              ) : (
                talk.title
              )}
            </h2>

            <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {talk.event}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {talk.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
