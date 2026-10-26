"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Full case study / Quick read switch. Full is the default. Both versions are rendered (so
 * both are in the HTML); the inactive one is hidden. The choice lives in
 * ?view=quick|full so a quick-read link can be shared directly.
 * ------------------------------------------------------------------ */

type View = "quick" | "full";

export default function StudyViews({
  cover,
  quick,
  full,
  quickTime = "4 min",
  fullTime = "10 min",
}: {
  cover?: ReactNode;
  quick: ReactNode;
  full: ReactNode;
  quickTime?: string;
  fullTime?: string;
}) {
  const [view, setView] = useState<View>("full");
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "quick") setView("quick");
  }, []);

  function choose(v: View, scroll = false) {
    setView(v);
    const url = new URL(window.location.href);
    url.searchParams.set("view", v);
    window.history.replaceState(null, "", url);
    if (scroll) bar.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const tabs: [View, string, string][] = [
    ["full", "Full case study", fullTime],
    ["quick", "Quick read", quickTime],
  ];

  return (
    <>
      <div ref={bar} className="mx-auto mt-10 w-full max-w-3xl scroll-mt-24 px-6">
        <div className="inline-flex rounded-full border border-line bg-surface p-1" role="group" aria-label="Choose how much to read">
          {tabs.map(([v, label, time]) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => choose(v)}
              className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                view === v ? "bg-cta text-cta-ink" : "text-text-muted hover:text-text"
              }`}
            >
              {label}
              <span className={`ml-1.5 font-normal ${view === v ? "opacity-70" : "text-text-faint"}`}>· {time}</span>
            </button>
          ))}
        </div>
      </div>

      {cover}

      <div hidden={view !== "quick"}>
        {quick}
        <div className="mx-auto mt-16 w-full max-w-3xl px-6">
          <button
            type="button"
            onClick={() => choose("full", true)}
            className="group flex w-full items-center justify-between gap-4 rounded-[10px] border border-cta/40 bg-cta/10 p-5 text-left transition-colors hover:border-cta md:p-6"
          >
            <span>
              <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-text-faint">Want the detail?</span>
              <span className="mt-1.5 block text-[18px] font-semibold leading-[24px] text-text">
                Read the full case study · {fullTime}
              </span>
            </span>
            <span aria-hidden className="text-xl text-cta transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
      <div hidden={view !== "full"}>{full}</div>
    </>
  );
}
