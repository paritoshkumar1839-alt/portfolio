import { profile } from "@/lib/profile";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  return (
    <section className="container-page pt-16 pb-20 text-center md:pt-24 md:pb-28">
      {/* Chips — credentials + availability, on top */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <span className="rounded-full border border-line-strong px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
          {profile.role} · {profile.location}
        </span>
        <span className="rounded-full border border-line-strong px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
          {profile.tagline}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-cta/30 bg-cta/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-cta">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cta opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-cta" />
          </span>
          {profile.availability}
        </span>
      </div>

      {/* Big self-branded name — one line, two-tone */}
      <h1 className="mt-8 whitespace-nowrap font-serif text-[clamp(1.9rem,9vw,5.75rem)] leading-[0.95] tracking-tight">
        <span className="text-text">{profile.firstName} </span>
        <span className="text-text-muted">{profile.lastName}</span>
      </h1>

      {/* Positioning heading */}
      <p className="mx-auto mt-8 max-w-3xl text-pretty text-xl leading-relaxed text-text-muted md:text-2xl">
        {profile.headline}
      </p>

      {/* CTAs — primary (lime) + secondary (minimal), centered */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <Magnetic>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3.5 text-sm font-semibold text-cta-ink transition-colors hover:bg-cta-hover"
          >
            View work
            <span aria-hidden>↓</span>
          </a>
        </Magnetic>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text"
        >
          Get in touch
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
