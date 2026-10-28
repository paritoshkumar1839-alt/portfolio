import { ViewTransition, type ReactNode } from "react";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import HmwBoard, { type HmwGroup } from "@/components/HmwBoard";
import PageNav from "@/components/PageNav";
import ProductDemo, { type Frame, type Chapter } from "@/components/ProductDemo";
import WeeklyBars, { type Week } from "@/components/WeeklyBars";
import StudyViews from "@/components/StudyViews";
import type { CaseStudy } from "@/lib/case-studies";

/* ------------------------------------------------------------------ *
 * Menu Rules — targeted changes inside one menu instead of cloned menus.
 * Same Brief → Discover → Define → Develop → Deliver spine as RTGL, with
 * its own visuals: the cloned-menu diagram, the rule-as-a-sentence, a
 * clickable screen walkthrough, and two edge-case grids.
 * ------------------------------------------------------------------ */

const A = "/work/menu-rules";

const METRICS = [
  { value: "16 → 1", label: "menus at Pizza Hut" },
  { value: "25+", label: "businesses creating rules" },
  { value: "2,636", label: "rules created in the last 90 days" },
  { value: "1,221", label: "rules from Pizza Hut's account in the last 90 days" },
];

// PostHog, menu_new_rule_created, last 90 days (to 24 Oct). The first and
// last buckets are partial weeks.
const WEEKS: Week[] = [
  { label: "26 Jul", value: 1, partial: true },
  { label: "27 Jul", value: 109 },
  { label: "3 Aug", value: 25 },
  { label: "10 Aug", value: 194 },
  { label: "17 Aug", value: 130 },
  { label: "24 Aug", value: 160 },
  { label: "31 Aug", value: 72 },
  { label: "7 Sep", value: 673 },
  { label: "14 Sep", value: 108 },
  { label: "21 Sep", value: 151 },
  { label: "28 Sep", value: 78 },
  { label: "5 Oct", value: 430 },
  { label: "12 Oct", value: 378 },
  { label: "19 Oct", value: 127, partial: true },
];

const HMW: HmwGroup[] = [
  {
    who: "For the menu manager",
    rows: [
      ["make a targeted change without copying the whole menu?", "Rules that live inside one menu"],
      ["make a rule easy to write — and to read later?", "When / For / Then: a rule reads like a sentence"],
      ["show what a rule will do before it goes live?", "A live preview of every affected item"],
    ],
  },
  {
    who: "For keeping the menu right",
    rows: [
      ["keep dozens of rules manageable?", "One rules list, with filters and on/off toggles"],
      ["stop two rules from changing the same thing?", "A conflict check on save"],
      ["stop rules a platform can't support?", "A guard for brand-level-only platforms"],
    ],
  },
];

// TODO(paritosh): confirm against the final screens — the shared screens show
// Do Not Sell + two price changes; name and description are from your notes.
const CHANGES: [string, string][] = [
  ["Do Not Sell", "The items don't appear on the menu at all, on the chosen platforms and locations."],
  ["Price", "Change it by a percentage, by an amount, or set a new price."],
  ["Name", "Show a different item name."],
  ["Description", "Show a different item description."],
];

// Demo hit boxes are % of the 1600×1257 frames in /demo/create.
const CREATE: Frame[] = [
  { dwell: 1000, hit: { x: 41.6, y: 64, w: 13, h: 3.2, kind: "button" } }, //  1 → Add your first rule
  { dwell: 900, hit: { x: 47.5, y: 24, w: 22.5, h: 3, kind: "input" } }, //  2 → Platforms
  { dwell: 800, hit: { x: 48, y: 35.3, w: 22, h: 2.8, kind: "card" } }, //  3 → All platforms
  { dwell: 800 }, //  4 All selected
  { dwell: 700, hit: { x: 47.3, y: 28.5, w: 9, h: 2.4, kind: "link" } }, //  5 → Add locations
  { dwell: 1100, hit: { x: 87.1, y: 78, w: 11, h: 3, kind: "button" } }, //  6 → Confirm selection
  { dwell: 800, hit: { x: 47.5, y: 41.7, w: 22.5, h: 2.8, kind: "input" } }, //  7 → Items / modifier
  { dwell: 600, hit: { x: 47.5, y: 45.8, w: 22.5, h: 2.7, kind: "card" } }, //  8 → Items
  { dwell: 700, hit: { x: 47.5, y: 48.8, w: 22.5, h: 2.8, kind: "input" } }, //  9 → Select items
  { dwell: 800, hit: { x: 65.5, y: 57, w: 4.5, h: 2, kind: "link" } }, // 10 → Select all
  { dwell: 1200 }, // 11 Items picked, preview fills in
  { dwell: 800, hit: { x: 47.5, y: 62.8, w: 22.5, h: 2.6, kind: "card" } }, // 12 → Do Not Sell
  { dwell: 1600, hit: { x: 93.3, y: 95.3, w: 4.8, h: 3, kind: "button" } }, // 13 → Save
  { dwell: 2800 }, // 14 Saved
];

const CREATE_CHAPTERS: Chapter[] = [
  { from: 0, label: "Start a rule" },
  { from: 1, label: "When: platforms" },
  { from: 4, label: "When: locations" },
  { from: 6, label: "For: items" },
  { from: 11, label: "Then: the change" },
  { from: 12, label: "Preview and save" },
];

const STILL = (labels: string[]) => ({
  frames: labels.map((_, i): Frame => ({ dwell: i === labels.length - 1 ? 2600 : 2000 })),
  chapters: labels.map((label, from): Chapter => ({ from, label })),
});

const BRAND_LEVEL: [string, string, string][] = [
  ["The picker flags them", "Brand-level-only platforms (ToYou, Jahez) carry a warning before anything else is chosen.", "v2/bl-flag.png"],
  ["Picked first → locations switch off", "Location selection is disabled, with the reason and the way back: remove these platforms.", "v2/bl-info.png"],
  ["Picked after → Save is blocked", "If locations are already chosen, the platform field turns red and Save stays off until it's fixed.", "v2/bl-error.png"],
  ["Removed → back to normal", "Drop those platforms and locations come back, the warnings clear, and Save turns on.", "bl-4-fixed.png"],
];

const CONFLICTS: [string, string, string][] = [
  ["Caught on save", "If a new rule overlaps an existing one, saving stops and the alert names the rule it clashes with.", "cf-1-detected.png"],
  ["Compared side by side", "The new rule and the clashing ones sit together, with the overlapping platforms, locations, items and change highlighted.", "cf-2-resolve.png"],
  ["Flagged where it overlaps", "Inside a rule, each overlap is marked on its own field — so you fix exactly what clashes.", "cf-3-inline.png"],
  ["Down to the outlets", "For location clashes, only the overlapping outlets are listed, with one-click Deselect all.", "cf-4-locations.png"],
];

/* ---------------- type + layout primitives (as in RTGL) ---------------- */

const COL = "mx-auto w-full max-w-3xl px-6";
const WIDE = "mx-auto w-full max-w-6xl px-6";

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-md bg-cta/10 px-2.5 py-1 text-[12px] font-semibold uppercase leading-[18px] tracking-[0.1em] text-cta">
      {children}
    </span>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-6 text-[20px] font-semibold leading-[26px] tracking-[-0.01em] text-text">
      {children}
    </h2>
  );
}

function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mt-3 text-pretty text-[16px] leading-[26px] text-text-muted ${className}`}>
      {children}
    </p>
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[13px] font-semibold uppercase leading-[20px] tracking-[0.12em] text-text-faint ${className}`}>
      {children}
    </p>
  );
}

function Block({ tag, title, id, children }: { tag?: string; title?: ReactNode; id?: string; children?: ReactNode }) {
  return (
    <Reveal as="section" className={`${COL} mt-16`}>
      {id && <span id={id} aria-hidden className="block scroll-mt-28" />}
      {tag && <Tag>{tag}</Tag>}
      {title && <H2>{title}</H2>}
      {children}
    </Reveal>
  );
}

function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mt-8 border-l-2 border-cta pl-5 text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] text-text md:text-[28px]">
      {children}
    </blockquote>
  );
}

function Shot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[10px] border border-line bg-white ${className}`}>
      <Media src={src} alt={alt} className="!object-contain" />
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[10px] border border-line bg-surface p-5 ${className}`}>{children}</div>;
}

function Phase({ n, title, sub, id }: { n: number; title: string; sub: string; id?: string }) {
  return (
    <Reveal className={`${COL} mt-28 border-t border-line pt-14`}>
      {id && <span id={id} aria-hidden className="block scroll-mt-28" />}
      <Label>Phase {String(n).padStart(2, "0")}</Label>
      <p className="mt-3 text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-text md:text-[40px]">
        {title}
      </p>
      <p className="mt-2 text-[16px] leading-[26px] text-text-muted">{sub}</p>
    </Reveal>
  );
}

function Metrics() {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      {METRICS.map((m) => (
        <div key={m.label}>
          <dt className="text-[40px] font-bold leading-none tracking-[-0.03em] text-cta md:text-[48px]">{m.value}</dt>
          <dd className="mt-2 text-[13px] leading-[20px] text-text-muted">{m.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function Chip({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-[14px] leading-[20px] ${
        strong ? "bg-cta/15 font-semibold text-cta" : "bg-surface-2 text-text"
      }`}
    >
      {children}
    </span>
  );
}

/** One menu fanned out to its locations and platforms. */
function MenuModel() {
  return (
    <div className="mt-8 grid items-center gap-3 sm:grid-cols-[auto_1.5rem_auto_1.5rem_1fr]">
      <Card className="text-center">
        <Label>Brand</Label>
        <p className="mt-1 text-[16px] font-semibold text-text">Your brand</p>
      </Card>
      <span aria-hidden className="hidden text-center text-text-faint sm:block">→</span>
      <Card className="border-cta/40 text-center">
        <Label>Menu</Label>
        <p className="mt-1 text-[16px] font-semibold text-text">Lunch Menu</p>
      </Card>
      <span aria-hidden className="hidden text-center text-text-faint sm:block">→</span>
      <Card>
        <Label>Goes out to</Label>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Indiranagar", "Koramangala", "Whitefield", "+ more locations"].map((l) => (
            <Chip key={l}>{l}</Chip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Swiggy", "Zomato", "Meraki", "+ more platforms"].map((p) => (
            <Chip key={p}>{p}</Chip>
          ))}
        </div>
      </Card>
    </div>
  );
}

const REGIONS: { region: string; platforms: string[] }[] = [
  { region: "India", platforms: ["Swiggy", "Zomato"] },
  { region: "MENA", platforms: ["Talabat", "Careem", "Chatfood", "ToYou", "Jahez"] },
  { region: "UK & US", platforms: ["Uber Eats", "DoorDash"] },
];
const BRAND_LEVEL_ONLY = ["ToYou", "Jahez"];

/** Regions and their platforms, with the brand-level-only ones marked. */
function RegionMap() {
  return (
    <div className="mt-6">
      <div className="overflow-hidden rounded-[10px] border border-line">
        <ul className="divide-y divide-line">
          {REGIONS.map((r) => (
            <li key={r.region} className="grid gap-2 px-4 py-3 sm:grid-cols-[7rem_1fr] sm:items-center">
              <span className="text-[14px] font-semibold text-text">{r.region}</span>
              <span className="flex flex-wrap gap-1.5">
                {r.platforms.map((p) =>
                  BRAND_LEVEL_ONLY.includes(p) ? (
                    <span key={p} className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-cta/60 px-2.5 py-1 text-[14px] leading-[20px] text-cta">
                      {p}
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">brand-level only</span>
                    </span>
                  ) : (
                    <Chip key={p}>{p}</Chip>
                  ),
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Card className="mt-4">
        <Label>Not every platform works the same way</Label>
        <p className="mt-2 text-[15px] leading-[23px] text-text-muted">
          Most platforms take a menu <span className="text-text">per location</span>. ToYou and Jahez, in
          the MENA region, only take a <span className="text-text">brand-level menu</span> — one menu for
          every location of the brand. That limit comes back in the solution.
        </p>
      </Card>
    </div>
  );
}

/** The old way: one base menu, a full copy for every small difference. */
function CloneDiagram() {
  const copies = [
    { name: "Lunch Menu — Swiggy, Mumbai", diff: "Garlic Bread +₹20" },
    { name: "Lunch Menu — Bangalore", diff: "3 items not sold" },
    { name: "Lunch Menu — …", diff: "the next small difference" },
  ];
  return (
    <div className="mt-8">
      <Card className="mx-auto max-w-sm text-center">
        <Label>Base menu</Label>
        <p className="mt-1 text-[16px] font-semibold text-text">Lunch Menu · every item</p>
      </Card>
      <p aria-hidden className="py-2 text-center text-text-faint">↓ copied in full ↓</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {copies.map((c, i) => (
          <Reveal key={c.name} delay={i * 100}>
            <Card className={i === 2 ? "border-dashed opacity-70" : ""}>
              <p className="text-[14px] font-semibold leading-[20px] text-text">{c.name}</p>
              <p className="mt-3 text-[13px] leading-[18px] text-text-faint">Every item, copied again — except</p>
              <p className="mt-1 text-[15px] font-semibold text-cta">{c.diff}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/** A real saved rule, laid out the way it reads. */
function RuleSentence() {
  return (
    <div className="mt-8 space-y-3 rounded-[10px] border border-line bg-surface p-5 md:p-6">
      {[
        { k: "When", v: [["Platform is", "Swiggy, Zomato & Meraki"], ["Location is", "Indiranagar, Koramangala, Domlur & Whitefield"]] },
        { k: "For", v: [["Items", "Bread Jam, Poha & Plain Dosa"]] },
        { k: "Then", v: [["Change", "Do Not Sell"]] },
      ].map((row) => (
        <div key={row.k} className="grid gap-2 sm:grid-cols-[4rem_1fr] sm:items-baseline">
          <span className="text-[15px] font-semibold text-cta">{row.k}</span>
          <div className="flex flex-wrap items-center gap-2">
            {row.v.map(([a, b], i) => (
              <span key={a} className="flex flex-wrap items-center gap-2">
                {i > 0 && <span className="text-text-faint">+</span>}
                <span className="text-[14px] text-text-muted">{a}</span>
                <Chip strong={row.k === "Then"}>{b}</Chip>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Numbered captions for the steps a demo plays through. */
function StepNotes({ items }: { items: [string, string, string][] }) {
  return (
    <ol className="mt-8 grid gap-x-8 gap-y-5 md:grid-cols-2">
      {items.map(([title, text], i) => (
        <li key={title}>
          <p className="text-[15px] font-semibold leading-[22px] text-text">
            <span className="mr-2 text-cta">{String(i + 1).padStart(2, "0")}</span>
            {title}
          </p>
          <p className="mt-1.5 text-[15px] leading-[23px] text-text-muted">{text}</p>
        </li>
      ))}
    </ol>
  );
}

/** The ~4-minute version: context, problem, how it was found, solution, four decisions, impact, one lesson. */
function QuickRead() {
  const decisions: [string, string, string][] = [
    [
      "Rules live inside each menu",
      "A rule only means something for one menu, so rules get their own tab in it. Open a menu and every way it differs is in one list, as plain sentences with on/off toggles.",
      "06-saved.png",
    ],
    [
      "Rules only change what you pick",
      "A rule touches the exact items chosen and never grows on its own — brands wanted control. The cost: an item added later isn't covered until the manager adds it.",
      "v2/items-picked.png",
    ],
    [
      "Clashing rules are caught on save",
      "Found in user testing: two rules could change the same item in the same place, and the last one would quietly win. Now saving stops, and the overlap is shown side by side.",
      "cf-2-resolve.png",
    ],
    [
      "Brand-level platforms are guarded",
      "ToYou and Jahez (MENA region) only publish a brand-level menu, so a location rule would hit every outlet. My first take warned and let users save; in review with the PM and CEO we agreed it was confusing, easy to miss, and made saved rules hard to read. What shipped blocks Save and asks for a separate brand-wide rule.",
      "v2/bl-error.png",
    ],
  ];

  return (
    <>
      <Block tag="Context" title="One menu, published to many locations and platforms">
        <P>
          In Atlas, UrbanPiper&rsquo;s dashboard, a brand&rsquo;s menu manager builds a menu once and
          publishes it to its locations on every delivery platform, across regions. But prices and items
          often need to differ by platform or city.
        </P>
        <RegionMap />
      </Block>

      <Block tag="The user" title="The brand's menu manager">
        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr]">
          <Card>
            <Label>Who they are</Label>
            <p className="mt-2 text-[15px] leading-[23px] text-text-muted">
              Works for the brand — often a large one with 25+ locations, or several brands — and owns
              price and availability across cities and platforms.
            </p>
          </Card>
          <Card>
            <Label>What they needed</Label>
            <p className="mt-2 text-[15px] leading-[23px] text-text-muted">
              To make small, targeted changes quickly — without copying the whole menu, and without
              keeping every copy in sync by hand.
            </p>
          </Card>
        </div>
      </Block>

      <Block tag="The problem" title="Every small difference meant a whole new menu">
        <P>
          To charge more on one platform or stop selling a few items in one city, menu managers copied
          the entire menu. Pizza Hut was running 16 near-identical menus, and every change had to be made
          in each one.
        </P>
        <CloneDiagram />
      </Block>

      <Block tag="How it came up" title="One brand raised it — more confirmed it">
        <div className="mt-6 space-y-3">
          {[
            ["Pizza Hut", "Copying menus was slow, and the list was too long to track."],
            ["25+ location brands", "Same pattern across other large and multi-brand businesses."],
            ["Engineering", "Every copy is another full menu to store and keep in sync."],
          ].map(([t, d]) => (
            <div key={t} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <span className="text-[15px] font-semibold leading-[24px] text-text">{t}</span>
              <span className="text-[15px] leading-[24px] text-text-muted">{d}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block tag="The solution" title="One menu, plus rules that read like sentences">
        <P>
          Menu managers add a rule to the menu instead of copying it: when these platforms and
          locations, for these items, then make this change. A live preview shows the effect before
          saving.
        </P>
        <RuleSentence />
      </Block>
      <Reveal className={`${WIDE} mt-8`}>
        <ProductDemo frames={CREATE} chapters={CREATE_CHAPTERS} dir={`${A}/demo/create`} aspect="1600 / 1257" />
      </Reveal>

      <Block tag="Key decisions" title="Four calls that shaped it" />
      <div className={`${WIDE} mt-8 space-y-14`}>
        {decisions.map(([title, text, file], i) => (
          <Reveal key={file} className="grid items-center gap-6 md:grid-cols-[1fr_1.5fr] md:gap-10">
            <div>
              <p className="text-[13px] font-semibold text-cta">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-[18px] font-semibold leading-[24px] text-text">{title}</p>
              <p className="mt-2 text-[15px] leading-[23px] text-text-muted">{text}</p>
            </div>
            <Shot src={`${A}/${file}`} alt={title} className="aspect-[1280/1006]" />
          </Reveal>
        ))}
      </div>

      <Block tag="Impact" title="Pizza Hut went from 16 menus to 1">
        <MenuCollapse />
        <P className="mt-8">
          They added 12, 7 and 9 rules in the first three months — each a change that used to mean
          another copy. Beyond them, 25+ businesses created 2,636 rules in the last 90 days.
        </P>
        <div className="mt-8 border-y border-line py-8">
          <Metrics />
        </div>
      </Block>

      <Block tag="What I learned">
        <Quote>Test with real volume — problems show up between rules, not inside one.</Quote>
      </Block>
    </>
  );
}

/** Pizza Hut's 16 copies collapsing to one menu with its rules. */
function MenuCollapse() {
  return (
    <div className="mt-8 grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
      <div>
        <Label>Before</Label>
        <div className="mt-3 grid grid-cols-8 gap-1.5">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="aspect-[3/4] rounded-[3px] border border-line bg-surface-2" />
          ))}
        </div>
        <p className="mt-2 text-[13px] text-text-muted">16 near-identical menus</p>
      </div>
      <span aria-hidden className="text-center text-xl text-text-faint">→</span>
      <div>
        <Label>After</Label>
        <div className="mt-3 flex items-center gap-3">
          <span className="aspect-[3/4] w-10 rounded-[3px] border border-cta/60 bg-cta/15" />
          <div className="flex flex-col gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1.5 rounded-full bg-cta/50" style={{ width: `${56 - i * 12}px` }} />
            ))}
          </div>
        </div>
        <p className="mt-2 text-[13px] text-text-muted">1 menu + its rules</p>
      </div>
    </div>
  );
}

/* ================================================================== */

export default function MenuRulesCaseStudy({ study, next }: { study: CaseStudy; next?: CaseStudy }) {
  return (
    <article className="pb-24 lg:pl-52">
      {/* ---------------- HERO ---------------- */}
      <header className={`${COL} pt-14 md:pt-24`}>
        <Link href="/work" className="text-[14px] text-text-muted underline-hover hover:text-text">
          ← All work
        </Link>
        <Label className="mt-10">UrbanPiper · {study.year} · B2B web app</Label>
        <h1 className="mt-4 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-balance text-text md:text-[60px]">
          One menu and a few <span className="text-cta">rules</span>, instead of dozens of copies
        </h1>
        <p className="mt-5 text-pretty text-[18px] leading-[28px] text-text-muted">
          Menu Rules lets a brand change price and availability by platform, location and item inside
          a single menu — so menu managers stop copying the whole menu for every small difference.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
          {[
            ["Role", "Product Designer, end to end"],
            ["Team", "PM · engineering"],
            ["Timeline", "~1 month"],
            ["Platform", "Atlas, web"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-faint">{k}</dt>
              <dd className="mt-1.5 text-[15px] leading-[21px] text-text">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <StudyViews
        cover={
          <div className={`${WIDE} mt-14`}>
            <ViewTransition name={`study-cover-${study.slug}`} share="morph" default="none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-line bg-bg">
                <Media src={study.cover} alt={study.coverAlt} className="!object-contain" />
              </div>
            </ViewTransition>
          </div>
        }
        quick={<QuickRead />}
        full={
          <>
            <PageNav
              items={[
                { id: "brief", label: "The brief" },
                { id: "outcome", label: "Outcome" },
                { id: "context", label: "Context" },
                { id: "users", label: "Users" },
                { id: "discover", label: "Discover" },
                { id: "define", label: "Define" },
                { id: "develop", label: "Develop" },
                { id: "final-product", label: "The final product" },
                { id: "edge-cases", label: "Edge cases" },
                { id: "deliver", label: "Deliver" },
                { id: "learnings", label: "What I learned" },
                { id: "reflections", label: "Reflections" },
              ]}
            />

            {/* ---------------- THE BRIEF ---------------- */}
            <Block tag="The brief" id="brief" title="Every small difference meant a whole new menu">
              <div className="mt-6 border-l-2 border-cta pl-5">
                <Label>Problem</Label>
                <p className="mt-2 text-pretty text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] text-text md:text-[26px]">
                  To change one price on one platform, or stop selling a few items in one city, brands had to
                  copy the entire menu — and keep every copy in sync by hand.
                </p>
              </div>

              <dl className="mt-8 space-y-5">
                {[
                  ["Goal", "Let brands make targeted changes inside one menu — by platform, location and item — without copying it."],
                  ["Team", "Product Designer (me) · PM · engineering"],
                  ["My role", "Owned design end to end — problem framing, interaction design, prototyping, user testing and design QA."],
                ].map(([t, d]) => (
                  <div key={t} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <dt className="text-[13px] font-semibold uppercase leading-[26px] tracking-[0.12em] text-text-faint">{t}</dt>
                    <dd className="text-[16px] leading-[26px] text-text-muted">{d}</dd>
                  </div>
                ))}
              </dl>
            </Block>

            {/* ---------------- OUTCOME AT A GLANCE ---------------- */}
            <Block tag="Outcome at a glance" id="outcome">
              <P className="mt-6">
                A Rules tab inside every menu where brands write changes as simple sentences, see the effect
                before saving, and can&rsquo;t publish rules that clash or that a platform can&rsquo;t support.
              </P>
              <div className="mt-8 border-y border-line py-8">
                <Metrics />
              </div>
            </Block>

            {/* ---------------- CONTEXT ---------------- */}
            <Block tag="Context" id="context" title="A menu belongs to a brand, and goes out to all its locations and platforms">
              <P>
                In Atlas, UrbanPiper&rsquo;s dashboard, a brand builds a menu once and publishes it to a group of
                its locations, on every delivery platform they sell on.
              </P>
              <MenuModel />
            </Block>
            <Reveal className={`${WIDE} mt-8`}>
              <Shot src={`${A}/v2/menus-list.png`} alt="Menus across brands, with item, location and platform counts" className="aspect-[1280/832]" />
            </Reveal>

            <Block title="Every region, its own platforms — and their own limits">
              <P>
                Atlas runs brands across regions, each with its own delivery platforms. A rule has to work on
                all of them.
              </P>
              <RegionMap />
            </Block>

            <Block title="But one menu is rarely the same everywhere">
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["Prices differ by platform", "Delivery platforms take a cut, so brands often charge a little more there."],
                  ["Prices differ by city", "Costs, and what customers will pay, change from one city to the next."],
                  ["Not every item sells everywhere", "Some items aren't offered on some platforms or in some locations."],
                ].map(([t, d]) => (
                  <Card key={t}>
                    <p className="text-[15px] font-semibold leading-[22px] text-text">{t}</p>
                    <p className="mt-2 text-[14px] leading-[21px] text-text-muted">{d}</p>
                  </Card>
                ))}
              </div>
            </Block>

            {/* ---------------- USERS ---------------- */}
            <Block tag="Users" id="users" title="Built for the brand's menu manager">
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Card>
                  <Label>Menu manager — the user</Label>
                  <ul className="mt-3 space-y-2 text-[15px] leading-[23px] text-text-muted">
                    <li>Works for the brand — often a large one with many locations.</li>
                    <li>Owns price and availability across cities and platforms.</li>
                    <li>Made every menu copy themselves, and kept them in sync by hand.</li>
                  </ul>
                </Card>
                <Card>
                  <Label>Atlas — the system</Label>
                  <ul className="mt-3 space-y-2 text-[15px] leading-[23px] text-text-muted">
                    <li>Stored, published and kept every copy up to date.</li>
                    <li>More copies meant more load, and more chances for menus to disagree.</li>
                  </ul>
                </Card>
              </div>
            </Block>

            {/* ================= 1 · DISCOVER ================= */}
            <Phase n={1} id="discover" title="Discover" sub="Why a small change turned into a new menu." />

            <Block tag="How it came up" title="It started with Pizza Hut">
              <P>
                Pizza Hut told us they were copying menus for every small difference — they were running 16
                near-identical menus. It took time, and the list was so long it was hard to tell which copy
                went where.
              </P>
              <div className="mt-6 space-y-3">
                {[
                  ["Pizza Hut", "Raised it — copying menus was slow, and the list was hard to track."],
                  ["Other enterprise brands", "I checked with brands running 25+ locations, and multi-brand businesses. Same pattern — so it wasn't one customer's request."],
                  ["Engineering", "Every copy is another full menu to store and keep in sync, so fewer copies means less load on our servers."],
                ].map(([t, d]) => (
                  <div key={t} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6">
                    <span className="text-[15px] font-semibold leading-[24px] text-text">{t}</span>
                    <span className="text-[15px] leading-[24px] text-text-muted">{d}</span>
                  </div>
                ))}
              </div>
            </Block>

            <Block tag="The old way" title="Two small differences, two whole new menus">
              <P>
                A price ₹20 higher on Swiggy in Mumbai, and three items not sold in Bangalore. Each meant
                copying the full menu and changing one thing.
              </P>
              <CloneDiagram />
            </Block>

            <Block tag="Where it hurt" title="The copies were the problem">
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Work multiplied", "One change to the base menu had to be repeated in every copy."],
                  ["Hard to track", "A long list of near-identical menus — hard to tell which copy goes to which locations."],
                  ["Copies drifted", "Miss one copy, and an old price or a removed item stays live."],
                  ["Load grew", "Every copy was another full menu for Atlas to store and publish."],
                ].map(([t, d]) => (
                  <Card key={t}>
                    <p className="text-[15px] font-semibold leading-[22px] text-text">{t}</p>
                    <p className="mt-2 text-[14px] leading-[21px] text-text-muted">{d}</p>
                  </Card>
                ))}
              </div>
            </Block>

            {/* ================= 2 · DEFINE ================= */}
            <Phase n={2} id="define" title="Define" sub="What a rule needed to do." />

            <Block tag="The problem">
              <p className="mt-6 text-[22px] font-semibold leading-[1.35] tracking-[-0.02em] text-text-muted md:text-[28px]">
                Menu managers had <span className="text-text">no way to make a small change</span> for a
                platform, a location or a few items — <span className="text-cta">without copying the whole menu</span>{" "}
                and <span className="text-text">keeping every copy in sync</span> by hand.
              </p>
              <Quote>Exceptions, not copies.</Quote>
            </Block>

            <Block tag="How might we" title="From problems to opportunities" />
            <Reveal className={`${WIDE} mt-8`}>
              <HmwBoard groups={HMW} />
            </Reveal>

            <Block tag="Scope" title="What a rule can change">
              <div className="mt-6 overflow-hidden rounded-[10px] border border-line">
                <ul className="divide-y divide-line">
                  {CHANGES.map(([k, v]) => (
                    <li key={k} className="grid grid-cols-[minmax(0,8rem)_1fr] gap-x-4 px-4 py-3 sm:grid-cols-[10rem_1fr]">
                      <span className="text-[15px] font-semibold leading-[23px] text-text">{k}</span>
                      <span className="text-[15px] leading-[23px] text-text-muted">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <P className="text-[14px]">
                Do Not Sell isn&rsquo;t a stock-out. Stock-outs are set by staff at the outlet; Do Not Sell is the
                brand deciding an item isn&rsquo;t on that menu.
              </P>
            </Block>

            {/* ================= 3 · DEVELOP ================= */}
            <Phase n={3} id="develop" title="Develop" sub="The rule, where it lives, and the flow." />

            <Block tag="The idea" title="A rule reads like a sentence">
              <P>
                When <span className="text-text">these platforms and locations</span>, for{" "}
                <span className="text-text">these items</span>, then <span className="text-text">make this change</span>.
                The same three parts every time — easy to write, and easy to read months later.
              </P>
              <RuleSentence />
            </Block>

            <Block tag="Where it lives" title="A Rules tab inside every menu">
              <P>
                A rule only means something for one menu — its items, its locations, its platforms. So rules
                sit in their own tab inside each menu, next to Configuration and Publish History, not in a
                separate tool where you&rsquo;d first have to find the right menu.
              </P>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["Right context", "The pickers only show what this menu has — no items or locations from other menus."],
                  ["One place to look", "Open a menu, and every way it differs anywhere is in one list."],
                  ["Nothing new to learn", "Menus already had tabs for setup and publish history. Rules are one more, in the same place."],
                ].map(([t, d]) => (
                  <Card key={t}>
                    <p className="text-[15px] font-semibold leading-[22px] text-text">{t}</p>
                    <p className="mt-2 text-[14px] leading-[21px] text-text-muted">{d}</p>
                  </Card>
                ))}
              </div>
              <Card className="mt-6">
                <Label>Under the hood</Label>
                <p className="mt-2 text-[15px] leading-[23px] text-text-muted">
                  Atlas keeps one menu and its rules. At publish, it builds each platform&rsquo;s version by
                  applying them — platforms still get the right menu, but no copies are stored.
                </p>
              </Card>
            </Block>

            <Block tag="A deliberate choice" title="Rules only touch what you pick">
              <P>
                A rule applies to the exact items and modifiers chosen — it never grows on its own. Brands
                wanted to be in control of what changes on their menu.
              </P>
              <Card className="mt-6">
                <Label>The trade-off</Label>
                <p className="mt-2 text-[15px] leading-[23px] text-text-muted">
                  An item added to the menu later isn&rsquo;t covered automatically — the menu manager adds it
                  to the rule.
                </p>
              </Card>
            </Block>

            <Block tag="User flow" title="One rule, end to end">
              <P>Rules tab → When → For → Then → preview → save → conflict check → publish.</P>
            </Block>
            <Reveal className={`${WIDE} mt-8`}>
              <div className="overflow-hidden rounded-[10px] border border-line bg-[#f8f8fc] p-4 md:p-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/user-flow.svg`} alt="Menu Rules user flow" className="mx-auto w-full max-w-4xl" loading="lazy" />
              </div>
            </Reveal>

            <Block tag="The final product" id="final-product" title="Writing a rule, step by step">
              <P>The shipped flow, played through — pause or jump to any step.</P>
            </Block>
            <Reveal className={`${WIDE} mt-8`}>
              <ProductDemo frames={CREATE} chapters={CREATE_CHAPTERS} dir={`${A}/demo/create`} aspect="1600 / 1257" />
            </Reveal>

            <Block tag="Edge case 1 · Brand-level menu publish" id="edge-cases" title="ToYou & Jahez (MENA region) can't take location rules">
              <P>
                Remember the limit from the context: ToYou and Jahez, in the MENA region, only publish a brand-level menu — one menu for the whole brand.
                They can&rsquo;t apply a rule to only some locations. But Atlas still let users build
                location rules for them, so a &ldquo;Riyadh only&rdquo; price could quietly go to every
                outlet, or the publish could fail.
              </P>
            </Block>
            <Reveal className={`${WIDE} mt-8 grid gap-4 md:grid-cols-2`}>
              {[
                ["r-problem.png", "The problem, as I framed it"],
                ["r-goals.png", "What the design had to do"],
              ].map(([file, alt]) => (
                <figure key={file}>
                  <Shot src={`${A}/v2/${file}`} alt={alt} className="aspect-[872/664]" />
                  <figcaption className="mt-2 text-[13px] text-text-faint">{alt}</figcaption>
                </figure>
              ))}
            </Reveal>

            <Block tag="Iteration 1" title="Warn, then let them save">
              <P>
                My first take: when ToYou or Jahez is picked, show a warning, ask for a confirmation on save,
                and keep the warning on the saved rule. The rule would then apply to all of that
                platform&rsquo;s locations.
              </P>
            </Block>
            <Reveal className={`${WIDE} mt-8 grid gap-4 md:grid-cols-3`}>
              {[
                ["alt-warning.png", "Inline warning on the platform field"],
                ["alt-confirm.png", "A confirm step before saving"],
                ["alt-saved.png", "The saved rule keeps the warning"],
              ].map(([file, alt]) => (
                <figure key={file}>
                  <Shot src={`${A}/v2/${file}`} alt={alt} className="aspect-[1280/832]" />
                  <figcaption className="mt-2 text-[13px] text-text-faint">{alt}</figcaption>
                </figure>
              ))}
            </Reveal>

            <Block tag="What didn't work" title="Agreed in design review with the PM and CEO">
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["Confusing", "It took a lot of focus to follow what the rule would actually do."],
                  ["Easy to miss", "The flow looked exactly the same, so a warning inside it could slip past."],
                  ["Harder to read later", "On the saved rule card, it was hard to tell why the rule applied, and where."],
                ].map(([t, d]) => (
                  <Card key={t}>
                    <p className="text-[15px] font-semibold leading-[22px] text-text">{t}</p>
                    <p className="mt-2 text-[14px] leading-[21px] text-text-muted">{d}</p>
                  </Card>
                ))}
              </div>
            </Block>

            <Block tag="What shipped" title="Block it, and make a separate rule for those platforms">
              <P>
                A rule can&rsquo;t mix brand-level platforms with chosen locations. Users make a separate,
                brand-wide rule for ToYou and Jahez — which fits how brands in the MENA region already think, since they
                know these platforms run one menu for the whole brand. More control, fewer chances of error.
              </P>
            </Block>
            <Reveal className={`${WIDE} mt-8`}>
              <ProductDemo {...STILL(BRAND_LEVEL.map(([t]) => t))} dir={`${A}/demo/mena`} aspect="1600 / 1257" />
              <StepNotes items={BRAND_LEVEL} />
            </Reveal>
            <Block>
              <P className="text-[14px]">
                The cost: a change for both kinds of platform takes two rules instead of one.
              </P>
            </Block>

            <Block tag="Edge case 2" title="When two rules clash — found in user testing">
              <P>
                This wasn&rsquo;t in my first design. While building a few rules, a brand manager asked:
              </P>
              <Quote>&ldquo;If two rules change the same item, on the same platform and location — which one wins?&rdquo;</Quote>
              <P className="mt-6">
                We had no answer. The last rule published would quietly win. So checking for clashes became
                part of saving a rule.
              </P>
            </Block>
            <Reveal className={`${WIDE} mt-8`}>
              <ProductDemo {...STILL(CONFLICTS.map(([t]) => t))} dir={`${A}/demo/conflict`} aspect="1600 / 1164" />
              <StepNotes items={CONFLICTS} />
            </Reveal>

            {/* ================= 4 · DELIVER ================= */}
            <Phase n={4} id="deliver" title="Deliver" sub="What shipped, and what it changed." />

            <Block tag="Impact" title="Pizza Hut went from 16 menus to 1">
              <P>
                The brand that raised the problem now runs one menu. Every difference that used to be a copy
                is a rule on it.
              </P>
              <MenuCollapse />
              <P className="mt-8">
                In its first three months they added 12, 7 and 9 rules — changes that each used to mean
                another copy, or the same edit in 16 menus. Their account has since created 1,221 rules in
                the last 90 days.
              </P>
            </Block>

            <Block tag="Adoption" title="Rules created each week — last 90 days">
              <P>
                2,636 rules from 25+ businesses in India, the UAE, Saudi Arabia, the UK and Egypt. The spikes
                are large brands setting up many rules at once.
              </P>
            </Block>
            <Reveal className={`${COL} mt-8`}>
              <WeeklyBars weeks={WEEKS} ticks={[0, 250, 500, 750]} unit="rules" />
              <p className="mt-3 text-[12px] text-text-faint">Source: product analytics. Hatched bars are partial weeks.</p>
            </Reveal>

            <Block tag="After testing" id="learnings" title="My first design didn't handle clashing rules">
              <P>
                I designed one rule at a time, so every rule looked right on its own. Testing with a real
                brand manager, building several rules, showed the gap straight away.
              </P>
              <Quote>Test with real volume — problems show up between rules, not inside one.</Quote>
            </Block>

            {/* TODO(paritosh): drop the first item if the shipped item view already shows its rules. */}
            <Block tag="What's next" title="Where this goes">
              <ul className="mt-5 space-y-2">
                {[
                  "Show on each item which rules change it, and its final price per platform",
                  "When a new item is added, suggest adding it to rules that cover similar items",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[16px] leading-[26px] text-text-muted">
                    <span aria-hidden className="text-text-faint">·</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Block>

            <Block tag="Reflections" id="reflections" title="What I'm taking forward">
              <ol className="mt-5 space-y-3">
                {[
                  "The fix wasn't a faster way to copy menus — it was removing the need to copy.",
                  "A rule should read the way the menu manager would say it out loud.",
                  "Trust is won in the edge cases — clashes and platform limits.",
                ].map((t, i) => (
                  <li key={t} className="grid grid-cols-[2rem_1fr] gap-2">
                    <span className="text-[16px] font-semibold leading-[26px] text-cta">{i + 1}</span>
                    <span className="text-[16px] leading-[26px] text-text">{t}</span>
                  </li>
                ))}
              </ol>
            </Block>

          </>
        }
      />

      {/* ---------------- NEXT PROJECT ---------------- */}
      {next && (
        <div className={`${COL} mt-24`}>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-[10px] border border-line bg-surface p-5 transition-colors hover:border-line-strong md:p-6"
          >
            <div>
              <Label>Next</Label>
              <p className="mt-1.5 text-[18px] font-semibold leading-[24px] tracking-[-0.01em] text-text">
                {next.headline ?? next.title}
              </p>
            </div>
            <span
              aria-hidden
              className="text-xl text-text-faint transition-all duration-500 group-hover:translate-x-1 group-hover:text-cta"
            >
              →
            </span>
          </Link>
        </div>
      )}
    </article>
  );
}
