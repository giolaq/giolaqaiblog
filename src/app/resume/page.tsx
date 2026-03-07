import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resume",
  description: `Professional experience and background of ${SITE_CONFIG.author.name}.`,
};

const experience = [
  {
    role: "Senior Developer Advocate",
    company: "Amazon",
    location: "London",
    period: "Apr 2022 — Present",
    highlights: [
      "Advocating for Amazon Appstore and Devices software and ecosystem.",
      "Amazon Open Source champion — managing open source repositories and mentoring about open source.",
      "Tech leading a team of 5, choosing the right tools and tech stack.",
      "Supporting internal engineering teams in feature prioritization and innovation.",
      "Active voice in tech conferences, meetups, and external developer blog platforms.",
      "Gathering the voice of developers from external developer communities.",
    ],
  },
  {
    role: "Senior Developer Advocate",
    company: "Huawei",
    location: "London",
    period: "Apr 2020 — Apr 2022",
    highlights: [
      "Video content to support the AI-based products of Huawei Mobile Services.",
      "Supported developers and partner companies to port their mobile apps into the Huawei Ecosystem (AppGallery/HMS) — Top 100 UK/IE apps across AI, Travel, Lifestyle, e-commerce, and VR/AR verticals.",
      "Led university activities with UK top universities — online events and kick-off live main events.",
      "Defined the annual plan for developer advocacy in the UK for local communities and events.",
      "Mentored/judged at European hackathons (HackZurich 2020/21, AppsUp, HackCambridge 21).",
      "Recruited 2 leaders to create developer communities in Italy and UK.",
    ],
  },
  {
    role: "Android Developer",
    company: "Tui Group",
    location: "London",
    period: "Jan 2018 — Apr 2020",
    highlights: [
      "Led \"configure a holiday package\" feature — design, development, API review, architecture, managing 5 feature team members.",
      "Developed Tui Digital Assistant Android app features, UI, and main booking handling user journey.",
      "Mixed ARCore with ML Kit to develop AR features for luggage sizing — presented at Droidcon Berlin, Vienna, UK, and GDG DevFest London 2019.",
      "Refactored 60% of the codebase to Kotlin applying Clean Architecture, Rx, and Android Architecture Components.",
    ],
  },
  {
    role: "Software Engineer — Mobile & XR",
    company: "Freelance",
    location: "Rome / Remote",
    period: "Mar 2016 — Dec 2017",
    highlights: [
      "Designed and developed the Android AR app for Weeshapp (Native + Unity) using RxJava2, Dagger2, Retrofit, MVP.",
      "Developed the VR app and Android Bluetooth module for Eyesync (SyncThink) — RxJava2, RxAndroid, Bluetooth.",
      "Teaching Android development. Tech Mentor at Lean Startup Program (Peekaboo).",
      "Created the Facebook Developer Circle Community in Italy.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Snapback",
    location: "Rome",
    period: "Apr 2015 — Mar 2016",
    highlights: [
      "Developed Android apps and designed technical solutions using the Android sensors stack.",
    ],
  },
  {
    role: "Startup CTO",
    company: "EasyDinner",
    location: "Rome",
    period: "Jan 2014 — Mar 2015",
    highlights: [
      "Designed a new backend. Coordinated a development team of 5 with agile processes.",
      "Developed the Android app.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Progesi / Next Spa",
    location: "Rome",
    period: "Apr 2003 — Apr 2015",
    highlights: [
      "Managed requirement analysis and software design using UML and SysML with model-based processes for defence systems (MBDA).",
      "Developed military software using Java, C++, C, and Ada 95 for MBDA and Selex.",
      "Built an automation tool in Ruby to assist development, decreasing time to development by 50%.",
    ],
  },
];

const education = [
  {
    title: "Associate Android Developer Certification",
    institution: "Google",
    year: "2018",
  },
  {
    title: "VR Master Program",
    institution: "Upload VR, Los Angeles",
    year: "2018",
  },
  {
    title: "VR Developer Nanodegree & Self-Driving Car Nanodegree & Android Developer Nanodegree",
    institution: "Udacity",
    year: "2016",
  },
  {
    title: "Bachelor's Degree in Computer Engineering",
    institution: "Universit\u00e0 di Roma Tor Vergata",
    year: "1999 — 2003",
  },
];

const skills = {
  "Languages & Tools": [
    "Kotlin", "Java", "TypeScript", "JavaScript", "C++", "C#", "Python",
    "React Native", "Dart", "Ada 95", "HTML5",
  ],
  "Frameworks & Platforms": [
    "Android SDK", "Unity", "Flutter", "A-Frame", "GearVR Framework",
    "Android Studio", "Gradle",
  ],
  "AI & ML": [
    "Claude Code", "Amazon Q", "MCP", "Stable Diffusion fine-tuning",
    "Computer Vision neural networks", "LLM APIs",
  ],
  "DevOps & Tools": [
    "Git", "GitHub Actions", "Jenkins", "Subversion",
  ],
  "Soft Skills": [
    "Public speaking", "Technical writing", "Teaching", "Leadership",
    "Community management", "Startup mentoring", "Video production",
  ],
};

const highlights = [
  {
    text: "Co-author of \"Mastering the Big Screen\" — guide about developing TV apps in React Native.",
  },
  {
    text: "Creator and maintainer of multi-TV React Native app sample.",
    link: "https://github.com/AmazonAppDev/react-native-multi-tv-app-sample",
  },
  {
    text: "Talk on using LLM assistants for software engineering.",
    link: "https://bit.ly/49FpYQx",
  },
  {
    text: "Talk at DevRelCon 2021 — \"The Job of Partner Engineering\".",
    link: "https://developerrelations.com/event/devrelcon-2021",
  },
  {
    text: "ARCore + ML Kit demo for luggage sizing in the Tui Android app — presented at Droidcon Berlin, Vienna, UK, and GDG DevFest London 2019.",
  },
  {
    text: "Codemotion conference program committee member for Mobile.",
  },
  {
    text: "Ecstasis VR — final project at Upload VR (Unity + SteamVR, avatar inverse kinematics, audio-reactive shaders).",
    link: "https://vimeo.com/234285279",
  },
  {
    text: "Speaker at Droidcon, Codemotion, App.js, CityJS, React Native London, and more.",
    link: "https://speakerdeck.com/joaobiriba",
  },
];

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-foreground">
        <span className="text-accent" aria-hidden="true">$</span> <span aria-label="Resume">cat resume.json</span>
      </h1>
      <p className="mt-2 text-sm text-muted">
        Senior Developer Advocate based in London — building bridges between
        developers and technology across mobile, TV, and XR platforms.
      </p>

      {/* Skills */}
      <section className="mt-12" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-base font-semibold text-accent">
          <span aria-hidden="true">## </span>Skills
        </h2>
        <div className="mt-4 space-y-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-medium text-muted">
                {category}
              </h3>
              <ul className="mt-2 flex flex-wrap gap-1.5" role="list" aria-label={`${category} skills`}>
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md bg-surface px-2.5 py-1 text-[11px] text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="mt-12" aria-labelledby="highlights-heading">
        <h2 id="highlights-heading" className="text-base font-semibold text-accent">
          <span aria-hidden="true">## </span>Highlights
        </h2>
        <ul className="mt-4 space-y-2" role="list">
          {highlights.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-muted"
            >
              <span className="mt-0.5 text-accent" aria-hidden="true">-</span>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {item.text}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              ) : (
                <span>{item.text}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="mt-12" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="text-base font-semibold text-accent">
          <span aria-hidden="true">## </span>Experience
        </h2>
        <div className="mt-4 space-y-6">
          {experience.map((job, i) => (
            <article key={i} className="terminal-box p-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  {job.role}
                </h3>
                <span className="text-[11px] text-muted">
                  {job.period}
                </span>
              </div>
              <p className="mt-0.5 text-xs">
                <span className="text-accent">{job.company}</span>
                <span className="text-muted"> · {job.location}</span>
              </p>
              <ul className="mt-3 space-y-1.5" role="list">
                {job.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                  >
                    <span className="mt-0.5 text-border" aria-hidden="true">-</span>
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-12" aria-labelledby="education-heading">
        <h2 id="education-heading" className="text-base font-semibold text-accent">
          <span aria-hidden="true">## </span>Education
        </h2>
        <div className="mt-4 space-y-3">
          {education.map((edu, i) => (
            <article key={i} className="terminal-box p-4">
              <h3 className="text-sm font-semibold text-foreground">
                {edu.title}
              </h3>
              <p className="mt-0.5 text-xs text-muted">
                <span className="text-accent">{edu.institution}</span> · {edu.year}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
