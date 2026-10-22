"use client";

import { useEffect, useRef } from "react";

/**
 * Plays a Lottie animation (JSON in /public) on loop while it's on screen.
 * Paused off-screen; reduced-motion users get the first frame, still.
 */
export default function LottieClip({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let anim: { play: () => void; pause: () => void; destroy: () => void; goToAndStop: (f: number, isFrame: boolean) => void } | null = null;
    let io: IntersectionObserver | null = null;
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (cancelled) return;
      anim = lottie.loadAnimation({ container: el, renderer: "svg", loop: true, autoplay: false, path: src });
      if (reduce) {
        anim.goToAndStop(0, true);
        return;
      }
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? anim?.play() : anim?.pause()), { threshold: 0.2 });
      io.observe(el);
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      anim?.destroy();
    };
  }, [src]);

  return <div ref={box} role="img" aria-label={label} className={className} />;
}
