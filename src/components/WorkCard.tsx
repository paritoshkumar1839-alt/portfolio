import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import Media from "@/components/Media";

export default function WorkCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  const locked = study.comingSoon;

  const inner = (
    <>
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-line ${
          study.cardContain ? "bg-bg" : "bg-surface"
        }`}
      >
        <div
          className={`h-full w-full transition-transform duration-700 ease-out ${
            locked ? "" : "group-hover:scale-[1.03]"
          }`}
        >
          <Media
            src={study.cardCover ?? study.cover}
            alt={study.coverAlt}
            className={study.cardContain ? "!object-contain" : "object-top"}
          />
        </div>
        {locked && (
          <span className="absolute left-4 top-4 rounded-full border border-line-strong bg-bg/70 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-text-muted backdrop-blur">
            In progress
          </span>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="eyebrow">{num}</span>
            <span className="eyebrow">{study.domain ?? study.tags.join(" · ")}</span>
          </div>
          <h3 className="mt-3 font-serif text-2xl leading-tight text-text md:text-[1.75rem]">
            {study.title}
          </h3>
          <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-text-muted line-clamp-3">
            {study.tagline}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {study.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-0.5 text-[0.7rem] text-text-muted"
              >
                {t}
              </span>
            ))}
            {study.externalUrl && (
              <span className="text-[0.7rem] text-text-faint">
                {study.externalUrl.replace(/^https?:\/\//, "")} ↗
              </span>
            )}
          </div>
        </div>
        {!locked && (
          <span
            aria-hidden
            className="mt-1 shrink-0 text-text-faint transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent"
          >
            →
          </span>
        )}
      </div>
    </>
  );

  if (locked) {
    return (
      <div className="group block cursor-default select-none opacity-80">
        {inner}
      </div>
    );
  }

  return (
    <Link href={`/work/${study.slug}`} className="group block">
      {inner}
    </Link>
  );
}
