import { NextResponse } from "next/server";

export async function GET() {
  const agentCard = {
    name: "Giovanni Laquidara",
    description:
      "Personal website and developer blog — technical writing on agentic AI, mobile, TV apps, and React Native.",
    url: "https://giolaq.dev",
    version: "1.0.0",
    capabilities: {
      streaming: false,
      pushNotifications: false,
    },
    skills: [
      {
        id: "blog-posts",
        name: "Blog Posts",
        description:
          "Technical articles about agentic AI, mobile development, TV apps, and emerging technologies.",
        endpoint: "https://giolaq.dev/api/posts",
      },
      {
        id: "speaker-info",
        name: "Speaker Info",
        description:
          "Conference talks and speaking engagements by Giovanni Laquidara.",
        endpoint: "https://giolaq.dev/talks",
      },
    ],
    provider: {
      organization: "Giovanni Laquidara",
      url: "https://giolaq.dev",
    },
    authentication: {
      schemes: ["none"],
    },
    defaultInputModes: ["text/plain"],
    defaultOutputModes: ["application/json", "text/plain"],
  };

  return NextResponse.json(agentCard, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
