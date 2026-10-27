"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";

type Stat = { value: string; label: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/** Split a display value like "40K+" into its leading number (40) and the
 *  trailing suffix ("K+"). Returns null for non-numeric values (e.g. "∞"),
 *  which are rendered as-is without counting. */
function splitValue(value: string) {
  const m = value.match(/^(\d+)(.*)$/);
  return m ? { num: parseInt(m[1], 10), suffix: m[2] } : null;
}

/** A single stat number that counts up from 0 to its target once it enters
 *  view. Preserves the suffix (+, K+) throughout the count. */
function StatValue({ value, start }: { value: string; start: boolean }) {
  const parts = splitValue(value);
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(
    parts && !reduce ? `0${parts.suffix}` : value,
  );

  useEffect(() => {
    if (!parts || !start || reduce) return;
    const controls = animate(0, parts.num, {
      duration: 1.3,
      ease: EASE,
      onUpdate: (v) => setDisplay(`${Math.round(v)}${parts.suffix}`),
    });
    return () => controls.stop();
  }, [start, reduce, parts?.num, parts?.suffix]);

  return <>{parts ? display : value}</>;
}

/** Hero proof-point strip — five stats on a single row, numbers animating up
 *  on first view. */
export default function HeroStats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDListElement>(null);
  const [start, setStart] = useState(false);

  // Start the count-up when the strip scrolls into view; fall back to a short
  // timeout so it always runs even where IntersectionObserver is throttled
  // (e.g. a backgrounded tab).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    const fallback = setTimeout(() => setStart(true), 1500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <dl
      ref={ref}
      className="mx-auto mt-14 grid max-w-3xl grid-cols-5 gap-x-2 border-t border-line pt-8 sm:gap-x-8"
    >
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <dt className="font-serif text-2xl leading-none text-accent tabular-nums sm:text-4xl">
            <StatValue value={s.value} start={start} />
          </dt>
          <dd className="mt-2 text-[9px] uppercase leading-tight tracking-[0.08em] text-text-faint sm:text-xs sm:tracking-[0.12em]">
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
