import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BootSequence from "@/components/BootSequence";
import WebMCP from "@/components/WebMCP";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllPosts, getAllTags } from "@/lib/posts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: "@giolaq",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <html lang="en" className="dark">
      <GoogleAnalytics gaId="G-SGTFTP5C6W" />
      <body className="antialiased bg-background text-foreground">
        <WebMCP posts={posts} tags={tags} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
        <BootSequence>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </BootSequence>
      </body>
    </html>
  );
}
