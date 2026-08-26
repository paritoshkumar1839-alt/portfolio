import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ZoomImage from "@/components/ZoomImage";
import type { CaseStudy } from "@/lib/case-studies";

/* ------------------------------------------------------------------ *
 * UP Design System — "Platform-Wide Changes"
 *
 * A visual-first case study built ENTIRELY from the real UrbanPiper
 * design-system file: the actual documentation deck, the published
 * Color & Text styles, and the real component sheets (every state and
 * variation). Nothing here is reconstructed or approximated — each
 * figure is an export straight from Figma.
 *
 * Assets live in /public/work/up-design-system/assets/.
 * ------------------------------------------------------------------ */

const A = "/work/up-design-system/assets";

/* ---------------- primitives ---------------- */

function Sec({
  label,
  heading,
  intro,
  first = false,
  children,
}: {
  label: string;
  heading?: ReactNode;
  intro?: ReactNode;
  first?: boolean;
  children?: ReactNode;
}) {
  return (
    <Reveal
      as="section"
      className={first ? "mt-14 pt-2" : "mt-20 border-t border-line pt-14"}
    >
      <span className="eyebrow">{label}</span>
      {heading && (
        <h2 className="mt-5 max-w-3xl font-serif text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.03] text-balance">
          {heading}
        </h2>
      )}
      {intro && (
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-text-muted">
          {intro}
        </p>
      )}
      {children}
    </Reveal>
  );
}

function Phase({ name, blurb }: { name: string; blurb: string }) {
  return (
    <Reveal as="div" className="mt-24 md:mt-28">
      <div className="flex items-center gap-5">
        <span className="eyebrow shrink-0">{name}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <p className="mt-4 max-w-2xl font-serif text-[clamp(1.2rem,2.4vw,1.6rem)] leading-snug text-text-muted">
        {blurb}
      </p>
    </Reveal>
  );
}

function Statement({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-accent pl-6 font-serif text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.12] text-balance md:pl-8">
      {children}
    </p>
  );
}

function Card({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6">
      {title && <p className="font-serif text-lg leading-snug text-text">{title}</p>}
      {children && (
        <div className="mt-2 text-sm leading-relaxed text-text-muted">{children}</div>
      )}
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-2 text-sm text-text">{value}</dd>
    </div>
  );
}

// Figure — every image is a real Figma export.
//  variant "slide": the dark documentation slides (already 16:9, dark, on-brand)
//                   — shown edge to edge inside a hairline border.
//  variant "card":  light-UI component/foundation sheets — framed on white.
//  tall: wrap very tall sheets in a scroll box so they don't dominate.
//  maxW: cap the image's rendered width (px) so small exports don't upscale
//        into blur and narrow strips (e.g. the platform logos) don't balloon.
function Figure({
  src,
  alt,
  caption,
  variant = "card",
  tall = false,
  maxW,
}: {
  src: string;
  alt: string;
  caption?: string;
  variant?: "slide" | "card";
  tall?: boolean;
  maxW?: number;
}) {
  const frame =
    variant === "slide"
      ? "border border-line bg-bg-elevated"
      : "border border-line bg-white p-3 md:p-4";
  // Cap every figure to a consistent, moderate height so nothing is either a
  // tiny thumbnail or an 8,000px scroll. Full detail is one click away (zoom).
  const cap = tall ? "84vh" : "68vh";
  return (
    <figure>
      <div className={`overflow-hidden rounded-xl ${frame}`}>
        <div className="flex justify-center">
          <ZoomImage
            src={src}
            alt={alt}
            className="block h-auto"
            style={{ maxWidth: maxW ? `${maxW}px` : "100%", maxHeight: cap }}
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-text-faint">
          {caption} <span className="text-text-faint/70">· click to zoom</span>
        </figcaption>
      )}
    </figure>
  );
}

// Before → After — the change for a section, on one tight line (dim red →
// lime), so the story stays scannable without a heavy block of copy.
function BeforeAfter({ before, after }: { before: ReactNode; after: ReactNode }) {
  return (
    <p className="mt-5 flex flex-col gap-1.5 text-sm leading-relaxed sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2.5">
      <span className="text-text-muted">
        <span className="mr-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#ff6b6b]">
          Before
        </span>
        {before}
      </span>
      <span aria-hidden className="hidden text-text-faint sm:inline">
        →
      </span>
      <span className="text-text">
        <span
          className="mr-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
          style={{ color: "#dcff05" }}
        >
          After
        </span>
        {after}
      </span>
    </p>
  );
}

/* ---------------- snapshot ---------------- */

const GLANCE = [
  { value: "15→3", label: "redundant greys consolidated" },
  { value: "2", label: "tracks — visual design + functionality" },
  { value: "1", label: "published library — one source of truth" },
  { value: "Source Sans", label: "one typeface, one fixed scale" },
];

function GlanceGrid() {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      {GLANCE.map((m) => (
        <div key={m.label} className="border-t border-line pt-4">
          <dt className="font-serif text-[clamp(1.6rem,4vw,3rem)] leading-none text-gradient w-fit">
            {m.value}
          </dt>
          <dd className="mt-3 text-xs leading-snug text-text-muted">{m.label}</dd>
        </div>
      ))}
    </dl>
  );
}

// Atomic-design ladder — the spine the case study is organised around.
const ATOMIC: [string, string][] = [
  ["Atoms", "Color · Type · Elevation · Icons"],
  ["Molecules", "Buttons · Inputs · Chips · Switches"],
  ["Organisms", "Tables · Drawers"],
  ["Templates", "Page layouts"],
  ["Pages", "Real product screens"],
];

function AtomicFlow({ active }: { active?: string }) {
  return (
    <div className="mt-8 flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
      {ATOMIC.map(([t, b], i) => (
        <Fragment key={t}>
          <div
            className={`flex-1 rounded-xl border p-4 transition-colors ${
              active === t
                ? "border-transparent bg-accent text-accent-ink"
                : "border-line bg-surface"
            }`}
          >
            <p className={`font-serif text-base ${active === t ? "" : "text-text"}`}>{t}</p>
            <p className={`mt-1 text-xs ${active === t ? "text-accent-ink/70" : "text-text-faint"}`}>
              {b}
            </p>
          </div>
          {i < ATOMIC.length - 1 && (
            <span
              aria-hidden
              className="flex items-center justify-center px-1 text-text-faint md:px-2"
            >
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

// Big atomic-tier divider (Atoms / Molecules / Organisms / Pages) — the spine
// of the case study, styled as a bold section break à la atomic design.
function TierPhase({ name, tier, blurb }: { name: string; tier: string; blurb: string }) {
  const step = ATOMIC.findIndex(([t]) => t === tier) + 1;
  return (
    <Reveal as="div" className="mt-24 border-t border-line pt-10 md:mt-28">
      {name !== tier && <span className="eyebrow">{name}</span>}
      <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
        <span className="font-mono text-sm text-text-faint">0{step || ""}</span>
        <h2 className="font-serif text-[clamp(2.25rem,6vw,4rem)] leading-none text-text">{tier}</h2>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span aria-hidden className="h-px w-12 shrink-0" style={{ background: "#dcff05" }} />
        <p className="max-w-2xl text-base leading-relaxed text-text-muted">{blurb}</p>
      </div>
    </Reveal>
  );
}

// "System in use" — real product screens assembled from the system.
const IN_USE: { src: string; alt: string; caption: string }[] = [
  {
    src: "/work/self-serve-go-live/02-dashboard.png",
    alt: "Go-live dashboard built from the system — tables, status chips and buttons",
    caption: "Go-Live dashboard — tables, chips, buttons.",
  },
  {
    src: "/work/self-serve-go-live/08-track-live.png",
    alt: "Go-live tracker built from the system",
    caption: "Go-Live tracker.",
  },
  {
    src: "/work/menu-rules/02-builder.png",
    alt: "Menu Rules builder in a drawer, built from the system",
    caption: "Menu Rules builder — drawer, inputs, chips.",
  },
  {
    src: "/work/menu-rules/06-saved.png",
    alt: "Saved menu rules list with toggles, built from the system",
    caption: "Saved rules — table, switches, tags.",
  },
];

/* ================================================================== */

export default function DesignSystemCaseStudy({
  study,
  next,
}: {
  study: CaseStudy;
  next?: CaseStudy;
}) {
  return (
    <article>
      {/* ---------------- HEADER ---------------- */}
      <header className="container-page pt-14 pb-12 md:pt-20">
        <Link href="/work" className="text-sm text-text-muted underline-hover hover:text-text">
          ← All work
        </Link>

        <div className="mt-8 flex flex-wrap gap-2">
          {study.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-3 py-1 text-xs text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] text-balance">
          {study.title}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-text-muted">
          {study.tagline}
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          <MetaItem label="Role" value="Core contributor — foundations & components" />
          <MetaItem label="Product" value="UrbanPiper · Atlas" />
          <MetaItem label="Focus" value="Consistency & a cleaner UI" />
          <MetaItem label="Tools" value="Figma · Styles & Components" />
          <div className="col-span-2 border-t border-line pt-4 sm:col-span-4">
            <dt className="eyebrow">Contribution</dt>
            <dd className="mt-2 text-sm text-text-muted">
              One of a few designers on the system — I built and extended parts as I shipped
              features. Everything below is exported straight from the system file.
            </dd>
          </div>
        </dl>
      </header>

      {/* ---------------- COVER — the real title slide ---------------- */}
      <div className="container-page">
        <Figure
          src={`${A}/doc-cover.png`}
          alt="Platform-Wide Changes — for consistency and a better, cleaner UI"
          variant="slide"
        />
      </div>

      <div className="container-page py-16 md:py-20">
        {/* ---------------- SNAPSHOT ---------------- */}
        <Reveal>
          <span className="eyebrow">The cleanup, at a glance</span>
          <div className="mt-6">
            <GlanceGrid />
          </div>
        </Reveal>

        {/* ---------------- HOOK ---------------- */}
        <Reveal className="mt-20 md:mt-24">
          <Statement>
            What happens when a product ships faster than it can stay consistent?
          </Statement>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-text-muted">
            At scale, the answer is drift. So we stopped and made Atlas consistent again — on purpose.
          </p>
        </Reveal>

        {/* ================= SITUATION ================= */}
        <Phase
          name="Situation"
          blurb="A big product, many squads, styles and components drifting apart. Time for a platform-wide reset."
        />

        {/* 01 · THE INITIATIVE */}
        <Sec
          label="01 · The initiative"
          heading="Platform-wide changes, on two tracks."
          first
        >
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Styles had multiplied", "Redundant text styles; too many greys — half lowered-opacity black."],
              ["Patterns had drifted", "Tables, drawers and buttons behaved differently screen to screen."],
              ["No single source", "No published library, so every team re-made the basics."],
            ].map(([t, b]) => (
              <Card key={t} title={t}>
                {b}
              </Card>
            ))}
          </div>
          <div className="mt-10">
            <Statement>Fewer, fixed styles. One agreed set of components. Every screen speaking the same language.</Statement>
          </div>
        </Sec>

        {/* 02 · THE FOUNDATION — ATOMIC DESIGN */}
        <Sec
          label="02 · The foundation"
          heading="Built with Atomic Design."
          intro="Small pieces compose into larger ones — atoms to pages (after Brad Frost). The rest of this study follows that ladder."
        >
          <AtomicFlow />
        </Sec>

        {/* ================= ATOMS ================= */}
        <TierPhase
          name="Atoms"
          tier="Atoms"
          blurb="The smallest pieces — color, type, elevation, icons. Audit, merge the redundant, give each a role."
        />

        {/* 03 · TYPOGRAPHY */}
        <Sec label="Typography" heading="Merging redundant text styles." first>
          <BeforeAfter
            before="Many styles at the same size and weight, differing only in line-height."
            after="A smaller set of fixed styles. Heading 2 & 3 merged into one."
          />
          <div className="mt-10 grid gap-6">
            <Figure
              src={`${A}/doc-titles.png`}
              alt="Titles and numbers — old styles mapped to a smaller set of new styles"
              variant="slide"
              caption="Old → new — near-identical headings merged."
            />
            <Figure
              src={`${A}/typography.png`}
              alt="The full Source Sans Pro type scale — old styles converted to the new, fixed scale"
              variant="card"
              tall
              caption="The full conversion — Source Sans, 8–48px."
            />
          </div>
        </Sec>

        {/* COLOR */}
        <Sec label="Color" heading="Fewer greys, with a defined role each.">
          <BeforeAfter
            before="Too many near-identical greys — half of them lowered-opacity black."
            after="~15 greys → 3, on a numbered scale, each with a defined role."
          />
          <div className="mt-10 grid gap-6">
            <Figure
              src={`${A}/doc-neutrals.png`}
              alt="Neutral colors — many old greys mapped down to three new greys"
              variant="slide"
              caption="Old → new — a wall of greys down to three."
            />
            <Figure
              src={`${A}/color-styles.png`}
              alt="The published Color Styles — a numbered scale for primary, neutrals and semantic colors"
              variant="card"
              tall
              caption="The published Color Styles — a numbered scale."
            />
          </div>
        </Sec>

        {/* ELEVATION */}
        <Sec label="Elevation & shadows" heading="Less is more — a few named levels.">
          <BeforeAfter
            before="Shadows applied case by case — inconsistent, competing depths."
            after="Four named elevations with fixed values, used deliberately."
          />
          <div className="mt-10">
            <Figure
              src={`${A}/elevation.png`}
              alt="Elevations and shadows — Main Content, Side Drawer, Dark Dialog and Scrim, with exact values"
              variant="card"
              caption="Main Content · Side Drawer · Dark Dialog · Scrim — each a fixed token."
            />
          </div>
        </Sec>

        {/* ICONS (an atom) */}
        <Sec label="Iconography" heading="One icon library.">
          <div className="mt-10 grid gap-6">
            <Figure src={`${A}/icons-functional.png`} alt="Functional icon set" variant="card" caption="Functional icons — actions, controls and states." />
            <Figure src={`${A}/icons-stylised.png`} alt="Stylised icon set" variant="card" caption="Stylised icons — for richer moments." />
            <Figure src={`${A}/platform-logos.png`} alt="Delivery platform logos" variant="card" maxW={72} caption="Platform logos — the delivery platforms Atlas lives among." />
          </div>
        </Sec>

        {/* ================= MOLECULES ================= */}
        <TierPhase
          name="Molecules"
          tier="Molecules"
          blurb="The controls people touch — buttons, inputs, chips, switches — each built once, every state."
        />

        {/* BUTTONS */}
        <Sec label="Buttons" heading="One button system, every state." first>
          <BeforeAfter
            before="In tables, every clickable value was primary-blue; icon actions gave no feedback."
            after="Links go black + underline; icons get hover states; primary/red for real CTAs."
          />
          <p className="mt-8 eyebrow">Filled — Primary · Secondary · Destructive, every size</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <Figure
              src={`${A}/buttons-xl.png`}
              alt="XL buttons — Primary and Secondary in default, hover and disabled, with and without icons"
              variant="card"
              caption="XL — Primary & Secondary, all states + icons"
            />
            <Figure
              src={`${A}/buttons-large.png`}
              alt="Large buttons — Primary, Secondary and Destructive in every state"
              variant="card"
              caption="Large — Primary · Secondary · Destructive"
            />
            <Figure
              src={`${A}/buttons-medium.png`}
              alt="Medium buttons — Primary, Secondary and Destructive in every state"
              variant="card"
              caption="Medium — Primary · Secondary · Destructive"
            />
          </div>

          <p className="mt-10 eyebrow">Link buttons, icon buttons & groups</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <Figure
              src={`${A}/buttons-links.png`}
              alt="Text links — Large, Medium and Small, in default, hover and disabled"
              variant="card"
              caption="Links (text) — Large / Medium / Small, all states"
            />
            <Figure
              src={`${A}/buttons-link-actions.png`}
              alt="Link buttons for actions — Large, Medium and Small with spacing change log"
              variant="card"
              caption="Link buttons (for actions)"
            />
            <Figure
              src={`${A}/buttons-icon.png`}
              alt="Icon buttons, CTA groups and icon split buttons"
              variant="card"
              caption="Icon buttons, CTA groups and icon-split buttons"
            />
            <Figure
              src={`${A}/buttons-doc.png`}
              alt="Button usage documentation — Primary, Secondary, Link, Links, Icon button, CTA groups and placement"
              variant="card"
              tall
              caption="Usage — when to use each"
            />
          </div>

          <p className="mt-10 eyebrow">The functional link & icon changes</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <Figure
              src={`${A}/doc-buttons-links.png`}
              alt="Buttons – Links: link buttons become black with an underline on hover in tables"
              variant="slide"
              caption="Links → black + underline in tables."
            />
            <Figure
              src={`${A}/doc-buttons-icons.png`}
              alt="Buttons – Icons: clickable icons get a hover/active state"
              variant="slide"
              caption="Icons → hover / active states."
            />
          </div>
        </Sec>

        {/* INPUTS & SELECTORS */}
        {/* INPUT FIELDS */}
        <Sec label="Input fields" heading="Every field is labelled.">
          <BeforeAfter
            before="Fields were labelled inconsistently, so forms were easy to misread."
            after="Every input carries a label; states cover plain, helper text, icon, XL and search."
          />
          <div className="mt-10 grid gap-6">
            <Figure
              src={`${A}/inputs-2.png`}
              alt="Input fields — plain, helper text, icon, XL sizes and search, in every state"
              variant="card"
              caption="Input fields — plain, +helper, icon, XL and search, each in default / focus / error."
            />
            <Figure
              src={`${A}/inputs.png`}
              alt="Date picker, time picker and card selectors"
              variant="card"
              caption="Date & time pickers, and card selectors."
            />
          </div>
        </Sec>

        {/* SELECTORS */}
        <Sec label="Selectors" heading="One selector, many shapes.">
          <BeforeAfter
            before="Filters and selects were built ad hoc, each a little different."
            after="Single-select, multi-select and filters — with defined label variations for each."
          />
          <div className="mt-10 grid gap-6">
            <Figure
              src={`${A}/doc-inputs.png`}
              alt="Selectors — label variations: none, on top, or inside the field"
              variant="slide"
              caption="Label variations — none, on top, or inside the field (for filters that need it)."
            />
            <Figure
              src={`${A}/select.png`}
              alt="Single select component with its states"
              variant="card"
              caption="Single-select — every state."
            />
            <Figure
              src={`${A}/select-multi.png`}
              alt="Multi-select component — locations, brands and platforms across every state"
              variant="card"
              caption="Multi-select — locations, brands and platforms, across default / open / selected / tags / error."
            />
            <Figure
              src={`${A}/select-filters.png`}
              alt="Brand, location and platform filters with their states"
              variant="card"
              caption="Filters — brand, location and platform, all-or-one, with and without labels."
            />
          </div>
        </Sec>

        {/* CHIPS, TAGS & TABS */}
        <Sec label="Chips, tags & tabs" heading="Status, carried consistently.">
          <div className="mt-10 grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Figure src={`${A}/status-chip.png`} alt="Status chip variants" variant="card" maxW={640} caption="Status chips" />
              <Figure src={`${A}/order-status-chip.png`} alt="Order status chip variants" variant="card" maxW={640} caption="Order-status chips" />
            </div>
            <Figure src={`${A}/tabs.png`} alt="Navigation tab variants" variant="card" maxW={991} caption="Tabs — horizontal, with overflow controls" />
            <Figure src={`${A}/tags.png`} alt="Tag variants" variant="card" maxW={360} caption="Tags" />
          </div>
        </Sec>

        {/* SWITCHES */}
        <Sec label="Switches" heading="A two-state control, fully drawn.">
          <div className="mt-10">
            <Figure
              src={`${A}/switches.png`}
              alt="Switches — on, off, hover and disabled, with label on left and right"
              variant="card"
              maxW={540}
              caption="On · off · hover · disabled, both label sides."
            />
          </div>
        </Sec>

        {/* ================= ORGANISMS ================= */}
        <TierPhase
          name="Organisms"
          tier="Organisms"
          blurb="The big working blocks — tables and drawers — where most of the functionality track lived."
        />

        {/* TABLES */}
        <Sec label="Tables & actions" heading="The workhorse, made consistent." first>
          <BeforeAfter
            before="Stripe shading like the hover state, inconsistent widths, scattered actions."
            after="Dividers, full-width, a filter bar, a column chooser, a multi-select bar."
          />

          <p className="mt-8 eyebrow">The table</p>
          <div className="mt-4 grid gap-6">
            <Figure
              src={`${A}/tables.png`}
              alt="The table component — caps header, dividers between rows, editable rows"
              variant="card"
              caption="Caps header on the neutral surface, hairline dividers (not stripes), sortable columns."
            />
            <Figure
              src={`${A}/table-example.png`}
              alt="A populated table in context"
              variant="card"
              caption="Populated, in context."
            />
          </div>

          <p className="mt-10 eyebrow">Anatomy</p>
          <div className="mt-4 grid items-start gap-6 sm:grid-cols-2">
            <Figure src={`${A}/table-header.png`} alt="Table header items" variant="card" maxW={528} caption="Header items" />
            <Figure src={`${A}/table-pagination.png`} alt="Table pagination" variant="card" maxW={452} caption="Pagination" />
            <div className="sm:col-span-2">
              <Figure src={`${A}/table-footer.png`} alt="Table footer" variant="card" maxW={760} caption="Footer" />
            </div>
          </div>

          <p className="mt-10 eyebrow">Behaviours</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <Figure src={`${A}/doc-table-rows.png`} alt="Tables – Rows: dividers instead of alternating rows" variant="slide" caption="Rows → dividers, not stripes." />
            <Figure src={`${A}/doc-table-width.png`} alt="Tables – Width: full-width tables, even in drawers" variant="slide" caption="Always full-width." />
            <Figure src={`${A}/doc-table-filters.png`} alt="Tables – Filters & search bar above the table" variant="slide" caption="A fixed filter & search bar." />
            <Figure src={`${A}/doc-table-columns.png`} alt="Tables – Columns: a column chooser" variant="slide" caption="A column chooser." />
            <div className="lg:col-span-2">
              <Figure
                src={`${A}/doc-table-multiselect.png`}
                alt="Tables – Multi-select: a contextual action bar appears above the table"
                variant="slide"
                caption="Multi-select → a contextual action bar."
              />
            </div>
          </div>
        </Sec>

        {/* DRAWERS & LAYOUT */}
        <Sec label="Drawers & layout" heading="Drawers that don’t stack — or lose your work.">
          <BeforeAfter
            before="Drawers stacked over drawers; clicking out could lose unsaved work."
            after="No layering — breadcrumbs replace; unsaved changes keep it open."
          />
          <div className="mt-10 grid gap-6">
            <Figure
              src={`${A}/drawer.png`}
              alt="Drawer layout — breadcrumb, heading, tabs, actions and a Cancel/Save footer"
              variant="card"
              caption="The drawer — breadcrumb, tabs, actions, Cancel / Save footer."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <Figure src={`${A}/doc-drawer-breadcrumbs.png`} alt="Drawers – Breadcrumbs replace layered drawers" variant="slide" caption="Breadcrumbs replace layering." />
              <Figure src={`${A}/doc-drawer-exit.png`} alt="Drawers – Exiting: unsaved changes keep the drawer open" variant="slide" caption="Exit-guard on unsaved changes." />
            </div>
          </div>
        </Sec>

        {/* ================= TEMPLATES & PAGES ================= */}
        <TierPhase
          name="Templates & Pages"
          tier="Pages"
          blurb="Atoms, molecules and organisms assemble into whole pages. The proof is the product itself — real features, built entirely from the system."
        />

        {/* THE SYSTEM, IN USE */}
        <Sec
          label="The system, in use"
          heading="From parts to real product."
          intro="Not mockups — shipped features, assembled from these exact atoms, molecules and organisms."
          first
        >
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {IN_USE.map((s) => (
              <Figure key={s.src} src={s.src} alt={s.alt} variant="card" caption={s.caption} />
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-text-faint">
            End to end in{" "}
            <Link href="/work/self-serve-go-live" className="text-text underline-hover">
              Request to Go Live
            </Link>{" "}
            and{" "}
            <Link href="/work/menu-rules" className="text-text underline-hover">
              Menu Rules
            </Link>
            .
          </p>
        </Sec>

        {/* ================= GOVERNANCE ================= */}
        <Phase
          name="Governance"
          blurb="A system is only real if teams build on it. So it’s published — and using it is the rule."
        />

        {/* THE PUBLISHED FILE */}
        <Sec
          label="The living library"
          heading="Defined once, published for everyone."
          intro="Styles and components are published to one library — and new designs use them only."
          first
        >
          <div className="mt-10">
            <Figure
              src={`${A}/doc-file.png`}
              alt="The UrbanPiper Design System file — published styles and components as the single source of truth"
              variant="slide"
              caption="The published system file — the single source of truth."
            />
          </div>
        </Sec>

        {/* ================= IMPACT ================= */}
        <Phase
          name="Impact"
          blurb="A cleaner, more consistent Atlas — and a shared language teams keep building on."
        />

        {/* OUTCOME */}
        <Sec label="Outcome" heading="One product, one language." first>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-text-muted">
            Redundant styles gone, patterns unified, the library published — teams now assemble
            screens instead of rebuilding them.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["Consistent by default", "New screens inherit the system."],
              ["Less to maintain", "Fewer styles, one component set."],
              ["Faster to build", "Patterns pulled in, not redrawn."],
            ].map(([t, b]) => (
              <Card key={t} title={t}>
                {b}
              </Card>
            ))}
          </div>
        </Sec>

        {/* LESSONS LEARNED */}
        <Sec label="Lessons learned" heading="What building it taught me.">
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["Systems emerge from repetition.", "You find the patterns before you name them."],
              ["Atomic thinking scales clarity.", "Smaller, better-named blocks, stronger structure."],
              ["Consistency is trust.", "A tool that behaves the same everywhere feels dependable."],
            ].map(([t, b], i) => (
              <div key={t} className="rounded-2xl border border-line bg-surface p-6">
                <span className="font-serif text-2xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-serif text-lg leading-snug text-text">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{b}</p>
              </div>
            ))}
          </div>
        </Sec>

        {/* ---------------- FINAL STATEMENT ---------------- */}
        <Reveal as="section" className="mt-20 border-t border-line pt-16 md:pt-24">
          <p className="max-w-4xl font-serif text-[clamp(1.9rem,4.6vw,3.5rem)] leading-[1.08] text-balance">
            A design system isn’t a library of screens.{" "}
            <span className="text-text-muted">
              It’s the agreement that makes every screen feel like the same product.
            </span>
          </p>
        </Reveal>
      </div>

      {/* ---------------- NEXT PROJECT ---------------- */}
      {next && (
        <div className="border-t border-line">
          <Link
            href={`/work/${next.slug}`}
            className="group container-page flex flex-wrap items-center justify-between gap-4 py-16 md:py-20"
          >
            <div>
              <span className="eyebrow">Next project</span>
              <p className="mt-3 font-serif text-[clamp(1.75rem,4vw,3rem)] leading-tight text-text">
                {next.title}
              </p>
            </div>
            <span
              aria-hidden
              className="text-2xl text-text-faint transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent"
            >
              →
            </span>
          </Link>
        </div>
      )}
    </article>
  );
}
