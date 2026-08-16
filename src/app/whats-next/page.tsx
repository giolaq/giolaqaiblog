import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "What's Next",
  description:
    "Upcoming conferences, workshops, and events where you can find Giovanni Laquidara in person.",
};

type EventStatus = "Workshop" | "Speaking" | "Attending";

type UpcomingEvent = {
  name: string;
  status: EventStatus;
  date: string; // display string
  isoDate?: string; // for datetime, when a firm date is known
  location: string;
  blurb: string;
  href?: string; // internal or external details
  external?: boolean;
};

// Add new appearances here, soonest first.
const EVENTS: UpcomingEvent[] = [
  {
    name: "Londroid — The London Android Community",
    status: "Speaking",
    date: "August 27, 2026",
    isoDate: "2026-08-27",
    location: "Trainline · London",
    blurb: "Speaking at Europe's longest-running Android meetup.",
    href: "https://www.meetup.com/android/events/315804087/",
    external: true,
  },
  {
    name: "MCP Dev Summit Shanghai",
    status: "Speaking",
    date: "September 6–7, 2026",
    isoDate: "2026-09-06",
    location: "Shanghai, China",
    blurb:
      "The Linux Foundation's MCP Dev Summit, co-located with KubeCon + CloudNativeCon China.",
    href: "https://www.lfopensource.cn/mcp-dev-summit-shanghai/",
    external: true,
  },
  {
    name: "BBC Tech Meetup",
    status: "Speaking",
    date: "September 2026",
    location: "London",
    blurb: "A tech meetup with the BBC engineering community.",
  },
  {
    name: "Agent Conf 2026",
    status: "Workshop",
    date: "September 17–18, 2026",
    isoDate: "2026-09-17",
    location: "Warsaw, Poland",
    blurb:
      "Running a workshop at Agent Conf, Callstack's conference on agentic development.",
    href: "https://www.agent.sh/workshop",
    external: true,
  },
  {
    name: "reactCon · next.app devcon",
    status: "Speaking",
    date: "October 7–9, 2026",
    isoDate: "2026-10-07",
    location: "Berlin, Germany",
    blurb: "reactCon, the React Native track of next.app devcon.",
    href: "https://www.nextappcon.com/reactcon",
    external: true,
  },
  {
    name: "Napoli DevFest 2026",
    status: "Speaking",
    date: "October 17, 2026",
    isoDate: "2026-10-17",
    location: "Naples, Italy",
    blurb: "GDG Napoli's DevFest, the developers & startup fair.",
    href: "https://www.napolidevfest.it/",
    external: true,
  },
  {
    name: "AGNTCon + MCPCon North America",
    status: "Speaking",
    date: "October 22–23, 2026",
    isoDate: "2026-10-22",
    location: "San Jose, CA",
    blurb:
      "The Agentic AI Foundation's flagship North America event, under the Linux Foundation.",
  },
];

const statusColor: Record<EventStatus, string> = {
  Workshop: "#e0af68",
  Speaking: "#9ece6a",
  Attending: "#e8a765",
};

export default function WhatsNextPage() {
  const hasEvents = EVENTS.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-6 md:px-8 py-20">
      <div className="font-mono-xs">§ What&apos;s next</div>
      <h1 className="mt-2 font-display text-5xl md:text-7xl tracking-tight leading-[0.95] max-w-[16ch]">
        Come find me <span className="italic">in person.</span>
      </h1>
      <p className="mt-6 max-w-[56ch] text-[15px] text-muted">
        Conferences, workshops, and events I&apos;m heading to next. Say hi if
        you&apos;re around.
      </p>

      {hasEvents ? (
        <div className="mt-14 relative border-l border-[var(--border)] pl-8">
          {EVENTS.map((event) => {
            const card = (
              <div className="glass-card p-6">
                <div className="font-mono-xs flex flex-wrap items-center gap-3">
                  <span style={{ color: statusColor[event.status] }}>
                    [{event.status}]
                  </span>
                  {event.isoDate ? (
                    <time dateTime={event.isoDate}>{event.date}</time>
                  ) : (
                    <span>{event.date}</span>
                  )}
                  <span className="text-[var(--border-strong)]">·</span>
                  <span>{event.location}</span>
                </div>
                <h2 className="mt-3 font-display text-[26px] leading-tight tracking-tight text-foreground">
                  {event.name}
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  {event.blurb}
                </p>
                {event.href && (
                  <div className="mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-foreground">
                    <span>{event.external ? "Event site" : "Details"}</span>
                    <span aria-hidden>{event.external ? "↗" : "→"}</span>
                  </div>
                )}
              </div>
            );

            return (
              <div key={event.name} className="relative mb-10">
                <span
                  className="absolute -left-[34px] top-3 h-2 w-2 rounded-full"
                  style={{
                    background: statusColor[event.status],
                    boxShadow: `0 0 8px 1px ${statusColor[event.status]}`,
                  }}
                />
                {event.href ? (
                  event.external ? (
                    <a
                      href={event.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      {card}
                    </a>
                  ) : (
                    <Link href={event.href} className="group block">
                      {card}
                    </Link>
                  )
                ) : (
                  card
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-14 text-[15px] text-muted">
          Nothing on the calendar right now. Check back soon, or{" "}
          <Link href="/speaker" className="text-[var(--accent)] hover:underline">
            invite me to your event
          </Link>
          .
        </p>
      )}

      <div className="mt-16 flex flex-wrap items-center gap-4">
        <Link
          href="/talks"
          className="text-[13px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
        >
          Past talks &amp; workshops →
        </Link>
        <span className="text-[var(--border-strong)]">·</span>
        <Link
          href="/speaker"
          className="text-[13px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
        >
          Invite me to speak →
        </Link>
      </div>
    </div>
  );
}
