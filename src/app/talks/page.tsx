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
      "A hands-on workshop guiding developers through building TV apps with React Native for Apple TV, Android TV, and Fire TV.",
    link: "https://rntv.giolaq.dev",
    type: "Workshop",
  },
  {
    title: "Smart TV Apps with React Native",
    event: "CityJS Medellín 2024",
    date: "2024-10",
    description:
      "Workshop on developing smart TV applications using React Native, demonstrating how JavaScript can bridge web development with the world of smart TV apps.",
    link: "https://medellin.cityjsconf.org/workshop/3ew37izvyudurggluzokmc/",
    type: "Workshop",
  },
  {
    title: "Mastering the Big Screen: React Native for TV",
    event: "Callstack Webinar",
    date: "2024-10",
    description:
      "Webinar with Callstack covering best practices for TV app development in React Native — flexible designs, playback, content discovery, deep linking, and performance optimization.",
    link: "https://www.callstack.com/events/mastering-the-big-screen-react-native",
    type: "Webinar",
  },
  {
    title: "React Native TV Apps with Giovanni Laquidara",
    event: "Rocket Ship Podcast - Episode 046",
    date: "2024-07",
    description:
      "Discussion about TV app development with React Native, covering the unique challenges of 10-foot UI, seamless navigation, and remote control interaction.",
    link: "https://www.youtube.com/watch?v=FAaLGRlhK7M",
    type: "Podcast",
  },
  {
    title: "Extending React Native Apps to the Big Screen",
    event: "App.js 2024",
    date: "2024-05",
    description:
      "Talk at App.js conference about extending React Native apps to TV platforms.",
    link: "https://www.youtube.com/live/s0wn7qpBoB8?si=ThvFopW8pS5Ka6O-&t=12039",
    type: "Talk",
  },
  {
    title: "Creating Engaging Android TV and Fire TV Apps",
    event: "AppDevCon 2024",
    date: "2024-05",
    description:
      "Guide to creating great 10-foot UIs with Kotlin, Jetpack Compose for TV, React Native, or Flutter.",
    link: "https://appdevcon.nl/session/creating-engaging-android-tv-and-fire-tv-apps-with-native-and-cross-platform-tools/",
    type: "Talk",
  },
  {
    title: "TV Apps in React Native",
    event: "React Native London",
    date: "2024-03",
    description:
      "Building TV apps with React Native — guidelines for designing layouts and components on the big screen.",
    link: "https://www.youtube.com/watch?v=CBZTX39n2yc",
    type: "Talk",
  },
  {
    title: "Developer Experience Updates for Amazon Appstore",
    event: "devDay 2023",
    date: "2024-02",
    description:
      "New tools and features to simplify testing, submitting apps, and engaging with millions of Appstore customers.",
    link: "https://www.youtube.com/watch?v=0LRFwH_rTY0",
    type: "Talk",
  },
  {
    title: "Smart TV Game Development: Challenges and Opportunities",
    event: "Conference Talk",
    date: "2023",
    description:
      "Game development for Smart TVs — technical limits, tools, and working with Amazon Fire TV.",
    link: "https://www.youtube.com/watch?v=RtZIiNA2SRg",
    type: "Talk",
  },
  {
    title: "Creating Engaging Android TV and Fire TV Apps",
    event: "Conference Talk",
    date: "2023",
    description:
      "Introduction to guidelines and tools for Fire TV and Android TV development.",
    link: "https://www.youtube.com/watch?v=Zhlr1bsRewg",
    type: "Talk",
  },
  {
    title: "High Performance Code Sharing Between Android, iOS and Web",
    event: "Conference Talk",
    date: "2022",
    description:
      "Advantages of C++, Rust, and Kotlin for building high-performance shared libraries across platforms.",
    link: "https://www.youtube.com/watch?v=Jh9KaWir3gM",
    type: "Talk",
  },
  {
    title: "What's New with Amazon Appstore for Developers",
    event: "Droidcon London 2022",
    date: "2022-11",
    description:
      "Lightning talk on the latest Amazon Appstore updates for developers.",
    type: "Talk",
  },
  {
    title: "Amazon Appstore: Reaching Millions of Customers",
    event: "Droidcon Berlin 2022",
    date: "2022-07",
    description:
      "How Amazon Appstore reaches millions of customers on Fire TV, Fire tablets, mobile, and Windows 11.",
    type: "Talk",
  },
  {
    title: "Hello ARCore",
    event: "Codemotion Milan 2017",
    date: "2017-11",
    description:
      "Developing brand new experiences that blend digital and physical worlds with Android using Google's ARCore SDK — motion tracking, environmental understanding, and light estimation.",
    link: "https://www.slideshare.net/Codemotion/giovanni-laquidara-hello-arcore-codemotion-milan-2017",
    type: "Talk",
  },
  {
    title: "Drive Together Not the Same",
    event: "Droidcon Italy 2017",
    date: "2017-04",
    description:
      "Talk at Droidcon Italy on collaborative Android development patterns and building connected experiences.",
    link: "https://it.droidcon.com/2017/speakers/giovanni-laquidara/index.html",
    type: "Talk",
  },
  {
    title: "Join the Dart Side of Web Development",
    event: "Codemotion Rome 2015",
    date: "2015-03",
    description:
      "Exploring Dart language features — classes, constructors, asynchronous programming, and the Polymer library for building modern web apps.",
    link: "https://www.slideshare.net/slideshow/join-thedartsideofwebdevelopment2/46530600",
    type: "Talk",
  },
  {
    title: "Virtual Reality: A New World is Coming",
    event: "Todi Appy Days",
    date: "2015",
    description:
      "The resurgence of VR — how Oculus Rift and Google Cardboard are making virtual reality accessible to everyone, with new business opportunities emerging.",
    link: "https://www.appydays.it/speakers/giovanni-laquidara/",
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
