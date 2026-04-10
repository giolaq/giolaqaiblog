import { NextRequest, NextResponse } from "next/server";

const TOKEN_URL = "https://oauth.ring.com/oauth/token";

let lastTokens: unknown = null;

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
  lastTokens = { tokens: tokenData, ok: tokenRes.ok, ts: new Date().toISOString() };

  return NextResponse.json({ received: true, ok: tokenRes.ok });
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key === process.env.RING_FETCH_SECRET && lastTokens) {
    const result = lastTokens;
    lastTokens = null;
    return NextResponse.json(result);
  }
  return NextResponse.json({ status: "waiting", ts: new Date().toISOString() });
}

export async function PUT(req: NextRequest) { return POST(req); }
export async function PATCH(req: NextRequest) { return POST(req); }
