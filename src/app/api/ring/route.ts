import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync } from "fs";

const TOKEN_URL = "https://oauth.ring.com/oauth/token";
const API_BASE = "https://api.amazonvision.com";
const TOKEN_FILE = "/tmp/ring-tokens.json";
const HMAC_KEY = process.env.RING_HMAC_KEY || "";

// Persist tokens to /tmp (survives within same serverless instance)
// and also update env-based fallback
function saveTokens(tokens: { access_token: string; refresh_token: string }) {
  writeFileSync(TOKEN_FILE, JSON.stringify(tokens));
  console.log("TOKENS_SAVED to /tmp");
  console.log("NEW_REFRESH_TOKEN", tokens.refresh_token);
}

export function getStoredRefreshToken(): string {
  // Try /tmp first (freshest), fall back to env var
  if (existsSync(TOKEN_FILE)) {
    try {
      const data = JSON.parse(readFileSync(TOKEN_FILE, "utf-8"));
      if (data.refresh_token) return data.refresh_token;
    } catch {}
  }
  return process.env.RING_REFRESH_TOKEN || "";
}

export async function refreshAccessToken(): Promise<{ access_token: string; refresh_token: string } | null> {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) return null;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Homie/1.0" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.RING_CLIENT_ID || "",
      client_secret: process.env.RING_CLIENT_SECRET || "",
    }),
  });

  if (!res.ok) {
    console.log("TOKEN_REFRESH_ERROR", res.status, await res.text());
    return null;
  }

  const data = await res.json();
  const tokens = { access_token: data.access_token, refresh_token: data.refresh_token };
  saveTokens(tokens);
  return tokens;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-signature") || "";

  // Webhook event from Ring (has HMAC signature)
  if (signature) {
    if (HMAC_KEY) {
      const { createHmac } = await import("crypto");
      const expected = "sha256=" + createHmac("sha256", HMAC_KEY).update(body).digest("hex");
      if (expected !== signature) {
        console.log("RING WEBHOOK: invalid signature");
        return NextResponse.json({ error: "invalid signature" }, { status: 401 });
      }
    }
    console.log("RING WEBHOOK EVENT:", body);
    return NextResponse.json({ status: "ok" });
  }

  // OAuth code exchange
  let code: string | null = null;
  try { code = JSON.parse(body).code; } catch {}
  if (!code) code = new URLSearchParams(body).get("code");
  if (!code) code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.json({ error: "no_code_found" });

  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Homie/1.0" },
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

  // Save tokens so the link endpoint can use them
  saveTokens({ access_token: tokenData.access_token, refresh_token: tokenData.refresh_token });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ status: "ready", ts: new Date().toISOString() });
}

export async function PUT(req: NextRequest) { return POST(req); }
export async function PATCH(req: NextRequest) { return POST(req); }
