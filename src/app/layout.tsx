import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoBackdrop from "@/components/VideoBackdrop";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [{ url: `${SITE_CONFIG.url}/avatar.png`, width: 400, height: 400 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: "@giolaq",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Fonts: Instrument Serif (display) + Inter (body) + JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <GoogleAnalytics gaId="G-SGTFTP5C6W" />
      <body className="antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: SITE_CONFIG.name,
                url: SITE_CONFIG.url,
                description: SITE_CONFIG.description,
                author: {
                  "@type": "Person",
                  name: SITE_CONFIG.author.name,
                  url: SITE_CONFIG.url,
                },
                speakable: {
                  "@type": "SpeakableSpecification",
                  cssSelector: ["h1", ".hero-subtitle", "[data-speakable]"],
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "giolaq.dev",
                url: SITE_CONFIG.url,
                logo: `${SITE_CONFIG.url}/avatar.png`,
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "professional",
                  url: SITE_CONFIG.social.linkedin,
                  email: "glaquidara@gmail.com",
                },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "London",
                  addressCountry: "GB",
                },
                sameAs: [
                  SITE_CONFIG.social.github,
                  SITE_CONFIG.social.twitter,
                  SITE_CONFIG.social.linkedin,
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "giolaq.dev API",
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Web",
                url: `${SITE_CONFIG.url}/api/posts`,
                description:
                  "Public read-only API for blog posts and author information on giolaq.dev.",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.url },
                  { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_CONFIG.url}/blog` },
                  { "@type": "ListItem", position: 3, name: "Developers", item: `${SITE_CONFIG.url}/developers` },
                  { "@type": "ListItem", position: 4, name: "About", item: `${SITE_CONFIG.url}/about` },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is giolaq.dev?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "giolaq.dev is the personal website and technical blog of Giovanni Laquidara, a Senior Developer Advocate at Amazon. It covers agentic AI, mobile development, TV apps, and React Native.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does giolaq.dev have an API?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. giolaq.dev exposes a free, read-only JSON API at /api/posts and /api/author. No authentication is required. The full OpenAPI spec is at /openapi.json.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How can AI agents integrate with giolaq.dev?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "AI agents can discover giolaq.dev through /llms.txt, /.well-known/agent-card.json, /.well-known/mcp/server-card.json, or by appending ?mode=agent to the homepage for a structured JSON view.",
                    },
                  },
                ],
              },
            ]),
          }}
        />

        {/* Cinematic background — sits behind everything on every page */}
        <VideoBackdrop />

        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
