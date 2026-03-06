import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const links = [
    { href: SITE_CONFIG.social.github, label: "GitHub" },
    { href: SITE_CONFIG.social.twitter, label: "Twitter" },
    { href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
    { href: SITE_CONFIG.social.medium, label: "Medium" },
  ];

  return (
    <footer className="mt-8">
      <div className="mx-auto max-w-5xl px-6">
        <div className="border-t border-dashed border-border" />
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-xs text-muted">
            <span className="text-accent">&copy;</span>{" "}
            {new Date().getFullYear()} {SITE_CONFIG.name}
          </p>
          <div className="flex items-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted transition-colors hover:text-accent"
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
