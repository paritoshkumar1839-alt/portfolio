"use client";

import { useState } from "react";

/** Circular (or rounded-square) avatar: shows the person's photo when present,
 *  and falls back to a two-letter monogram if there's no image or it fails to
 *  load. */
export default function TestimonialAvatar({
  src,
  initials,
  name,
  square = false,
}: {
  src?: string;
  initials: string;
  name: string;
  square?: boolean;
}) {
  const [ok, setOk] = useState(Boolean(src));
  const shape = square ? "rounded-xl" : "rounded-full";

  if (src && ok) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name}
        width={48}
        height={48}
        loading="lazy"
        onError={() => setOk(false)}
        className={`h-12 w-12 shrink-0 border border-line-strong object-cover ${shape}`}
      />
    );
  }

  return (
    <span
      className={`grid h-12 w-12 shrink-0 place-items-center border border-line-strong bg-surface-2 text-sm font-medium text-accent ${shape}`}
    >
      {initials}
    </span>
  );
}
