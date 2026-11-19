import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-40 text-center">
      <div className="font-mono-xs">Error · 404</div>
      <h1 className="mt-4 font-display text-[120px] md:text-[180px] leading-none tracking-tight text-foreground">
        404
      </h1>
      <p className="mt-2 font-display text-3xl italic text-muted">
        This page drifted off-script.
      </p>
      <Link href="/" className="liquid-glass hover-lift mt-10 inline-flex items-center gap-3 rounded-full px-8 py-3 text-[14px]">
        <span>Back home</span>
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
