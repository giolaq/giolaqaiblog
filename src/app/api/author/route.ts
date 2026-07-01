import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/constants";

export async function GET() {
  const author = {
    name: SITE_CONFIG.author.name,
    role: SITE_CONFIG.author.role,
    bio: SITE_CONFIG.author.bio,
    url: SITE_CONFIG.url,
    avatar: `${SITE_CONFIG.url}${SITE_CONFIG.author.avatar}`,
    expertise: [
      "Agentic AI",
      "Mobile Development",
      "TV Applications",
      "React Native",
      "Cross-platform Development",
      "Developer Advocacy",
    ],
    social: SITE_CONFIG.social,
  };

  return NextResponse.json(author, {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Type": "application/json",
    },
  });
}
