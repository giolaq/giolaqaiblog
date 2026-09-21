"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Writing" },
  { href: "/talks", label: "Talks" },
  { href: "/whats-next", label: "What’s next" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export default function Header() {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  const mobileOpen = openPath === pathname;
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && mobileOpen) {
        setOpenPath(null);
        menuButton.current?.focus();
      }
    }}>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className="wordmark" onClick={() => setOpenPath(null)}>Giovanni Laquidara<span aria-hidden="true">.</span></Link>
        <button ref={menuButton} className="menu-toggle" aria-expanded={mobileOpen} aria-controls="main-navigation"
          onClick={() => setOpenPath(mobileOpen ? null : pathname)}>
          {mobileOpen ? "Close" : "Menu"}
        </button>
        <ul id="main-navigation" className={`nav-links ${mobileOpen ? "is-open" : ""}`}>
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return <li key={link.href}><Link href={link.href} aria-current={active ? "page" : undefined}
              onClick={() => setOpenPath(null)}>{link.label}</Link></li>;
          })}
          <li><Link href="/speaker" aria-current={pathname === "/speaker" ? "page" : undefined}
            onClick={() => setOpenPath(null)}>Speaker kit <span aria-hidden="true">↗</span></Link></li>
        </ul>
      </nav>
    </header>
  );
}
