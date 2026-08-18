import { profile } from "@/lib/profile";
import SectionHeader from "@/components/SectionHeader";
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

      {/* Quote — in its own inner panel, like the reference */}
      <blockquote className="mt-5 flex-1 rounded-xl border border-line bg-surface-2 p-5 text-sm leading-relaxed text-text-muted">
        <span className="mr-1 font-serif text-accent/60" aria-hidden>
          &ldquo;
        </span>
        <span className="line-clamp-[9]">{t.quote}</span>
      </blockquote>
    </article>
  );
}

/** Social proof — real LinkedIn recommendations in a continuously running
 *  horizontal slider that pauses when you hover any card. The list is
 *  duplicated so the loop is seamless. */
export default function Testimonials() {
  const row = [...profile.testimonials, ...profile.testimonials];

  return (
    <section id="testimonials" className="section-anchor border-t border-line">
      <div className="container-page pt-24 md:pt-32">
        <SectionHeader
          label="Testimonials"
          title={
            <>
              What people I&rsquo;ve worked
              <br className="hidden sm:block" /> with have to say.
            </>
          }
          intro="A few words from the engineers, PMs, and designers I built alongside — mostly from my time at UrbanPiper."
        />
      </div>

      {/* Full-bleed slider with soft fade at both edges */}
      <Reveal className="mt-12 pb-24 md:pb-32">
        <div
          className="testimonial-slider relative flex overflow-hidden"
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
    </section>
  );
}
