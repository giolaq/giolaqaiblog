import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const links = [
    { href: SITE_CONFIG.social.github, label: "GitHub" },
    { href: SITE_CONFIG.social.twitter, label: "Twitter" },
    { href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
    { href: SITE_CONFIG.social.medium, label: "Medium" },
  ];

  return (
    <footer className="mt-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="border-t border-[--border]" />
        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <div className="font-mono-xs">
            © MMXXVI · <span className="text-foreground">GIOLAQ.DEV</span> · London
          </div>
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-muted tracking-wide uppercase transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
