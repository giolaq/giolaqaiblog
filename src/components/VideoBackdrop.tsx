"use client";

/**
 * Fullscreen looping video background used site-wide.
 * Placed once in app/layout.tsx so it sits behind every route.
 */
export default function VideoBackdrop() {
  return (
    <div className="video-bg" aria-hidden="true">
      <video autoPlay loop muted playsInline preload="auto">
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_31g54AJ9jBOUUX3Vd4Nq6dgNoEh/hf_20260418_162330_0a696152-b802-4033-ada0-72811c5b040b.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
