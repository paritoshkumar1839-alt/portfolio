import { profile } from "@/lib/profile";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

export default function Principles() {
  return (
    <section className="container-page py-24 md:py-32">
      <SectionHeader label="Approach" title="How I think about design." />

      <div className="mt-14 flex flex-col">
        {profile.principles.map((p, i) => (
          <Reveal
            key={p.title}
            className="grid gap-4 border-t border-line py-10 md:grid-cols-[1fr_1.4fr] md:gap-16"
          >
            <div className="flex items-start gap-5">
              <span className="font-serif text-4xl leading-none text-text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="eyebrow text-accent">Principle</span>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-text">
                  {p.title}
                </h3>
              </div>
            </div>
            <div>
              <p className="text-pretty text-lg leading-relaxed text-text-muted">
                {p.body}
              </p>
              <span className="mt-5 inline-flex rounded-full border border-line px-3 py-1 text-xs text-text-faint">
                {p.tag}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
