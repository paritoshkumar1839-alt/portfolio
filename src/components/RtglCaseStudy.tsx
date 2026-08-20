import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import CaseStudyFeatures from "@/components/CaseStudyFeatures";
import type { CaseStudy } from "@/lib/case-studies";

/* ------------------------------------------------------------------ *
 * RTGL — Request to Go Live
 * A dedicated, visual-first case study told as one storyline:
 * Situation → Definition → Design → Impact (STAR). Real screenshots
 * carry the product; diagrams fill only the gaps.
 * ------------------------------------------------------------------ */

const METRICS = [
  { value: "1,700", label: "stores processed in 2 months" },
  { value: "13→7", label: "days — average go-live time" },
  { value: "~46%", label: "reduction in go-live time" },
  { value: "38%", label: "fewer support tickets" },
  { value: "~60%", label: "of new & scaling businesses went self-serve (India + MENA)" },
];

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
  intro?: string;
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

// Act break — signals the STAR phase and keeps the long story navigable.
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

// Big pull-quote / highlighted statement with an off-white accent rule.
function Statement({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-accent pl-6 font-serif text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.12] text-balance md:pl-8">
      {children}
    </p>
  );
}

// Figma-style sticky-note callout (matches the site's feature stickies).
function Sticky({ children }: { children: ReactNode }) {
  return (
    <div className="inline-block max-w-md rotate-[-1deg] rounded-md bg-[#f4d24a] px-4 py-3 text-sm font-medium leading-snug text-[#3a2e05] shadow-lg shadow-black/25">
      {children}
    </div>
  );
}

// Horizontal flow of chips joined by arrows (wraps on small screens).
function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
      {steps.map((s, i) => (
        <Fragment key={s + i}>
          <span className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-text">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden className="text-text-faint">
              →
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

// Flow with connecting arrows and optional notes. Vertical by default;
// lays out horizontally (wrapping) once its own container is wide enough —
// so a full-width card flows across, while a narrow column stays stacked.
function VFlow({ steps }: { steps: { label: string; note?: string }[] }) {
  return (
    <div className="@container">
      <div className="mx-auto flex max-w-md flex-col @2xl:mx-0 @2xl:max-w-none @2xl:flex-row @2xl:flex-wrap @2xl:items-stretch @2xl:gap-y-3">
        {steps.map((s, i) => (
          <Fragment key={s.label + i}>
            <div className="rounded-lg border border-line bg-surface-2 px-4 py-3 @2xl:flex @2xl:max-w-[15rem] @2xl:flex-col @2xl:justify-center">
              <p className="text-sm text-text">{s.label}</p>
              {s.note && <p className="mt-1 text-xs text-text-faint">{s.note}</p>}
            </div>
            {i < steps.length - 1 && (
              <>
                <span aria-hidden className="py-1 text-center text-text-faint @2xl:hidden">
                  ↓
                </span>
                <span
                  aria-hidden
                  className="hidden px-1.5 text-text-faint @2xl:flex @2xl:items-center"
                >
                  →
                </span>
              </>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function Card({
  eyebrow,
  title,
  children,
  light = false,
}: {
  eyebrow?: string;
  title?: string;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 ${
        light ? "border-transparent bg-accent text-accent-ink" : "border-line bg-surface"
      }`}
    >
      {eyebrow && (
        <p
          className={`text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
            light ? "text-accent-ink/70" : "text-text-faint"
          }`}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <p className={`mt-3 font-serif text-lg leading-snug ${light ? "" : "text-text"}`}>
          {title}
        </p>
      )}
      {children && (
        <div className={`mt-2 text-sm leading-relaxed ${light ? "text-accent-ink/80" : "text-text-muted"}`}>
          {children}
        </div>
      )}
    </div>
  );
}

// Two-sided perspective columns (used for the discovery interviews).
function Perspective({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-3 text-sm leading-relaxed text-text-muted">
        {points.map((p) => (
          <li key={p} className="flex gap-3">
            <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#ff6b6b]" />
            {p}
          </li>
        ))}
      </ul>
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

function MetricsGrid() {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
      {METRICS.map((m) => (
        <div key={m.label} className="border-t border-line pt-4">
          <dt className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-none text-gradient w-fit">
            {m.value}
          </dt>
          <dd className="mt-3 text-xs leading-snug text-text-muted">{m.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ================================================================== */

export default function RtglCaseStudy({
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
          A fragmented, AM-led store onboarding process, reshaped into a product-led experience —
          giving restaurant merchants ownership, visibility, and a faster path to going live.
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          <MetaItem label="Role" value="Product Designer — owned end to end" />
          <MetaItem label="Timeline" value="~2.5 months" />
          <MetaItem label="Launch" value="India + MENA" />
          <MetaItem label="Platforms" value="6" />
          {study.team && (
            <div className="col-span-2 border-t border-line pt-4 sm:col-span-4">
              <dt className="eyebrow">Team</dt>
              <dd className="mt-2 text-sm text-text-muted">{study.team}</dd>
            </div>
          )}
        </dl>
      </header>

      {/* ---------------- COVER ---------------- */}
      <div className="container-page">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-bg">
          <Media src={study.cover} alt={study.coverAlt} className="!object-contain" />
        </div>
      </div>

      <div className="container-page py-16 md:py-20">
        {/* ---------------- SNAPSHOT ---------------- */}
        <Reveal>
          <span className="eyebrow">Impact · first two months after launch</span>
          <div className="mt-6">
            <MetricsGrid />
          </div>
        </Reveal>

        {/* ---------------- MY ROLE ---------------- */}
        <Reveal as="section" className="mt-16 rounded-2xl border border-line bg-surface p-6 md:p-8">
          <span className="eyebrow">My role</span>
          <p className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-text-muted">
            I owned the design end to end — discovery through UI testing. Four calls were mine to make:
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["The request model", "One brand, on one platform, across selected locations — matching the merchant’s unit, not the AM’s."],
              ["Validation as a gate", "Catch menu problems before the request is sent, not after."],
              ["Per-platform setup", "One platform at a time with what / why / where guidance — not one generic form."],
              ["Tracking & recovery", "In-product status with timestamps, plus a fix-and-retry path that replaces the email."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-xl border border-line bg-surface-2 p-5">
                <p className="font-serif text-base text-text">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-text-faint">
            A senior designer reviewed and critiqued the work; four engineers (2 backend, 2 frontend)
            owned the underlying automation; QA ran the technical testing; account management and
            support brought the regional domain detail. Cadence: ~2.5 weeks discovery · ~2 weeks
            design + iteration · ~6 weeks engineering, QA and release.
          </p>
        </Reveal>

        {/* ================= SITUATION ================= */}
        <Phase
          name="Situation"
          blurb="Going live already existed — but it was run by our team, in the dark, and it was starting to break as we scaled."
        />

        {/* 01 · CONTEXT */}
        <Sec
          label="01 · Context"
          heading="What “going live” actually means."
          intro="UrbanPiper is one place for a restaurant to run every delivery platform it sells on — orders, menus, inventory. But a store only works here once it’s gone live."
          first
        >
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["It’s a connection", "Going live links a store in UrbanPiper to its listing on the platform, so orders flow in."],
              ["Not a launch", "The store already exists on the platform — this isn’t about launching it there."],
              ["Nothing works until then", "Until it’s connected, that store has no orders and nothing to manage here."],
            ].map(([t, b]) => (
              <Card key={t} title={t}>
                {b}
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Sticky>
              A store can’t go live without a menu — there’s no such thing as a live store with a
              blank menu.
            </Sticky>
          </div>
        </Sec>

        {/* 02 · THE PROBLEM */}
        <Sec
          label="02 · The problem"
          heading="Request it, then silence."
          intro="Go-live was requested from Atlas by our own team, on the brand’s behalf — but its progress lived on a separate internal tool that only we could see. Every region and platform had its own rules, so each one meant back-and-forth over email, Slack and WhatsApp."
        >
          <div className="mt-10 rounded-xl border border-line bg-surface p-6 md:p-8">
            <p className="eyebrow">The request, end to end</p>
            <div className="mt-6">
              <VFlow
                steps={[
                  { label: "Merchant" },
                  { label: "Account Manager" },
                  { label: "UrbanPiper" },
                  { label: "Internal tools / shared sheets" },
                  { label: "External platform" },
                  { label: "Internal tracking" },
                  { label: "Account Manager" },
                  { label: "Merchant" },
                ]}
              />
            </div>
          </div>
          <div className="mt-8">
            <Statement>The AM had become the status page.</Statement>
          </div>

          <p className="mt-12 max-w-2xl text-pretty text-lg leading-relaxed text-text-muted">
            As we grew into the US and UK, this broke. Five pressures compounded at once:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Low ownership", "Merchants couldn’t manage the process themselves."],
              ["Invisible progress", "The product never showed where a request was, or what came next."],
              ["Operational dependency", "AMs collected the data, tracked requests and relayed every update."],
              ["Delays", "Platform timelines ran 6–7 days; UrbanPiper-side delays could push go-live past 10."],
              ["Support burden", "Timeline, delay and error questions spiked into support tickets."],
              ["A team-sized bottleneck", "A small account team, so brands queued behind one another."],
            ].map(([t, b]) => (
              <Card key={t} title={t}>
                {b}
              </Card>
            ))}
          </div>
        </Sec>

        {/* 03 · DISCOVERY */}
        <Sec
          label="03 · Discovery"
          heading="I went to both sides of the process."
          intro="To understand why go-live stalled, I sat with the account managers running it across MENA, UK, US and India — and with the merchants who requested it. The same broken process was hurting both."
        >
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Perspective
              title="Brand team — the customer"
              points={[
                "Requested go-live, then had no visibility — couldn’t tell what was live, pending or failed.",
                "Couldn’t even see which locations they’d sent live without digging back through an email.",
                "Typed platform IDs and URLs for every store by hand, unsure what each platform needed.",
                "No way to know if a store’s menu was ready — found out only when it failed.",
                "Every question meant pinging an account manager, then waiting.",
              ]}
            />
            <Perspective
              title="Account managers — our team"
              points={[
                "Ran every go-live by hand on an internal tool the customer couldn’t see.",
                "Buried under rising requests and tickets as more regions came on.",
                "Re-explained region-specific requirements again and again over chat.",
                "Chased customers for the right IDs, URLs and menu fixes.",
                "Became the bottleneck — a small team, so brands waited behind each other.",
              ]}
            />
          </div>

          <p className="mt-14 eyebrow">What I heard, distilled</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["01", "“When will my store go live?”", "Timeline questions were the single most recurring concern."],
              ["02", "The AM was the comms layer.", "Merchants depended on AMs just to understand progress."],
              ["03", "Requirements weren’t consistent.", "Different platforms needed different IDs and information."],
              ["04", "Some failures were preventable.", "Menu problems could be caught before anything went external."],
              ["05", "Failure needed a recovery path.", "Users had to fix what broke and continue — without restarting."],
            ].map(([n, t, b]) => (
              <div key={n} className="rounded-xl border border-line bg-surface p-6">
                <span className="font-serif text-2xl text-accent">{n}</span>
                <p className="mt-3 font-serif text-lg leading-snug text-text">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{b}</p>
              </div>
            ))}
          </div>
        </Sec>

        {/* 04 · CURRENT BEHAVIOUR — real old-flow screenshots */}
        {study.problemFlow?.length ? (
          <CaseStudyFeatures
            features={study.problemFlow}
            label="04 · Current behaviour — the old flow, where it broke"
            intro="Then I walked the flow that already existed, screen by screen, to see exactly where visibility fell away."
          />
        ) : null}

        {/* 05 · PER-PLATFORM REQUIREMENTS */}
        <Sec
          label="05 · Per-platform requirements"
          heading="Different platforms, different requirements."
          intro="Next I mapped what each platform actually needs to go live — with the AM teams, region by region. The challenge wasn’t adding more fields; it was making each one make sense to the merchant."
        >
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <div className="flex flex-wrap gap-2">
                {["Platform ID", "URL", "Business type", "Brand ID", "Chain ID"].map((f) => (
                  <span
                    key={f}
                    className="rounded-md border border-line bg-surface px-3 py-2 font-mono text-xs text-text"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-text-muted">
                So every field had to answer three questions, right where it’s asked:
              </p>
              <div className="mt-4 grid gap-3">
                {[
                  ["What is this?", "Plain language for every field."],
                  ["Why do I need it?", "The reason the platform asks for it."],
                  ["Where do I find it?", "Contextual guidance to the exact source."],
                ].map(([q, a]) => (
                  <div key={q} className="rounded-lg border border-line bg-surface-2 px-4 py-3">
                    <p className="font-serif text-base text-text">{q}</p>
                    <p className="mt-1 text-sm text-text-muted">{a}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-text-faint">
                Support owned the detailed docs; discovery decided where contextual guidance had to
                live inside the product. So setup became one platform at a time — fields that match
                exactly what that platform needs.
              </p>
            </div>
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
                <Media
                  src="/work/self-serve-go-live/03-add-details.png"
                  alt="Add platform details table with per-store IDs and URLs, matched to the selected platform"
                  className="!object-contain"
                />
              </div>
              <figcaption className="mt-3 text-xs text-text-faint">
                Per-platform setup — the fields match exactly what that platform requires.
              </figcaption>
            </figure>
          </div>
        </Sec>

        {/* 06 · PERSONAS */}
        <Sec
          label="06 · Personas"
          heading="Two brand managers, two regions, the same wall."
          intro="I distilled the interviews into two representative personas — the people who felt the old process most across India and MENA."
        >
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                initials: "AM",
                name: "Arjun Mehta",
                role: "Regional Operations Manager",
                region: "India · Bengaluru",
                context: "Runs 100+ outlets for a multi-city QSR chain on Swiggy & Zomato.",
                goals: [
                  "Take a batch of new outlets live before a city launch — without waiting on an AM.",
                  "Tell franchise owners exactly when they’ll be live.",
                ],
                pains: [
                  "Sends the request, then goes silent — no status to share.",
                  "Finds out about a menu problem only when a store fails.",
                ],
                quote: "“I send the request and then I’m just… waiting. I can’t tell my owners a date.”",
                drove:
                  "Bulk per-store setup and the timestamped tracker — so a batch of outlets can go live with a date to share.",
              },
              {
                initials: "LH",
                name: "Layla Haddad",
                role: "Brand Manager",
                region: "MENA · Dubai",
                context: "Manages an F&B group’s listings across Talabat, Deliveroo, Jahez & Noon.",
                goals: [
                  "Go live across platforms with the right per-platform data the first time.",
                  "Understand what each field means before submitting.",
                ],
                pains: [
                  "Every platform asks for something different — IDs, URLs, chain IDs.",
                  "Never sure which value goes where until something breaks.",
                ],
                quote: "“Every platform wants something different. I never know which ID goes where.”",
                drove:
                  "Per-platform setup instead of one generic form, plus the what / why / where guidance on every field.",
              },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border border-line bg-surface p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 font-serif text-lg text-text">
                    {p.initials}
                  </span>
                  <div>
                    <p className="font-serif text-xl leading-tight text-text">{p.name}</p>
                    <p className="text-sm text-text-muted">
                      {p.role} · <span className="text-text-faint">{p.region}</span>
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-text-muted">{p.context}</p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow">Goals</p>
                    <ul className="mt-3 space-y-2 text-sm text-text-muted">
                      {p.goals.map((g) => (
                        <li key={g} className="flex gap-2">
                          <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow">Frustrations</p>
                    <ul className="mt-3 space-y-2 text-sm text-text-muted">
                      {p.pains.map((g) => (
                        <li key={g} className="flex gap-2">
                          <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-[#ff6b6b]" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-6 border-l-2 border-line-strong pl-4 font-serif text-base italic leading-snug text-text">
                  {p.quote}
                </p>
                <p className="mt-5 rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm leading-relaxed text-text-muted">
                  <span className="font-semibold text-text">Drove →</span> {p.drove}
                </p>
              </div>
            ))}
          </div>
        </Sec>

        {/* ================= DEFINITION ================= */}
        <Phase
          name="Definition"
          blurb="With the problem understood from both sides, the goal was simple to state — and one decision shaped everything downstream."
        />

        {/* 07 · OBJECTIVE */}
        <Sec
          label="07 · Objective"
          heading="Put it in the customer’s hands."
          intro="One place in Atlas where a brand can request go-live, track it, and understand it — without going through us."
          first
        >
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "Request stores themselves, without an account manager in the loop.",
              "See real status and timelines inside the product.",
              "Know what’s needed — like whether the menu is ready — before requesting.",
            ].map((g) => (
              <Card key={g}>{g}</Card>
            ))}
          </div>
          <div className="mt-8">
            <p className="eyebrow">Design goals</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                "Own the request",
                "See progress",
                "Prevent avoidable failures",
                "Recover from failures",
                "Go live faster",
              ].map((g) => (
                <span key={g} className="rounded-full border border-line px-4 py-2 text-sm text-text">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </Sec>

        {/* 08 · THE CORE DECISION */}
        <Sec
          label="08 · The core decision"
          heading="What should one request represent?"
          intro="The old model bundled go-live by location — one location, taken live across all its platforms at once. It was efficient for the AM processing it. It wasn’t how any merchant thinks."
        >
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Card eyebrow="Old · location-first — built for us">
              <p className="text-text">One location → all its platforms, in one go.</p>
              <ul className="mt-3 space-y-2">
                <li>✕ Fewer requests for an AM — a provider-centric unit</li>
                <li>✕ Forces one aggregate status per location</li>
                <li>✕ Hides per-platform failure</li>
              </ul>
            </Card>
            <div className="rounded-xl border border-transparent bg-accent p-6 text-accent-ink">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent-ink/70">
                New · the merchant’s unit
              </p>
              <p className="mt-3 font-serif text-xl leading-tight">
                Brand × Location × Platform
              </p>
              <p className="mt-2 text-sm leading-relaxed text-accent-ink/80">
                “Domino’s · Whitefield · Swiggy” is one cell. A request groups one brand, on one
                platform, across the locations you choose.
              </p>
            </div>
          </div>

          {/* Status matrix — proves the unit is the cell */}
          <figure className="mt-8">
            <div className="overflow-x-auto rounded-xl border border-line bg-surface p-5 md:p-7">
              <div className="min-w-[440px]">
                <p className="eyebrow">Brand · Domino’s</p>
                <div className="mt-4 grid grid-cols-4 gap-px overflow-hidden rounded-lg border border-line bg-line text-sm">
                  {/* header row */}
                  <div className="bg-surface-2 px-4 py-3 text-text-faint">Location</div>
                  {["Swiggy", "Zomato", "Talabat"].map((p) => (
                    <div key={p} className="bg-surface-2 px-4 py-3 font-medium text-text">
                      {p}
                    </div>
                  ))}
                  {/* body rows: each cell is an independent go-live state */}
                  {[
                    ["Whitefield", ["live", "failed", "pending"]],
                    ["Indiranagar", ["live", "live", "pending"]],
                    ["Koramangala", ["pending", "live", "failed"]],
                  ].map(([loc, states]) => (
                    <Fragment key={loc as string}>
                      <div className="bg-surface px-4 py-3 text-text-muted">{loc as string}</div>
                      {(states as string[]).map((s, i) => (
                        <div key={i} className="bg-surface px-4 py-3">
                          {s === "live" && <span className="text-text">● Live</span>}
                          {s === "failed" && <span className="text-[#ff6b6b]">✕ Failed</span>}
                          {s === "pending" && <span className="text-text-faint">○ Pending</span>}
                        </div>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
            <figcaption className="mt-3 text-xs text-text-faint">
              The same outlet is live on one platform and failed on another. Status only ever exists
              at the cell — so “Whitefield is live” can’t be true or false.
            </figcaption>
          </figure>

          {/* Justification — why the unit is the triple */}
          <div className="mt-10">
            <p className="eyebrow">Why a merchant thinks in that unit</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Status lives per platform", "A store can be live on Swiggy and down on Zomato at once — same kitchen, separate listing, independent go-live."],
                ["Operations are per platform", "Menu, price, availability, promos, commission and the order stream are all maintained platform by platform."],
                ["One address is many brands", "Cloud kitchens run several brands from one location, so “location” alone is ambiguous — the brand is what an operator owns and reports on."],
                ["“Live” is a revenue statement", "“Are we live?” means “are Swiggy orders landing at Domino’s Whitefield?” — the cell is where money actually flows."],
              ].map(([t, b]) => (
                <Card key={t} title={t}>
                  {b}
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Statement>
              “How many Domino’s stores are live on Swiggy?” — never “how many locations across my
              brands?”
            </Statement>
          </div>
        </Sec>

        {/* ================= DESIGN ================= */}
        <Phase
          name="Design"
          blurb="I mapped the whole path first, iterated on the hard parts, then built it screen by screen."
        />

        {/* 09 · USER FLOW */}
        <Sec
          label="09 · User flow"
          heading="One path, one job per step."
          intro="Before designing screens, I mapped the end-to-end flow — one brand, selected locations, one platform at a time — so validation and tracking were part of the path, not bolted on."
          first
        >
          <div className="mt-10 rounded-xl border border-line bg-surface p-6 md:p-10">
            <VFlow
              steps={[
                { label: "Atlas → Settings → Platform Integration" },
                { label: "Select platform" },
                { label: "Select brand", note: "One brand, selected locations" },
                { label: "Take stores live" },
                { label: "Enter platform details", note: "Contextual field guidance" },
                { label: "Associate a menu per store" },
                { label: "Activate stores" },
                { label: "Validation", note: "Behind-the-scenes gate — not a tracker stage" },
                { label: "Request submitted" },
                { label: "Track progress" },
                { label: "Store live  /  fix & retry" },
              ]}
            />
          </div>
        </Sec>

        {/* 10 · IDEATION & ITERATION */}
        <Sec
          label="10 · Ideation & iteration"
          heading="The hard parts came from iterating, not the first sketch."
          intro="Two decisions only became clear after testing rougher versions against how people actually work."
        >
          {/* iteration A — validation as a gate */}
          <div className="mt-10 rounded-2xl border border-line bg-surface p-6 md:p-8">
            <p className="eyebrow">Iteration 1 · Menu validation</p>
            <h3 className="mt-3 font-serif text-xl leading-tight text-text md:text-2xl">
              Catch what we can, before the platform can’t.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
              Menu problems were the most common cause of a failed go-live — and because many
              locations share one menu, a single fix protects them all. So validation runs before
              the request is ever sent. It’s a gate, not a tracker stage: invisible unless it finds
              something.
            </p>
            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <Flow steps={["Error detected", "Fix menu", "Continue"]} />
              <p className="max-w-sm border-l-2 border-accent pl-4 font-serif text-base leading-snug text-text">
                Catch what UrbanPiper controls before handing the request to a system it can’t.
              </p>
            </div>
          </div>

          {/* iteration B — menu selection trade-off */}
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 md:p-8">
            <p className="eyebrow">Iteration 2 · Menu selection — speed vs. confidence</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card eyebrow="First iteration" title="Menu cards with previews">
                Let users visually verify the menu before choosing.
              </Card>
              <Card eyebrow="The problem" title="Previews slowed it down">
                Most users already knew exactly which menu they wanted.
              </Card>
              <Card light eyebrow="Final" title="Dropdown + preview after">
                Preview the selected menu in a separate tab via existing Menu Management.
              </Card>
            </div>
            <p className="mt-6 border-l-2 border-line-strong pl-4 font-serif text-lg leading-snug text-text">
              Optimise the common path — without removing confidence for the edge cases.
            </p>
          </div>
        </Sec>

        {/* 11 · WHAT WE BUILT — real screenshots */}
        {study.features?.length ? (
          <CaseStudyFeatures
            features={study.features}
            label="11 · The solution — what we built"
            intro="One self-serve flow, end to end: request, set up per platform, catch menu problems before submitting, and track every step to live."
          />
        ) : null}

        {/* 12 · TRACKING */}
        <Sec
          label="12 · Tracking"
          heading="From “we’ll notify you” to “here’s where your request is.”"
        >
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
                <Media
                  src="/work/self-serve-go-live/08-track-live.png"
                  alt="Go-live progress tracker: request, mapping, menu published, live — each with a timestamp"
                  className="!object-contain"
                />
              </div>
              <figcaption className="mt-3 text-xs text-text-faint">
                Request → mapping → menu published → live, with the time each step happened. Errors
                surface at the exact stage they occur.
              </figcaption>
            </figure>
            <div>
              <p className="text-sm leading-relaxed text-text-muted">
                Failed requests are visible on the platform page, and a banner on the brand’s store
                listing highlights failures and prioritises them. The tracker answers, in the
                product:
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Where is my store?", "What happened?", "Do I need to act?", "What happens next?"].map(
                  (q) => (
                    <div
                      key={q}
                      className="rounded-lg border border-line bg-surface-2 px-4 py-4 text-center text-sm text-text"
                    >
                      {q}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </Sec>

        {/* 13 · FAILURE → RECOVERY */}
        <Sec label="13 · Failure → recovery" heading="A failure shouldn’t mean starting over.">
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
                <Media
                  src="/work/self-serve-go-live/09-error-explained.png"
                  alt="A failure explained in plain English, with the technical detail and a way to fix and retry"
                  className="!object-contain"
                />
              </div>
              <figcaption className="mt-3 text-xs text-text-faint">
                The reason is in the product now — plain-English, with the detail underneath, and a
                clear path to fix and retry.
              </figcaption>
            </figure>
            <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
              <p className="eyebrow">The recovery loop</p>
              <div className="mt-6">
                <VFlow
                  steps={[
                    { label: "Failure" },
                    { label: "Identify where it failed" },
                    { label: "Understand the issue" },
                    { label: "Fix — in Menu Management if it’s a menu issue" },
                    { label: "Retry", note: "Everything already entered is preserved" },
                  ]}
                />
              </div>
            </div>
          </div>
        </Sec>

        {/* 14 · SHOW VS HIDE */}
        <Sec label="14 · What we show vs. hide" heading="Simplicity is the product.">
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
              <p className="eyebrow">Hidden complexity</p>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                {[
                  "Internal scripts",
                  "Technical validation",
                  "Platform communication",
                  "Internal tools",
                  "Backend processing",
                ].map((x) => (
                  <li key={x}>— {x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-transparent bg-accent p-6 text-accent-ink md:p-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent-ink/70">
                Merchant-facing
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {["Mapping", "Menu published", "Store live"].map((x) => (
                  <li key={x}>✓ {x}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-text">
            Merchants chose UrbanPiper to simplify the operational complexity. They don’t need to
            understand the machinery behind it.
          </p>
        </Sec>

        {/* ================= IMPACT ================= */}
        <Phase
          name="Impact"
          blurb="Go-live moved from a task our team ran by hand to one brands run themselves."
        />

        {/* 15 · OUTCOME */}
        <Sec label="15 · Outcome" heading="1,700 stores live in two months." first>
          <div className="mt-10">
            <MetricsGrid />
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-text-faint">
            Measured over the first two months after launch, against the prior AM-led baseline
            (average go-live 13 days → 7). Adoption is per business — the share of new and scaling
            merchants in supported India + MENA regions who went self-serve rather than through an AM.
            Design through release ran ~2.5 months.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["Adoption is ongoing", "Some merchants scaling large store counts still leaned on AMs — a live opportunity, not a failure."],
              ["Platforms still shift", "External platforms can change validation rules without notice, so some issues surfaced after internal checks."],
              ["Next on the roadmap", "UK / US support issues were identified as future work."],
            ].map(([t, b]) => (
              <Card key={t} title={t}>
                {b}
              </Card>
            ))}
          </div>
        </Sec>

        {/* 16 · LEARNINGS */}
        <Sec label="16 · Learnings">
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Understand both sides first.", "The insight that shaped everything came from the AMs, not just the customer."],
              ["Visibility is part of the product.", "Users don’t need every technical state — they need meaningful progress."],
              ["Flexibility isn’t always better.", "One brand + selected locations created clearer ownership and tracking."],
              ["Error handling is a workflow.", "Detect → Explain → Fix → Retry."],
            ].map(([t, b]) => (
              <Card key={t} title={t}>
                {b}
              </Card>
            ))}
          </div>
        </Sec>

        {/* ---------------- FINAL STATEMENT ---------------- */}
        <Reveal as="section" className="mt-20 border-t border-line pt-16 md:pt-24">
          <p className="max-w-4xl font-serif text-[clamp(1.9rem,4.6vw,3.5rem)] leading-[1.08] text-balance">
            RTGL wasn’t about removing the AM from the process.{" "}
            <span className="text-text-muted">
              It was about moving the process into the product.
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
