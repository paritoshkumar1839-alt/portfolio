"use client";

import { useState } from "react";

type MediaProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * <img> with object-cover that degrades gracefully: if the file is missing
 * (e.g. a case-study image you haven't added yet), it shows a labelled
 * placeholder instead of a broken image — so the layout never breaks.
 */
export default function Media({ src, alt, className = "" }: MediaProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-surface-2 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="eyebrow text-text-faint">Image · coming soon</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
