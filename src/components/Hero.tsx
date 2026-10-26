import { profile } from "@/lib/profile";
import Magnetic from "@/components/Magnetic";
import { HeroStage, FadeUp } from "@/components/HeroMotion";

export default function Hero() {
  return (
    <section className="container-page pt-16 pb-20 text-center md:pt-24 md:pb-28">
      <HeroStage>
        {/* Kicker — name sits small here; location + availability alongside */}
        <FadeUp className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <span className="eyebrow text-text">{profile.name}</span>
          <span aria-hidden className="text-text-faint">·</span>
          <span className="eyebrow text-text-muted">{profile.location}</span>
          <span className="inline-flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cta opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-cta" />
            </span>
            <span className="eyebrow">{profile.availability}</span>
          </span>
        </FadeUp>

        {/* The lead — positioning headline */}
        <FadeUp>
          <h1 className="mx-auto mt-8 max-w-4xl text-balance font-serif text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.03] tracking-tight">
            {profile.headline}
          </h1>
        </FadeUp>

        {/* Subtext — two short, personality-forward lines */}
        <FadeUp>
          <div className="mx-auto mt-7 max-w-2xl space-y-1 text-pretty text-lg leading-relaxed text-text-muted md:text-xl">
            {profile.heroSub.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </FadeUp>

        {/* CTAs — primary (lime) + secondary (minimal), centered */}
        <FadeUp className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
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
        </FadeUp>
      </HeroStage>
    </section>
  );
}
