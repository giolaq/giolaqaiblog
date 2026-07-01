import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;

  response.headers.set(
    "Link",
    [
      '</sitemap.xml>; rel="sitemap"',
      '</index.md>; rel="alternate"; type="text/markdown"',
      '</llms.txt>; rel="alternate"; type="text/plain"',
      '</.well-known/agent-card.json>; rel="describedby"; type="application/json"',
    ].join(", ")
  );

  if (url.pathname === "/" && url.searchParams.get("mode") === "agent") {
    return NextResponse.rewrite(new URL("/api/agent-view", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
