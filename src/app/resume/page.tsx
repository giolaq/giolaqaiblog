import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resume",
  description: `Professional experience and background of ${SITE_CONFIG.author.name}.`,
};

const experience = [
  { role: "Senior Developer Advocate", company: "Amazon", location: "London", period: "Apr 2022 — Present",
    highlights: [
      "Advocating for Amazon Appstore and Devices software and ecosystem.",
      "Amazon Open Source champion — managing open source repositories and mentoring about open source.",
      "Tech leading a team of 5, choosing the right tools and tech stack.",
      "Supporting internal engineering teams in feature prioritization and innovation.",
      "Active voice in tech conferences, meetups, and external developer blog platforms.",
      "Gathering the voice of developers from external developer communities.",
    ],
  },
  { role: "Senior Developer Advocate", company: "Huawei", location: "London", period: "Apr 2020 — Apr 2022",
    highlights: [
      "Video content to support the AI-based products of Huawei Mobile Services.",
      "Supported developers and partner companies to port their mobile apps into the Huawei Ecosystem (AppGallery/HMS).",
      "Led university activities with UK top universities — online events and kick-off live main events.",
      "Defined the annual plan for developer advocacy in the UK for local communities and events.",
      "Mentored/judged at European hackathons (HackZurich 2020/21, AppsUp, HackCambridge 21).",
      "Recruited 2 leaders to create developer communities in Italy and UK.",
    ],
  },
  { role: "Android Developer", company: "Tui Group", location: "London", period: "Jan 2018 — Apr 2020",
    highlights: [
      "Led \"configure a holiday package\" feature — design, dev, API, architecture, managing 5 engineers.",
      "Developed Tui Digital Assistant Android app features, UI, and main booking handling.",
      "Mixed ARCore with ML Kit to develop AR features for luggage sizing — presented at Droidcon Berlin, Vienna, UK, and GDG DevFest London 2019.",
      "Refactored 60% of the codebase to Kotlin applying Clean Architecture, Rx, and Android Architecture Components.",
    ],
  },
  { role: "Software Engineer — Mobile & XR", company: "Freelance", location: "Rome / Remote", period: "Mar 2016 — Dec 2017",
    highlights: [
      "Designed and developed the Android AR app for Weeshapp (Native + Unity) using RxJava2, Dagger2, Retrofit, MVP.",
      "Developed the VR app and Android Bluetooth module for Eyesync (SyncThink).",
      "Teaching Android development. Tech Mentor at Lean Startup Program (Peekaboo).",
      "Created the Facebook Developer Circle Community in Italy.",
    ],
  },
  { role: "Senior Software Engineer", company: "Snapback", location: "Rome", period: "Apr 2015 — Mar 2016",
    highlights: ["Developed Android apps and designed technical solutions using the Android sensors stack."],
  },
  { role: "Startup CTO", company: "EasyDinner", location: "Rome", period: "Jan 2014 — Mar 2015",
    highlights: [
      "Designed a new backend. Coordinated a development team of 5 with agile processes.",
      "Developed the Android app.",
    ],
  },
  { role: "Software Engineer", company: "Progesi / Next Spa", location: "Rome", period: "Apr 2003 — Apr 2015",
    highlights: [
      "Managed requirement analysis and software design using UML and SysML for defence systems (MBDA).",
      "Developed military software using Java, C++, C, and Ada 95 for MBDA and Selex.",
      "Built an automation tool in Ruby to assist development, decreasing time to development by 50%.",
    ],
  },
];

const education = [
  { title: "Associate Android Developer Certification", institution: "Google", year: "2018" },
  { title: "VR Master Program", institution: "Upload VR, Los Angeles", year: "2018" },
  { title: "VR Developer & Self-Driving Car & Android Developer Nanodegrees", institution: "Udacity", year: "2016" },
  { title: "Bachelor's Degree in Computer Engineering", institution: "Università di Roma Tor Vergata", year: "1999 — 2003" },
];

const skills = {
  "Languages & Tools": ["Kotlin","Java","TypeScript","JavaScript","C++","C#","Python","React Native","Dart","Ada 95","HTML5"],
  "Frameworks & Platforms": ["Android SDK","Unity","Flutter","A-Frame","GearVR Framework","Android Studio","Gradle"],
  "AI & ML": ["Claude Code","Amazon Q","MCP","Stable Diffusion fine-tuning","Computer Vision neural networks","LLM APIs"],
  "DevOps & Tools": ["Git","GitHub Actions","Jenkins","Subversion"],
  "Soft Skills": ["Public speaking","Technical writing","Teaching","Leadership","Community management","Startup mentoring","Video production"],
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 md:px-8 py-20">
      <div className="font-mono-xs">§ Resume</div>
      <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-tight leading-[0.95] max-w-[16ch]">
        Fifteen years, <em className="not-italic text-muted italic">one through-line.</em>
      </h1>
      <p className="mt-6 max-w-[56ch] text-[15px] text-muted">
        Senior Developer Advocate based in London — building bridges between
        developers and technology across mobile, TV, and XR platforms.
      </p>

      <section className="mt-20">
        <div className="font-mono-xs">§ 01 — Skills</div>
        <div className="mt-6 space-y-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-[11px] uppercase tracking-[0.16em] text-muted">{category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="rounded-full border border-[--border] bg-white/[0.02] px-3 py-1 text-[12.5px] text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="font-mono-xs">§ 02 — Experience</div>
        <div className="mt-8 relative border-l border-[--border] pl-8">
          {experience.map((job, i) => (
            <div key={i} className="relative mb-12">
              <span className="absolute -left-[34px] top-2 h-2 w-2 rounded-full bg-[--accent]" style={{ boxShadow: "0 0 8px 1px var(--accent)" }} />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-display text-2xl tracking-tight text-foreground">{job.role}</h3>
                <span className="font-mono-xs">{job.period}</span>
              </div>
              <p className="mt-1 text-[13px]">
                <span className="text-foreground">{job.company}</span>
                <span className="text-muted"> · {job.location}</span>
              </p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-3 text-[14px] leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-3 shrink-0 bg-[--border-strong]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="font-mono-xs">§ 03 — Education</div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {education.map((edu, i) => (
            <div key={i} className="glass-card p-5">
              <h3 className="font-display text-[22px] leading-tight tracking-tight text-foreground">{edu.title}</h3>
              <p className="mt-2 text-[13px] text-muted">
                <span className="text-foreground">{edu.institution}</span> · {edu.year}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
