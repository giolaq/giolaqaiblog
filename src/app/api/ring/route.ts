import { NextRequest, NextResponse } from "next/server";

const TOKEN_URL = "https://oauth.ring.com/oauth/token";

export async function POST(req: NextRequest) {
  const body = await req.text();

  let code: string | null = null;
  try { code = JSON.parse(body).code; } catch {}
  if (!code) code = new URLSearchParams(body).get("code");
  if (!code) code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "no_code_found" });
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: process.env.RING_CLIENT_ID || "",
    client_secret: process.env.RING_CLIENT_SECRET || "",
  });

  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const tokenData = await tokenRes.json();
  console.log("RING_TOKENS", JSON.stringify(tokenData));
  return NextResponse.json({ tokens: tokenData, ok: tokenRes.ok, ts: new Date().toISOString() });
}

export async function GET() {
  return NextResponse.json({ status: "ready", ts: new Date().toISOString() });
}

export async function PUT(req: NextRequest) { return POST(req); }
export async function PATCH(req: NextRequest) { return POST(req); }
