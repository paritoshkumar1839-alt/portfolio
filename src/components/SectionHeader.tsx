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
    <Reveal className="text-center">
      <span className="eyebrow">{label}</span>
      <h2 className="mx-auto mt-6 max-w-5xl font-serif text-[clamp(2.1rem,5.2vw,4rem)] leading-[1.02] text-balance">
        {title}
      </h2>
      {intro && (
        <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-text-muted">
          {intro}
        </p>
      )}
      {href && hrefLabel && (
        <div className="mt-8">
          <Link
            href={href}
            className="text-sm text-text-muted underline-hover hover:text-text"
          >
            {hrefLabel} →
          </Link>
        </div>
      )}
    </Reveal>
  );
}
