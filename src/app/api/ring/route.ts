import { NextRequest, NextResponse } from "next/server";

const TOKEN_URL = "https://oauth.ring.com/oauth/token";
const CLIENT_ID = "Homie_KA4r6pAEeTinK9gu1Anit";
const CLIENT_SECRET = "lf0iTuRVPr7E4GjHvqays1nr1Kh766h4C9kB_OBgOG2FVv89e6hbkpN42-l-";

// In-memory store (persists for the life of the serverless function)
let lastResult: Record<string, unknown> | null = null;
let lastRawRequest: string | null = null;

export async function POST(req: NextRequest) {
  const body = await req.text();
  lastRawRequest = `${req.method} ${req.url}\nHeaders: ${JSON.stringify(Object.fromEntries(req.headers))}\nBody: ${body}`;
  console.log("Ring token exchange POST:", lastRawRequest);

  // Try to extract auth code from JSON, form-encoded, or query
  let code: string | null = null;
  try { code = JSON.parse(body).code; } catch {}
  if (!code) code = new URLSearchParams(body).get("code");
  if (!code) code = req.nextUrl.searchParams.get("code");

  if (!code) {
    lastResult = { error: "no_code_found", raw_body: body, timestamp: new Date().toISOString() };
    return NextResponse.json(lastResult, { status: 200 });
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
  lastResult = { ...tokenData, timestamp: new Date().toISOString(), status_code: tokenRes.status };

  return NextResponse.json(lastResult);
}

export async function GET() {
  const html = `<html><body style="font-family:monospace;padding:2em">
<h1>Ring Token Exchange</h1>
<h2>Last Result</h2>
<pre>${lastResult ? JSON.stringify(lastResult, null, 2) : "No requests received yet. Remove staging user and re-authorize."}</pre>
<h2>Last Raw Request</h2>
<pre>${lastRawRequest || "None"}</pre>
<p>Refresh this page after authorizing in the Ring Developer Portal.</p>
</body></html>`;
  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
