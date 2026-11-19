import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const fontData = await readFile(
    join(process.cwd(), "public/fonts/JetBrainsMono-Bold.ttf")
  );

  const title = post?.title ?? slug;
  const tags = post?.tags ?? [];
  const readingTime = post?.readingTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1a1b26",
          fontFamily: "JetBrains Mono",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: 16,
              color: "#565869",
              marginBottom: 24,
            }}
          >
            <span style={{ color: "#e8845c" }}>$</span>
            <span style={{ color: "#73daca" }}>cat</span>
            <span>{slug}.md</span>
          </div>

          <div
            style={{
              fontSize: title.length > 60 ? 32 : 40,
              fontWeight: 700,
              color: "#c0caf5",
              lineHeight: 1.3,
              maxWidth: "90%",
            }}
          >
            {title}
          </div>

          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: 24,
              }}
            >
              {tags.slice(0, 5).map((tag) => (
                <div
                  key={tag}
                  style={{
                    backgroundColor: "#24283b",
                    color: "#e8845c",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    fontSize: 14,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px dashed #3b3d52",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: 18, color: "#e8845c", fontWeight: 700 }}>
              Giovanni Laquidara
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: 14,
              color: "#565869",
            }}
          >
            {readingTime && <span>{readingTime}</span>}
            <span>giolaq.dev</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "JetBrains Mono",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
