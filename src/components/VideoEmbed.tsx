"use client";

import { useState } from "react";

type VideoEmbedProps = {
  source: "youtube" | "drive";
  videoId: string;
  thumb: string;
  title: string;
  /** Aspect / rounding / border classes for the outer frame. */
  className?: string;
  /** Extra overlay (badge, caption) shown only over the thumbnail. */
  overlay?: React.ReactNode;
};

/** Click-to-play video frame. Shows a poster + play button, and swaps to an
 *  inline iframe (YouTube embed, or Google Drive's /preview player) on click —
 *  so videos play on the site instead of opening a new tab.
 *  Note: Drive files must be shared "anyone with the link" for /preview. */
export default function VideoEmbed({
  source,
  videoId,
  thumb,
  title,
  className,
  overlay,
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  const src =
    source === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
      : `https://drive.google.com/file/d/${videoId}/preview`;

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {playing ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group/vid absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover/vid:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {overlay}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-bg/70 text-text backdrop-blur transition-transform duration-300 group-hover/vid:scale-110">
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden
              >
                <path d="M5 3.5v9l7-4.5-7-4.5z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
