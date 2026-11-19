import Link from "next/link";
import HeroScene from "@/components/HeroScene";

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> Developer advocate &amp; builder</p>
        <h1 id="hero-title">Less hype.<br /><span>More building.</span></h1>
        <p className="hero-subtitle">
          I’m Giovanni Laquidara. I turn complex tech into things people can
          actually build with — from AI agents to apps on every screen.
        </p>
        <div className="hero-actions">
          <Link href="/blog" className="button-primary">Explore the writing <span aria-hidden="true">↗</span></Link>
          <a href="https://github.com/giolaq" className="button-secondary" target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-meta">
          <span>Currently at <strong>Amazon</strong></span><span>Based in <strong>London, UK</strong></span>
        </div>
      </div>
      <div className="hero-art">
        <div className="art-label" aria-hidden="true"><span>EXPLORING THE POSSIBLE</span><span>FIG. 01</span></div>
        <HeroScene>
        <svg viewBox="0 0 460 380" fill="none" className="system-art" aria-hidden="true">
          <defs>
            <linearGradient id="cube-face" x1="125" y1="100" x2="330" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c0f66b" stopOpacity=".22" /><stop offset="1" stopColor="#c0f66b" stopOpacity=".02" />
            </linearGradient>
          </defs>
          <g stroke="#303b32" strokeWidth="1">
            <path d="M230 10v350M25 190h410M65 95l330 190M65 285L395 95" strokeDasharray="3 7" />
            <ellipse cx="230" cy="190" rx="192" ry="100" /><ellipse cx="230" cy="190" rx="124" ry="65" />
            <path d="M230 47 373 129v123l-143 82-143-82V129Z" />
          </g>
          <g className="static-core" stroke="#c0f66b" strokeWidth="1.4" strokeLinejoin="round">
            <path d="m230 83 94 54v108l-94 54-94-54V137Z" fill="url(#cube-face)" />
            <path d="m136 137 94 54 94-54M230 191v108" />
            <path d="m230 120 62 36v71l-62 36-62-36v-71Z" strokeOpacity=".4" />
            <path d="m168 156 62 36 62-36M230 192v71" strokeOpacity=".4" />
            <path d="m230 156 31 18v36l-31 18-31-18v-36Z" fill="#c0f66b" fillOpacity=".14" />
            <path d="m199 174 31 18 31-18M230 192v36" />
          </g>
          <g fill="#c0f66b">
            <circle cx="87" cy="129" r="4" /><circle cx="373" cy="252" r="4" />
            <circle cx="230" cy="47" r="4" /><circle cx="230" cy="334" r="4" />
          </g>
          <g stroke="#5b6b59"><path d="M87 129H40v-27M373 252h47v28M230 47h92V29" /></g>
          <g fill="#a6b3a3" fontSize="10" fontFamily="monospace" letterSpacing="1">
            <text x="22" y="90">IDEAS</text><text x="327" y="32">SYSTEMS</text><text x="350" y="300">REAL THINGS</text>
          </g>
          <g stroke="#a6b3a3"><path d="M20 20h12m-6-6v12M428 350h12m-6-6v12" /></g>
        </svg>
        </HeroScene>
        <div className="art-topics" aria-hidden="true"><span><i>01</i> Agentic AI</span><span><i>02</i> Cross-platform</span><span><i>03</i> Open source</span></div>
      </div>
    </section>
  );
}
