"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 * ProductDemo — the shipped flow, played like a screen recording.
 * Real screens in order; a cursor glides to what the user clicks, clicks
 * it, and the next screen appears. Loops while on screen, with play/pause.
 * ------------------------------------------------------------------ */

type Kind = "button" | "link" | "card" | "input";

type Frame = {
  /** How long the screen is read before anything happens (ms). */
  dwell: number;
  /** The element that gets clicked to move on, as a box in % of the screen. Omit to just advance. */
  hit?: { x: number; y: number; w: number; h: number; kind: Kind };
  /** Clicking opens the fake menu dropdown, and an option is picked from it. */
  dropdown?: boolean;
};

const DIR = "/work/self-serve-go-live/demo";

// One entry per screen, in flow order (01.webp … 22.webp). Boxes measured from the screens.
const FRAMES: Frame[] = [
  { dwell: 900, hit: { x: 1.9, y: 35.4, w: 47, h: 11.2, kind: "card" } }, //  1 Platforms → Zomato
  { dwell: 900, hit: { x: 87.3, y: 10.7, w: 10.6, h: 4.7, kind: "button" } }, //  2 → Create Request
  { dwell: 700, hit: { x: 29, y: 43.3, w: 11, h: 4.5, kind: "input" } }, //  3 → Platform ID field
  { dwell: 1100, hit: { x: 91, y: 94, w: 6.9, h: 3.8, kind: "button" } }, //  4 → Continue
  { dwell: 700, hit: { x: 48.6, y: 35.7, w: 26, h: 4.7, kind: "input" }, dropdown: true }, //  5 → Select a menu
  { dwell: 1000, hit: { x: 83.8, y: 94.2, w: 14, h: 3.9, kind: "button" } }, //  6 → Publish & activate
  { dwell: 1600 }, //  7 Verifying menus
  { dwell: 1000, hit: { x: 75.8, y: 44.3, w: 8.8, h: 4, kind: "link" } }, //  8 → Fix issues
  { dwell: 1100, hit: { x: 42.2, y: 33.9, w: 57.8, h: 8, kind: "card" } }, //  9 → Paneer Sub
  { dwell: 1100, hit: { x: 93.2, y: 94.3, w: 4.8, h: 3.8, kind: "button" } }, // 10 → Save
  { dwell: 1000 }, // 11 Issues list, updating
  { dwell: 800, hit: { x: 89.7, y: 94.4, w: 8.3, h: 3.7, kind: "button" } }, // 12 → Review fixes
  { dwell: 1500 }, // 13 Reviewing fixes
  { dwell: 1000, hit: { x: 67.4, y: 73.8, w: 5.1, h: 3.8, kind: "button" } }, // 14 → Close
  { dwell: 900, hit: { x: 83.8, y: 94.2, w: 14, h: 3.9, kind: "button" } }, // 15 → Publish & activate
  { dwell: 1300, hit: { x: 44.3, y: 77.3, w: 10.8, h: 4.8, kind: "button" } }, // 16 → Go to platforms
  { dwell: 1000, hit: { x: 88.8, y: 59.8, w: 7, h: 3.6, kind: "link" } }, // 17 → View details
  { dwell: 1100 }, // 18 Store mapping…
  { dwell: 1100 }, // 19 Menu publish…
  { dwell: 1100 }, // 20 Store going live…
  { dwell: 1400 }, // 21 Store live
  { dwell: 2600 }, // 22 Every store live
];

/** The fake menu dropdown on screen 5 — styled after Atlas's own select. */
const MENUS = ["Lunch Menu", "Breakfast Menu", "Snacks Menu", "Special Menu"];
const OPTION_H = 4.2; // % of the screen's height per option

/** Hover / pressed tints: light blue for CTAs and links, light grey for cards and fields. */
const TINT: Record<Kind, { hover: string; press: string }> = {
  button: { hover: "rgb(255 255 255 / 0.22)", press: "rgb(0 0 30 / 0.18)" },
  link: { hover: "rgb(59 91 219 / 0.08)", press: "rgb(59 91 219 / 0.16)" },
  card: { hover: "rgb(0 0 0 / 0.035)", press: "rgb(0 0 0 / 0.07)" },
  input: { hover: "rgb(0 0 0 / 0.03)", press: "rgb(0 0 0 / 0.05)" },
};

/** Chapters shown under the player, by the screen they start on. */
const CHAPTERS: { from: number; label: string }[] = [
  { from: 0, label: "Pick the platform" },
  { from: 2, label: "Add store details" },
  { from: 4, label: "Assign menus" },
  { from: 6, label: "Fix menu issues" },
  { from: 14, label: "Submit the request" },
  { from: 16, label: "Track every store to live" },
];

const MOVE = 750; // cursor glide
const HOVER = 380; // hover held before the click
const PRESS = 260; // click → next screen
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function ProductDemo() {
  const box = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [i, setI] = useState(0);
  const [cursor, setCursor] = useState({ x: 62, y: 70 });
  const [pressed, setPressed] = useState(false);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = useCallback((n: number) => {
    clear();
    setI(n);
    setPressed(false);
    setHover(false);
    setOpen(false);
    setOption(-1);
    const f = FRAMES[n];
    const next = (n + 1) % FRAMES.length;
    let t = 0;
    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, (t += ms)));
    if (!f.hit) {
      at(f.dwell, () => run(next));
      return;
    }
    const h = f.hit;
    // glide to the element → hover → press
    at(f.dwell, () => setCursor({ x: h.x + h.w * (f.dropdown ? 0.25 : 0.5), y: h.y + h.h * 0.55 }));
    at(MOVE - 120, () => setHover(true));
    at(HOVER, () => setPressed(true));
    if (!f.dropdown) {
      at(PRESS, () => run(next));
      return;
    }
    // the fake dropdown: open → glide to the first menu → hover → pick it
    at(PRESS, () => {
      setPressed(false);
      setOpen(true);
    });
    at(450, () => setCursor({ x: h.x + h.w * 0.3, y: h.y + h.h + 0.6 + OPTION_H * 0.55 }));
    at(MOVE - 120, () => setOption(0));
    at(HOVER, () => setPressed(true));
    at(PRESS, () => run(next));
  }, []);

  // Play only while on screen (and not paused by the viewer).
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldPlay = inView && !userPaused && !reduce;
    setPlaying(shouldPlay);
    if (shouldPlay) run(i);
    else clear();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, userPaused]);

  /** Jump to a screen — keeps playing from there, or just shows it when paused. */
  const go = (n: number) => {
    const to = (n + FRAMES.length) % FRAMES.length;
    if (playing) run(to);
    else {
      clear();
      setI(to);
      setHover(false);
      setPressed(false);
      setOpen(false);
    }
  };

  const chapter = CHAPTERS.reduce((c, ch, k) => (i >= ch.from ? k : c), 0);

  return (
    <div ref={box}>
      {/* the "screen" */}
      <div className="relative overflow-hidden rounded-[12px] border border-line bg-white" style={{ aspectRatio: "1600 / 1040", containerType: "inline-size" }}>
        {FRAMES.map((_, n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={n}
            src={`${DIR}/${String(n + 1).padStart(2, "0")}.webp`}
            alt={n === i ? `Atlas — ${CHAPTERS[chapter].label}` : ""}
            loading={n < 3 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
            style={{ opacity: n === i ? 1 : 0 }}
          />
        ))}

        {/* hover / pressed state on the element under the cursor */}
        {FRAMES[i].hit && (hover || pressed) && !open && (
          <span
            aria-hidden
            className="pointer-events-none absolute rounded-[0.4cqw] transition-colors duration-150"
            style={{
              left: `${FRAMES[i].hit!.x}%`,
              top: `${FRAMES[i].hit!.y}%`,
              width: `${FRAMES[i].hit!.w}%`,
              height: `${FRAMES[i].hit!.h}%`,
              background: pressed ? TINT[FRAMES[i].hit!.kind].press : TINT[FRAMES[i].hit!.kind].hover,
              boxShadow: FRAMES[i].hit!.kind === "input" ? "inset 0 0 0 1.5px rgb(59 91 219 / 0.9)" : undefined,
            }}
          />
        )}

        {/* fake menu dropdown (screen 5) */}
        {open && FRAMES[i].hit && (
          <div
            aria-hidden
            className="absolute z-[5] overflow-hidden border border-[#dcdcdc] bg-white"
            style={{
              left: `${FRAMES[i].hit!.x}%`,
              top: `${FRAMES[i].hit!.y + FRAMES[i].hit!.h + 0.6}%`,
              width: `${FRAMES[i].hit!.w}%`,
              borderRadius: "0.3cqw",
              boxShadow: "0 0.5cqw 1.6cqw rgb(0 0 0 / 0.14)",
              fontFamily: '"Source Sans 3", "Source Sans Pro", system-ui, sans-serif',
              animation: "story-in 160ms ease-out both",
            }}
          >
            {MENUS.map((m, k) => (
              <div
                key={m}
                className="flex items-center gap-[0.7cqw] px-[0.9cqw] text-[#333]"
                style={{
                  height: `calc(${OPTION_H} * 1040 / 1600 * 1cqw)`,
                  fontSize: "0.95cqw",
                  background: option === k ? (pressed ? "#e8ecfb" : "#f2f4f8") : "transparent",
                  color: option === k ? "#3b5bdb" : undefined,
                }}
              >
                {m}
              </div>
            ))}
          </div>
        )}

        {/* cursor */}
        {playing && (
          <div
            aria-hidden
            className="pointer-events-none absolute z-10"
            style={{ left: `${cursor.x}%`, top: `${cursor.y}%`, transition: `left ${MOVE}ms ${EASE}, top ${MOVE}ms ${EASE}` }}
          >
            {pressed && <span className="story-ripple absolute -left-4 -top-4 size-8 rounded-full border-2 border-[#1e1e1e]/60" />}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
              style={{ transform: pressed ? "scale(0.85)" : "scale(1)", transformOrigin: "3px 3px", transition: "transform 120ms ease" }}
            >
              <path d="M3 2.5 L3 19 L7.6 14.8 L10.6 21.2 L13.4 19.9 L10.5 13.6 L16.8 13.4 Z" fill="#111" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      {/* controls: play/pause, chapter progress, current chapter */}
      <div className="mt-4 flex items-center gap-4">
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => go(i - 1)}
            aria-label="Previous screen"
            className="flex size-9 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M6 5h2v14H6zM9.5 12 19 5v14z" /></svg>
          </button>
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Play demo" : "Pause demo"}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-text transition-colors hover:bg-surface-2"
          >
            {userPaused ? (
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => go(i + 1)}
            aria-label="Next screen"
            className="flex size-9 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M16 5h2v14h-2zM14.5 12 5 19V5z" /></svg>
          </button>
        </div>
        <div className="flex flex-1 gap-1.5">
          {CHAPTERS.map((ch, k) => {
            const end = CHAPTERS[k + 1]?.from ?? FRAMES.length;
            const fill = i >= end ? 1 : i < ch.from ? 0 : (i - ch.from + 1) / (end - ch.from);
            return (
              <button
                key={ch.label}
                type="button"
                onClick={() => go(ch.from)}
                aria-label={`Jump to: ${ch.label}`}
                className="h-1 flex-1 overflow-hidden rounded-full bg-text/15"
              >
                <span className="block h-full bg-cta transition-[width] duration-300" style={{ width: `${fill * 100}%` }} />
              </button>
            );
          })}
        </div>
        <p className="hidden w-48 shrink-0 text-right text-[13px] font-medium text-text sm:block">{CHAPTERS[chapter].label}</p>
      </div>
    </div>
  );
}
