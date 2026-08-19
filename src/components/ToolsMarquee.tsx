import * as simpleIcons from "simple-icons";
import { profile } from "@/lib/profile";

type SimpleIcon = { slug: string; path: string; hex: string; title: string };

// Build a slug -> icon lookup once at module load (server-only).
const iconsBySlug: Record<string, SimpleIcon> = {};
for (const key of Object.keys(simpleIcons)) {
  const icon = (simpleIcons as Record<string, unknown>)[key] as
    | SimpleIcon
    | undefined;
  if (icon && typeof icon === "object" && icon.slug && icon.path) {
    iconsBySlug[icon.slug] = icon;
  }
}

function slugify(name: string) {
  return name.toLowerCase().replace(/\+/g, "plus").replace(/[^a-z0-9]/g, "");
}

// Recognizable short marks for tools whose brand logos aren't in the icon set
// (Adobe / Slack / OpenAI restrict their marks, so simple-icons omits them).
const MONO_LABEL: Record<string, string> = {
  "Adobe XD": "Xd",
  "Adobe Premiere Pro": "Pr",
  ChatGPT: "GPT",
  Slack: "Sl",
  Stitch: "St",
  Lovable: "Lv",
};

function monogram(name: string) {
  if (MONO_LABEL[name]) return MONO_LABEL[name];
  const words = name.trim().split(/\s+/);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

const tools = profile.tools.flatMap((g) => g.items);

/** A single tool tile — brand-colored icon on a light chip, name beneath. */
function ToolTile({ name }: { name: string }) {
  const icon = iconsBySlug[slugify(name)];
  return (
    <div className="flex w-[128px] shrink-0 flex-col items-center gap-3.5 rounded-2xl border border-line bg-surface px-4 py-6 transition-colors hover:border-line-strong">
      <span className="grid size-12 place-items-center rounded-xl bg-white shadow-sm">
        {icon ? (
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill={`#${icon.hex}`}
            aria-hidden
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="font-mono text-xs font-bold text-black/80">
            {monogram(name)}
          </span>
        )}
      </span>
      <span className="text-center text-xs text-text-muted">{name}</span>
    </div>
  );
}

/** Continuously running strip of the tools I design with. Pauses on hover,
 *  with a soft fade at both edges. */
export default function ToolsMarquee() {
  const row = [...tools, ...tools];

  return (
    <div id="tools" className="mt-16 border-t border-line pt-12">
      <div className="text-center">
        <span className="eyebrow">Toolset</span>
        <h3 className="mx-auto mt-4 font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.04] text-balance">
          What I <span className="text-cta">design</span> with.
        </h3>
      </div>

      <div
        className="marquee-pause relative mt-10 flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div className="animate-marquee flex shrink-0 gap-5 pr-5">
          {row.map((t, i) => (
            <ToolTile key={`${t}-${i}`} name={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
