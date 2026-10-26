import Reveal from "@/components/Reveal";

/* ------------------------------------------------------------------ *
 * How might we, as a FigJam board — sibling to the Jobs-to-be-done one.
 * Each row is a pink question sticky, an arrow, and the green opportunity
 * it led to, grouped by who it's for.
 * ------------------------------------------------------------------ */

export type HmwGroup = { who: string; rows: [string, string][] };

const GROUPS: HmwGroup[] = [
  {
    who: "For the brand manager",
    rows: [
      ["help merchants connect their stores faster?", "A self-serve flow"],
      ["give merchants visibility and control?", "A live status tracker + notifications"],
      ["make them confident their menus publish right?", "In-flow menu verification"],
    ],
  },
  {
    who: "For the onboarding team",
    rows: [
      ["cut the team's manual work?", "Merchant does the entry; the team handles exceptions"],
      ["remove the dependency on other teams?", "Automated menu publish, in the product"],
    ],
  },
];

const SHADOW = "0 1px 2px rgb(0 0 0 / 0.12), 0 8px 18px -8px rgb(0 0 0 / 0.22)";

export default function HmwBoard({ groups = GROUPS }: { groups?: HmwGroup[] }) {
  return (
    <div
      className="rounded-[14px] border border-line p-3 md:p-6"
      style={{
        backgroundColor: "#f3f3f1",
        backgroundImage: "radial-gradient(rgb(0 0 0 / 0.14) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((g, gi) => (
          <section key={g.who} className="relative rounded-[12px] border border-black/10 bg-white/70 p-4 pt-12 md:p-5 md:pt-12">
            <span className="absolute left-4 top-3 rounded-[6px] bg-[#1e1e1e] px-2.5 py-1 text-[12px] font-semibold text-white md:left-5">
              {g.who}
            </span>

            {/* column labels */}
            <div className="mb-2 grid grid-cols-[1fr_1.75rem_1fr] text-[10px] font-bold uppercase tracking-[0.12em] text-[#666]">
              <span>How might we…</span>
              <span />
              <span>Opportunity</span>
            </div>

            <div className="space-y-3">
              {g.rows.map(([q, a], k) => (
                <Reveal key={q} delay={gi * 120 + k * 90} className="grid grid-cols-[1fr_1.75rem_1fr] items-stretch">
                  <div className="rounded-[3px] bg-[#ffc9e4] px-3.5 py-3 text-[#4f0f30]" style={{ boxShadow: SHADOW }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] opacity-60">HMW</p>
                    <p className="mt-1 text-[13.5px] font-semibold leading-[19px]">{q}</p>
                  </div>
                  <svg aria-hidden viewBox="0 0 28 12" className="w-7 self-center">
                    <path d="M3 6 H23 M18.5 2 L23 6 L18.5 10" fill="none" stroke="#1e1e1e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex items-center rounded-[3px] bg-[#c4f0cf] px-3.5 py-3 text-[#0f3d1c]" style={{ boxShadow: SHADOW }}>
                    <p className="text-[13.5px] font-semibold leading-[19px]">{a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
