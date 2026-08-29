import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const fontData = await readFile(
    join(process.cwd(), "public/fonts/JetBrainsMono-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1a1b26",
          fontFamily: "JetBrains Mono",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px dashed #3b3d52",
            borderRadius: "12px",
            padding: "60px 80px",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#e8845c",
              marginBottom: 16,
            }}
          >
            Giovanni Laquidara
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#9ca0b0",
              marginBottom: 24,
            }}
          >
            Developer Advocate & Builder
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#565869",
            }}
          >
            giolaq.dev
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
