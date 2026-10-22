import Reveal from "@/components/Reveal";

/* ------------------------------------------------------------------ *
 * RTGL — process map, drawn like a FigJam board.
 * Columns are the steps of the brand manager's job; the top lane is the
 * happy path, and every other lane sorts what can happen at that step:
 * empty states, edge cases, failures, and how each is handled.
 * ------------------------------------------------------------------ */

type Kind = "empty" | "edge" | "fail" | "ok";

type Branch = { kind: Kind; title: string; text: string };
type Step = { title: string; sub?: string; branches: Branch[] };

/** FigJam sticky colours, one per lane. */
const LANES: { kind: Kind | "happy"; label: string; sticky: string; ink: string }[] = [
  { kind: "happy", label: "Happy path", sticky: "#bfe0ff", ink: "#0b2a4a" },
  { kind: "empty", label: "Empty states", sticky: "#e6e6e6", ink: "#2b2b2b" },
  { kind: "edge", label: "Edge cases", sticky: "#ffe8a3", ink: "#4a3600" },
  { kind: "fail", label: "Failures", sticky: "#ffc9c9", ink: "#5a1414" },
  { kind: "ok", label: "Handled by", sticky: "#c4f0cf", ink: "#0f3d1c" },
];

const FORM: Step[] = [
  {
    title: "Pick platform",
    sub: "Zomato or Swiggy",
    branches: [
      { kind: "empty", title: "No locations yet", text: "“No location created yet” — CTA to create one in Locations." },
      { kind: "empty", title: "Nothing mapped yet", text: "Empty tracker with a “Start mapping” CTA." },
    ],
  },
  {
    title: "Pick brand",
    sub: "Last-used pre-selected",
    branches: [],
  },
  {
    title: "Add store IDs + URLs",
    sub: "One row per store",
    branches: [
      { kind: "edge", title: "Wrong format", text: "Letters in an ID, or a non-platform URL — flagged inline." },
      { kind: "edge", title: "Duplicate ID", text: "Same platform ID on two stores." },
      { kind: "edge", title: "Already mapped", text: "Store is already live on this platform." },
      { kind: "edge", title: "Some rows empty", text: "Send the filled stores, or add the missing details." },
      { kind: "fail", title: "Wrong but valid ID", text: "Passes the form, fails at the platform → see tracker." },
    ],
  },
  {
    title: "Assign menus",
    sub: "A menu per store",
    branches: [
      { kind: "empty", title: "No menu yet", text: "“Create menu” in the dropdown opens Menus in a drawer — create or import from POS." },
      { kind: "edge", title: "Menu not ready", text: "Leave it blank — that store is skipped, the rest go." },
      { kind: "ok", title: "Same menu everywhere", text: "Copy one menu to every store." },
      { kind: "edge", title: "Look-alike menus", text: "Preview opens in a new tab to check before picking." },
    ],
  },
  {
    title: "Verify menus",
    sub: "Checked by Prism",
    branches: [
      { kind: "fail", title: "Errors", text: "Block submitting — fix in the flow, Prism re-checks." },
      { kind: "edge", title: "Warnings only", text: "Can submit, or fix first." },
      { kind: "ok", title: "All clear", text: "Goes straight through." },
    ],
  },
  {
    title: "Submit request",
    sub: "Sent by Nexus",
    branches: [],
  },
];

const TRACKER: Step[] = [
  {
    title: "Request sent",
    sub: "Status: Requested",
    branches: [{ kind: "empty", title: "Waiting", text: "Visible as “In progress” — no need to ask anyone." }],
  },
  {
    title: "Platform maps stores",
    sub: "2–8 hrs, by the platform",
    branches: [
      { kind: "fail", title: "Mapping failed", text: "“Store ID not found” — shown on that store, with the reason." },
      { kind: "ok", title: "Fix & resend", text: "Correct the ID, resubmit just that store." },
    ],
  },
  {
    title: "Menu published",
    sub: "Rules already checked",
    branches: [
      { kind: "fail", title: "Publish failed", text: "Platform rejected the menu — Nexus explains why." },
      { kind: "ok", title: "Fix & resend", text: "Fix the menu, resubmit just that store." },
    ],
  },
  {
    title: "Store live",
    sub: "Orders start flowing",
    branches: [{ kind: "ok", title: "Notified", text: "In-app and by email." }],
  },
];

function Sticky({ bg, ink, title, text, strong }: { bg: string; ink: string; title: string; text?: string; strong?: boolean }) {
  return (
    <div
      className={`rounded-[3px] px-3 py-2.5 ${strong ? "min-h-[4.75rem]" : ""}`}
      style={{ background: bg, color: ink, boxShadow: "0 1px 2px rgb(0 0 0 / 0.12), 0 6px 14px -6px rgb(0 0 0 / 0.18)" }}
    >
      <p className={`${strong ? "text-[14px]" : "text-[13px]"} font-semibold leading-[18px]`}>{title}</p>
      {text && <p className="mt-1 text-[12px] leading-[16px] opacity-80">{text}</p>}
    </div>
  );
}

function Board({ title, note, steps }: { title: string; note: string; steps: Step[] }) {
  const lanes = LANES.filter((l) => l.kind === "happy" || steps.some((s) => s.branches.some((b) => b.kind === l.kind)));
  const cols = `7rem repeat(${steps.length}, minmax(9.5rem, 1fr))`;
  return (
    <section className="relative rounded-[12px] border border-black/10 bg-white/70 p-4 pt-10 md:p-6 md:pt-12">
      {/* FigJam section tab */}
      <span className="absolute left-4 top-3 rounded-[6px] bg-[#1e1e1e] px-2.5 py-1 text-[12px] font-semibold text-white md:left-6">
        {title}
        <span className="ml-2 font-normal text-white/60">{note}</span>
      </span>

      <div className="overflow-x-auto">
        <div className="grid gap-x-3" style={{ gridTemplateColumns: cols, minWidth: `calc(7rem + ${steps.length} * 10.25rem)` }}>
          {lanes.map((lane, r) => (
            <div key={lane.kind} className="contents">
              {/* lane label */}
              <div className={`flex items-start pt-2 ${r ? "border-t border-dashed border-black/15 pt-4" : ""} ${r ? "mt-4" : ""}`}>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#555]">
                  <span className="size-2.5 rounded-[2px]" style={{ background: lane.sticky, outline: "1px solid rgb(0 0 0 / 0.12)" }} />
                  {lane.label}
                </span>
              </div>

              {steps.map((s, c) => {
                const isHappy = lane.kind === "happy";
                const items = isHappy ? [] : s.branches.filter((b) => b.kind === lane.kind);
                return (
                  <div key={s.title} className={`relative ${r ? "mt-4 border-t border-dashed border-black/15 pt-4" : ""}`}>
                    {isHappy ? (
                      <Reveal delay={c * 80} className="relative">
                        <Sticky bg={lane.sticky} ink={lane.ink} title={s.title} text={s.sub} strong />
                        <span className="absolute -top-2 left-2 rounded-full bg-[#1e1e1e] px-1.5 text-[10px] font-semibold leading-[16px] text-white">
                          {String(c + 1).padStart(2, "0")}
                        </span>
                        {c < steps.length - 1 && (
                          <svg aria-hidden className="absolute -right-3 top-1/2 z-10 h-3 w-3 -translate-y-1/2" viewBox="0 0 12 12">
                            <path d="M1 6 H10 M6.5 2.5 L10 6 L6.5 9.5" fill="none" stroke="#1e1e1e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </Reveal>
                    ) : (
                      <div className="space-y-2.5">
                        {items.map((b, k) => (
                          <Reveal key={b.title} delay={c * 80 + k * 60}>
                            <Sticky bg={lane.sticky} ink={lane.ink} title={b.title} text={b.text} />
                          </Reveal>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RtglProcessMap() {
  return (
    <div
      className="rounded-[14px] border border-line p-3 md:p-6"
      style={{
        backgroundColor: "#f3f3f1",
        backgroundImage: "radial-gradient(rgb(0 0 0 / 0.14) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="space-y-6">
        <Board title="The form" note="raising the request" steps={FORM} />
        <div className="flex items-center justify-center gap-2 text-[12px] font-medium text-[#555]">
          <svg aria-hidden className="h-4 w-3" viewBox="0 0 12 16">
            <path d="M6 1 V14 M2.5 10.5 L6 14 L9.5 10.5" fill="none" stroke="#1e1e1e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Submitted — Nexus emails the platform
        </div>
        <Board title="The tracker" note="following it to live" steps={TRACKER} />
        <p className="px-1 text-[12px] leading-[18px] text-[#555]">
          ↺ Failures loop back to a single store — fix it and resubmit just that one, no new request.
        </p>
      </div>
    </div>
  );
}
