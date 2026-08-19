import { profile } from "@/lib/profile";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  return (
    <section className="container-page pt-14 pb-20 text-center md:pt-20 md:pb-28">
      {/* Eyebrow */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <span className="eyebrow text-text-muted">
          {profile.role} · {profile.location}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          <span className="eyebrow">{profile.availability}</span>
        </span>
      </div>

      {/* Big self-branded name — solid tonal two-tone */}
      <h1 className="mt-8 font-serif leading-[0.9] tracking-tight">
        <span className="block text-[clamp(2.5rem,8vw,5.5rem)] text-text">
          {profile.firstName}
        </span>
        <span className="block text-[clamp(2.5rem,8vw,5.5rem)] text-text-muted">
          {profile.lastName}
        </span>
      </h1>

      {/* Positioning sentence */}
      <p className="mx-auto mt-10 max-w-3xl text-pretty text-xl leading-relaxed text-text-muted md:text-2xl">
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
