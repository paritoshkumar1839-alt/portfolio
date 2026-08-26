import type { CaseStudySection } from "@/lib/case-studies";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";

export default function CaseStudySections({
  sections,
}: {
  sections: CaseStudySection[];
}) {
  return (
    <div className="flex flex-col">
      {sections.map((section, i) => {
        const num = String(i + 1).padStart(2, "0");
        return (
          <Reveal
            key={i}
            as="section"
            className="border-t border-line py-14 md:py-20"
          >
            <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-12">
              <div>
                <span className="eyebrow">{num}</span>
                <p className="mt-3 text-sm text-text-muted md:mt-4">
                  {section.heading}
                </p>
              </div>

              <div className="max-w-2xl">
                {section.editorialHeadline && (
                  <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] text-balance">
                    {section.editorialHeadline}
                  </h2>
                )}
                <p className="mt-5 text-pretty text-lg leading-relaxed text-text-muted">
                  {section.intro}
                </p>

                {section.perspectives && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {section.perspectives.map((p) => (
                      <div
                        key={p.title}
                        className="rounded-2xl border border-line bg-surface p-6"
                      >
                        <h3 className="eyebrow text-accent">{p.title}</h3>
                        <ul className="mt-4 space-y-3">
                          {p.points.map((pt, j) => (
                            <li
                              key={j}
                              className="text-pretty text-sm leading-relaxed text-text-muted"
                            >
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {section.challenges && (
                  <div className="mt-8 flex flex-col gap-4">
                    {section.challenges.map((c, j) => (
                      <div
                        key={j}
                        className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2"
                      >
                        <div className="bg-surface p-6">
                          <span className="eyebrow">Challenge</span>
                          <p className="mt-3 text-pretty text-sm leading-relaxed text-text">
                            {c.challenge}
                          </p>
                        </div>
                        <div className="bg-surface-2 p-6">
                          <span className="eyebrow text-accent">Solution</span>
                          <p className="mt-3 text-pretty text-sm leading-relaxed text-text">
                            {c.solution}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.hmws && (
                  <div className="mt-8 flex flex-col gap-4">
                    {section.hmws.map((h, j) => (
                      <div
                        key={j}
                        className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-[1.1fr_1fr]"
                      >
                        <div className="bg-surface p-6">
                          <span className="eyebrow text-accent">How might we</span>
                          <p className="mt-3 text-pretty font-serif text-lg leading-snug text-text">
                            {h.question}
                          </p>
                        </div>
                        <div className="bg-surface-2 p-6">
                          <span className="eyebrow">The solution</span>
                          <p className="mt-3 text-pretty text-sm leading-relaxed text-text-muted">
                            {h.solution}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.bullets && (
                  <ul className="mt-8 space-y-3">
                    {section.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-pretty text-text-muted">
                        <span
                          aria-hidden
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.stats && (
                  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {section.stats.map((s, j) => (
                      <div key={j}>
                        <div className="font-serif text-3xl text-text">
                          {s.value}
                        </div>
                        <div className="mt-1 text-xs text-text-faint">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.sticky && (
                  <div className="mt-8 max-w-md -rotate-1 rounded-md bg-[#f4d24a] px-5 py-4 text-sm font-medium leading-snug text-[#3a2e05] shadow-lg shadow-black/25">
                    {section.sticky}
                  </div>
                )}

                {section.image && (
                  <figure className="mt-8">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
                      <Media
                        src={section.image.src}
                        alt={section.image.alt}
                        className="!object-contain"
                      />
                    </div>
                    {section.image.caption && (
                      <figcaption className="mt-3 text-xs text-text-faint">
                        {section.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
