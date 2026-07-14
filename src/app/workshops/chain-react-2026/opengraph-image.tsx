import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Past the Vibes: Build an Agent Harness for Your React Native App — Chain React 2026, July 29, Portland OR";

export default async function OGImage() {
  const fontData = await readFile(
    join(process.cwd(), "public/fonts/JetBrainsMono-Bold.ttf")
  );
  const avatar = await readFile(join(process.cwd(), "public/avatar.jpg"));
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;
  const kourtney = await readFile(join(process.cwd(), "public/kourtney.jpg"));
  const kourtneySrc = `data:image/jpeg;base64,${kourtney.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#031826",
          backgroundImage:
            "radial-gradient(90% 120% at 85% 20%, #0a3352 0%, #031826 60%)",
          fontFamily: "JetBrains Mono",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {/* amber corner glow */}
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -120,
            width: 340,
            height: 340,
            borderRadius: 340,
            backgroundColor: "#e8a765",
            opacity: 0.14,
            filter: "blur(20px)",
          }}
        />

        {/* left: text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 760,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#9ea5b4",
              fontSize: 22,
              letterSpacing: 3,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: "#e8a765",
              }}
            />
            CHAIN REACT 2026 · WORKSHOP
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div style={{ color: "#e8a765", fontSize: 40, fontWeight: 700 }}>
              Past the Vibes
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 52,
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Build an Agent Harness for Your React Native App
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "#9ea5b4",
              fontSize: 24,
            }}
          >
            JULY 29 · THE ARMORY · PORTLAND, OR
          </div>
        </div>

        {/* right: faces */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            gap: 26,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={avatarSrc}
              width={210}
              height={210}
              style={{
                borderRadius: 210,
                border: "6px solid #e8a765",
                objectFit: "cover",
              }}
            />
            <img
              src={kourtneySrc}
              width={210}
              height={210}
              style={{
                borderRadius: 210,
                border: "6px solid #e8a765",
                objectFit: "cover",
                marginLeft: -42,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ color: "#ffffff", fontSize: 23, fontWeight: 700 }}>
              Giovanni Laquidara
            </div>
            <div style={{ color: "#ffffff", fontSize: 23, fontWeight: 700 }}>
              &amp; Kourtney Meiss
            </div>
            <div style={{ color: "#9ea5b4", fontSize: 17, marginTop: 4 }}>
              giolaq.dev
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: fontData, style: "normal", weight: 700 },
      ],
    }
  );
}
