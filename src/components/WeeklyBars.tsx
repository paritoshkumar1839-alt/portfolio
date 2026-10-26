/* ------------------------------------------------------------------ *
 * A single-series weekly bar chart. Thin bars with rounded tops, a
 * recessive grid, one direct label on the peak, and a hover/focus
 * tooltip per bar. Partial weeks are hatched, not solid.
 * ------------------------------------------------------------------ */

export type Week = { label: string; value: number; partial?: boolean };

export default function WeeklyBars({ weeks, ticks, unit }: { weeks: Week[]; ticks: number[]; unit: string }) {
  const max = ticks[ticks.length - 1];
  const peak = Math.max(...weeks.map((w) => w.value));

  return (
    <figure>
      <div className="relative h-64 pl-9">
        {/* grid */}
        {ticks.map((t) => (
          <div key={t} className="absolute inset-x-0 left-9 border-t border-line" style={{ bottom: `${(t / max) * 100}%` }}>
            <span className="absolute -left-9 -translate-y-1/2 text-[11px] tabular-nums text-text-faint">{t}</span>
          </div>
        ))}

        {/* bars */}
        <div className="relative flex h-full items-end gap-[2px]">
          {weeks.map((w) => (
            <div
              key={w.label}
              tabIndex={0}
              aria-label={`Week of ${w.label}: ${w.value} ${unit}${w.partial ? " (partial week)" : ""}`}
              className="group relative flex h-full flex-1 items-end justify-center outline-none"
            >
              <div
                className="w-full max-w-7 rounded-t-[4px] bg-cta transition-opacity group-hover:opacity-80 group-focus-visible:opacity-80"
                style={{
                  height: `${Math.max((w.value / max) * 100, 0.8)}%`,
                  ...(w.partial
                    ? { background: "repeating-linear-gradient(135deg, var(--color-cta) 0 3px, transparent 3px 7px)" }
                    : {}),
                }}
              />
              {w.value === peak && (
                <span className="absolute -translate-y-1.5 text-[12px] font-semibold tabular-nums text-text" style={{ bottom: `${(w.value / max) * 100}%` }}>
                  {w.value}
                </span>
              )}
              {/* tooltip */}
              <span className="pointer-events-none absolute bottom-full z-10 mb-1 hidden whitespace-nowrap rounded-md border border-line bg-surface-2 px-2.5 py-1.5 text-[12px] text-text group-hover:block group-focus-visible:block">
                <span className="text-text-faint">{w.label}{w.partial ? " · partial" : ""}</span>
                <br />
                <span className="font-semibold tabular-nums">{w.value}</span> {unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* x labels — every other week */}
      <div className="mt-2 flex gap-[2px] pl-9">
        {weeks.map((w, i) => (
          <span key={w.label} className="flex-1 text-center text-[10px] leading-[14px] text-text-faint">
            {i % 2 === 1 ? w.label : ""}
          </span>
        ))}
      </div>

      <table className="sr-only">
        <caption>{unit} per week</caption>
        <tbody>
          {weeks.map((w) => (
            <tr key={w.label}>
              <th scope="row">{w.label}</th>
              <td>{w.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
