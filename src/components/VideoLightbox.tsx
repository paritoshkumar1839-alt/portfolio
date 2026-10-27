"use client";

import { useEffect } from "react";

type VideoLightboxProps = {
  source: "youtube" | "drive";
  videoId: string;
  title: string;
  onClose: () => void;
};

/** Full-screen video player modal. Opens a large 16:9 player (YouTube embed or
 *  Google Drive /preview) centered over a dimmed backdrop — so horizontal
 *  videos play at the right proportion instead of being cropped inside a small
 *  card. Closes on backdrop click, the × button, or Escape. */
export default function VideoLightbox({
  source,
  videoId,
  title,
  onClose,
}: VideoLightboxProps) {
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

  const src =
    source === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
      : `https://drive.google.com/file/d/${videoId}/preview`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex items-center justify-between gap-4 pb-3">
          <p className="min-w-0 truncate text-sm font-medium text-text">
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-lg text-text-muted transition-colors hover:border-line-strong hover:text-text"
          >
            ×
          </button>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-black shadow-2xl">
          <iframe
            src={src}
            title={title}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
