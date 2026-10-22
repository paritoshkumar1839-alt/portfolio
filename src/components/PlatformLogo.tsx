import * as simpleIcons from "simple-icons";

type SimpleIcon = { slug: string; path: string; hex: string; title: string };

const bySlug: Record<string, SimpleIcon> = {};
for (const key of Object.keys(simpleIcons)) {
  const icon = (simpleIcons as Record<string, unknown>)[key] as SimpleIcon | undefined;
  if (icon && typeof icon === "object" && icon.slug && icon.path) bySlug[icon.slug] = icon;
}

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Official app icons (from each platform's own site) for platforms simple-icons doesn't cover. */
const LOCAL: Record<string, string> = Object.fromEntries(
  ["talabat", "keeta", "hungerstation", "mrsool", "grubhub", "dotpe", "caviar"].map((s) => [s, `/logos/${s}.png`]),
);

/**
 * A delivery platform as a round logo badge (like the ecosystem art):
 * the official mark in its brand colour on white, with the name on hover.
 * Falls back to a quiet monogram when no logo is available.
 */
export default function PlatformLogo({ name, highlight, size = "md" }: { name: string; highlight?: boolean; size?: "sm" | "md" }) {
  const slug = slugify(name);
  const icon = bySlug[slug];
  const local = LOCAL[slug];
  return (
    <span
      title={name}
      className={`group relative inline-flex ${size === "sm" ? "size-8" : "size-11"} items-center justify-center overflow-visible rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.2)] ${
        highlight ? "ring-2 ring-cta ring-offset-2 ring-offset-surface" : ""
      }`}
    >
      {icon ? (
        <svg viewBox="0 0 24 24" aria-hidden className={size === "sm" ? "size-[18px]" : "size-6"} fill={`#${icon.hex}`}>
          <path d={icon.path} />
        </svg>
      ) : local ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={local} alt="" className="size-full rounded-full object-cover" />
      ) : (
        <span aria-hidden className="text-[13px] font-bold tracking-tight text-[#3a3a3a]">
          {name.replace(/[^A-Za-z]/g, "").slice(0, 2)}
        </span>
      )}
      <span className="sr-only">{name}</span>
      <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-bg px-2 py-0.5 text-[11px] text-text opacity-0 shadow transition-opacity group-hover:opacity-100">
        {name}
      </span>
    </span>
  );
}
