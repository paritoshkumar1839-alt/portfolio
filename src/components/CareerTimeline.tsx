import { profile } from "@/lib/profile";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

export default function CareerTimeline() {
  return (
    <section
      id="experience"
      className="section-anchor border-t border-line"
    >
      <div className="container-page py-24 md:py-32">
        <SectionHeader
          label="Career"
          title="Where I've built."
          intro="One company, gone deep — from designing a single flow to owning whole products end to end at UrbanPiper."
        />

        <ol className="mt-16 flex flex-col">
          {profile.experience.map((job, i) => (
            <Reveal
              key={i}
              as="li"
              className="grid gap-6 border-t border-line py-10 md:grid-cols-[14rem_1fr] md:gap-12"
            >
              <div>
                {job.current && (
                  <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/40 px-2.5 py-0.5 text-[0.7rem] font-medium text-accent">
                    <span className="size-1.5 rounded-full bg-accent" />
                    Current
                  </span>
                )}
                <div className="font-mono text-xs text-text-faint">
                  {job.period}
                </div>
                <h3 className="mt-2 font-serif text-2xl text-text">
                  {job.company}
                </h3>
                <p className="mt-1 text-sm text-accent">{job.role}</p>
              </div>

              <div>
                <p className="text-pretty text-lg leading-relaxed text-text">
                  {job.impact}
                </p>
                <ul className="mt-5 space-y-3">
                  {job.achievements.map((a, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-pretty text-sm leading-relaxed text-text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-line-strong"
                      />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
