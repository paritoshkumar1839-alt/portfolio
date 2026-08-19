import { profile } from "@/lib/profile";
import Reveal from "@/components/Reveal";
import TestimonialAvatar from "@/components/TestimonialAvatar";

/** Two-letter monogram from a name, used as an avatar stand-in. */
function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type Testimonial = (typeof profile.testimonials)[number];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-line bg-surface p-6 sm:w-[360px]">
      {/* Header — avatar + name/role on the left, company logo on the right */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3.5">
          <TestimonialAvatar
            src={t.image}
            initials={initials(t.name)}
            name={t.name}
            square
          />
          <div className="min-w-0">
            <p className="truncate font-semibold text-accent">{t.name}</p>
            <p className="mt-0.5 truncate text-[11px] uppercase tracking-[0.12em] text-text-faint">
              {t.role}
            </p>
          </div>
        </div>
        {t.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.logo}
            alt={t.company}
            width={44}
            height={44}
            loading="lazy"
            className="h-11 w-11 shrink-0 rounded-xl border border-line-strong bg-white object-contain p-1.5"
          />
        )}
      </div>

      {/* Quote — in its own inner panel */}
      <blockquote className="mt-5 flex-1 rounded-xl border border-line bg-surface-2 p-5 text-sm leading-relaxed text-text-muted">
        <span className="mr-1 font-serif text-accent/60" aria-hidden>
          &ldquo;
        </span>
        <span className="line-clamp-[9]">{t.quote}</span>
      </blockquote>
    </article>
  );
}

/** Testimonials as an About subsection — a centered header over a continuously
 *  running slider that pauses on hover. The list is duplicated for a seamless
 *  loop. */
export default function Testimonials() {
  const row = [...profile.testimonials, ...profile.testimonials];

  return (
    <div
      id="testimonials"
      className="mt-16 border-t border-line pt-12 text-center"
    >
      <span className="eyebrow">Testimonials</span>
      <h3 className="mx-auto mt-4 font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.04] text-balance">
        What people I&rsquo;ve <span className="text-cta">worked with</span> have to
        say.
      </h3>
      <p className="mx-auto mt-4 max-w-3xl text-pretty leading-relaxed text-text-muted">
        A few words from the engineers, PMs, and designers I built alongside —
        mostly from my time at UrbanPiper.
      </p>

      <Reveal className="mt-10">
        <div
          className="testimonial-slider relative flex overflow-hidden text-left"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
          }}
        >
          <div className="testimonial-track flex shrink-0 items-stretch gap-6 pr-6">
            {row.map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
