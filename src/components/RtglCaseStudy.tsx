import { ViewTransition, type ReactNode } from "react";
import Link from "next/link";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import AgentLoop from "@/components/AgentLoop";
import JtbdBoard from "@/components/JtbdBoard";
import HmwBoard from "@/components/HmwBoard";
import PageNav from "@/components/PageNav";
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
  { value: "~94%", label: "faster go-live — ~3 days → under 5 hours" },
  { value: "1,700", label: "stores connected" },
  { value: "38%", label: "fewer support tickets" },
  { value: "60%", label: "of new store connections in India raised by merchants themselves" },
];


/** The 11 columns of the platform's shared sheet, and where each now comes from. */
const FIELDS: { field: string; now: string; who: "auto" | "pick" | "type" }[] = [
  { field: "Reference ID", now: "Atlas generates it", who: "auto" },
  { field: "Biz ID", now: "Atlas fills it in from the account", who: "auto" },
  { field: "Biz name", now: "Atlas fills it in from the account", who: "auto" },
  { field: "Location ID", now: "Atlas fills it in from stores already set up", who: "auto" },
  { field: "Location name", now: "Atlas fills it in from stores already set up", who: "auto" },
  { field: "Vendor ID", now: "Filled in automatically — UrbanPiper's ID on the platform", who: "auto" },
  { field: "Brand name", now: "Merchant picks it — last-used is pre-selected", who: "pick" },
  { field: "Platform", now: "Merchant picks it on the first step", who: "pick" },
  { field: "Menu ID", now: "Merchant picks a menu by name; Atlas maps it to the ID", who: "pick" },
  { field: "Zomato platform ID", now: "Merchant types it", who: "type" },
  { field: "Restaurant URL", now: "Merchant types it", who: "type" },
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
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      {METRICS.map((m) => (
        <div key={m.label}>
          <dt className="text-[40px] font-bold leading-none tracking-[-0.03em] text-cta md:text-[48px]">
            <CountUp value={m.value} />
          </dt>
          <dd className="mt-2 text-[13px] leading-[20px] text-text-muted">{m.label}</dd>
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
    <article className="pb-24 xl:pl-52">
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
          { id: "deliver", label: "Deliver" },
          { id: "learnings", label: "What I learned" },
          { id: "reflections", label: "Reflections" },
        ]}
      />
      {/* ---------------- HERO ---------------- */}
      <header className={`${COL} pt-14 md:pt-24`}>
        <Link href="/work" className="text-[14px] text-text-muted underline-hover hover:text-text">
          ← All work
        </Link>
        <Label className="mt-10">UrbanPiper · 2026 · B2B web app</Label>
        <h1 className="mt-4 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-balance text-text md:text-[60px]">
          Taking restaurants live in <span className="text-cta">hours</span>, not days
        </h1>
        <p className="mt-5 text-pretty text-[18px] leading-[28px] text-text-muted">
          A self-serve flow that cut connecting a store to Swiggy and Zomato in India from about 3
          days to under 5 hours — through one dashboard.
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

      {/* ---------------- COVER (wide) ---------------- */}
      <div className={`${WIDE} mt-14`}>
        <ViewTransition name={`study-cover-${study.slug}`} share="morph" default="none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-line bg-bg">
            <Media src={study.cover} alt={study.coverAlt} className="!object-contain" />
          </div>
        </ViewTransition>
      </div>

      {/* ---------------- THE BRIEF ---------------- */}
      <Block tag="The brief" id="brief" title="Connecting was slow, and nobody could see why">
        {/* the problem, highlighted — same lime-bar treatment as the page's key quotes */}
        <div className="mt-6 border-l-2 border-cta pl-5">
          <Label>Problem</Label>
          <p className="mt-2 text-pretty text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] text-text md:text-[26px]">
            Getting a restaurant connected to its delivery platforms was slow and hard to track — and
            support tickets were rising day by day.
          </p>
        </div>

        <dl className="mt-8 space-y-5">
          {[
            ["Goal", "Find out what was wrong, and make connecting faster and cleaner."],
            ["Team", "Sole designer · 1 PM · 4 backend + 3 frontend engineers · Onboarding team"],
            ["My role", "Owned design end to end — research, interaction design, prototyping and design QA with engineering. I grounded it in conversations with account managers across India and MENA."],
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
          A self-serve flow in Atlas where merchants connect their own stores to Swiggy and Zomato,
          catch menu problems before they fail, and track every store to live.
        </P>
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
          <LottieClip src={`${V}/ecosystem.json`} label="Atlas connected to every delivery platform" className="aspect-[1517/952] w-full" />
        </div>
      </Reveal>

      <Block tag="The job" title="What it means to connect a store to a platform">
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
              2 · Connect
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
            <Label>The merchant</Label>
            <p className="mt-3 text-[16px] font-semibold leading-[22px] text-text">Brand manager</p>
            <p className="mt-2 text-[14px] leading-[21px] text-text-muted">
              Single- or multi-brand, any number of locations. Their stores are already on the delivery
              apps — they need each one connected to UrbanPiper.
            </p>
          </Card>
          <Card>
            <Label>UrbanPiper</Label>
            <p className="mt-3 text-[16px] font-semibold leading-[22px] text-text">Onboarding manager</p>
            <p className="mt-2 text-[14px] leading-[21px] text-text-muted">
              Did the setup and connected every store, on every platform, for them.
            </p>
          </Card>
        </div>

      </Block>

      <Block tag="Regions & platforms" title="One product, many markets — each with its own delivery apps">
        <P>
          UrbanPiper runs across 40,000+ locations in 30+ countries. Every region has its own set of
          delivery platforms — and each platform its own way of connecting a store.
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
      <Phase n={1} id="discover" title="Discover" sub="Why connecting a store took days instead of hours." />

      <Block tag="How I dug in" title="Before designing anything, I found out what was breaking">
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["150–200 support tickets", "Every go-live ticket from the last quarter, grouped by complaint."],
            ["7 interviews", "5 brand managers, and the 2 onboarding leads for India and MENA."],
            ["Shadowed a live go-live", "Sat in on a merchant's Zomato go-live, email thread included, from request to live."],
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
        <P>Every connection ran by hand — through account managers, a shared sheet and two other teams.</P>
        <ol className="mt-6 space-y-6">
          {[
            ["Data gathering", "Onboarding asks the merchant for store IDs, URLs and menus over Slack, WhatsApp and email, then types it all into a shared sheet — one per platform."],
            ["Platform connection", "The sheet goes to Swiggy or Zomato to link the stores on their side, and comes back confirming which connected."],
            ["Go-live", "The tech team runs a menu publish script, and onboarding emails the merchant that stores are live."],
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
            { stage: "1 · Collect & align data", time: "1 day", who: "Onboarding team chasing merchants for IDs, URLs and menus", bad: true },
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
            <p className="mt-2 text-[28px] font-bold leading-none tracking-[-0.02em] text-text">4–5 hrs</p>
            <p className="mt-2 text-[13px] leading-[19px] text-text-muted">From raising the request to the store going live</p>
          </div>
          <div className="border-t border-line bg-surface-2 p-5 sm:border-l sm:border-t-0">
            <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.12em] text-cta">Reduced by</p>
            <p className="mt-2 text-[28px] font-bold leading-none tracking-[-0.02em] text-cta">~94%</p>
            <p className="mt-2 text-[13px] leading-[19px] text-text-muted">~77 hrs down to ~4.5 hrs, using midpoints</p>
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
                ["No answer to give", "Merchants keep asking “is it done yet?”"],
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
          Every store connection ran through a{" "}
          <span className="text-text">manual process owned by account managers</span> — so it took{" "}
          <span className="text-cta">~3 days</span> to go live, leaving merchants{" "}
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
              platform has its own timings and its own requirements to connect a store.
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
          Every platform shares one sheet with us to connect stores — and they own it. We
          couldn&rsquo;t edit it, automate it or plug into it. So how do you make a process
          self-serve when its core step lives in a document you&rsquo;re not allowed to touch?
        </P>
        <div className="mt-6 rounded-[10px] border border-line bg-surface p-5">
          <Label>Why Atlas couldn&rsquo;t just connect to the platform</Label>
          <p className="mt-2 text-[15px] leading-[24px] text-text-muted">
            The platforms don&rsquo;t offer an API for store mapping. Their mapping teams work only
            from the sheet they own, so there was nothing on their side for Atlas to call directly.
          </p>
        </div>
      </Block>

      <Block tag="The workaround" title="Swap the sheet for email, and put Nexus in the middle">
        <P>
          Product and partnerships got every platform on a call and asked one question: can the
          sheet&rsquo;s details come over email instead? They agreed — a few more platforms are still
          in talks. That let engineering build <span className="text-text">Nexus</span>, a backend AI agent that sends each request to the
          platform by email, reads the platform&rsquo;s reply, and updates the store&rsquo;s status
          in Atlas.
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
              updated the sheet and messaged the merchant.
            </p>
          </div>
          <div className="border-t border-line bg-surface-2 p-5 sm:border-l sm:border-t-0">
            <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.12em] text-cta">Now</p>
            <p className="mt-2 text-[15px] leading-[24px] text-text">
              Nexus reads every reply and moves each store from{" "}
              <span className="whitespace-nowrap">Requested → In progress → Mapped</span> on its own.
              No one has to track it, and the merchant sees it live.
            </p>
          </div>
        </div>
      </Block>

      <Block tag="Where it lives" title="One platform-level home for connecting stores">
        <P>
          Atlas → All Apps → Settings → Platforms → Integrations → <span className="text-text">Connect stores</span>.
        </P>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Card>
            <Label>The decision</Label>
            <p className="mt-2 text-[15px] leading-[24px] text-text-muted">
              A connection is <span className="text-text">one-to-many</span> — many stores to one
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

      <Block tag="User flow" title="Connecting a store, end to end">
        <P>Pick platform & brand → add store IDs → assign menus → verify against platform rules → submit → track to live.</P>
      </Block>
      <Reveal className={`${WIDE} mt-8`}>
        <div className="overflow-hidden rounded-[10px] border border-line bg-[#f8f8fc] p-4 md:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${V}/user-flow.png`} alt="Flowchart of connecting a store end to end" className="mx-auto w-full max-w-4xl" loading="lazy" />
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

      <Block tag="Behind the form" title="The sheet had 11 fields per store. The merchant now types 2.">
        <P>
          Every column in the platform&rsquo;s sheet was typed by hand. Most of it was data Atlas
          already had — so the form only asks for what it can&rsquo;t know.
        </P>
        <div className="mt-6 overflow-hidden rounded-[10px] border border-line">
          <div className="grid grid-cols-[minmax(0,9rem)_1fr] bg-surface-2 px-4 py-2.5 sm:grid-cols-[12rem_1fr]">
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-faint">Sheet field</span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-faint">Where it comes from now</span>
          </div>
          <ul className="divide-y divide-line">
            {FIELDS.map((f) => (
              <li
                key={f.field}
                className={`grid grid-cols-[minmax(0,9rem)_1fr] gap-x-3 px-4 py-2.5 sm:grid-cols-[12rem_1fr] ${f.who === "type" ? "bg-cta/5" : ""}`}
              >
                <span className={`text-[14px] leading-[22px] ${f.who === "type" ? "font-semibold text-cta" : "text-text"}`}>
                  {f.field}
                </span>
                <span className={`text-[14px] leading-[22px] ${f.who === "type" ? "text-text" : "text-text-muted"}`}>
                  {f.now}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-text-muted">
          <span><span className="font-semibold text-text">6</span> filled automatically</span>
          <span><span className="font-semibold text-text">3</span> a quick pick</span>
          <span><span className="font-semibold text-cta">2</span> typed by the merchant</span>
        </div>
      </Block>

      {/* ================= 4 · DELIVER ================= */}
      <Phase n={4} id="deliver" title="Deliver" sub="What shipped, and what it moved." />

      <Block tag="Impact" title="Three months after release — Swiggy & Zomato, India">
        <div className="mt-8">
          <Metrics />
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Card>
            <Label>Before · ~3 days</Label>
            <ul className="mt-3 space-y-1.5 text-[15px] leading-[22px] text-text-muted">
              <li>~1 day collecting and aligning data, chasing merchants</li>
              <li>2–8 hours for the platform to map the stores</li>
              <li>~2 days of manual scripts by another team</li>
            </ul>
          </Card>
          <Card className="border-cta/40">
            <p className="text-[13px] font-semibold uppercase leading-[20px] tracking-[0.12em] text-cta">
              Now · 4–5 hours
            </p>
            <p className="mt-3 text-[15px] leading-[22px] text-text">
              From the moment the merchant raises the request to the store going live — no
              hand-offs in between.
            </p>
          </Card>
        </div>
        <p className="mt-4 text-[14px] leading-[22px] text-text-faint">
          Remaining tickets are mostly from regions not yet live (MENA, UK, US).
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
        <H2>So I asked merchants how they actually pick a menu</H2>
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
          always how merchants actually work.
        </Quote>
      </Block>

      <Block tag="What's next" title="Where this goes">
        <ul className="mt-5 space-y-2">
          {[
            "Phase 2 — MENA, UK and US, including Talabat",
            "Handle each region's different connection requirements",
            "Reduce the account managers' remaining manual steps further",
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
                {next.title}
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
