/* ============================================================================
 * CASE STUDIES — content model, decoupled from presentation.
 *
 * Today only "self-serve-go-live" is fully written. The other two are clean
 * `comingSoon` placeholders that render as elegant locked cards — no fake
 * metrics, no lorem. To add a real study, copy TEMPLATE (bottom of file),
 * fill it in, drop images in /public/work/<slug>/, and remove `comingSoon`.
 *
 * TODO(paritosh): replace before launch —
 *   1. project-two, project-three → real case studies (or delete)
 *   2. add cover + gallery images under /public/work/<slug>/
 * ========================================================================== */

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
};

export type ChallengeSolution = {
  challenge: string;
  solution: string;
};

export type PerspectiveCard = {
  title: string;
  points: string[];
};

// A numbered feature: a screen + a line, shown alternating. `sticky` is a
// yellow note (used in the solution); `problem` is a red note (used to call
// out what was broken in an old-flow screen).
export type CaseStudyFeature = {
  title: string;
  text: string;
  image: GalleryImage;
  sticky?: string;
  problem?: string;
};

export type CaseStudySection = {
  heading: string;
  // Punchy editorial sub-headline shown above the intro (e.g. "The Only Gate In").
  editorialHeadline?: string;
  intro: string;
  bullets?: string[];
  // Challenge → Solution card pairs.
  challenges?: ChallengeSolution[];
  // "How might we …?" design opportunities, each paired with the solution.
  hmws?: { question: string; solution: string }[];
  // Side-by-side cards grouping points by whose perspective they're from.
  perspectives?: PerspectiveCard[];
  stats?: { value: string; label: string }[];
  // A Figma-style sticky-note callout shown at the end of the section.
  sticky?: string;
  // An inline screenshot for the section.
  image?: GalleryImage;
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  // Short domain eyebrow shown above the title on cards (e.g. "B2B SaaS · Founding").
  domain?: string;
  // When true, this study gets the large featured treatment on the home page.
  featured?: boolean;
  // Optional external link shown on secondary cards (e.g. a live product).
  externalUrl?: string;
  cover: string;
  // Optional separate image for the home/work cards (the "outside" cover).
  // Falls back to `cover` when unset. The detail-page hero always uses `cover`.
  cardCover?: string;
  // When true, the card cover is shown whole (object-contain) — for transparent
  // device mockups that shouldn't be cropped to fill.
  cardContain?: boolean;
  coverAlt: string;
  year: string;
  role: string;
  team?: string;
  timeline?: string;
  tools?: string[];
  overview: string;
  problem: string;
  // Structured sections. When present, these render instead of the plain
  // overview/problem paragraphs.
  sections?: CaseStudySection[];
  // A full-width user-flow diagram shown between the sections and the walkthrough.
  userFlow?: { src: string; alt: string; caption?: string };
  // Annotated old-flow walkthrough — screens with red "problem" callouts.
  problemFlow?: CaseStudyFeature[];
  // Numbered "what we built" walkthrough — screen per row, alternating sides.
  features?: CaseStudyFeature[];
  // Labeled deep-dives — each a titled walkthrough for a hard edge/use case.
  deepDives?: { label: string; intro: string; features: CaseStudyFeature[] }[];
  process: string[];
  gallery: GalleryImage[];
  outcome: string;
  metrics?: { label: string; value: string }[];
  nextSlug?: string;
  // When true, the study is teased everywhere but has no detail page content.
  comingSoon?: boolean;
  // Real studies are password-locked by default; set `isPublic` to open one up.
  isPublic?: boolean;
  // Punchy one-liner shown on the lock screen to entice a password request.
  lockedTeaser?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "self-serve-go-live",
    title: "Self-Serve Store Go-Live",
    tagline:
      "Restaurants take their own stores live across every delivery platform — no account manager needed. 1,700 stores in two months, ~46% faster.",
    tags: ["B2B SaaS", "0 → 1 Flow"],
    domain: "B2B SaaS · UrbanPiper",
    featured: true,
    lockedTeaser:
      "The self-serve flow that let restaurants take their own stores live across every delivery platform.",
    metrics: [
      { label: "stores processed in 2 months", value: "1,700" },
      { label: "days — average go-live time", value: "13→7" },
      { label: "reduction in go-live time", value: "~46%" },
      { label: "fewer support tickets", value: "38%" },
      { label: "adoption across supported India + MENA regions", value: "~60%" },
    ],
    cover: "/work/self-serve-go-live/cover.png",
    cardCover: "/work/self-serve-go-live/card-cover.png",
    cardContain: true,
    coverAlt: "Request to go live dashboard in Atlas",
    year: "2026",
    role: "Product Designer — owned end to end",
    team: "2 designers (me on design, a design lead on review), 1 PM, 4 engineers (2 backend, 2 frontend), account management + support, and QA — across India and MENA",
    timeline: "~2.5 months, discovery through release",
    tools: ["Figma", "Claude", "Linear"],
    overview:
      "UrbanPiper is one place for restaurants to run every delivery platform they sell on — orders, menus, inventory. But a store only works here once it's gone live: connected from UrbanPiper to its listing on the platform, so orders start flowing in.",
    problem:
      "Going live already existed — but the moment it was requested, the brand was in the dark. No status, no timeline, no idea if their menu was even ready.",
    sections: [
      {
        heading: "Context",
        editorialHeadline: "What “going live” actually means",
        intro:
          "When a brand joins UrbanPiper, it adds its stores. But adding a store doesn’t mean you can run it here yet — that same store already exists on the delivery platform. Going live links the two.",
        bullets: [
          "Going live = connecting a store in UrbanPiper to its listing on the platform, so orders flow in.",
          "It’s not about launching on the platform — the store is already there.",
          "Until it’s connected, nothing works for that store: no orders, nothing to manage.",
        ],
        sticky:
          "A store can’t go live without a menu — there’s no such thing as a live store with a blank menu.",
      },
      {
        heading: "Problem",
        editorialHeadline: "Request it, then silence",
        intro:
          "The request was made from Atlas by our own team, on the brand’s behalf — but its progress was tracked on a separate internal tool connected to the platforms, which only we could see.",
        bullets: [
          "Every region and platform had its own rules, so each go-live meant back-and-forth between the account manager and the brand — over email, Slack and WhatsApp.",
          "As we grew into the US and UK, this broke: support tickets spiked, and a small account team became the bottleneck.",
        ],
        sticky:
          "The only “tracking” a brand got was an email saying it’s done. No link, no status, no why.",
      },
      {
        heading: "Objective",
        editorialHeadline: "Put it in the customer’s hands",
        intro:
          "One place in Atlas where a brand can request go-live, track it, and understand it — without going through us.",
        bullets: [
          "Request stores themselves, without an account manager in the loop.",
          "See real status and timelines inside the product.",
          "Know what’s needed — like whether the menu is ready — before requesting.",
        ],
      },
      {
        heading: "Users",
        editorialHeadline: "Two people were stuck",
        intro: "The same broken process hurt both sides of it.",
        perspectives: [
          {
            title: "Brand team — the customer",
            points: [
              "Requested go-live, then had no visibility — couldn’t tell what was live, pending or failed.",
              "Couldn’t even see which locations they’d sent live without digging back through an email.",
              "Typed platform IDs and URLs for every store by hand, unsure what each platform needed.",
              "No way to know if a store’s menu was ready — found out only when it failed.",
              "Every question meant pinging an account manager on Slack or WhatsApp, then waiting.",
            ],
          },
          {
            title: "Account managers — our team",
            points: [
              "Ran every go-live by hand on an internal tool the customer couldn’t see.",
              "Buried under rising requests and support tickets as more regions came on.",
              "Re-explained region-specific requirements again and again over chat.",
              "Chased customers for the right IDs, URLs and menu fixes.",
              "Became the bottleneck — a small team, so brands waited behind each other.",
            ],
          },
        ],
      },
    ],
    problemFlow: [
      {
        title: "Buried in the Locations list",
        text: "Going live wasn’t its own thing — it was one link in a crowded bulk-action bar, repeated in a kebab menu and inside each location’s settings.",
        image: {
          src: "/work/self-serve-go-live/old-01-buried.png",
          alt: "Request to go live buried among other bulk actions in Locations",
        },
        problem: "No clear place to start, and the same action scattered in three spots.",
      },
      {
        title: "The same form for every platform",
        text: "The request looked identical for every platform and region — but going live doesn’t work that way. Each platform and region needed different data and steps, and everything the form didn’t cover was done by hand by our internal teams, on Postman or straight on the backend.",
        image: {
          src: "/work/self-serve-go-live/old-02-details.png",
          alt: "The same platform ID and URL form shown for every platform",
        },
        problem: "One generic form on the surface — the real, platform-specific work happened manually, off the product.",
      },
      {
        title: "A dead-end confirmation",
        text: "After submitting, the flow just ended: “your request has been registered, we’ll notify you.” No status, no timeline, no link to come back to.",
        image: {
          src: "/work/self-serve-go-live/old-03-deadend.png",
          alt: "Request registered successfully dead-end screen",
        },
        problem: "The moment you submitted, you lost all visibility.",
      },
      {
        title: "An email was the only update",
        text: "The one follow-up was an email summarising the request — “3–7 business days, someone will reach out.” If anything was wrong, you found out here, days later.",
        image: {
          src: "/work/self-serve-go-live/old-04-email.png",
          alt: "Go-live summary email with a 3 to 7 business day note",
        },
        problem: "Tracking lived in your inbox, not the product.",
      },
    ],
    features: [
      {
        title: "One place to see every store",
        text: "A dashboard for each platform, brand by brand: how many stores are live, how many are left, and how many failed — plus every store’s status and one button to start a new request.",
        image: {
          src: "/work/self-serve-go-live/02-dashboard.png",
          alt: "Go-live dashboard showing 116 of 120 storefronts live and 0 failed",
        },
        sticky: "Before, only our team could see this. Now the brand sees live, failed and pending counts in one place.",
      },
      {
        title: "Add store details in bulk",
        text: "Fill each store’s platform ID and link in one table, in bulk. You set up one platform at a time now, so the fields match exactly what that platform needs.",
        image: {
          src: "/work/self-serve-go-live/03-add-details.png",
          alt: "Add platform details table with store IDs and URLs filled in",
        },
      },
      {
        title: "Pick a menu for each store",
        text: "Assign a menu to every store in the same table. Any store with a menu problem is flagged right here, before anything is sent.",
        image: {
          src: "/work/self-serve-go-live/04-associate-menu.png",
          alt: "Associate menu step with fix-issues flags",
        },
      },
      {
        title: "Catch menu problems before submitting",
        text: "Every error and warning, tagged by platform, in one list — so nothing fails silently days later. The same item can pass on one platform and fail on another.",
        image: {
          src: "/work/self-serve-go-live/05-menu-issues.png",
          alt: "Menu issues list with errors and warnings per platform",
        },
        sticky: "This is exactly what used to come back as a failure over email.",
      },
      {
        title: "Fix an item without leaving the flow",
        text: "Click any issue and fix that item right there — add the missing price, allergens or tax — then keep going.",
        image: {
          src: "/work/self-serve-go-live/06-fix-item.png",
          alt: "Inline item editor for fixing a menu item",
        },
      },
      {
        title: "Verify, then submit",
        text: "Menus are re-checked automatically, and only then does the request go out. No guessing whether it was ready.",
        image: {
          src: "/work/self-serve-go-live/07-verifying.png",
          alt: "Verifying menus screen",
        },
      },
      {
        title: "Track every step",
        text: "Each store shows request → mapping → menu published → live, with the time each step happened. No more asking on Slack.",
        image: {
          src: "/work/self-serve-go-live/08-track-live.png",
          alt: "Go-live progress tracker with all steps complete",
        },
        sticky: "Before, there was no status at all — just an email. Now every step is visible, with timestamps.",
      },
      {
        title: "When something fails, it explains itself",
        text: "A plain-English reason for the failure, plus the technical detail for anyone who needs it — and a clear way to fix and retry.",
        image: {
          src: "/work/self-serve-go-live/09-error-explained.png",
          alt: "Plain-English failure explanation with error payload",
        },
        sticky: "Before, failures came over email, Slack or WhatsApp. Now the reason is right in the product.",
      },
    ],
    process: [],
    gallery: [],
    outcome:
      "Go-live moved from a task our account team ran by hand to one brands run themselves — with menu problems caught before submitting, and every step visible in the product.",
    nextSlug: "menu-rules",
  },

  {
    slug: "menu-rules",
    title: "Targeted Menu Overrides",
    tagline:
      "Change price and availability by platform, location and item — with one menu and a few rules instead of dozens of duplicate menus.",
    tags: ["B2B SaaS", "Systems"],
    domain: "B2B SaaS · UrbanPiper",
    lockedTeaser:
      "The rules engine that replaced dozens of duplicated menus with a single source of truth.",
    // TODO(paritosh): real numbers later. "Change types" and "Timeline" are real.
    metrics: [
      { label: "Duplicate menus replaced", value: "[  ]" },
      { label: "Ops effort reduced", value: "[  ]%" },
      { label: "Change types per rule", value: "3" },
      { label: "Timeline", value: "~1 mo" },
    ],
    cover: "/work/menu-rules/cover.png",
    // Outside/card thumbnail — the Menu Rules screen in a tablet mockup on a
    // dark ground (same treatment as the self-serve card). Shown whole.
    cardCover: "/work/menu-rules/tablet-cover.svg",
    cardContain: true,
    coverAlt: "Menu Rules builder with live preview in Atlas",
    year: "2025",
    role: "Product Designer — owned end to end",
    team: "PM, engineering, and me (design) — with menu managers from large multi-location brands",
    timeline: "~1 month, concept through QA",
    tools: ["Figma", "Claude", "Linear"],
    overview:
      "In UrbanPiper, a menu belongs to a brand and is published to that brand's locations across every delivery platform it sells on. It's always brand + location wise.",
    problem:
      "To make even a small variation — a higher price on one platform, an item hidden in one city — brands had to duplicate the whole menu and manage it separately. For big brands that meant dozens of near-identical menus.",
    sections: [
      {
        heading: "Context",
        editorialHeadline: "How a menu works here",
        intro:
          "A menu belongs to a brand and is published to that brand's locations across every platform it sells on.",
        bullets: [
          "A menu is always brand + location wise — a group of locations can share one menu.",
          "But the same brand needs differences: a higher price on one platform, an item off in one city, a combo in one region.",
          "So a brand like Domino's, live on 100+ locations, ends up needing many menu variations.",
        ],
        image: {
          src: "/work/menu-rules/menus-list.png",
          alt: "Menus across brands, each with item, location and platform counts and publish status",
          caption:
            "Every brand runs many menus — each with its own items, locations, platforms and publish status.",
        },
      },
      {
        heading: "Problem",
        editorialHeadline: "A whole new menu for every little difference",
        intro:
          "Every small variation meant duplicating the entire menu and managing it on its own.",
        bullets: [
          "For big brands (Domino's, Pizza Hut), that meant dozens of near-identical menus to create, edit and keep in sync.",
          "Heavy operational effort for the customer — and every duplicate added load on our system.",
          "Fragile: change the base menu and every clone silently drifts out of sync.",
        ],
        sticky:
          "Example: Garlic Bread ₹20 higher on Swiggy in Mumbai + 3 items hidden at 10 Bangalore outlets = two whole cloned menus to babysit forever.",
      },
      {
        heading: "Objective",
        editorialHeadline: "Exceptions, not copies",
        intro:
          "Let a brand make targeted exceptions inside a single menu — by platform, location and item — instead of cloning menus.",
        bullets: [
          "One menu stays the source of truth.",
          "Variations become rules, not duplicate menus.",
          "Less work for the customer, less load on the system.",
        ],
      },
      {
        heading: "Users",
        editorialHeadline: "Who was drowning in menus",
        intro: "The pain was worst for the biggest brands.",
        perspectives: [
          {
            title: "Brand / menu managers",
            points: [
              "Ran price and availability across dozens of regions and platforms.",
              "Cloned and hand-edited near-identical menus for every variation.",
              "Kept them in sync by hand — and lived with the drift when they couldn't.",
            ],
          },
          {
            title: "UrbanPiper's system",
            points: [
              "Stored, published and reconciled every duplicate menu.",
              "More menus meant more load and more room for inconsistency.",
            ],
          },
        ],
      },
      {
        heading: "Ideation",
        editorialHeadline: "How might we…",
        intro:
          "I reframed the problem into a handful of design opportunities — each one answered by a screen in the walkthrough below.",
        hmws: [
          {
            question:
              "How might we let brands make a small, targeted change without duplicating an entire menu?",
            solution:
              "Rules live inside a single menu — a Menu Rules tab where every exception sits on one source-of-truth menu, no clones.",
          },
          {
            question:
              "How might we make a rule simple enough that anyone can write and read it?",
            solution:
              "A When / For / Then builder — each rule reads like a sentence: when these platforms and locations, for these items, then make this change.",
          },
          {
            question:
              "How might we give confidence a rule does exactly what's intended, before it goes live?",
            solution:
              "A live preview shows each item's Default vs Overridden price and state in real time as the rule is built.",
          },
          {
            question:
              "How might we keep dozens of rules manageable instead of trading one mess for another?",
            solution:
              "Saved rules sit in a readable list as plain-English sentences, each with an on/off toggle and filters by item, location and platform.",
          },
          {
            question:
              "How might we stop rules from silently conflicting — or breaking on platforms that can't honor them?",
            solution:
              "Conflict detection blocks overlapping rules and flags exactly what clashes, and platform-limit guards prevent location-scoped rules on brand-level-only platforms.",
          },
        ],
      },
    ],
    userFlow: {
      src: "/work/menu-rules/user-flow.svg",
      alt: "Menu Rules user flow — from the Rules tab through When/For/Then, live preview, save, conflict check, and publish",
      caption: "One rule, end to end — with the conflict check and brand-level-platform edge built into the path.",
    },
    features: [
      {
        title: "Rules live inside the menu",
        text: "A new Menu Rules tab on every menu — manage all exceptions in one place, on top of a single source-of-truth menu.",
        image: { src: "/work/menu-rules/01-empty.png", alt: "Menu Rules empty state" },
      },
      {
        title: "When / For / Then",
        text: "Each rule reads like a sentence: When these platforms + locations, For these items or modifiers, Then make this change.",
        image: { src: "/work/menu-rules/02-builder.png", alt: "Rule builder with When, For, Then" },
      },
      {
        title: "Target the exact locations",
        text: "Pick locations by city or location group, search, and confirm — the rule only touches what you choose.",
        image: { src: "/work/menu-rules/05-locations.png", alt: "Location picker" },
      },
      {
        title: "Three kinds of change",
        text: "Do Not Sell, Change Markup Price, or Change Default Price — stack more with ‘Add another attribute’.",
        image: { src: "/work/menu-rules/03-change.png", alt: "Change-type dropdown" },
      },
      {
        title: "See the effect before you save",
        text: "A live preview shows each item's Default vs Overridden state as you build the rule — no guessing.",
        image: { src: "/work/menu-rules/04-preview.png", alt: "Default vs overridden live preview" },
        sticky: "Prices strike through to the override in real time — Bread Omelette ₹169 → ₹54.",
      },
      {
        title: "Rules you can read and toggle",
        text: "Saved rules sit in a list as plain-English sentences, each with an on/off toggle and filters by item, location and platform.",
        image: { src: "/work/menu-rules/06-saved.png", alt: "Saved rules list" },
        sticky: "One menu + a handful of rules replaces dozens of cloned menus.",
      },
    ],
    deepDives: [
      {
        label: "Deep dive — platforms that can’t do locations",
        intro:
          "Rules target platforms and locations. But a few delivery platforms only publish menus at the brand level — they can’t take a location-scoped rule at all. Left unguarded, a “Mumbai-only” price would quietly go live at every one of their outlets. So the design makes the mismatch impossible to miss — and impossible to publish by accident.",
        features: [
          {
            title: "The picker flags them",
            text: "The platform selector marks brand-level-only platforms (ToYou, Jahez) with a warning icon — the constraint is visible before you build anything else.",
            image: { src: "/work/menu-rules/bl-1-flag.png", alt: "Platform picker flagging ToYou and Jahez with a warning" },
          },
          {
            title: "Pick them first → locations switch off",
            text: "Add a brand-level platform and location selection is disabled, with a plain reason and the fix: remove them to target locations again.",
            image: { src: "/work/menu-rules/bl-2-info.png", alt: "Info banner: location selection disabled for brand-level platforms" },
            sticky: "The rule can still run — it just applies to all of that platform’s outlets, and the user is told so.",
          },
          {
            title: "Pick them after → Save is blocked",
            text: "Add one after you’ve already chosen locations and it turns into an error: the platform field goes red with “Please remove ToYou & Jahez”, and Save stays disabled until it’s fixed.",
            image: { src: "/work/menu-rules/bl-3-error.png", alt: "Error state: please remove ToYou and Jahez, Save disabled" },
            problem: "No silent half-valid rule — you can’t publish a location-scoped rule on a platform that can’t honor it.",
          },
          {
            title: "Remove them → back in business",
            text: "Drop the incompatible platforms and locations re-enable, the warnings clear, and Save activates. The user is never stuck — the way out is always one step away.",
            image: { src: "/work/menu-rules/bl-4-fixed.png", alt: "Recovered state: locations re-enabled and Save active" },
          },
        ],
      },
      {
        label: "Deep dive — when two rules fight (found in user testing)",
        intro:
          "This one wasn’t in the first design. In a user testing session, a brand manager building a few rules asked the question we couldn’t answer: “if two rules change the same item’s price, on the same platform and location — which one wins?” At brand scale that overlap is inevitable, and left alone the menu would publish something unpredictable. So conflict handling became a first-class part of the flow.",
        features: [
          {
            title: "Caught on save",
            text: "When a new rule overlaps an existing one, saving is blocked with an alert that names exactly what it clashes with — discard, or review.",
            image: { src: "/work/menu-rules/cf-1-detected.png", alt: "Conflicting rules alert on save" },
            problem: "Before this, the last rule to publish would silently win — the exact ‘angry franchise’ outcome the feature was meant to prevent.",
          },
          {
            title: "Resolve, side by side",
            text: "The new rule and the ones it conflicts with sit next to each other, with the overlapping platforms, locations, items and change all highlighted. Keep just one enabled — or edit to remove the overlap.",
            image: { src: "/work/menu-rules/cf-2-resolve.png", alt: "Resolve conflict, side by side with overlaps highlighted" },
          },
          {
            title: "Every overlap, flagged in place",
            text: "Open a rule and each overlap is called out inline — platforms, locations, items, even the attribute — so you fix precisely what’s clashing, and the flags clear as you go.",
            image: { src: "/work/menu-rules/cf-3-inline.png", alt: "Edit rule with inline overlap flags on every dimension" },
            sticky: "Overlap is shown on every dimension, not as one vague ‘conflict’ — you always know what to change.",
          },
          {
            title: "Down to the exact outlets",
            text: "For location clashes, a focused view lists only the overlapping outlets with a one-click ‘Deselect all’ — clear dozens of stores in a tap, then save.",
            image: { src: "/work/menu-rules/cf-4-locations.png", alt: "Overlapping locations view with deselect-all" },
          },
        ],
      },
    ],
    process: [],
    gallery: [],
    outcome:
      "Brands run one menu plus a handful of rules instead of dozens of duplicates — targeted price and availability changes by platform, location and item, with conflicts and platform limits made visible instead of silent.",
    nextSlug: "up-design-system",
  },
  {
    slug: "up-design-system",
    title: "A Design System for a Multi-Team B2B Product",
    tagline:
      "Merged redundant styles and standardised tables, drawers and buttons — into one published system every team builds from.",
    tags: ["Design System", "B2B SaaS"],
    domain: "Design System · UrbanPiper",
    lockedTeaser:
      "The published styles and components behind UrbanPiper's Atlas — the foundations every other case study here is built from.",
    cover: "/work/up-design-system/assets/doc-cover.png",
    // Outside/card thumbnail — the branded UrbanPiper design-system cover, shown
    // whole (contain) so the full design isn't cropped. The detail-page hero
    // still uses `cover` (the doc title slide).
    cardCover: "/work/up-design-system/assets/card-cover.png",
    cardContain: true,
    coverAlt: "UrbanPiper design system — Building consistency, enabling scale",
    year: "2025",
    role: "Core contributor — foundations & components",
    team: "A small group of product designers maintaining the system, with engineering — I built and extended parts of it alongside shipping features",
    timeline: "Ongoing — a living system",
    tools: ["Figma", "Styles & Components"],
    overview:
      "UrbanPiper's Atlas is a large B2B product — orders, menus, tables, analytics and onboarding — built by multiple squads at speed. The design system is the shared vocabulary that keeps all of it feeling like one product.",
    problem:
      "Over time the styles and components drifted: redundant text styles, too many near-identical greys (many just black at lowered opacity), and table, drawer and button patterns that behaved differently screen to screen. So we ran a platform-wide pass to merge the redundant styles and standardise the patterns — on two tracks, visual design and functionality.",
    process: [],
    gallery: [],
    outcome:
      "Fewer, fixed styles with defined roles; one published component set; and consistent table, drawer, button and input behaviour across the product. Teams assemble screens from the system instead of rebuilding the basics.",
    nextSlug: "self-serve-go-live",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/* ----------------------------------------------------------------------------
 * TEMPLATE — copy this object into `caseStudies` above to add a real study.
 * Remove `comingSoon`, fill the fields, and put images in /public/work/<slug>/.
 * Every field below is written in the voice to aim for — swap the substance.
 *
 * {
 *   slug: "unique-url-slug",
 *   title: "Project Title",
 *   tagline: "One or two sentences on the outcome, in plain language.",
 *   tags: ["B2B SaaS", "0 → 1"],
 *   cover: "/work/unique-url-slug/cover.jpg",
 *   coverAlt: "Describe the cover for screen readers",
 *   year: "2025",
 *   role: "Product Designer",
 *   team: "Who you worked with",
 *   timeline: "How long it took",
 *   tools: ["Figma", "Linear"],
 *   overview: "What the product is and why this work mattered.",
 *   problem: "The specific problem you were solving.",
 *   // Either write structured `sections` (like self-serve-go-live) OR fill
 *   // process/gallery/outcome/metrics below and leave `sections` off.
 *   process: ["Step one.", "Step two.", "Step three."],
 *   gallery: [
 *     { src: "/work/unique-url-slug/01.jpg", alt: "Key screen", wide: true },
 *     { src: "/work/unique-url-slug/02.jpg", alt: "Detail view" },
 *   ],
 *   outcome: "What changed once it shipped.",
 *   metrics: [{ label: "Metric", value: "+00%" }],
 *   nextSlug: "self-serve-go-live",
 * }
 * -------------------------------------------------------------------------- */
