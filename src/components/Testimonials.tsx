"use client";

import { useEffect, useState } from "react";
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

/** Avatar + name/role on the left, company logo on the right. Shared by the
 *  card and the modal so they read identically. */
function PersonHeader({ t }: { t: Testimonial }) {
  return (
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
  );
}

/** A testimonial card. The quote is clamped to a few lines so every card keeps
 *  a normal, consistent height; long quotes get a "Read more" that opens the
 *  full text in a modal. */
function TestimonialCard({ t, onOpen }: { t: Testimonial; onOpen: () => void }) {
  // Only quotes long enough to be truncated by the 4-line clamp need the link.
  const isLong = t.quote.length > 180;

  return (
    <article className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-line bg-surface p-6 sm:w-[360px]">
      <PersonHeader t={t} />

      <blockquote className="mt-5 rounded-xl border border-line bg-surface-2 p-5 text-sm leading-relaxed text-text-muted">
        <p className="line-clamp-4">
          <span className="mr-1 font-serif text-accent/60" aria-hidden>
            &ldquo;
          </span>
          {t.quote}
        </p>
      </blockquote>

      {isLong && (
        <button
          type="button"
          onClick={onOpen}
          className="mt-3 self-start text-xs font-medium text-accent underline-hover hover:text-text"
        >
          Read more →
        </button>
      )}
    </article>
  );
}

/** Full-quote modal. Closes on backdrop click, the × button, or Escape. */
function QuoteModal({ t, onClose }: { t: Testimonial; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-surface p-7 text-left shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full border border-line text-lg text-text-muted transition-colors hover:border-line-strong hover:text-text"
        >
          ×
        </button>

        <PersonHeader t={t} />

        <blockquote className="mt-6 text-pretty leading-relaxed text-text-muted">
          <span className="mr-1 font-serif text-accent/60" aria-hidden>
            &ldquo;
          </span>
          {t.quote}
          <span className="ml-0.5 font-serif text-accent/60" aria-hidden>
            &rdquo;
          </span>
        </blockquote>
      </div>
    </div>
  );
}

/** Testimonials as an About subsection — a centered header over a continuously
 *  running slider that pauses on hover. The list is duplicated for a seamless
 *  loop. */
export default function Testimonials() {
  const row = [...profile.testimonials, ...profile.testimonials];
  const [active, setActive] = useState<Testimonial | null>(null);

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
          <div className="testimonial-track flex shrink-0 items-start gap-6 pr-6">
            {row.map((t, i) => (
              <TestimonialCard
                key={`${t.name}-${i}`}
                t={t}
                onOpen={() => setActive(t)}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {active && <QuoteModal t={active} onClose={() => setActive(null)} />}
    </div>
  );
}
