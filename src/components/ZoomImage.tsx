"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * An <img> that opens full-resolution in a dismissible overlay on click.
 * Used for the design-system sheets, which are too dense to read at page
 * width — click to see every state and value at native size (pan/scroll).
 */
export default function ZoomImage({
  src,
  alt,
  className = "",
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group/zoom relative inline-block max-w-full cursor-zoom-in align-top"
        aria-label={`Zoom: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className={className} style={style} />
        <span
          aria-hidden
          className="pointer-events-none absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[0.65rem] font-medium tracking-wide text-white opacity-0 backdrop-blur transition-opacity duration-200 group-hover/zoom:opacity-100"
        >
          ⤢ Click to zoom
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-3 text-white/80">
            <span className="truncate text-xs">{alt}</span>
            <span className="shrink-0 text-xs text-white/50">Click anywhere or press Esc to close</span>
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-4 md:p-8">
            {/* Native resolution — pan/scroll to read every state and value. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto block h-auto max-w-none cursor-default rounded-md bg-white"
            />
          </div>
        </div>
      )}
    </>
  );
}
