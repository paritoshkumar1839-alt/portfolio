import type { CaseStudyFeature } from "@/lib/case-studies";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";

// Numbered walkthrough — one screen per row, sides alternating. Used for both
// the old flow (red `problem` notes) and the solution (yellow `sticky` notes).
export default function CaseStudyFeatures({
  features,
  label = "What we built",
  intro,
}: {
  features: CaseStudyFeature[];
  label?: string;
  intro?: string;
}) {
  return (
    <section className="mt-20 border-t border-line pt-14">
      <span className="eyebrow">{label}</span>
      {intro && (
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-text-muted">
          {intro}
        </p>
      )}
      <div className="mt-12 flex flex-col gap-16 md:gap-24">
        {features.map((f, i) => (
          <Reveal
            key={i}
            className="grid items-center gap-6 md:grid-cols-2 md:gap-12"
          >
            <div className={i % 2 ? "md:order-2" : ""}>
              <span className="font-serif text-3xl text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-2xl leading-tight text-text">
                {f.title}
              </h3>
              <p className="mt-3 max-w-md text-pretty leading-relaxed text-text-muted">
                {f.text}
              </p>
              {f.problem && (
                <div className="mt-6 flex max-w-md gap-3 rounded-lg border border-[#5b2626] bg-[#2a1414] px-4 py-3">
                  <span
                    aria-hidden
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#ff6b6b]"
                  />
                  <p className="text-sm leading-snug text-[#f3c6c6]">{f.problem}</p>
                </div>
              )}
              {f.sticky && (
                <div className="mt-6 inline-block max-w-xs rotate-1 rounded-md bg-[#f4d24a] px-4 py-3 text-sm font-medium leading-snug text-[#3a2e05] shadow-lg shadow-black/25">
                  {f.sticky}
                </div>
              )}
            </div>
            <figure className={i % 2 ? "md:order-1" : ""}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
                <Media src={f.image.src} alt={f.image.alt} className="!object-contain" />
              </div>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
