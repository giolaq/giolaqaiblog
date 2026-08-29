import { NextRequest, NextResponse } from "next/server";

// Log every single request that hits /api/ring/* to help debug
export async function POST(req: NextRequest) {
  const body = await req.text();
  console.log("RING CATCHALL POST:", req.url, body);
  return NextResponse.json({ caught: true, url: req.url, body });
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ caught: true, url: req.url });
}
