import { profile } from "@/lib/profile";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";

// About subsection: film work outside product design. Each card links to the
// video on YouTube; the poster comes straight from the video.
export default function BeyondWork() {
  const { film } = profile;
  return (
    <div className="mt-16 border-t border-line pt-12">
      <div className="text-center">
        <span className="eyebrow">Beyond design</span>
        <h3 className="mx-auto mt-4 font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.04] text-balance">
          {film.heading}
        </h3>

        <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-text-muted">
          {film.intro}
        </p>

        <blockquote className="mx-auto mt-8 max-w-2xl">
          <p className="font-serif text-2xl leading-snug text-balance text-text">
            “{film.quote}”
          </p>
          <footer className="mt-2 text-sm text-text-muted">{film.lede}</footer>
        </blockquote>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {film.works.map((w, i) => {
          const isDrive = w.source === "drive";
          const href = isDrive
            ? `https://drive.google.com/file/d/${w.videoId}/view`
            : `https://youtu.be/${w.videoId}`;
          const thumb = isDrive
            ? `https://drive.google.com/thumbnail?id=${w.videoId}&sz=w640`
            : `https://img.youtube.com/vi/${w.videoId}/hqdefault.jpg`;
          return (
          <Reveal key={w.videoId} delay={(i % 3) * 80}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-surface">
                <Media src={thumb} alt={w.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-bg/70 px-3 py-1 text-xs font-medium text-accent backdrop-blur">
                  {w.role}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-bg/70 text-accent backdrop-blur transition-transform duration-300 group-hover:scale-110">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                      <path d="M5 3.5v9l7-4.5-7-4.5z" />
                    </svg>
                  </span>
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-serif text-xl text-text transition-colors group-hover:text-accent">
                  {w.title}
                  {w.native && (
                    <span className="ml-2 align-middle text-sm text-text-faint">
                      {w.native}
                    </span>
                  )}
                </h3>
                <p className="mt-1 font-mono text-xs text-text-faint">{w.meta}</p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-text-muted">
                  {w.blurb}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-text transition-colors group-hover:text-accent">
                  {isDrive ? "Watch on Drive" : "Watch on YouTube"}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                </span>
              </div>
            </a>
          </Reveal>
          );
        })}
      </div>
    </div>
  );
}
