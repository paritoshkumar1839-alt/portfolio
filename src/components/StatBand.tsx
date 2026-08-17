import { profile } from "@/lib/profile";
import Reveal from "@/components/Reveal";

export default function StatBand() {
  return (
    <section className="border-y border-line">
      <div className="container-page">
        <dl className="grid grid-cols-2 divide-x divide-line md:grid-cols-4">
          {profile.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 70}
              className={`px-2 py-8 md:px-6 md:py-10 ${
                i >= 2 ? "border-t border-line md:border-t-0" : ""
              }`}
            >
              <dt className="font-serif text-[clamp(2.5rem,6vw,4rem)] leading-none text-gradient w-fit">
                {s.value}
              </dt>
              <dd className="mt-3 text-xs text-text-muted md:text-sm">
                {s.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
