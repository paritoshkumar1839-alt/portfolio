"use client";

import { useGate } from "@/components/GateProvider";

/** Small "Locked" pill shown on a locked card — hides itself once unlocked. */
export default function LockBadge({
  locked,
  className,
}: {
  locked: boolean;
  className?: string;
}) {
  const { unlocked } = useGate();
  if (!locked || unlocked) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-bg/70 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-text-muted backdrop-blur ${
        className ?? "absolute left-4 top-4 z-10"
      }`}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="4.5"
          y="10.5"
          width="15"
          height="10"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 10.5V8a4 4 0 1 1 8 0v2.5"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      Locked
    </span>
  );
}
