import { ViewTransition, type ReactNode } from "react";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import AgentLoop from "@/components/AgentLoop";
import JtbdBoard from "@/components/JtbdBoard";
import HmwBoard from "@/components/HmwBoard";
import PageNav from "@/components/PageNav";
import ScreenGallery, { type GalleryScreen } from "@/components/ScreenGallery";
import StudyViews from "@/components/StudyViews";
import StrategyRoadmap from "@/components/StrategyRoadmap";
import ProductDemo from "@/components/ProductDemo";
import LottieClip from "@/components/LottieClip";
import PlatformLogo from "@/components/PlatformLogo";
import RtglProcessMap from "@/components/RtglProcessMap";
import type { CaseStudy } from "@/lib/case-studies";

/* ------------------------------------------------------------------ *
 * RTGL — Request to Go Live
 * Built from the case-study deck: Brief → Discover → Define → Develop →
 * Deliver. Real screens carry the solution; everything else stays short.
 * ------------------------------------------------------------------ */

const A = "/work/self-serve-go-live";
const V = `${A}/v2`;

const METRICS = [
  { value: "~8 hrs", label: "from request to store live — down from ~3 days" },
  { value: "650+", label: "stores taken live in the first month (brand × location)" },
  { value: "100%", label: "of those requests raised by brand managers themselves — up from ~0%" },
];

const OUTCOMES = [
  "Onboarding managers used to collect every store's details and link it by hand. In India, brand managers now do it themselves — onboarding managers only step in for edge cases.",
  "Go-live support tickets in India mostly stopped.",
];


/** Edge cases, empty states and other screens shown after the demo (public/work/self-serve-go-live/other/). */
const O = `${A}/other`;
const OTHER_SCREENS: GalleryScreen[] = [
  {
    src: `${O}/failed-requests.webp`,
    kind: "error",
    title: "Failed requests, at a glance",
    text: "Filter to Failed and a banner sums it up — 5 of 120 stores need fixing, the other 116 are already live.",
  },
  {
    src: `${O}/store-id-not-found.webp`,
    kind: "error",
    title: "Store ID not found",
    text: "Mapping fails on a wrong platform ID — the tracker stops at that step, says why, and asks for a corrected resubmit.",
  },
  {
    src: `${O}/menu-publish-failed.webp`,
    kind: "error",
    title: "Menu publish failed",
    text: "Mapping went through but the menu didn't — the issue sits on the step where it happened, with a link to the error.",
  },
  {
    src: `${O}/error-explained.webp`,
    kind: "state",
    title: "The error, in plain words",
    text: "Raw platform errors get a plain-language explanation on top; the payload stays below for support to dig into.",
  },
  {
    src: `${O}/copy-to-all.webp`,
    kind: "edge",
    title: "One menu for every store",
    text: "Copying a menu to all storefronts warns first, because it replaces menus already assigned.",
  },
  {
    src: `${O}/mixed-menus.webp`,
    kind: "state",
    title: "Different menus per store",
    text: "Each storefront can carry its own menu — lunch, dinner, veg — all set from one table.",
  },
  {
    src: `${O}/menu-preview.webp`,
    kind: "state",
    title: "Preview before publishing",
    text: "Look-alike menus open in a new tab as the platform will show them, so the right one gets picked.",
  },
];

/* ---------------- type + layout primitives ----------------
 * Modelled on a calm editorial case-study system: one 720px reading
 * column, 16/26 body, 20px section heads, small uppercase tag labels,
 * 64px between sections. Only images break out wider.
 * ---------------------------------------------------------- */

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

function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-[16px] font-semibold leading-[24px] text-text">{children}</h3>;
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

/** A section of the reading column, 64px from the one before. */
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
    <div className={`relative overflow-hidden rounded-[10px] border border-line bg-surface ${className}`}>
      <Media src={src} alt={alt} className="!object-contain" />
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[10px] border border-line bg-surface p-5 ${className}`}>{children}</div>;
}

/** Phase marker — a numbered tag, a 40px title, a one-line purpose. */
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
    <>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
        {METRICS.map((m) => (
          <div key={m.label}>
            <dt className="text-[40px] font-bold leading-none tracking-[-0.03em] text-cta md:text-[48px]">
              <CountUp value={m.value} />
            </dt>
            <dd className="mt-2 text-[13px] leading-[20px] text-text-muted">{m.label}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-8 space-y-2">
        {OUTCOMES.map((t) => (
          <li key={t} className="flex gap-3 text-[15px] leading-[23px] text-text-muted">
            <span aria-hidden className="text-text-faint">·</span>
            {t}
          </li>
        ))}
      </ul>
    </>
  );
}

/* ================================================================== */
/* Quick read — the whole story in ~3 minutes, for a fast scan.        */
/* ================================================================== */

/** Before → after: where the ~3 days went, and what's left now. */
function TimeBar() {
  return (
    <div className="mt-8 space-y-5">
      <div>
        <div className="flex items-baseline justify-between">
          <Label>Before · ~3 days</Label>
        </div>
        <div className="mt-3 flex h-8 overflow-hidden rounded-[6px] border border-line text-[12px] font-medium">
          <div className="flex items-center justify-center bg-[#e5484d]/15 px-2 text-[#ff9b9b]" style={{ width: "31%" }}>Collect data · 1 day</div>
          <div className="flex items-center justify-center bg-surface-2 text-text-muted" style={{ width: "7%" }}>Map</div>
          <div className="flex items-center justify-center bg-[#e5484d]/25 px-2 text-[#ff9b9b]" style={{ width: "62%" }}>Manual scripts · ~2 days</div>
        </div>
      </div>
      <div>
        <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.12em] text-cta">Now · ~8 hours</p>
        <div className="mt-3 flex h-8 items-center whitespace-nowrap rounded-[6px] bg-cta/20 px-3 text-[12px] font-medium text-cta" style={{ width: "10%", minWidth: "8rem" }}>
          Request → live
        </div>
      </div>
    </div>
  );
}

function QuickRead() {
  const decisions: { title: string; text: string; media: ReactNode }[] = [
    {
      title: "Ask only for what UrbanPiper can't know",
      text: "The platform's sheet had 11 fields per store, all typed by hand. UrbanPiper already had most of them, so the form asks for just two: the platform store ID and URL.",
      media: <Shot src={`${A}/03-add-details.png`} alt="Adding store IDs and URLs" className="aspect-[1304/856]" />,
    },
    {
      title: "Catch menu problems before they go out",
      text: "Wrong menus were a top reason go-lives failed. Prism checks every menu against the platform's rules in the flow — errors block submitting, warnings don't, and fixes happen right there.",
      media: <Shot src={`${A}/05-menu-issues.png`} alt="Menu issues listed in plain words" className="aspect-[1280/832]" />,
    },
    {
      title: "Work around a sheet we couldn't touch",
      text: "Platforms own the linking sheet and offer no API. Partnerships agreed to take details by email instead, and Nexus, a backend AI agent, sends each request and reads the reply — so the status updates itself.",
      media: <AgentLoop />,
    },
    {
      title: "A dropdown, not a rich menu preview",
      text: "My first version showed rich menu cards with a full preview. After release, most brand managers never opened it — they already map menus in their own sheet. A fast dropdown shipped, with preview in a new tab for look-alike menus.",
      media: <Shot src={`${V}/menu-dropdown-preview.png`} alt="Menu dropdown with preview" className="aspect-[2560/1664]" />,
    },
  ];

  return (
    <>
      <Block tag="Context" title="One dashboard for every delivery platform — once a store is linked">
        <P>
          Restaurants sell on several delivery platforms at once, like Swiggy and Zomato. Without
          UrbanPiper, every platform means its own tablet, its own menus and its own orders — managed
          separately, store by store.
        </P>
        <P>
          UrbanPiper brings them into one dashboard, tied to the restaurant&rsquo;s POS:
        </P>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ["Orders in one place", "Swiggy and Zomato orders land in UrbanPiper and the POS — no juggling tablets."],
            ["Menus for every store, every platform", "Manage the menus for all your stores across every delivery platform, from one place."],
            ["Stock in sync", "Mark an item out once, and it's off on every platform."],
          ].map(([t, d]) => (
            <Card key={t}>
              <p className="text-[15px] font-semibold leading-[21px] text-text">{t}</p>
              <p className="mt-1.5 text-[14px] leading-[21px] text-text-muted">{d}</p>
            </Card>
          ))}
        </div>
        <P className="mt-6">
          Getting a brand onto UrbanPiper happens in <span className="text-text">two parts</span>:
        </P>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
          <Card>
            <Label>1 · Onboarding setup</Label>
            <p className="mt-2 text-[15px] leading-[23px] text-text-muted">
              The brand&rsquo;s stores are created in UrbanPiper — locations, schedules, operations — and
              their menus are built.
            </p>
          </Card>
          <span aria-hidden className="self-center text-center text-[18px] text-text-faint">
            <span className="sm:hidden">↓</span>
            <span className="hidden sm:inline">→</span>
          </span>
          <Card className="border-cta/40">
            <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.12em] text-cta">
              2 · Link — this project
            </p>
            <p className="mt-2 text-[15px] leading-[23px] text-text">
              Each store is linked to the same store already on Swiggy and Zomato, so its orders and menus
              run through UrbanPiper. Internally, this is <span className="font-semibold">RTGL</span>{" "}
              — Request to Go Live.
            </p>
          </Card>
        </div>
      </Block>
      <Reveal className={`${COL} mt-8`}>
        <div className="overflow-hidden rounded-[10px] border border-line bg-white">
          <LottieClip src={`${V}/ecosystem.json`} label="UrbanPiper linked to every delivery platform" className="aspect-[1517/952] w-full" />
        </div>
      </Reveal>

      <Block tag="The problem" title="Linking ran on a shared sheet, by hand — and took about 3 days">
        <P>
          Platforms only link stores through a shared sheet they own, passed back and forth. So every
          store went through UrbanPiper&rsquo;s onboarding team:
        </P>
        <ol className="mt-6 space-y-3">
          {[
            ["Brand manager", "sends store IDs, URLs and menus over Slack, WhatsApp or email"],
            ["Onboarding manager", "types 11 fields per store into the platform's sheet"],
            ["Platform", "maps the stores in 2–8 hours, and sends the sheet back"],
            ["Another team", "runs manual scripts to enable stores and publish menus — about 2 days in the queue"],
            ["Onboarding manager", "emails the brand manager that the stores are live"],
          ].map(([who, what], i) => (
            <li key={i} className="grid grid-cols-[1.75rem_1fr] gap-3">
              <span className="flex size-6 items-center justify-center rounded-full border border-line-strong text-[12px] font-semibold tabular-nums text-text-muted">
                {i + 1}
              </span>
              <p className="text-[15px] leading-[24px] text-text-muted">
                <span className="font-semibold text-text">{who}</span> {what}
              </p>
            </li>
          ))}
        </ol>
        <P className="mt-6">
          The brand manager saw none of it — so they chased for updates, and support tickets kept rising.
        </P>
        <TimeBar />
      </Block>

      <Block tag="How I found it" title="Tickets, interviews, and one real go-live">
        <div className="mt-6 space-y-3">
          {[
            ["150–200 tickets", "Five complaints kept repeating — delays, no visibility, chasing, wrong details, menu problems."],
            ["7 interviews", "5 brand managers, and the 2 onboarding leads for India and MENA."],
            ["Shadowed a go-live", "The platform took hours. The days went into our own hand-offs and scripts."],
          ].map(([t, d]) => (
            <div key={t} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <span className="text-[15px] font-semibold leading-[24px] text-text">{t}</span>
              <span className="text-[15px] leading-[24px] text-text-muted">{d}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block tag="The solution" title="Brand managers link their own stores — and see every step">
        <P>
          A self-serve flow in UrbanPiper: pick the platform, add each store&rsquo;s ID and URL, assign
          menus, fix any menu issues, and track every store to live.
        </P>
      </Block>
      <Reveal className={`${WIDE} mt-8`}>
        <ProductDemo />
      </Reveal>

      <Block tag="Key decisions" title="Four calls that shaped it" />
      <div className={`${WIDE} mt-8 space-y-14`}>
        {decisions.map((d, i) => (
          <Reveal key={d.title} className="grid items-center gap-6 md:grid-cols-[1fr_1.5fr] md:gap-10">
            <div>
              <p className="text-[13px] font-semibold text-cta">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-[18px] font-semibold leading-[24px] text-text">{d.title}</p>
              <p className="mt-2 text-[15px] leading-[23px] text-text-muted">{d.text}</p>
            </div>
            {d.media}
          </Reveal>
        ))}
      </div>

      <Block tag="Impact" title="What changed">
        <P>One month after release, for Swiggy and Zomato in India.</P>
        <div className="mt-8 border-y border-line py-8">
          <Metrics />
        </div>
      </Block>

      <Block tag="What I learned">
        <Quote>Most of the win was system design, not screens.</Quote>
      </Block>
    </>
  );
}

export default function RtglCaseStudy({
  study,
  next,
}: {
  study: CaseStudy;
  next?: CaseStudy;
}) {
  return (
    <article className="pb-24 lg:pl-52">
      {/* ---------------- HERO ---------------- */}
      <header className={`${COL} pt-14 md:pt-24`}>
        <Link href="/work" className="text-[14px] text-text-muted underline-hover hover:text-text">
          ← All work
        </Link>
        <Label className="mt-10">UrbanPiper · 2026 · B2B web app</Label>
        <h1 className="mt-4 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-balance text-text md:text-[60px]">
          Connecting Swiggy and Zomato stores to UrbanPiper,{" "}
          <span className="text-cta">self-serve</span>
        </h1>
        <p className="mt-5 text-pretty text-[18px] leading-[28px] text-text-muted">
          Linking each Swiggy and Zomato store to UrbanPiper used to take an
          onboarding manager about 3 days, by hand. Now a restaurant does it
          itself in roughly 8 hours — orders, menus and every other operation
          from one place.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
          {[
            ["Role", "Sole Product Designer"],
            ["Team", "1 PM · 7 engineers"],
            ["Scope", "Swiggy & Zomato · India"],
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
        quickTime="4 min"
        fullTime="12 min"
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
                { id: "more-screens", label: "More screens" },
                { id: "deliver", label: "Deliver" },
                { id: "learnings", label: "What I learned" },
                { id: "reflections", label: "Reflections" },
              ]}
            />
            {/* ---------------- THE BRIEF ---------------- */}
            <Block tag="The brief" id="brief" title="Linking was slow, and nobody could see why">
              {/* the problem, highlighted — same lime-bar treatment as the page's key quotes */}
              <div className="mt-6 border-l-2 border-cta pl-5">
                <Label>Problem</Label>
                <p className="mt-2 text-pretty text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] text-text md:text-[26px]">
                  Linking stores was manual — onboarding managers filled shared sheets with each platform by
                  hand. It was slow, hard to track, and support tickets were rising day by day.
                </p>
              </div>

              <dl className="mt-8 space-y-5">
                {[
                  ["Goal", "Find out what was wrong, and make linking faster and cleaner."],
                  ["Team", "Sole designer · 1 PM · 4 backend + 3 frontend engineers · Onboarding team"],
                  ["My role", "Owned design end to end — research, interaction design, prototyping and design QA with engineering. I grounded it in conversations with onboarding managers across India and MENA."],
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
              <div className="mt-6 border-l-2 border-cta pl-5">
                <Label>Solution</Label>
                <p className="mt-2 text-pretty text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] text-text md:text-[26px]">
                  A self-serve flow — brand managers link their own stores, catch menu problems before they fail,
                  and track every store until it&rsquo;s live.
                </p>
              </div>
              <div className="mt-8 border-y border-line py-8">
                <Metrics />
              </div>
            </Block>

            {/* ---------------- CONTEXT ---------------- */}
            <Block tag="Context" id="context" title="The software layer between a restaurant and every platform it sells on">
              <P>
                UrbanPiper pulls orders, menus and operations from Swiggy, Zomato, Talabat and more into
                one dashboard, tied to the restaurant&rsquo;s POS.
              </P>
            </Block>
            <Reveal className={`${COL} mt-8`}>
              <div className="overflow-hidden rounded-[10px] border border-line bg-white">
                <LottieClip src={`${V}/ecosystem.json`} label="UrbanPiper linked to every delivery platform" className="aspect-[1517/952] w-full" />
              </div>
            </Reveal>

            <Block tag="The job" title="What it means to link a store to a platform">
              <P>
                Onboarding has two parts. Setting up a restaurant&rsquo;s stores and menus is a different
                job from linking those stores to each delivery platform — so the product keeps them
                separate. This project is the second part.
              </P>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Card>
                  <Label>1 · Set up</Label>
                  <ul className="mt-3 space-y-1.5 text-[15px] leading-[22px] text-text-muted">
                    {["Stores created", "Store setup completed", "Schedules & operations configured", "Menu setup completed"].map((s) => (
                      <li key={s} className="flex gap-2.5">
                        <span aria-hidden className="text-cta">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="border-cta/40">
                  <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.12em] text-cta">
                    2 · Link
                  </p>
                  <p className="mt-3 text-[15px] leading-[22px] text-text">
                    Map each store to its listing on the platform, so it can be managed there through
                    UrbanPiper.
                  </p>
                </Card>
              </div>
            </Block>

            <Block tag="Users" id="users" title="Built for brand managers — but done by onboarding managers">
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Card>
                  <Label>The restaurant</Label>
                  <p className="mt-3 text-[16px] font-semibold leading-[22px] text-text">Brand manager</p>
                  <p className="mt-2 text-[14px] leading-[21px] text-text-muted">
                    Single- or multi-brand, any number of locations. Their stores are already on delivery
                    platforms like Swiggy and Zomato — they need each one linked to UrbanPiper.
                  </p>
                </Card>
                <Card>
                  <Label>UrbanPiper</Label>
                  <p className="mt-3 text-[16px] font-semibold leading-[22px] text-text">Onboarding manager</p>
                  <p className="mt-2 text-[14px] leading-[21px] text-text-muted">
                    Did the setup and linked every store, on every platform, for them.
                  </p>
                </Card>
              </div>

            </Block>

            <Block tag="Regions & platforms" title="One product, many markets — each with its own delivery platforms">
              <P>
                UrbanPiper runs across 40,000+ locations in 30+ countries. Every region has its own set of
                delivery platforms — and each platform its own way of linking a store.
              </P>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { region: "India", apps: ["Swiggy", "Zomato", "DotPe"] },
                  { region: "MENA", apps: ["Talabat", "Careem", "Keeta", "Jahez", "HungerStation", "Mrsool"] },
                  { region: "US & Canada", apps: ["DoorDash", "Uber Eats", "Grubhub", "Caviar"] },
                  { region: "UK & Europe", apps: ["Deliveroo", "Just Eat", "Glovo"] },
                ].map((r) => (
                  <Card key={r.region}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[15px] font-semibold text-text">{r.region}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {r.apps.map((a) => (
                        <PlatformLogo key={a} name={a} />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-[20px] text-text-faint">
                A selection of the delivery platforms UrbanPiper integrates with, from its public integrations
                list.
              </p>
            </Block>


            {/* ================= 1 · DISCOVER ================= */}
            <Phase n={1} id="discover" title="Discover" sub="Why linking a store took days instead of hours." />

            <Block tag="How I dug in" title="Before designing anything, I found out what was breaking">
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["150–200 support tickets", "Every go-live ticket from the last quarter, grouped by complaint."],
                  ["7 interviews", "5 brand managers, and the 2 onboarding leads for India and MENA."],
                  ["Shadowed a live go-live", "Sat in on a brand manager's Zomato go-live, email thread included, from request to live."],
                ].map(([t, d], i) => (
                  <Card key={t}>
                    <p className="text-[13px] font-semibold text-text-faint">{String(i + 1).padStart(2, "0")}</p>
                    <div className="mt-2">
                      <H3>{t}</H3>
                    </div>
                    <p className="mt-1 text-[14px] leading-[22px] text-text-muted">{d}</p>
                  </Card>
                ))}
              </div>
            </Block>

            <Block tag="Support tickets" title="Five complaints kept repeating">
              <P>I grouped 150–200 tickets from different brands and businesses. The same five patterns came up again and again.</P>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {[
                  ["Delays", "Stores sat waiting for days"],
                  ["No visibility", "No idea where the request was"],
                  ["Chasing", "Constant follow-ups for status"],
                  ["Wrong details", "Small mistakes sent it back"],
                  ["Menu problems", "The menu didn't come out right"],
                ].map(([t, d]) => (
                  <li key={t} className="grid gap-0.5 py-3 text-[16px] leading-[26px] sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <span className="font-semibold text-text">{t}</span>
                    <span className="text-text-muted">{d}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block tag="The old process" title="How a store went live before">
              <P>Every link ran by hand — through onboarding managers, a shared sheet and two other teams.</P>
              <ol className="mt-6 space-y-6">
                {[
                  ["Data gathering", "Onboarding asks the brand manager for store IDs, URLs and menus over Slack, WhatsApp and email, then types it all into a shared sheet — one per platform."],
                  ["Platform linking", "The sheet goes to Swiggy or Zomato to link the stores on their side, and comes back confirming which went through."],
                  ["Go-live", "The tech team runs a menu publish script, and onboarding emails the brand manager that stores are live."],
                ].map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="text-[16px] font-semibold leading-[26px] text-cta">{i + 1}</span>
                    <div>
                      <H3>{t}</H3>
                      <p className="mt-1 text-[16px] leading-[26px] text-text-muted">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>
            <Reveal className={`${COL} mt-8`}>
              <Shot src={`${V}/shared-sheet-full.webp`} alt="The shared sheet used to track each store, with a new tab every day" className="aspect-[1597/985]" />
              <p className="mt-3 text-[14px] leading-[22px] text-text-faint">
                The shared sheet — one row per store, a new tab every day, every field typed by hand.
              </p>
            </Reveal>
            <div className={COL}>
              <Quote>The only way to check on a store was to ask a person.</Quote>
            </div>

            <Block tag="Where the time went" title="The platform took hours. Everything around it took days.">
              <P>
                For Swiggy and Zomato, I broke the old go-live into its stages. The platform&rsquo;s own step
                took hours — the days were spent collecting data and waiting on another team&rsquo;s scripts.
              </P>

              {/* proportional bar — midpoint of each stage */}
              <div className="mt-8">
                <div className="flex h-9 overflow-hidden rounded-[8px] border border-line text-[12px] font-medium">
                  <div className="flex items-center justify-center bg-[#e5484d]/15 px-2 text-center text-[#ff9b9b]" style={{ width: "31%" }}>Collect data</div>
                  <div className="flex items-center justify-center bg-surface-2 text-text-muted" style={{ width: "7%" }}>Map</div>
                  <div className="flex items-center justify-center bg-[#e5484d]/25 px-2 text-center text-[#ff9b9b]" style={{ width: "62%" }}>
                    Scripts + store live
                  </div>
                </div>
                <p className="mt-2 text-[12px] leading-[18px] text-text-faint">Swiggy &amp; Zomato · share of time per stage, using the midpoint of the mapping range.</p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { stage: "1 · Collect & align data", time: "1 day", who: "Onboarding team chasing brand managers for IDs, URLs and menus", bad: true },
                  { stage: "2 · Map stores", time: "2–8 hrs", who: "The platform — its own stated turnaround", bad: false },
                  { stage: "3 · Scripts + store live", time: "~2 days", who: "Another team runs manual scripts, on average", bad: true },
                ].map((s) => (
                  <div
                    key={s.stage}
                    className={`rounded-[10px] border p-4 ${s.bad ? "border-[#e5484d]/40 bg-[#e5484d]/[0.06]" : "border-line bg-surface"}`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-faint">{s.stage}</p>
                    <p className={`mt-2 text-[24px] font-bold leading-none tracking-[-0.02em] ${s.bad ? "text-[#ff9b9b]" : "text-text"}`}>{s.time}</p>
                    <p className="mt-2 text-[13px] leading-[19px] text-text-muted">{s.who}</p>
                  </div>
                ))}
              </div>

              {/* the sum, and what changed */}
              <div className="mt-6 grid overflow-hidden rounded-[10px] border border-line sm:grid-cols-3">
                <div className="bg-surface p-5">
                  <Label>Before</Label>
                  <p className="mt-2 text-[28px] font-bold leading-none tracking-[-0.02em] text-text">~3.2 days</p>
                  <p className="mt-2 text-[13px] leading-[19px] text-text-muted">1 day + 2–8 hrs + 2 days = 74–80 hrs</p>
                </div>
                <div className="border-t border-line bg-surface-2 p-5 sm:border-l sm:border-t-0">
                  <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.12em] text-cta">Now</p>
                  <p className="mt-2 text-[28px] font-bold leading-none tracking-[-0.02em] text-text">~8 hrs</p>
                  <p className="mt-2 text-[13px] leading-[19px] text-text-muted">From raising the request to the store going live, on average</p>
                </div>
                <div className="border-t border-line bg-surface-2 p-5 sm:border-l sm:border-t-0">
                  <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.12em] text-cta">Scripts now</p>
                  <p className="mt-2 text-[28px] font-bold leading-none tracking-[-0.02em] text-cta">One click</p>
                  <p className="mt-2 text-[13px] leading-[19px] text-text-muted">The script runs in ~2 min — the rest is waiting for the onboarding team to click</p>
                </div>
              </div>
            </Block>

            <Block tag="Pain points" title="Both sides of the process were stuck">
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    img: `${V}/avatar-bm.png`,
                    name: "Brand Manager",
                    role: "Manages 5 brands at WOW! Momo",
                    pains: [
                      ["No visibility", "Can't see status after handing off details."],
                      ["High time-to-live", "Long, unpredictable turnaround."],
                      ["Reactive, not proactive", "Has to chase for updates."],
                      ["Menu integrity", "Menus publish wrong — prices, missing items."],
                    ],
                  },
                  {
                    img: `${V}/avatar-om.png`,
                    name: "Lead Onboarding Manager",
                    role: "Manages 2 teams, India and MENA",
                    pains: [
                      ["Manual overhead", "Hands-on effort per store."],
                      ["Scalability bottleneck", "A single point of dependency."],
                      ["Cross-team dependency", "Blocked on platform and tech hand-offs."],
                      ["No answer to give", "Brand managers keep asking “is it done yet?”"],
                    ],
                  },
                ].map((p) => (
                  <Card key={p.name}>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.img} alt="" className="size-10 rounded-full object-cover" />
                      <div>
                        <H3>{p.name}</H3>
                        <p className="text-[13px] leading-[18px] text-text-faint">{p.role}</p>
                      </div>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {p.pains.map(([t, d]) => (
                        <li key={t}>
                          <p className="text-[15px] font-medium leading-[22px] text-text">{t}</p>
                          <p className="text-[14px] leading-[21px] text-text-muted">{d}</p>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </Block>

            {/* ================= 2 · DEFINE ================= */}
            <Phase n={2} id="define" title="Define" sub="Turning what I learned into a clear problem — and a goal." />

            <Block tag="The problem">
              <p className="mt-6 text-[22px] font-semibold leading-[1.35] tracking-[-0.02em] text-text-muted md:text-[28px]">
                Every store link ran through a{" "}
                <span className="text-text">manual process owned by onboarding managers</span> — so it took{" "}
                <span className="text-cta">~3 days</span> to go live, leaving brand managers{" "}
                <span className="text-text">managing each platform separately</span>, with{" "}
                <span className="text-text">no visibility</span> the entire time.
              </p>
            </Block>

            <Block tag="Jobs to be done" title="What each side was really trying to get done" />
            <Reveal className={`${WIDE} mt-8`}>
              <JtbdBoard />
            </Reveal>

            <Block tag="How might we" title="From problems to opportunities" />
            <Reveal className={`${WIDE} mt-8`}>
              <HmwBoard />
            </Reveal>

            <Block tag="Strategy" title="Build the flow, then roll out region by region">
              <P>So each step could be validated before scaling it to everyone.</P>
              <StrategyRoadmap />
              <Card className="mt-8">
                <Label>Why Swiggy &amp; Zomato in India first</Label>
                <ul className="mt-3 space-y-2 text-[15px] leading-[23px] text-text-muted">
                  <li>
                    <span className="text-text">Most tickets came from here.</span> MENA raised far fewer, so
                    India was where the pain — and the payoff — was.
                  </li>
                  <li>
                    <span className="text-text">Two platforms instead of many.</span> In MENA, every
                    platform has its own timings and its own requirements to link a store.
                  </li>
                  <li>
                    <span className="text-text">MENA needed more research</span> before one flow could cover
                    all of it — so it became Phase 2.
                  </li>
                </ul>
              </Card>
            </Block>

            {/* ================= 3 · DEVELOP ================= */}
            <Phase n={3} id="develop" title="Develop" sub="The approach, the decisions, and the solution." />

            <Block tag="Constraint" title="We couldn't touch the sheet">
              <P>
                Every platform shares one sheet with us to link stores — and they own it. We
                couldn&rsquo;t edit it, automate it or plug into it. So how do you make a process
                self-serve when its core step lives in a document you&rsquo;re not allowed to touch?
              </P>
              <div className="mt-6 rounded-[10px] border border-line bg-surface p-5">
                <Label>Why UrbanPiper couldn&rsquo;t just link to the platform</Label>
                <p className="mt-2 text-[15px] leading-[24px] text-text-muted">
                  The platforms don&rsquo;t offer an API for store mapping. Their mapping teams work only
                  from the sheet they own, so there was nothing on their side for UrbanPiper to call directly.
                </p>
              </div>
            </Block>

            <Block tag="The workaround" title="Swap the sheet for email, and put Nexus in the middle">
              <P>
                Product and partnerships got every platform on a call and asked one question: can the
                sheet&rsquo;s details come over email instead? They agreed — a few more platforms are still
                in talks. That let engineering build <span className="text-text">Nexus</span>, a backend AI agent that sends each request to the
                platform by email, reads the platform&rsquo;s reply, and updates the store&rsquo;s status
                in UrbanPiper.
              </P>
            </Block>
            <Reveal className={`${COL} mt-8`}>
              <AgentLoop />
            </Reveal>
            <p className={`${COL} mt-3 text-[13px] leading-[20px] text-text-faint`}>
              Nexus is a backend service, owned by engineering, product and partnerships.
            </p>

            <Block>
              <H2>What it changed: the system now knows the status</H2>
              <div className="mt-6 grid overflow-hidden rounded-[10px] border border-line sm:grid-cols-2">
                <div className="bg-surface p-5">
                  <Label>Before</Label>
                  <p className="mt-2 text-[15px] leading-[24px] text-text-muted">
                    Only the onboarding team knew where a request stood. They tracked replies by hand,
                    updated the sheet and messaged the brand manager.
                  </p>
                </div>
                <div className="border-t border-line bg-surface-2 p-5 sm:border-l sm:border-t-0">
                  <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.12em] text-cta">Now</p>
                  <p className="mt-2 text-[15px] leading-[24px] text-text">
                    Nexus reads every reply and moves each store from{" "}
                    <span className="whitespace-nowrap">Requested → In progress → Mapped</span> on its own.
                    No one has to track it, and the brand manager sees it live.
                  </p>
                </div>
              </div>
            </Block>

            <Block tag="Where it lives" title="One platform-level home for linking stores">
              <P>
                Atlas → All Apps → Settings → Platforms → Integrations → <span className="text-text">Connect stores</span>.
              </P>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Card>
                  <Label>The decision</Label>
                  <p className="mt-2 text-[15px] leading-[24px] text-text-muted">
                    A link is <span className="text-text">one-to-many</span> — many stores to one
                    platform, under its rules — and a <span className="text-text">process to track</span>,
                    not a one-time store edit. So it lives at the platform level.
                  </p>
                </Card>
                <Card>
                  <Label>The trade-off</Label>
                  <p className="mt-2 text-[15px] leading-[24px] text-text-muted">
                    It&rsquo;s less visible from the store itself — so <span className="text-text">Locations</span>{" "}
                    shows each store&rsquo;s status and links straight into the flow.
                  </p>
                </Card>
              </div>
            </Block>

            <Block tag="Mapping the process" title="Every state, before a single screen">
              <P>
                Before designing screens, I mapped the brand manager&rsquo;s job on one platform for one
                brand — and everything that can happen at each step: empty states, edge cases, failures,
                and how each one gets resolved.
              </P>
            </Block>
            <Reveal className="mx-auto mt-8 w-full max-w-7xl px-6">
              <RtglProcessMap />
            </Reveal>

            <Block tag="User flow" title="Linking a store, end to end">
              <P>Pick platform & brand → add store IDs → assign menus → verify against platform rules → submit → track to live.</P>
            </Block>
            <Reveal className={`${WIDE} mt-8`}>
              <div className="overflow-hidden rounded-[10px] border border-line bg-[#f8f8fc] p-4 md:p-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${V}/user-flow.png`} alt="Flowchart of linking a store end to end" className="mx-auto w-full max-w-4xl" loading="lazy" />
              </div>
            </Reveal>

            <Block tag="The final product" id="final-product" title="The shipped flow, end to end">
              <P>
                From picking Zomato to every store live — the real screens, played in order.
              </P>
            </Block>
            <Reveal className={`${WIDE} mt-8`}>
              <ProductDemo />
            </Reveal>

            {OTHER_SCREENS.length > 0 && (
              <>
                <Block tag="More screens" id="more-screens" title="Failures, edge cases and the states in between">
                  <P>The screens the walkthrough doesn&rsquo;t show — each with what it handles.</P>
                </Block>
                <Reveal className={`${WIDE} mt-10`}>
                  <ScreenGallery screens={OTHER_SCREENS} />
                </Reveal>
              </>
            )}

            {/* ================= 4 · DELIVER ================= */}
            <Phase n={4} id="deliver" title="Deliver" sub="What shipped, and what it moved." />

            <Block tag="Impact" title="One month after release — Swiggy & Zomato, India">
              <div className="mt-8">
                <Metrics />
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Card>
                  <Label>Before · ~3 days</Label>
                  <ul className="mt-3 space-y-1.5 text-[15px] leading-[22px] text-text-muted">
                    <li>~1 day waiting on brand managers for store details, while onboarding managers chased</li>
                    <li>2–8 hours for the platform to map the stores</li>
                    <li>~2 days of manual scripts by another team</li>
                  </ul>
                </Card>
                <Card className="border-cta/40">
                  <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.12em] text-cta">
                    Now · ~8 hours
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[15px] leading-[22px] text-text">
                    <li>Minutes for the brand manager to raise the request, with store details</li>
                    <li>3–4 hours for the platform to map the stores</li>
                    <li>2–3 hours for the onboarding team to run the menu script — now one click</li>
                  </ul>
                </Card>
              </div>
              <p className="mt-4 text-[14px] leading-[22px] text-text-faint">
                The tickets left are about platforms missing their turnaround, taking stores offline, and
                minor bugs like menus not loading — plus regions not yet live (MENA, UK, US).
              </p>
            </Block>

            {/* ---------- After release: the menu preview ---------- */}
            <Block tag="After release" id="learnings" title="I designed a menu preview most people didn't need">
              <P>
                To pick a menu for each store, I first built rich menu cards with a full item preview,
                right inside the flow. It looked thorough. After release, most people never opened it — and
                loading every menu&rsquo;s items made the flow slow.
              </P>
            </Block>
            <Reveal className={`${COL} mt-8`}>
              <Shot src={`${V}/select-menu.png`} alt="First version: rich menu cards with a full item preview" className="aspect-[826/537]" />
              <p className="mt-3 text-[14px] leading-[22px] text-text-faint">
                Version 1 — rich menu cards with a full preview, inside the flow.
              </p>
            </Reveal>

            <Block>
              <H2>So I asked brand managers how they actually pick a menu</H2>
              <P>
                The answer was simple. Brand managers don&rsquo;t decide menus inside the product — they
                already have a sheet that maps every outlet to its menu.
              </P>
              <Quote>
                &ldquo;We already have a sheet that says which menu goes to which outlet. I don&rsquo;t
                need to look inside the menu — I just pick it and move on.&rdquo;
              </Quote>
              <p className="mt-3 pl-5 text-[14px] leading-[22px] text-text-faint">
                — Brand manager, multi-brand QSR group
              </p>
            </Block>

            <Block>
              <H2>But I couldn&rsquo;t drop the preview entirely</H2>
              <P>
                We checked live menus on the platforms and found near-identical names with different
                contents. Same brand, almost the same name — but one outlet had a special biryani and a few
                extra items. Pick the wrong one, and the wrong menu quietly goes live.
              </P>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { name: "Paris Panini Menu", items: ["Chicken Biryani", "…same items as the rest"], extra: [] as string[] },
                  { name: "Paris Panini Whitefield Special", items: ["Special Chicken Biryani", "…same items as the rest"], extra: ["a few location-only items"] },
                ].map((m) => (
                  <Card key={m.name}>
                    <p className="text-[15px] font-semibold leading-[22px] text-text">{m.name}</p>
                    <ul className="mt-3 space-y-1 text-[14px] leading-[21px] text-text-muted">
                      {m.items.map((i) => (
                        <li key={i} className={i.startsWith("Special") ? "text-cta" : ""}>
                          {i}
                        </li>
                      ))}
                      {m.extra.map((i) => (
                        <li key={i} className="text-cta">
                          + {i}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
              <p className="mt-3 text-[14px] leading-[22px] text-text-faint">
                Two menus a brand manager could easily mix up from the name alone.
              </p>
            </Block>

            <Block>
              <H2>What I shipped: a fast dropdown, with preview one click away</H2>
              <P>
                Picking a menu is now a plain dropdown — no loading, no cards. Once a menu is picked,{" "}
                <span className="text-text">Preview</span> opens it in a new tab, so it never slows the
                flow down but is there when two menus look alike.
              </P>
            </Block>
            <Reveal className={`${WIDE} mt-10`}>
              <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
                {[
                  { src: `${V}/menu-dropdown-empty.png`, title: "Pick from a dropdown", text: "One click per store — the brand manager matches it to their sheet." },
                  { src: `${V}/menu-dropdown-preview.png`, title: "Preview, only if needed", text: "Once picked, Preview opens that menu in a new tab." },
                ].map((s) => (
                  <figure key={s.src}>
                    <Shot src={s.src} alt={s.title} className="aspect-[2560/1664]" />
                    <figcaption className="mt-4">
                      <H3>{s.title}</H3>
                      <p className="mt-1 text-[15px] leading-[24px] text-text-muted">{s.text}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
            <Reveal className={`${COL} mt-10`}>
              <Shot src={`${V}/menu-preview-tab.png`} alt="Menu preview opened in a new tab" className="aspect-[2560/1664]" />
              <p className="mt-3 text-[14px] leading-[22px] text-text-faint">
                The preview in its own tab — every section and item, to check before publishing.
              </p>
            </Reveal>

            <Block>
              <Quote>
                Speed for the many, a safety net for the few. What feels right to the team isn&rsquo;t
                always how brand managers actually work.
              </Quote>
            </Block>

            <Block tag="What's next" title="Where this goes">
              <ul className="mt-5 space-y-2">
                {[
                  "Phase 2 — MENA, UK and US, including Talabat",
                  "Handle each region's different linking requirements",
                  "Automate the menu script in Nexus — removing the 2–3 hour wait for a click",
                  "Request to Go Offline — brand managers take stores offline themselves",
                  "Platforms plan their own agent and an API to replace the email step — on their roadmap, not yet live",
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
                  "The brief was “reduce tickets” — the real work was fixing a broken process.",
                  "Most of the win was system design, not screens.",
                  "Visibility is a feature — showing status removed tickets before the hard parts.",
                  "Ship, then learn — the menu preview insight only appeared after release.",
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
