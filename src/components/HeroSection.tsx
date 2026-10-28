import Image from "next/image";
import Link from "next/link";
import TiltSurface from "@/components/TiltSurface";

export default function HeroSection() {
  return (
    <section className="home-intro" aria-labelledby="intro-title">
      <div>
        <p className="eyebrow">Developer Advocate at Amazon · London</p>
        <h1 id="intro-title">Giovanni<br />Laquidara</h1>
        <p className="intro-focus">Building with Agentic AI.</p>
        <p className="intro-copy">
          I build AI agents and the tools around them at Amazon: connecting models
          to tools, providing context, and checking the results. I share what I
          learn through code, writing, and workshops.
        </p>
        <p className="intro-note">My background spans Android, VR, TV apps, and cross-platform development.</p>
        <div className="intro-links">
          <Link href="#projects" className="text-link">Explore my projects <span aria-hidden="true">↗</span></Link>
          <Link href="/talks" className="text-link">Talks & workshops <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <TiltSurface className="portrait-depth" strength={5}>
      <button type="button" data-ocarina-trigger
        className="relative block touch-manipulation select-none"
        aria-label="Giovanni Laquidara — tap five times quickly to open the secret ocarina">
      <Image src="/ocarina-pixel-portrait.jpg" alt="Pixel-art portrait of Giovanni Laquidara as Link, playing an ocarina" width={981} height={1280}
        sizes="(max-width: 640px) 96px, 200px" className="intro-portrait" draggable={false} priority />
      </button>
      </TiltSurface>
    </section>
  );
}
