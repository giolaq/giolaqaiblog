"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Writing" },
    { href: "/talks", label: "Talks" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
        scrolled
          ? "bg-[#031826]/70 backdrop-blur-md border-[var(--border)]"
          : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-8 py-6">
        {/* Brand — Instrument Serif wordmark */}
        <Link href="/" className="flex items-baseline gap-1 text-foreground">
          <span className="font-display text-2xl md:text-[28px] tracking-tight">
            Giovanni Laquidara
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-[13.5px] tracking-wide transition-colors ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-foreground/60" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA pill */}
        <a
          href="mailto:glaquidara@gmail.com"
          className="hidden md:inline-flex liquid-glass hover-lift rounded-full px-5 py-2 text-[13px] items-center gap-2"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] pulse-dot"
            style={{ boxShadow: "0 0 10px 1px var(--accent)" }}
          />
          <span>Available for talks</span>
        </a>

        {/* Mobile toggle */}
        <button
          className="text-muted transition-colors hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card mx-6 mb-4 rounded-2xl p-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                    pathname === link.href ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
