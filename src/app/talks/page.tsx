import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talks",
  description:
    "Conference talks and presentations by Giovanni Laquidara on mobile development, TV apps, and more.",
};

const talks = [
  {
    title: "React Native, Amplified",
    event: "React Conf 2025",
    date: "2025-10",
    description:
      "How to use React and React Native to build for Amazon's new Vega OS — a lightweight Linux-based operating system with React Native built-in, designed for high-performance on devices like Fire TV, Echo Show, and Echo Hub.",
    link: "https://youtu.be/NKLwWf2G1-8?si=BoxZDW3E-LFb9OjA",
    type: "Talk",
  },
  {
    title: "Amazon's Vega OS: A New OS With React Native Built-In",
    event: "React Universe On Air (Callstack Podcast)",
    date: "2025-11",
    description:
      "Introducing Vega OS — Amazon's new lightweight Linux-based operating system with React Native built-in, designed for high-performance on low-end media devices like Fire TV, Echo Show, and Echo Hub.",
    link: "https://www.callstack.com/podcasts/amazons-vega-os-a-new-os-with-react-native-built-in",
    type: "Podcast",
  },
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
    event: "Android Worldwide 2023",
    date: "2023-01",
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
    title: "Expand Your Android App Beyond the Phone with Amazon Appstore",
    event: "Droidcon Berlin 2022",
    date: "2022-09",
    description:
      "How to use Windows Subsystem for Android and Amazon Appstore to optimise Android apps for large screens — bringing apps to desktop with responsive UIs.",
    link: "https://www.droidcon.com/2022/09/29/expand-your-android-app-beyond-the-phone-with-amazon-appstore/",
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
    title: "Develop a Video Editing App in 5 Simple Steps",
    event: "Conf42 Mobile 2022",
    date: "2022",
    description:
      "Building an Android video editing app using Huawei HMS Core Video Editor Kit — custom UI, stickers, AI filters, and more in just five steps.",
    link: "https://www.conf42.com/Mobile_2022_Giovanni_Laquidara_develop_video_editing_app_in_5_steps",
    type: "Talk",
  },
  {
    title: "The Job of Partner Engineering",
    event: "DevRelCon 2021",
    date: "2021",
    description:
      "Exploring the role of partner engineering — mixing psychology, tech stacks, and soft skills to help partners succeed with your platform.",
    link: "https://developerrelations.com/event/devrelcon-2021",
    type: "Talk",
  },
  {
    title: "Adapt Your Android App for the HMS New World",
    event: "DevFest Italia 2020",
    date: "2020",
    description:
      "How to port Android apps into the Huawei Mobile Services ecosystem (AppGallery/HMS) and adapt to the new HMS world.",
    type: "Talk",
  },
  {
    title: "AR + AI: Size My Luggage — A Practical Use Case",
    event: "Droidcon Berlin 2019",
    date: "2019-07",
    description:
      "Combining ARCore with ML Kit to build an AR feature that measures luggage size in the Tui Android app. Also presented at Droidcon Vienna, Droidcon UK, and GDG DevFest London 2019.",
    link: "https://www.droidcon.com/2019/07/03/a-real-use-case-of-practical-ar-ai-couple-size-my-luggage/?video=353345607",
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
    title: "Drive Together Not the Same",
    event: "Droidcon Italy 2016",
    date: "2016-04",
    description:
      "Talk on building natural user interfaces and connected Android experiences using the sensors stack.",
    link: "https://it.droidcon.com/2016/speakers/giovanni-laquidara/index.html",
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

const typeColors: Record<string, string> = {
  Talk: "text-term-green",
  Workshop: "text-term-yellow",
  Podcast: "text-accent",
  Webinar: "text-[#bb9af7]",
};

export default function TalksPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-foreground">
        <span className="text-accent">$</span> ls talks/
      </h1>
      <p className="mt-2 text-sm text-muted">
        Conference talks, podcasts, and workshops I&apos;ve been part of.
      </p>

      <div className="mt-10 space-y-4">
        {talks.map((talk, index) => (
          <div
            key={index}
            className="terminal-box p-5 transition-all hover:border-accent"
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium ${typeColors[talk.type] || "text-muted"}`}>
                [{talk.type}]
              </span>
              <span className="text-xs text-muted">
                {talk.date}
              </span>
            </div>

            <h2 className="mt-2 text-sm font-semibold text-foreground">
              {talk.link ? (
                <a
                  href={talk.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {talk.title}
                </a>
              ) : (
                talk.title
              )}
            </h2>

            <p className="mt-0.5 text-xs text-accent">
              {talk.event}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-muted">
              {talk.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
