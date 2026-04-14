import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const API_BASE = "https://api.amazonvision.com";
const TOKEN_URL = "https://oauth.ring.com/oauth/token";
const VALIDATION_WINDOW_MS = 600_000; // 10 minutes

function computeNonce(time: string, accountId: string, hmacKey: string): string {
  const payload = `${time}:${accountId}`;
  const mac = createHmac("sha256", hmacKey).update(payload).digest();
  return mac.toString("base64url"); // URL-safe, no padding
}

export async function GET(req: NextRequest) {
  const nonce = req.nextUrl.searchParams.get("nonce");
  const time = req.nextUrl.searchParams.get("time");

  if (!nonce || !time) {
    return NextResponse.json({ error: "missing nonce or time" }, { status: 400 });
  }

  // Freshness check
  const delta = Date.now() - parseInt(time);
  if (delta > VALIDATION_WINDOW_MS || delta < 0) {
    return NextResponse.json({ error: "link expired or invalid timestamp" }, { status: 400 });
  }

  const hmacKey = process.env.RING_HMAC_KEY || "";
  const clientId = process.env.RING_CLIENT_ID || "";
  const clientSecret = process.env.RING_CLIENT_SECRET || "";

  // Get a fresh access token
  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.RING_REFRESH_TOKEN || "",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    console.log("TOKEN_ERROR", err);
    return NextResponse.json({ error: "token refresh failed" }, { status: 500 });
  }

  const { access_token, refresh_token: newRefresh } = await tokenRes.json();
  console.log("NEW_REFRESH_TOKEN", newRefresh);

  // Get account ID
  const userRes = await fetch(`${API_BASE}/v1/users/me`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const userData = await userRes.json();
  const accountId = userData?.data?.id;

  if (!accountId) {
    return NextResponse.json({ error: "could not get account ID" }, { status: 500 });
  }

  // Verify nonce
  const computed = computeNonce(time, accountId, hmacKey);
  const valid = computed.length === nonce.length &&
    timingSafeEqual(Buffer.from(computed), Buffer.from(nonce));

  if (!valid) {
    console.log("NONCE_MISMATCH", { computed, received: nonce });
    return NextResponse.json({ error: "nonce mismatch" }, { status: 403 });
  }

  // POST - confirm account link
  const postRes = await fetch(`${API_BASE}/v1/accounts/me/app-integrations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nonce }),
  });
  const postData = await postRes.json().catch(() => ({}));
  console.log("POST_INTEGRATION", postRes.status, JSON.stringify(postData));

  if (!postRes.ok) {
    return NextResponse.json({ error: "POST integration failed", detail: postData }, { status: postRes.status });
  }

  // PATCH - complete integration
  const patchRes = await fetch(`${API_BASE}/v1/accounts/me/app-integrations`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "completed" }),
  });
  const patchData = await patchRes.json().catch(() => ({}));
  console.log("PATCH_INTEGRATION", patchRes.status, JSON.stringify(patchData));

  return NextResponse.json({
    success: true,
    message: "Account linked! Your Ring devices are now accessible to Homie.",
    integration: patchData,
  });
}
