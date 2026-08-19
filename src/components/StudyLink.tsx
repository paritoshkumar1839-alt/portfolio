"use client";

import Link from "next/link";
import { useGate } from "@/components/GateProvider";

/** A card link that opens the password modal instead of navigating when the
 *  study is locked and the visitor hasn't unlocked yet. */
export default function StudyLink({
  slug,
  title,
  teaser,
  locked,
  className,
  children,
}: {
  slug: string;
  title: string;
  teaser?: string;
  locked: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const { unlocked, openModal } = useGate();
  const gated = locked && !unlocked;

  return (
    <Link
      href={`/work/${slug}`}
      className={className}
      onClick={(e) => {
        if (gated) {
          e.preventDefault();
          openModal({ slug, title, teaser });
        }
      }}
    >
      {children}
    </Link>
  );
}
