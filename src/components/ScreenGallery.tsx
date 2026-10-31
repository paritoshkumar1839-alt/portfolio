"use client";

import { useState } from "react";
import ZoomImage from "@/components/ZoomImage";

/* ------------------------------------------------------------------ *
 * ScreenGallery — the screens a walkthrough doesn't show (edge cases,
 * empty states, errors…), each with a one-line explanation. The first
 * few show; "Show more" expands the rest. Click a screen to enlarge it.
 * ------------------------------------------------------------------ */

export type GalleryKind = "edge" | "empty" | "error" | "state";

export type GalleryScreen = {
  src: string;
  title: string;
  /** One line on what the screen handles. */
  text: string;
  kind?: GalleryKind;
};

const KIND: Record<GalleryKind, { label: string; c: string }> = {
  edge: { label: "Edge case", c: "#f5a524" },
  empty: { label: "Empty state", c: "#a1a1aa" },
  error: { label: "Error", c: "#e5484d" },
  state: { label: "State", c: "#4c9aff" },
};

export default function ScreenGallery({
  screens,
  initial = 4,
  aspect = "1600 / 1040",
}: {
  screens: GalleryScreen[];
  /** How many show before "Show more". */
  initial?: number;
  aspect?: string;
}) {
  const [open, setOpen] = useState(false);
  if (!screens.length) return null;
  const shown = open ? screens : screens.slice(0, initial);
  const hidden = screens.length - initial;

  return (
    <div>
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
        {shown.map((s, i) => {
          const k = s.kind ? KIND[s.kind] : null;
          return (
            <figure key={s.src} className={i >= initial ? "story-in" : ""}>
              <div className="overflow-hidden rounded-[10px] border border-line bg-white" style={{ aspectRatio: aspect }}>
                <ZoomImage fit src={s.src} alt={s.title} className="h-full w-full cursor-zoom-in object-cover object-top" />
              </div>
              <figcaption className="mt-4">
                {k && (
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: k.c }}>
                    <span className="size-1.5 rounded-full" style={{ background: k.c }} />
                    {k.label}
                  </p>
                )}
                <p className={`${k ? "mt-1.5" : ""} text-[16px] font-semibold leading-[22px] text-text`}>{s.title}</p>
                <p className="mt-1 text-[15px] leading-[23px] text-text-muted">{s.text}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {hidden > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-[14px] font-semibold text-text transition-colors hover:bg-surface-2"
          >
            {open ? "Show less" : `Show ${hidden} more screen${hidden > 1 ? "s" : ""}`}
            <svg viewBox="0 0 24 24" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
