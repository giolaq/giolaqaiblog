import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Handle ?mode=agent on homepage
  if (pathname === "/" && url.searchParams.get("mode") === "agent") {
    return NextResponse.rewrite(new URL("/api/agent-view", request.url));
  }

  // Handle .md suffix — rewrite to markdown API
  if (pathname.endsWith(".md") && pathname !== "/index.md" && !pathname.startsWith("/auth")) {
    const cleanPath = pathname.slice(1); // remove leading /
    const rewriteUrl = new URL(`/api/markdown/${cleanPath}`, request.url);
    return NextResponse.rewrite(rewriteUrl);
  }

  // Handle Accept: text/markdown content negotiation on homepage
  const accept = request.headers.get("accept") || "";
  if (pathname === "/" && accept.includes("text/markdown")) {
    const response = NextResponse.rewrite(new URL("/index.md", request.url));
    response.headers.set("Vary", "Accept, Accept-Encoding");
    return response;
  }

  const response = NextResponse.next();

  // HTTP Link headers (RFC 8288)
  response.headers.set(
    "Link",
    [
      '</sitemap.xml>; rel="sitemap"',
      '</index.md>; rel="alternate"; type="text/markdown"',
      '</llms.txt>; rel="alternate"; type="text/plain"',
      '</.well-known/agent-card.json>; rel="describedby"; type="application/json"',
      '</.well-known/api-catalog>; rel="service-desc"; type="application/linkset+json"',
    ].join(", ")
  );

  // Add Vary header for content negotiation
  response.headers.set("Vary", "Accept, Accept-Encoding");

  // Add rate limit headers on API routes
  if (pathname.startsWith("/api/")) {
    response.headers.set("X-RateLimit-Limit", "1000");
    response.headers.set("X-RateLimit-Remaining", "999");
    response.headers.set("X-RateLimit-Reset", String(Math.floor(Date.now() / 1000) + 3600));
    response.headers.set("RateLimit-Limit", "1000");
    response.headers.set("RateLimit-Remaining", "999");
    response.headers.set("RateLimit-Reset", "3600");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
