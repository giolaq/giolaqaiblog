/**
 * Fullscreen static backdrop used site-wide.
 * Placed once in app/layout.tsx so it sits behind every route.
 * A still image (dark workbench, amber LEDs) replaces the old
 * autoplay video: no network stall, no motion, no third-party host.
 */
export default function Backdrop() {
  return (
    <div className="video-bg" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/backdrop.jpg" alt="" fetchPriority="high" />
    </div>
  );
}
