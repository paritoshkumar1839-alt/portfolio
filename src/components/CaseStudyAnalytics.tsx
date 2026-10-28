"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/** Groups a raw second-count into a readable band for the dashboard. */
function durationBucket(seconds: number): string {
  if (seconds < 10) return "0-10s";
  if (seconds < 30) return "10-30s";
  if (seconds < 60) return "30-60s";
  if (seconds < 180) return "1-3m";
  if (seconds < 600) return "3-10m";
  return "10m+";
}

/**
 * Measures *active* time on a case-study page (paused while the tab is hidden)
 * and reports it once when the visitor leaves — either by navigating within the
 * app (unmount) or by closing/backgrounding the tab (pagehide). Reads under
 * ~2s are treated as bounces and skipped. No-op outside production, where
 * `track` just logs to the console.
 */
export default function CaseStudyAnalytics({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  useEffect(() => {
    let activeMs = 0;
    let resumedAt = Date.now();
    let visible = document.visibilityState === "visible";
    let sent = false;

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (visible) {
          activeMs += Date.now() - resumedAt;
          visible = false;
        }
      } else {
        resumedAt = Date.now();
        visible = true;
      }
    };

    const send = () => {
      if (sent) return;
      sent = true;
      if (visible) activeMs += Date.now() - resumedAt;
      const seconds = Math.round(activeMs / 1000);
      if (seconds < 2) return; // ignore bounces
      track("case_study_time", {
        slug,
        title,
        seconds,
        bucket: durationBucket(seconds),
      });
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", send);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", send);
      send(); // in-app navigation away from this page
    };
  }, [slug, title]);

  return null;
}
