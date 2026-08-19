import Link from "next/link";
import { profile } from "@/lib/profile";

// Anchor links target sections on the single-page home. Prefixed with "/"
// so they also work when clicked from /work or a case-study page.
const links = [
  { href: "/#work", label: "Work" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/70 backdrop-blur-xl">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[0.95rem] tracking-tight"
        >
          <span className="inline-block size-2 rounded-full bg-accent transition-transform duration-500 group-hover:scale-125" />
          <span className="font-medium text-text">{profile.name}</span>
        </Link>

        {/* Center pill nav (desktop) */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-surface/60 px-2 py-1 backdrop-blur lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3.5 py-1.5 text-sm text-text-muted transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Compact links (tablet / mobile, no room for the pill) */}
          <ul className="flex items-center gap-0.5 lg:hidden">
            {links.slice(0, 3).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-full px-2.5 py-2 text-sm text-text-muted transition-colors hover:text-text"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="eyebrow">Available</span>
          </span>

          <a
            href={`mailto:${profile.email}`}
            className="ml-1 hidden rounded-full bg-cta px-4 py-2 text-sm font-semibold text-cta-ink transition-colors hover:bg-cta-hover sm:inline-flex"
          >
            Hire me
          </a>
        </div>
      </nav>
    </header>
  );
}
