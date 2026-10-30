import Reveal from "@/components/Reveal";
import ZoomImage from "@/components/ZoomImage";

/* ------------------------------------------------------------------ *
 * The shipped flow, explained — the same screens as the demo, laid out
 * step by step on a board, each with green notes on why it works the way
 * it does. A dotted arrow ties every note to its screen.
 * ------------------------------------------------------------------ */

const DIR = "/work/self-serve-go-live/demo";

type Screen = { n: number; alt: string; notes: string[] };
type Step = { title: string; screens: Screen[] };

const STEPS: Step[] = [
  {
    title: "Start from Platforms",
    screens: [
      {
        n: 1,
        alt: "Platforms page listing Zomato, Swiggy, DoorDash and Uber Eats",
        notes: ["Starts where brand managers already manage delivery platforms — nothing new to find."],
      },
      {
        n: 2,
        alt: "Request to go live on Zomato, with stores live and failed requests",
        notes: [
          "One page per platform: stores live, failed requests, and every store's status in a single table.",
          "Create Request starts the flow from here.",
        ],
      },
    ],
  },
  {
    title: "Add store details",
    screens: [
      {
        n: 3,
        alt: "Unmapped storefronts listed with empty Platform ID and URL fields",
        notes: ["Atlas already knows the brand and its stores, so they're listed and ready — no IDs to look up."],
      },
      {
        n: 4,
        alt: "Platform IDs and URLs filled in for each storefront",
        notes: [
          "Only two things to type per store: the platform ID and the restaurant URL.",
          "The other 9 columns of the old sheet are filled in or picked.",
        ],
      },
    ],
  },
  {
    title: "Assign menus",
    screens: [
      {
        n: 5,
        alt: "Associate menu step with a menu dropdown per storefront",
        notes: ["A plain dropdown by menu name — brand managers already know which menu goes where."],
      },
      {
        n: 6,
        alt: "Menus assigned per storefront, with Preview and copy actions",
        notes: [
          "Preview opens in a new tab, for menus that look alike.",
          "Copy applies one menu to every store, with a warning before it replaces any.",
        ],
      },
    ],
  },
  {
    title: "Catch menu issues before submitting",
    screens: [
      {
        n: 7,
        alt: "Verifying menus loading state",
        notes: ["Menus are checked against the platform's rules before anything is sent — failures caught here, not days later."],
      },
      {
        n: 8,
        alt: "Storefronts with Fix issues links next to menus that have errors",
        notes: ["Only the menus with problems are flagged. Errors block the request; warnings don't."],
      },
      {
        n: 9,
        alt: "Lunch Menu issues drawer listing errors and warnings per item",
        notes: ["Every issue names the item and what's wrong, and opens it to fix in place — without leaving the flow."],
      },
    ],
  },
  {
    title: "Submit and track every store",
    screens: [
      {
        n: 16,
        alt: "Go-live request initiated on Zomato",
        notes: ["Sets expectations: what happens next, and an email once stores are live."],
      },
      {
        n: 17,
        alt: "Store go-live status drawer with progress steps",
        notes: ["Each store has its own tracker — request, store mapping, menu publish, live — with a time at every step."],
      },
      {
        n: 21,
        alt: "Store go-live status showing the store is live",
        notes: ["If a step fails, the tracker stops there and says why; the brand manager fixes and resubmits just that store."],
      },
    ],
  },
];

const SHADOW = "0 1px 2px rgb(0 0 0 / 0.08), 0 10px 24px -12px rgb(0 0 0 / 0.25)";

function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 12 36" className="mx-auto h-9 w-3">
      <path d="M6 34 V4" stroke="#2f9e44" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
      <path d="M2 8 L6 3 L10 8" stroke="#2f9e44" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Note({ notes }: { notes: string[] }) {
  const one = notes.length === 1;
  const List = one ? "div" : "ol";
  return (
    <div className="rounded-[10px] border border-[#b7e4c0] bg-[#e6f7ea] px-4 py-3.5 text-[#123d1f]">
      <List className={one ? "" : "list-decimal space-y-1.5 pl-4"}>
        {notes.map((t) =>
          one ? (
            <p key={t} className="text-[14px] leading-[21px]">{t}</p>
          ) : (
            <li key={t} className="pl-1 text-[14px] leading-[21px]">{t}</li>
          ),
        )}
      </List>
    </div>
  );
}

export default function ProductExplainer() {
  return (
    <div
      className="rounded-[14px] border border-line px-4 py-8 md:px-10 md:py-12"
      style={{
        backgroundColor: "#fafaf8",
        backgroundImage: "radial-gradient(rgb(0 0 0 / 0.1) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="space-y-16 md:space-y-20">
        {STEPS.map((s, si) => (
          <section key={s.title}>
            <h3 className="flex items-center gap-3 text-[20px] font-semibold leading-[26px] tracking-[-0.01em] text-[#1e1e1e] md:text-[24px]">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#1e1e1e] text-[12px] font-semibold tabular-nums text-white">
                {si + 1}
              </span>
              {s.title}
            </h3>
            <div className={`mt-6 grid gap-x-6 gap-y-10 md:grid-cols-2 ${s.screens.length === 3 ? "lg:grid-cols-3" : ""}`}>
              {s.screens.map((sc, k) => (
                <Reveal key={sc.n} delay={k * 120}>
                  <figure>
                    <div className="overflow-hidden rounded-[8px] border border-black/10 bg-white" style={{ boxShadow: SHADOW, aspectRatio: "1600 / 1040" }}>
                      <ZoomImage
                        src={`${DIR}/${String(sc.n).padStart(2, "0")}.webp`}
                        alt={sc.alt}
                        className="h-full w-full cursor-zoom-in object-cover object-top"
                      />
                    </div>
                    <figcaption>
                      <Arrow />
                      <Note notes={sc.notes} />
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
