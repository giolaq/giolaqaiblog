import { NextRequest, NextResponse } from "next/server";

const TOKEN_URL = "https://oauth.ring.com/oauth/token";
const CLIENT_ID = "Homie_KA4r6pAEeTinK9gu1Anit";
const CLIENT_SECRET = "lf0iTuRVPr7E4GjHvqays1nr1Kh766h4C9kB_OBgOG2FVv89e6hbkpN42-l-";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const url = req.url;
  const headers = Object.fromEntries(req.headers);
  const log = { timestamp: new Date().toISOString(), method: "POST", url, headers, body };

  // Try to extract auth code
  let code: string | null = null;
  try { code = JSON.parse(body).code; } catch {}
  if (!code) code = new URLSearchParams(body).get("code");
  if (!code) code = req.nextUrl.searchParams.get("code");

  if (!code) {
    // Return 200 so Ring doesn't retry, and include everything we received for debugging
    return NextResponse.json({ received: log, error: "no_code_found" });
  }

  // Exchange for tokens
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const tokenData = await tokenRes.json();
  return NextResponse.json({ tokens: tokenData, status_code: tokenRes.status });
}

// Accept ANY method so we can see what Ring sends
export async function GET(req: NextRequest) {
  return NextResponse.json({ status: "waiting", message: "POST your Ring auth code here", ts: new Date().toISOString() });
}

export async function PUT(req: NextRequest) {
  return POST(req);
}

export async function PATCH(req: NextRequest) {
  return POST(req);
}
