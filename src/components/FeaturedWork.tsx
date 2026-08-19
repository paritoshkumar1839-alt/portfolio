import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";

export default function FeaturedWork({ study }: { study: CaseStudy }) {
  return (
    <Reveal>
      <Link
        href={`/work/${study.slug}`}
        className="group block overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong"
      >
        <div className="grid md:grid-cols-2">
          {/* Cover */}
          <div className="relative aspect-[16/11] overflow-hidden border-b border-line md:aspect-auto md:border-b-0 md:border-r">
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <Media
                src={study.cardCover ?? study.cover}
                alt={study.coverAlt}
                className="!object-contain"
              />
            </div>
            <span className="absolute left-5 top-5 rounded-full border border-line-strong bg-bg/70 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-accent backdrop-blur">
              Featured
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="eyebrow">01</span>
                {study.domain && <span className="eyebrow">{study.domain}</span>}
              </div>
              <h3 className="mt-5 font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.08] text-text">
                {study.title}
              </h3>
              <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-text-muted">
                {study.tagline}
              </p>
            </div>

            {study.metrics?.length ? (
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="font-serif text-lg text-text md:text-xl">
                      {m.value}
                    </dt>
                    <dd className="mt-1 text-[0.7rem] leading-tight text-text-faint">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <span className="inline-flex items-center gap-2 text-sm font-medium text-text transition-colors group-hover:text-accent">
              View full case study
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
