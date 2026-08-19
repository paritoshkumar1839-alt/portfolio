"use client";

import { useRef } from "react";
import { profile } from "@/lib/profile";
import VideoEmbed from "@/components/VideoEmbed";

// About subsection: a one-line, horizontally-scrollable rail of fun remix
// videos hosted on Google Drive. Arrows scroll it; trackpad/touch works too.
export default function RemixRail() {
  const { film } = profile;
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="mt-16 border-t border-line pt-12">
      <div className="flex flex-col items-center gap-6 text-center">
        <div>
          <span className="eyebrow">Just for fun</span>
          <h3 className="mt-4 font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.04] text-balance">
            {film.remixTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-3xl text-pretty leading-relaxed text-text-muted">
            {film.remixIntro}
          </p>
        </div>

        <div className="hidden shrink-0 gap-2 sm:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scroll(dir)}
              aria-label={dir === -1 ? "Scroll left" : "Scroll right"}
              className="flex size-11 items-center justify-center rounded-full border border-line-strong text-text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {dir === -1 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {film.remixes.map((r) => {
          // Optional per-remix custom thumbnail; else the Drive auto-poster.
          const thumb =
            (r as { thumb?: string }).thumb ??
            `https://drive.google.com/thumbnail?id=${r.id}&sz=w480`;
          return (
            <VideoEmbed
              key={r.id}
              source="drive"
              videoId={r.id}
              thumb={thumb}
              title={r.title}
              className="aspect-[9/16] w-[200px] shrink-0 snap-start rounded-xl border border-line bg-gradient-to-br from-surface-2 to-surface"
              overlay={
                <span className="absolute inset-x-3 bottom-3 text-sm font-medium leading-tight text-text [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                  {r.title}
                </span>
              }
            />
          );
        })}
      </div>
    </div>
  );
}
