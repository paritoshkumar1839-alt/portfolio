"use client";

import { useState } from "react";

/** Circular avatar: shows the person's photo when present, and falls back to a
 *  two-letter monogram if there's no image or it fails to load. */
export default function TestimonialAvatar({
  src,
  initials,
  name,
}: {
  src?: string;
  initials: string;
  name: string;
}) {
  const [ok, setOk] = useState(Boolean(src));

  if (src && ok) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name}
        width={40}
        height={40}
        loading="lazy"
        onError={() => setOk(false)}
        className="h-10 w-10 shrink-0 rounded-full border border-line-strong object-cover"
      />
    );
  }

  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong bg-surface-2 text-sm font-medium text-accent">
      {initials}
    </span>
  );
}
