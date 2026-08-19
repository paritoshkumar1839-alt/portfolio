import { profile } from "@/lib/profile";
import SectionHeader from "@/components/SectionHeader";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import BeyondWork from "@/components/BeyondWork";
import RemixRail from "@/components/RemixRail";
import GalleryCollage from "@/components/GalleryCollage";

export default function WhoIAm() {
  return (
    <section id="about" className="section-anchor border-t border-line">
      <div className="container-page py-24 md:py-32">
        <SectionHeader label="Who I am" title="A designer who thinks in systems." />

        <Reveal className="mx-auto mt-14 w-full max-w-[16rem]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
            <Media
              src="/about/portrait.jpg"
              alt={`Portrait of ${profile.name}`}
            />
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl space-y-5 text-center">
          {profile.bio.map((para, i) => (
            <p key={i} className="text-pretty leading-relaxed text-text-muted">
              {para}
            </p>
          ))}
        </Reveal>

        {/* Capabilities — the Skills & craft grid, embedded here */}
        <div id="skills" className="section-anchor mt-16 text-center">
          <span className="eyebrow">Capabilities</span>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {profile.capabilities.map((c, i) => (
              <Reveal
                key={c.title}
                delay={(i % 2) * 80}
                className="bg-surface p-7 md:p-9"
              >
                <span className="font-serif text-2xl text-text-faint">
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

        {/* Education */}
        <Reveal className="mt-14 border-t border-line pt-12 text-center">
          <span className="eyebrow">Education</span>
          <ul className="mt-6 grid gap-8 sm:grid-cols-2">
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

        {/* What people say — testimonials slider */}
        <Testimonials />

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
