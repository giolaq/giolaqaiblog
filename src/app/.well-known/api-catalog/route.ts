import { NextResponse } from "next/server";

export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: "https://giolaq.dev/",
        item: [
          {
            href: "https://giolaq.dev/openapi.json",
            type: "application/openapi+json;version=3.1",
            title: "giolaq.dev Blog API",
          },
        ],
      },
    ],
  };

  return NextResponse.json(catalog, {
    headers: {
      "Content-Type":
        'application/linkset+json;profile="https://www.rfc-editor.org/info/rfc9727"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
