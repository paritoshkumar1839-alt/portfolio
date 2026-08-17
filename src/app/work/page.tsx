import type { Metadata } from "next";
import { caseStudies } from "@/lib/case-studies";
import WorkCard from "@/components/WorkCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected product design case studies.",
};

export default function WorkIndex() {
  return (
    <div className="container-page py-20 md:py-28">
      <Reveal>
        <span className="eyebrow">Selected work</span>
        <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] text-balance">
          Problems I made simpler.
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-text-muted">
          Case studies in complex, high-stakes software — the reasoning, the
          trade-offs, and what shipped. More are on the way.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2">
        {caseStudies.map((study, i) => (
          <Reveal key={study.slug} delay={(i % 2) * 80}>
            <WorkCard study={study} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
