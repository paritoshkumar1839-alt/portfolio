import { profile } from "@/lib/profile";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

export default function Capabilities() {
  return (
    <section id="skills" className="section-anchor container-page py-24 md:py-32">
      <SectionHeader
        label="Capabilities"
        title="Skills & craft."
        intro="I'm a full-cycle product designer — comfortable in research, information architecture, interaction design, and building systems that scale. On complex B2B problems I tend to go deeper on the domain than most, which changes how I frame the problem and make trade-offs with engineering."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
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

      <Reveal delay={120}>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {profile.skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm text-text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
