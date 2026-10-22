"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts a metric like "1,700", "~46%" or "38%" up from zero when it scrolls
 *  into view. Values without a single plain number (e.g. "13→7") render as-is. */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)([^\d]*)$/);

  // Park at zero before it's seen, so the count starts from 0 rather than jumping down.
  useEffect(() => {
    const el = ref.current;
    if (el && match && !reduce && !inView) el.textContent = `${match[1]}0${match[3]}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || !inView || reduce) return;
    const [, prefix, num, suffix] = match;
    const target = Number(num.replace(/,/g, ""));
    const decimals = num.split(".")[1]?.length ?? 0;
    const fmt = (n: number) =>
      n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => (el.textContent = `${prefix}${fmt(n)}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return <span ref={ref}>{value}</span>;
}
