import * as simpleIcons from "simple-icons";

type SimpleIcon = { slug: string; path: string };

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

function monogram(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/** Chip with brand logo (via simple-icons) or a monogram fallback + name. */
export default function ToolLogo({ name }: { name: string }) {
  const icon = iconsBySlug[slugify(name)];

  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-text-muted transition-colors hover:border-line-strong hover:text-text">
      <span className="flex size-4 shrink-0 items-center justify-center text-text">
        {icon ? (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
            className="size-4"
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="font-mono text-[0.6rem] font-bold">
            {monogram(name)}
          </span>
        )}
      </span>
      {name}
    </span>
  );
}
