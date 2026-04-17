import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const TOKEN_URL = "https://oauth.ring.com/oauth/token";
const API_BASE = "https://api.amazonvision.com";
const HMAC_KEY = process.env.RING_HMAC_KEY || "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-signature") || "";

  // If there's an HMAC signature, this is a webhook event from Ring
  if (signature) {
    // Verify signature
    if (HMAC_KEY) {
      const expected = "sha256=" + createHmac("sha256", HMAC_KEY).update(body).digest("hex");
      if (expected !== signature) {
        console.log("RING WEBHOOK: invalid signature");
        return NextResponse.json({ error: "invalid signature" }, { status: 401 });
      }
    }
    console.log("RING WEBHOOK EVENT:", body);
    // Return 200 immediately — Ring requires this within 5 seconds
    return NextResponse.json({ status: "ok" });
  }

  // No signature — this is an OAuth code exchange
  let code: string | null = null;
  try { code = JSON.parse(body).code; } catch {}
  if (!code) code = new URLSearchParams(body).get("code");
  if (!code) code = req.nextUrl.searchParams.get("code");

  if (!code) return NextResponse.json({ error: "no_code_found" });

  // Step 1: Exchange auth code for tokens
  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: process.env.RING_CLIENT_ID || "",
      client_secret: process.env.RING_CLIENT_SECRET || "",
    }),
  });

  const tokenData = await tokenRes.json();
  console.log("RING_TOKENS", JSON.stringify(tokenData));

  if (!tokenRes.ok) return NextResponse.json({ ok: false, error: tokenData });

  const at = tokenData.access_token;

  // Step 2: Get user profile (account ID)
  const userRes = await fetch(`${API_BASE}/v1/users/me`, {
    headers: { Authorization: `Bearer ${at}` },
  });
  const userData = await userRes.json();
  const email = userData?.data?.attributes?.email || "";
  const masked = email.replace(/^(.).*(@.*)$/, "$1***$2");
  const accountId = userData?.data?.id || "";
  console.log("USER", accountId, masked);

  console.log("REFRESH_TOKEN_FOR_LOCAL", tokenData.refresh_token);

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ status: "ready", ts: new Date().toISOString() });
}

export async function PUT(req: NextRequest) { return POST(req); }
export async function PATCH(req: NextRequest) { return POST(req); }
