import { profile } from "@/lib/profile";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  return (
    <section className="container-page pt-16 pb-20 text-center md:pt-24 md:pb-28">
      {/* Name + role — a confident small label above the headline */}
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm md:text-base">
        <span className="font-semibold tracking-tight text-text">
          {profile.name}
        </span>
        <span className="text-text-faint" aria-hidden>
          ·
        </span>
        <span className="text-text-muted">
          {profile.role} · {profile.location}
        </span>
      </div>

      {/* Big positioning headline — the lead */}
      <h1 className="mx-auto mt-6 max-w-4xl font-serif text-[clamp(2.1rem,6vw,4.5rem)] leading-[1.03] tracking-tight text-balance">
        {profile.headline}
      </h1>

      {/* Availability + subtle credentials */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-cta/30 bg-cta/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-cta">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cta opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-cta" />
          </span>
          {profile.availability}
        </span>
        <span className="text-sm text-text-faint">{profile.tagline}</span>
      </div>

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
