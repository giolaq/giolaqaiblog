"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Writing" },
  { href: "/talks", label: "Talks" },
  { href: "/whats-next", label: "What's next" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  useEffect(() => {
    if (!mobileOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onEscape);
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => { if (desktop.matches) setMobileOpen(false); };
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onEscape);
      desktop.removeEventListener("change", onResize);
    };
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="site-container nav-bar">
        <Link href="/" className="wordmark" onClick={() => setMobileOpen(false)} aria-label="giolaq.dev home">
          <span className="brand-symbol" aria-hidden="true">
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16" />
            </svg>
          </span>
          giolaq<span className="text-muted">.dev</span>
        </Link>
        <ul className="desktop-nav">
          {navLinks.map(({ href, label }) => (
            <li key={href}><Link href={href} aria-current={isActive(href) ? "page" : undefined}>{label}</Link></li>
          ))}
        </ul>
        <Link href="/speaker" className="header-cta">Let&apos;s talk <span aria-hidden="true">↗</span></Link>
        <button ref={toggleRef} className="menu-toggle" type="button"
          aria-expanded={mobileOpen} aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileOpen(!mobileOpen)}>
          <span>{mobileOpen ? "Close" : "Menu"}</span><span aria-hidden="true">{mobileOpen ? "−" : "+"}</span>
        </button>
        <div id="mobile-navigation" className="mobile-nav" hidden={!mobileOpen}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== toggleRef.current) setMobileOpen(false);
          }}>
          <ul>
            {[...navLinks, { href: "/speaker", label: "Let's talk ↗" }].map(({ href, label }) => (
              <li key={href}><Link href={href} aria-current={isActive(href) ? "page" : undefined}
                onClick={() => setMobileOpen(false)}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <noscript className="no-script-navigation">
          <style>{`@media (max-width: 63.999rem) { .nav-bar { flex-wrap: wrap; padding-block: 1rem; } .menu-toggle { display: none; } .no-script-navigation { width: 100%; } .no-script-navigation ul { display: flex; flex-wrap: wrap; gap: .5rem 1.5rem; } .no-script-navigation a { display: block; min-height: 44px; padding-block: .75rem; font-size: .875rem; } } @media (min-width: 64rem) { .no-script-navigation { display: none; } }`}</style>
          <ul>{[...navLinks, { href: "/speaker", label: "Let's talk" }].map(({ href, label }) => (
            <li key={href}><Link href={href}>{label}</Link></li>
          ))}</ul>
        </noscript>
      </nav>
    </header>
  );
}
