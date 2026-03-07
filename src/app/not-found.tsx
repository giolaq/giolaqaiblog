"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const MatrixRain = dynamic(() => import("@/components/MatrixRain"), { ssr: false });

export default function NotFound() {
  return (
    <div className="relative mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-32 text-center overflow-hidden">
      <MatrixRain />
      <div className="relative z-10">
        <p className="text-sm text-term-red cmd-cursor">
          bash: page: command not found
        </p>
        <h1 className="mt-4 text-6xl font-bold text-foreground glitch-text">
          404
        </h1>
        <p className="mt-4 text-sm text-muted">
          Segmentation fault (core dumped)
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md border border-dashed border-border px-4 py-2 text-xs text-muted transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_15px_-3px_var(--accent)]"
        >
          <span className="text-accent">$</span> cd ~
        </Link>
      </div>
    </div>
  );
}
