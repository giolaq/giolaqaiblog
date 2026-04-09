import { NextRequest, NextResponse } from "next/server";

const TOKEN_URL = "https://oauth.ring.com/oauth/token";
const CLIENT_ID = "Homie_KA4r6pAEeTinK9gu1Anit";
const CLIENT_SECRET = "lf0iTuRVPr7E4GjHvqays1nr1Kh766h4C9kB_OBgOG2FVv89e6hbkpN42-l-";

export async function POST(req: NextRequest) {
  const body = await req.text();
  console.log("Ring token exchange POST:", body);

  // Try to extract auth code from JSON, form-encoded, or query
  let code: string | null = null;
  try { code = JSON.parse(body).code; } catch {}
  if (!code) code = new URLSearchParams(body).get("code");
  if (!code) code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "no code", body }, { status: 400 });
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

  if (!tokenRes.ok) {
    return NextResponse.json({ error: "token_exchange_failed", details: tokenData }, { status: tokenRes.status });
  }

  // Return tokens (you'll copy these to ~/.homie/ring-credentials.json)
  return NextResponse.json({
    status: "success",
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expires_in: tokenData.expires_in,
  });
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (code) {
    // Redirect to POST handler logic
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
    const html = `<html><body><h1>Ring Token Exchange</h1><pre>${JSON.stringify(tokenData, null, 2)}</pre><p>Copy the refresh_token above.</p></body></html>`;
    return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
  }

  return new NextResponse("<html><body><h1>Ring Token Exchange</h1><p>Waiting for Ring auth code...</p></body></html>", {
    headers: { "Content-Type": "text/html" },
  });
}
