import Link from "next/link";
import Reveal from "@/components/Reveal";

type SectionHeaderProps = {
  label: string;
  title: React.ReactNode;
  intro?: string;
  href?: string;
  hrefLabel?: string;
};

/** The consistent section lead-in used site-wide: uppercase label + big
 *  headline + optional intro paragraph + optional link. */
export default function SectionHeader({
  label,
  title,
  intro,
  href,
  hrefLabel,
}: SectionHeaderProps) {
  return (
    <Reveal>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-line-strong" aria-hidden />
        <span className="eyebrow">{label}</span>
      </div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 className="max-w-3xl font-serif text-[clamp(2.1rem,5.2vw,4rem)] leading-[1.02] text-balance">
          {title}
        </h2>
        {href && hrefLabel && (
          <Link
            href={href}
            className="shrink-0 text-sm text-text-muted underline-hover hover:text-text"
          >
            {hrefLabel} →
          </Link>
        )}
      </div>
      {intro && (
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-text-muted">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
