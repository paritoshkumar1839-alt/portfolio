"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";

/** Thin reading-progress bar pinned to the top of case study pages. */
export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  if (!pathname.startsWith("/work/")) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-cta"
      style={{ scaleX }}
    />
  );
}
