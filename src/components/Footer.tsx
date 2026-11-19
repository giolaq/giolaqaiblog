import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div><p className="eyebrow">Keep the conversation going</p>
            <h2>Good things start<br />with <Link href="/contact">a hello <span aria-hidden="true">↗</span></Link></h2>
          </div>
          <div className="footer-links">
            <nav aria-label="More pages">
              <p className="font-mono-xs">Explore</p>
              <Link href="/speaker">Speaker kit</Link><Link href="/developers">Developers &amp; API</Link><Link href="/contact">Contact</Link>
            </nav>
            <nav aria-label="Social profiles">
              <p className="font-mono-xs">Elsewhere</p>
              <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer">X / Twitter ↗</a>
              <a href={SITE_CONFIG.social.medium} target="_blank" rel="noopener noreferrer">Medium ↗</a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Giovanni Laquidara</span>
          <span>Built with curiosity. Shared with you.</span><Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
