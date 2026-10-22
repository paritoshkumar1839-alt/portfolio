"use client";

import { motion, MotionConfig, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Orchestrates the hero entrance: children with `FadeUp` / `SplitName`
 *  play in sequence on first paint. Reduced-motion users get a plain fade. */
export function HeroStage({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

export function FadeUp({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

const letter: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

/** Letters rise out of a mask, one after another. */
export function SplitName({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      variants={{ show: { transition: { staggerChildren: 0.035 } } }}
      aria-label={text}
    >
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span variants={letter} className="inline-block">
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
