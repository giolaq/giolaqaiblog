import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talks",
  description: "Conference talks and presentations by Giovanni Laquidara on mobile development, TV apps, and more.",
};

const talks = [
  { title: "React Native, Amplified", event: "React Conf 2025", date: "2025-10",
    description: "How to use React and React Native to build for Amazon's new Vega OS — a lightweight Linux-based OS with React Native built-in.",
    link: "https://youtu.be/NKLwWf2G1-8?si=BoxZDW3E-LFb9OjA", type: "Talk" },
  { title: "Amazon's Vega OS: A New OS With React Native Built-In", event: "React Universe On Air", date: "2025-11",
    description: "Introducing Vega OS — Amazon's new lightweight Linux-based OS designed for high-performance on Fire TV, Echo Show, and Echo Hub.",
    link: "https://www.callstack.com/podcasts/amazons-vega-os-a-new-os-with-react-native-built-in", type: "Podcast" },
  { title: "React Native for TV Workshop", event: "Workshop", date: "2024-11",
    description: "A hands-on workshop guiding developers through building TV apps with React Native for Apple TV, Android TV, and Fire TV.",
    link: "https://rntv.giolaq.dev", type: "Workshop" },
  { title: "Smart TV Apps with React Native", event: "CityJS Medellín 2024", date: "2024-10",
    description: "Workshop on developing smart TV applications using React Native.",
    link: "https://medellin.cityjsconf.org/workshop/3ew37izvyudurggluzokmc/", type: "Workshop" },
  { title: "Mastering the Big Screen: React Native for TV", event: "Callstack Webinar", date: "2024-10",
    description: "Best practices for TV app development in React Native — flexible design, playback, content discovery, deep linking, performance.",
    link: "https://www.callstack.com/events/mastering-the-big-screen-react-native", type: "Webinar" },
  { title: "React Native TV Apps with Giovanni Laquidara", event: "Rocket Ship Podcast — Ep. 046", date: "2024-07",
    description: "Discussion about TV app development with React Native — 10-foot UI, seamless navigation, and remote control interaction.",
    link: "https://www.youtube.com/watch?v=FAaLGRlhK7M", type: "Podcast" },
  { title: "Extending React Native Apps to the Big Screen", event: "App.js 2024", date: "2024-05",
    description: "Talk at App.js conference about extending React Native apps to TV platforms.",
    link: "https://www.youtube.com/live/s0wn7qpBoB8?si=ThvFopW8pS5Ka6O-&t=12039", type: "Talk" },
  { title: "Creating Engaging Android TV and Fire TV Apps", event: "AppDevCon 2024", date: "2024-05",
    description: "Guide to creating great 10-foot UIs with Kotlin, Jetpack Compose for TV, React Native, or Flutter.",
    link: "https://appdevcon.nl/session/creating-engaging-android-tv-and-fire-tv-apps-with-native-and-cross-platform-tools/", type: "Talk" },
  { title: "TV Apps in React Native", event: "React Native London", date: "2024-03",
    description: "Building TV apps with React Native — guidelines for designing layouts and components on the big screen.",
    link: "https://www.youtube.com/watch?v=CBZTX39n2yc", type: "Talk" },
  { title: "Developer Experience Updates for Amazon Appstore", event: "devDay 2023", date: "2024-02",
    description: "New tools and features to simplify testing, submitting, and engaging with Appstore customers.",
    link: "https://www.youtube.com/watch?v=0LRFwH_rTY0", type: "Talk" },
  { title: "Smart TV Game Development", event: "Conference Talk", date: "2023",
    description: "Game development for Smart TVs — technical limits, tools, and working with Amazon Fire TV.",
    link: "https://www.youtube.com/watch?v=RtZIiNA2SRg", type: "Talk" },
  { title: "Creating Engaging Android TV and Fire TV Apps", event: "Conference Talk", date: "2023",
    description: "Introduction to guidelines and tools for Fire TV and Android TV development.",
    link: "https://www.youtube.com/watch?v=Zhlr1bsRewg", type: "Talk" },
  { title: "High Performance Code Sharing Between Android, iOS and Web", event: "Android Worldwide 2023", date: "2023-01",
    description: "C++, Rust, and Kotlin for high-performance shared libraries across platforms.",
    link: "https://www.youtube.com/watch?v=Jh9KaWir3gM", type: "Talk" },
  { title: "What's New with Amazon Appstore for Developers", event: "Droidcon London 2022", date: "2022-11",
    description: "Lightning talk on the latest Amazon Appstore updates for developers.", type: "Talk" },
  { title: "Expand Your Android App Beyond the Phone", event: "Droidcon Berlin 2022", date: "2022-09",
    description: "Windows Subsystem for Android + Amazon Appstore to optimise Android apps for large screens.",
    link: "https://www.droidcon.com/2022/09/29/expand-your-android-app-beyond-the-phone-with-amazon-appstore/", type: "Talk" },
  { title: "Develop a Video Editing App in 5 Simple Steps", event: "Conf42 Mobile 2022", date: "2022",
    description: "Building an Android video editing app using Huawei HMS Core Video Editor Kit.",
    link: "https://www.conf42.com/Mobile_2022_Giovanni_Laquidara_develop_video_editing_app_in_5_steps", type: "Talk" },
  { title: "The Job of Partner Engineering", event: "DevRelCon 2021", date: "2021",
    description: "The role of partner engineering — psychology, tech stacks, and soft skills.",
    link: "https://developerrelations.com/event/devrelcon-2021", type: "Talk" },
  { title: "AR + AI: Size My Luggage", event: "Droidcon Berlin 2019", date: "2019-07",
    description: "Combining ARCore with ML Kit to measure luggage size in the Tui Android app.",
    link: "https://www.droidcon.com/2019/07/03/a-real-use-case-of-practical-ar-ai-couple-size-my-luggage/?video=353345607", type: "Talk" },
  { title: "Hello ARCore", event: "Codemotion Milan 2017", date: "2017-11",
    description: "New AR experiences with Android using Google's ARCore SDK.",
    link: "https://www.slideshare.net/Codemotion/giovanni-laquidara-hello-arcore-codemotion-milan-2017", type: "Talk" },
  { title: "Virtual Reality: A New World is Coming", event: "Todi Appy Days", date: "2015",
    description: "The resurgence of VR — Oculus Rift, Cardboard, and new business opportunities.",
    link: "https://www.appydays.it/speakers/giovanni-laquidara/", type: "Talk" },
];

const typeDot: Record<string, string> = {
  Talk: "#9ece6a", Workshop: "#e0af68", Podcast: "#e8a765", Webinar: "#bb9af7",
};

export default function TalksPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 md:px-8 py-20">
      <div className="font-mono-xs">§ Talks</div>
      <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-tight leading-[0.95] max-w-[16ch]">
        Twenty talks and workshops{" "}
        <span className="italic">since 2015.</span>
      </h1>
      <p className="mt-6 max-w-[56ch] text-[15px] text-muted">
        Conferences, podcasts, and workshops, mostly about TV apps, React
        Native, and agentic AI.
      </p>

      <div className="mt-14 relative border-l border-[var(--border)] pl-8">
        {talks.map((talk, i) => (
          <div key={i} className="relative mb-10">
            <span className="absolute -left-[34px] top-3 h-2 w-2 rounded-full" style={{ background: typeDot[talk.type] || "#ffffff66", boxShadow: `0 0 8px 1px ${typeDot[talk.type] || "#fff"}` }} />
            <div className="glass-card p-6">
              <div className="font-mono-xs flex items-center gap-3">
                <span style={{ color: typeDot[talk.type] }}>[{talk.type}]</span>
                <span>{talk.date}</span>
              </div>
              <h2 className="mt-3 font-display text-[26px] leading-tight tracking-tight text-foreground">
                {talk.link ? (
                  <a href={talk.link} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--accent)]">
                    {talk.title}
                  </a>
                ) : (
                  talk.title
                )}
              </h2>
              <p className="mt-1 text-[13px] text-[var(--accent)]">{talk.event}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{talk.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
