"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/talks", label: "Talks" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Terminal dots + brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-term-red transition-shadow hover:shadow-[0_0_8px_var(--red)]" />
            <span className="h-3 w-3 rounded-full bg-term-yellow transition-shadow hover:shadow-[0_0_8px_var(--yellow)]" />
            <span className="h-3 w-3 rounded-full bg-term-green transition-shadow hover:shadow-[0_0_8px_var(--green)]" />
          </div>
          <Link href="/" className="text-sm font-bold text-foreground">
            giolaq
            <span className="text-accent">.</span>
            <span className="text-muted">dev</span>
            <span className="cursor-blink text-accent ml-0.5 text-xs">█</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-xs transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-surface text-accent shadow-[0_0_10px_-5px_var(--accent)]"
                    : "text-muted hover:bg-surface hover:text-accent"
                }`}
              >
                {pathname === link.href && <span className="text-term-green mr-1">&gt;</span>}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="text-muted transition-colors hover:text-accent md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Dashed separator */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="border-t border-dashed border-border" />
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-dashed border-border bg-background px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-xs transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-surface text-accent"
                      : "text-muted hover:bg-surface hover:text-accent"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-accent">$</span> cd /{link.label.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
