"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/talks", label: "Talks" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Trap focus within mobile menu when open
  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector("a");
      firstLink?.focus();
    }
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Terminal dots (decorative) + brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-term-red" />
            <span className="h-3 w-3 rounded-full bg-term-yellow" />
            <span className="h-3 w-3 rounded-full bg-term-green" />
          </div>
          <Link href="/" className="text-sm font-bold text-foreground" aria-label="giolaq.dev - Home">
            giolaq
            <span className="text-accent">.</span>
            <span className="text-muted">dev</span>
            <span className="cursor-blink text-accent ml-0.5 text-xs" aria-hidden="true">&#9608;</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {navLinks.map((link) => {
            const isCurrent = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`rounded-md px-3 py-1.5 text-xs transition-all duration-200 ${
                    isCurrent
                      ? "bg-surface text-accent shadow-[0_0_10px_-5px_var(--accent)]"
                      : "text-muted hover:bg-surface hover:text-accent"
                  }`}
                >
                  {isCurrent && <span className="text-term-green mr-1" aria-hidden="true">&gt;</span>}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu button */}
        <button
          className="text-muted transition-colors hover:text-accent md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
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

      {/* Dashed separator (decorative) */}
      <div className="mx-auto max-w-5xl px-6" aria-hidden="true">
        <div className="border-t border-dashed border-border" />
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          ref={mobileMenuRef}
          className="border-t border-dashed border-border bg-background px-6 py-4 md:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map((link) => {
              const isCurrent = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`block rounded-md px-3 py-2 text-xs transition-all duration-200 ${
                      isCurrent
                        ? "bg-surface text-accent"
                        : "text-muted hover:bg-surface hover:text-accent"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-accent" aria-hidden="true">$</span> cd /{link.label.toLowerCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
