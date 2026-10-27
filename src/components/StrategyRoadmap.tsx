"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 * Strategy timeline — the plan as five steps on a line that draws itself
 * down as it scrolls into view. Numbered nodes; the current phase is
 * marked. Content stays short: a title and one line per step.
 * ------------------------------------------------------------------ */

const STEPS: { title: string; text: string; current?: boolean }[] = [
  { title: "Give merchants visibility", text: "A live tracker showing where every store's link stands." },
  { title: "Let merchants link their own stores", text: "Self-serve replaces the manual chain — the team just confirms." },
  { title: "Phase 1 — Swiggy & Zomato, India", text: "Start where the tickets were — just two platforms to get right.", current: true },
  { title: "Phase 2 — MENA platforms", text: "Apply Phase 1's learnings, close the gaps, then expand." },
  { title: "Phase 3 — every region", text: "Once it holds up, scale to all regions and platforms." },
];

export default function StrategyRoadmap() {
  const ref = useRef<HTMLOListElement>(null);
  const [on, setOn] = useState(false);
  const [fill, setFill] = useState(0); // px from the top node to the current step
  const done = STEPS.findIndex((s) => s.current); // steps up to here are reached

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.25 });
    io.observe(el);
    const measure = () => {
      const items = el.querySelectorAll("li");
      const first = items[0] as HTMLElement | undefined;
      const last = items[done] as HTMLElement | undefined;
      if (first && last) setFill(last.offsetTop - first.offsetTop);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [done]);

  return (
    <ol ref={ref} className="relative mt-8">
      {/* the line — a faint track, and a lime fill that draws down */}
      <span aria-hidden className="absolute bottom-6 left-[15px] top-4 w-px bg-line" />
      <span
        aria-hidden
        className="absolute left-[15px] top-4 w-px origin-top bg-cta transition-transform duration-[1100ms] ease-out"
        style={{ height: fill, transform: on ? "scaleY(1)" : "scaleY(0)" }}
      />

      {STEPS.map((s, k) => (
        <li
          key={s.title}
          className="relative flex gap-5 pb-7 transition-all duration-700 last:pb-0"
          style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(8px)", transitionDelay: `${150 + k * 220}ms` }}
        >
          <span
            className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold tabular-nums transition-colors duration-500 ${
              on && k <= done ? "border-cta bg-bg text-cta" : "border-line-strong bg-bg text-text-faint"
            }`}
            style={{ transitionDelay: `${150 + k * 220}ms` }}
          >
            {String(k + 1).padStart(2, "0")}
          </span>
          <div className="pt-1">
            <p className="flex flex-wrap items-center gap-2 text-[16px] font-semibold leading-[22px] text-text">
              {s.title}
              {s.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cta/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-cta">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-cta opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-cta" />
                  </span>
                  In progress
                </span>
              )}
            </p>
            <p className="mt-1 text-[15px] leading-[23px] text-text-muted">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
