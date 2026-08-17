type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  variant?: "display" | "mono";
};

/** Infinite horizontal marquee. "display" = big serif words (expertise);
 *  "mono" = small uppercase credential ticker. */
export default function Marquee({
  items,
  reverse = false,
  variant = "display",
}: MarqueeProps) {
  const row = [...items, ...items];
  const isMono = variant === "mono";

  return (
    <div className="marquee-pause relative flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center whitespace-nowrap ${
          isMono ? "gap-6 pr-6" : "gap-8 pr-8"
        } ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className={isMono ? "flex items-center gap-6" : "flex items-center gap-8"}
          >
            {isMono ? (
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                {item}
              </span>
            ) : (
              <span className="font-serif text-[clamp(1.75rem,4vw,3rem)] text-text">
                {item}
              </span>
            )}
            <span className="text-accent" aria-hidden>
              {isMono ? "·" : "✦"}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
