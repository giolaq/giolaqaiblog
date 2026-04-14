import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api.amazonvision.com";
const TOKEN_URL = "https://oauth.ring.com/oauth/token";

export async function GET(req: NextRequest) {
  const nonce = req.nextUrl.searchParams.get("nonce");
  const time = req.nextUrl.searchParams.get("time");

  if (!nonce || !time) {
    return NextResponse.json({ error: "missing nonce or time" }, { status: 400 });
  }

  // Freshness check
  const delta = Date.now() - parseInt(time);
  if (delta > 600_000 || delta < 0) {
    return NextResponse.json({ error: "link expired" }, { status: 400 });
  }

  const clientId = process.env.RING_CLIENT_ID || "";
  const clientSecret = process.env.RING_CLIENT_SECRET || "";
  const refreshToken = process.env.RING_REFRESH_TOKEN || "";

  // Get fresh access token
  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!tokenRes.ok) {
    console.log("TOKEN_ERROR", await tokenRes.text());
    return NextResponse.json({ error: "token refresh failed" }, { status: 500 });
  }

  const { access_token, refresh_token: newRefresh } = await tokenRes.json();
  console.log("NEW_REFRESH_TOKEN", newRefresh);

  // Get user profile for account_identifier
  const userRes = await fetch(`${API_BASE}/v1/users/me`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const userData = await userRes.json();
  const email = userData?.data?.attributes?.email || "";
  // Mask email for privacy
  const masked = email.replace(/^(.).*(@.*)$/, "$1***$2");

  console.log("ACCOUNT_LINK", { nonce, time, masked });

  // POST - confirm account link with nonce
  const postRes = await fetch(`${API_BASE}/v1/accounts/me/app-integrations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      account_identifier: masked,
      nonce,
    }),
  });
  const postData = await postRes.json().catch(() => ({}));
  console.log("POST_RESULT", postRes.status, JSON.stringify(postData));

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
  console.log("PATCH_RESULT", patchRes.status, JSON.stringify(patchData));

  return NextResponse.json({
    success: true,
    message: "Account linked! Your Ring devices are now accessible to Homie.",
  });
}
