"use client";

import { useEffect, useState } from "react";

export type PageNavItem = { id: string; label: string };

/**
 * "On this page" — fixed to the left edge. On xl screens it's an always-open
 * sidebar of section names (the page makes room for it); on lg it collapses to a
 * slim tick rail that opens on hover. Current section highlighted; one click to
 * jump. Hidden below lg.
 */
export default function PageNav({ items }: { items: PageNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    // The current section is the last one whose top has passed 35% of the viewport.
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className={`group fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:left-6 xl:w-44`}
    >
      {/* lg: a slim tick rail that expands on hover · xl+: always-open sidebar */}
      <div className="rounded-[12px] border border-transparent p-2 transition-colors duration-200 group-hover:border-line group-hover:bg-bg/95 group-hover:shadow-xl group-hover:backdrop-blur group-focus-within:border-line group-focus-within:bg-bg/95 xl:p-0 xl:group-hover:border-transparent xl:group-hover:bg-transparent xl:group-hover:shadow-none xl:group-focus-within:border-transparent xl:group-focus-within:bg-transparent">
        <p className="mb-2 hidden px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-faint group-hover:block group-focus-within:block xl:block">
          On this page
        </p>
        <ul className="space-y-0.5">
          {items.map((it) => {
            const on = it.id === active;
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  aria-current={on ? "true" : undefined}
                  aria-label={it.label}
                  className="flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-surface-2 focus-visible:bg-surface-2 focus-visible:outline-none"
                >
                  <span
                    aria-hidden
                    className={`h-[2px] shrink-0 rounded-full transition-all duration-300 ${on ? "w-5 bg-cta" : "w-3 bg-text/25"}`}
                  />
                  <span
                    aria-hidden
                    className={`hidden whitespace-nowrap text-[13px] group-hover:inline group-focus-within:inline xl:inline ${
                      on ? "font-medium text-text" : "text-text-muted"
                    }`}
                  >
                    {it.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
