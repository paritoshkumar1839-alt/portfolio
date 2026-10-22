"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { siZomato } from "simple-icons";

/** RTGL workaround: a request travels Atlas → Nexus (AI agent) → Zomato by email on the
 *  top arc, and the mapping status comes back on the bottom arc. Loops while on
 *  screen, pauses off-screen. Reduced motion shows the end state. */

const STATUS = [
  { label: "Requested", cls: "border-line-strong text-text-muted" },
  { label: "In progress", cls: "border-[#b8860b]/60 bg-[#b8860b]/10 text-[#f2c14e]" },
  { label: "Mapped", cls: "border-cta/50 bg-cta/10 text-cta" },
];

const OUT = "M120 110 C 190 40, 270 40, 340 110 C 410 40, 490 40, 560 110";
const BACK = "M560 130 C 490 200, 410 200, 340 130 C 270 200, 190 200, 120 130";

export default function AgentLoop() {
  const wrap = useRef<HTMLDivElement>(null);
  const outRef = useRef<SVGPathElement>(null);
  const backRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const raf = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inView = useInView(wrap, { margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [status, setStatus] = useState(0);
  const [leg, setLeg] = useState<"out" | "back" | null>(null);

  const travel = (path: SVGPathElement, ms: number, done: () => void) => {
    const len = path.getTotalLength();
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ms);
      const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      const p = path.getPointAtLength(len * e);
      dotRef.current?.setAttribute("transform", `translate(${p.x} ${p.y})`);
      if (k < 1) raf.current = requestAnimationFrame(step);
      else done();
    };
    raf.current = requestAnimationFrame(step);
  };

  const play = useCallback(() => {
    cancelAnimationFrame(raf.current);
    clearTimeout(timer.current);
    if (!outRef.current || !backRef.current) return;
    setStatus(0);
    setLeg("out");
    travel(outRef.current, 2000, () => {
      setStatus(1);
      timer.current = setTimeout(() => {
        setLeg("back");
        travel(backRef.current!, 2000, () => {
          setStatus(2);
          setLeg(null);
          // hold on "Mapped", then go again
          timer.current = setTimeout(() => playRef.current(), 1800);
        });
      }, 700);
    });
  }, []);

  const playRef = useRef(play);
  playRef.current = play;

  useEffect(() => {
    if (reduce) {
      setStatus(2);
      return;
    }
    if (inView) play();
    else {
      cancelAnimationFrame(raf.current);
      clearTimeout(timer.current);
    }
  }, [inView, reduce, play]);

  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(timer.current);
    },
    [],
  );

  const s = STATUS[status];

  return (
    <div ref={wrap} className="rounded-[10px] border border-line bg-surface p-4 md:p-8">
      <svg viewBox="0 0 680 250" className="w-full" role="img" aria-label="A go-live request travels from Atlas through Nexus, the AI agent, to Zomato by email, and the mapping status returns the same way">
        <path ref={outRef} d={OUT} fill="none" stroke={leg === "out" ? "var(--cta)" : "var(--line-strong)"} strokeWidth="1.25" strokeDasharray="4 6" style={{ transition: "stroke .4s" }} />
        <path ref={backRef} d={BACK} fill="none" stroke={leg === "back" ? "var(--cta)" : "var(--line-strong)"} strokeWidth="1.25" strokeDasharray="4 6" style={{ transition: "stroke .4s" }} />

        <text x="340" y="30" textAnchor="middle" fontSize="13" fill="var(--text-muted)">
          Store details, by email
        </text>
        <text x="340" y="232" textAnchor="middle" fontSize="13" fill="var(--text-muted)">
          Mapping status, by email
        </text>

        {/* Atlas */}
        <rect x="40" y="96" width="160" height="48" rx="24" fill="#ffffff" />
        <image href="/work/self-serve-go-live/v2/atlas-logo.png" x="66" y="104" width="108" height="32" preserveAspectRatio="xMidYMid meet" />

        {/* Nexus — the AI agent */}
        <circle cx="340" cy="120" r="34" fill="var(--surface-2)" stroke="var(--cta)" strokeWidth="1.25" />
        <text x="340" y="116" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--cta)">Nexus</text>
        <text x="340" y="132" textAnchor="middle" fontSize="11" fill="var(--text-muted)">AI agent</text>

        {/* Zomato */}
        <rect x="480" y="96" width="160" height="48" rx="24" fill={`#${siZomato.hex}`} />
        <svg x="510" y="96" width="100" height="48" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
          <path d={siZomato.path} fill="#ffffff" />
        </svg>

        {/* The packet: store details going out, mapping status coming back */}
        <g ref={dotRef} transform="translate(120 110)" opacity={leg ? 1 : 0} style={{ transition: "opacity .3s" }}>
          {leg === "back" ? (
            <g>
              <rect x="-42" y="-13" width="84" height="26" rx="13" fill="var(--surface-2)" stroke="var(--cta)" strokeWidth="1" />
              <circle cx="-26" cy="0" r="4" fill="var(--cta)" />
              <text x="-16" y="4.5" fontSize="12" fontWeight="600" fill="var(--cta)">Mapped</text>
            </g>
          ) : (
            <g>
              {/* spreadsheet icon */}
              <path d="M-13 -17 H7 L13 -11 V17 H-13 Z" fill="#ffffff" />
              <path d="M7 -17 V-11 H13" fill="#d9d9d9" />
              <rect x="-9" y="-6" width="18" height="17" fill="#1e8e3e" rx="1" />
              <path d="M-9 -0.5 H9 M-9 5 H9 M-3 -6 V11" stroke="#ffffff" strokeWidth="1" />
            </g>
          )}
        </g>
      </svg>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-text-muted">Store status in Atlas</span>
          <span className={`rounded-full border px-3 py-1 text-[13px] font-medium transition-colors duration-300 ${s.cls}`}>
            {s.label}
          </span>
        </div>
      </div>
    </div>
  );
}
