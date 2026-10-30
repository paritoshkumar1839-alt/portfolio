"use client";

import { useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Video / Explainer switch for the final product: the flow played as a
 * screen recording, or the same screens laid out with notes.
 * ------------------------------------------------------------------ */

type View = "video" | "explainer";

export default function DemoViews({ video, explainer }: { video: ReactNode; explainer: ReactNode }) {
  const [view, setView] = useState<View>("video");
  const tabs: [View, string][] = [
    ["video", "Video"],
    ["explainer", "Explainer"],
  ];

  return (
    <>
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-full border border-line bg-surface p-1" role="group" aria-label="Choose how to see the flow">
          {tabs.map(([v, label]) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                view === v ? "bg-cta text-cta-ink" : "text-text-muted hover:text-text"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div hidden={view !== "video"}>{video}</div>
      <div hidden={view !== "explainer"}>{explainer}</div>
    </>
  );
}
