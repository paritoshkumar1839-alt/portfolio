import { profile } from "@/lib/profile";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";

// About subsection: film work outside product design. Each card plays inline
// (YouTube embed or Drive preview); the poster comes straight from the video.
export default function BeyondWork() {
  const { film } = profile;
  return (
    <div className="mt-16 border-t border-line pt-12">
      <div className="text-center">
        <span className="eyebrow">Beyond design</span>
        <h3 className="mx-auto mt-4 font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.04] text-balance">
          Always a <span className="text-cta">movie buff</span>
        </h3>

        <p className="mx-auto mt-6 max-w-3xl text-pretty leading-relaxed text-text-muted">
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
          const thumb =
            w.source === "drive"
              ? `https://drive.google.com/thumbnail?id=${w.videoId}&sz=w640`
              : `https://img.youtube.com/vi/${w.videoId}/hqdefault.jpg`;
          return (
            <Reveal key={w.videoId} delay={(i % 3) * 80} className="text-left">
              <VideoEmbed
                source={w.source as "youtube" | "drive"}
                videoId={w.videoId}
                thumb={thumb}
                title={w.title}
                className="aspect-video rounded-xl border border-line bg-surface"
                overlay={
                  <span className="absolute left-3 top-3 rounded-full bg-bg/70 px-3 py-1 text-xs font-medium text-text backdrop-blur">
                    {w.role}
                  </span>
                }
              />

              <div className="mt-4">
                <h3 className="font-serif text-lg text-text">
                  {w.title}
                  {w.native && (
                    <span className="ml-2 align-middle text-xs text-text-faint">
                      {w.native}
                    </span>
                  )}
                </h3>
                <p className="mt-1.5 font-mono text-xs text-text-faint">{w.meta}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-text-muted line-clamp-2">
                  {w.blurb}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
