import { profile } from "@/lib/profile";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

/** Two-letter monogram from a name, used as an avatar stand-in. */
function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Social proof — real LinkedIn recommendations, laid out as a masonry of
 *  quote cards so variable-length testimonials sit balanced. */
export default function Testimonials() {
  return (
    <section id="testimonials" className="section-anchor border-t border-line">
      <div className="container-page py-24 md:py-32">
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

        <div className="mt-14 sm:columns-2 sm:gap-6">
          {profile.testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 2) * 80}
              className="mb-6 break-inside-avoid"
            >
              <figure className="rounded-2xl border border-line bg-surface p-7 md:p-8">
                <span
                  className="font-serif text-5xl leading-none text-accent/50"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="-mt-2 text-pretty leading-relaxed text-text-muted">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-line pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong bg-surface-2 text-sm font-medium text-accent">
                    {initials(t.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-text">
                      {t.name}
                    </span>
                    <span className="block truncate text-sm text-text-faint">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
