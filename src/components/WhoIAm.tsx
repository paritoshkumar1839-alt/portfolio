import { profile } from "@/lib/profile";
import SectionHeader from "@/components/SectionHeader";
import Media from "@/components/Media";
import ToolLogo from "@/components/ToolLogo";
import Reveal from "@/components/Reveal";
import BeyondWork from "@/components/BeyondWork";
import RemixRail from "@/components/RemixRail";
import GalleryCollage from "@/components/GalleryCollage";

export default function WhoIAm() {
  return (
    <section id="about" className="section-anchor border-t border-line">
      <div className="container-page py-24 md:py-32">
        <SectionHeader label="Who I am" title="A designer who thinks in systems." />

        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_18rem] md:gap-16">
          <Reveal className="max-w-2xl space-y-5">
            {profile.bio.map((para, i) => (
              <p key={i} className="text-pretty leading-relaxed text-text-muted">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
              <Media
                src="/about/portrait.jpg"
                alt={`Portrait of ${profile.name}`}
              />
            </div>
          </Reveal>
        </div>

        {/* Capabilities — the Skills & craft grid, embedded here */}
        <div id="skills" className="section-anchor mt-16">
          <span className="eyebrow">Capabilities</span>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {profile.capabilities.map((c, i) => (
              <Reveal
                key={c.title}
                delay={(i % 2) * 80}
                className="bg-surface p-7 md:p-9"
              >
                <span className="font-serif text-2xl text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-medium text-text">{c.title}</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-text-muted">
                  {c.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Education · Tools · Domains */}
        <div className="mt-14 grid gap-12 border-t border-line pt-12 md:grid-cols-3">
          <Reveal>
            <span className="eyebrow">Education</span>
            <ul className="mt-5 space-y-4">
              {profile.education.map((e, i) => (
                <li key={i}>
                  <p className="text-text">{e.program}</p>
                  <p className="mt-0.5 text-sm text-text-muted">{e.place}</p>
                  <p className="mt-0.5 font-mono text-xs text-text-faint">
                    {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <span className="eyebrow">Tools</span>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {profile.tools.flatMap((g) => g.items).map((item) => (
                <ToolLogo key={item} name={item} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <span className="eyebrow">Domain experience</span>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {profile.domains.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-line px-3.5 py-1.5 text-sm text-text-muted"
                >
                  {d}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Beyond the work — film */}
        <BeyondWork />

        {/* Just for fun — remix rail */}
        <RemixRail />

        {/* Photo collage — life at the last company */}
        <GalleryCollage />
      </div>
    </section>
  );
}
