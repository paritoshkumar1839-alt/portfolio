/* ============================================================================
 * EDIT ME — single source of truth for identity, bio, and every section
 * of the single-page narrative. All content lives here + case-studies.ts.
 *
 * TODO(paritosh): replace before launch —
 *   1. bio[1], bio[2]        → fill the [bracketed] specifics
 *   2. stats[]               → confirm real numbers ([N] placeholders)
 *   3. credentials[]         → real companies, awards, publications
 *   4. experience[]          → real roles, impact lines, achievement bullets
 *   5. awards[], education[] → real recognitions + schooling
 *   6. socials[]             → real LinkedIn / Dribbble / X handles
 *   7. resumeHref            → drop a real /resume.pdf into /public
 *   8. site.domain (layout)  → your real domain for metadata/OG
 * ========================================================================== */

export const profile = {
  name: "Paritosh Kumar",
  firstName: "Paritosh",
  lastName: "Kumar",
  role: "Product Designer",
  location: "India",
  email: "paritoshkumar1839@gmail.com",
  availability: "Available for new work",

  previously: {
    label: "Previously",
    company: "UrbanPiper",
  } as { label: string; company: string } | null,

  // Hero positioning sentence — sits under the big name.
  headline:
    "I turn ambiguous, high-complexity workflows into interfaces that scale.",
  tagline:
    "4+ years designing B2B and consumer products — from early concept to shipped detail.",

  // Bio — used in the "Who I am" section.
  bio: [
    "I'm a product designer with 4+ years of experience, most recently at UrbanPiper. My focus has always been the same: understand why a workflow feels painful for the person stuck inside it, then simplify it until the pain disappears — not fewer screens for the sake of fewer screens, but fewer steps between someone and the thing they actually came to do.",
    "At UrbanPiper, that meant designing for restaurant owners juggling orders across half a dozen delivery apps at once — people who don't have time to learn new software, only to run a kitchen. Every decision started with the same question: why does this step exist, and who does it actually serve? If the honest answer was “the system needs it” instead of “the user needs it,” it got redesigned or removed. [Add the specific feature or initiative you led — e.g. order aggregation, menu management, a POS integration.]",
    "I work closely with engineering and product from day one, because the “why” behind a decision gets lost fast once it's handed off — and I'd rather defend a decision in a standup than rebuild it after launch. [Add a real detail about what you read, build, or study to stay sharp — this is what makes the paragraph sound like you, not a template.]",
  ],

  // Stat band under the hero. Keep these honest.
  stats: [
    { value: "4+", label: "Years of experience" },
    { value: "4", label: "Global markets shipped for" },
    { value: "0→1", label: "Full-lifecycle products" },
    { value: "[N]+", label: "Products shipped to production" },
  ],

  // Scrolling credential marquee — companies, scope, awards, publications.
  credentials: [
    "UrbanPiper — Atlas",
    "B2B SaaS · Self-Serve",
    "MENA · UK · US · India",
    "0 → 1 Product Design",
    "Design Systems",
    "[Award or recognition]",
    "[Publication or talk]",
    "[Previous company]",
  ],

  // Capability cards — the craft, in a few grouped strengths.
  capabilities: [
    {
      title: "Product & UX Strategy",
      body: "Framing the real problem before the pixels — turning fuzzy, high-stakes asks into a clear point of view on what to build and why.",
    },
    {
      title: "0 → 1 Design",
      body: "From blank canvas to shipped platform: information architecture, flows, and the first version that has to actually work in production.",
    },
    {
      title: "Design Systems",
      body: "Token-driven, component-based foundations that let engineering ship consistently without pinging design every sprint.",
    },
    {
      title: "Systems Thinking",
      body: "Designing for workflows that flex across regions, roles, and edge cases — not one happy path, but every path the product has to hold.",
    },
  ],

  // Full skill-tag wrap.
  skills: [
    "User Research",
    "Information Architecture",
    "Interaction Design",
    "Prototyping",
    "Design Systems",
    "UX Strategy",
    "0 → 1",
    "Systems Thinking",
    "B2B SaaS",
    "Workflow Design",
    "Design QA",
    "Stakeholder Alignment",
  ],

  // Specialty tags — also used elsewhere.
  expertise: [
    "Product Design",
    "0 → 1",
    "Design Systems",
    "UX Strategy",
    "B2B SaaS",
    "Systems Thinking",
  ],

  // Tools grouped by category.
  tools: [
    { category: "Design", items: ["Figma", "Sketch", "Adobe Illustrator"] },
    { category: "Prototyping", items: ["Framer", "Principle", "ProtoPie"] },
    { category: "Collaboration", items: ["Notion", "Linear", "Slack"] },
  ],

  // Career timeline — richer than a plain list.
  experience: [
    {
      role: "Product Designer",
      company: "UrbanPiper",
      period: "20XX — Present",
      current: true,
      impact:
        "Designing Atlas — order, schedule, and operations management for multi-brand restaurant businesses across delivery platforms.",
      achievements: [
        "Led the self-serve go-live redesign, letting restaurant teams connect their own stores to every delivery platform without waiting on an account manager.",
        "[Add a specific feature or initiative you owned — e.g. order aggregation, menu management, a POS integration.]",
        "[Add a measurable outcome — adoption, time saved, support tickets reduced.]",
      ],
    },
    {
      role: "[Job title]",
      company: "[Company name]",
      period: "20XX — 20XX",
      current: false,
      impact: "[One line on what you owned and shipped here.]",
      achievements: [
        "[Achievement or responsibility.]",
        "[Achievement or responsibility.]",
      ],
    },
  ],

  // Design principles — how you think about the work.
  principles: [
    {
      title: "Ask why every step exists",
      body: "The most expensive mistake is solving the wrong problem well. Before anything gets designed, each step has to justify who it actually serves — the user, or just the system.",
      tag: "Discovery",
    },
    {
      title: "Fewer steps, not fewer screens",
      body: "Simplicity isn't minimalism for its own sake. It's removing the distance between someone and the thing they came to do — even when that means more surface, not less.",
      tag: "Craft",
    },
    {
      title: "Defend decisions early",
      body: "The “why” behind a decision gets lost fast once it's handed off. I'd rather defend a call in a standup with engineering and product than rebuild it after launch.",
      tag: "Collaboration",
    },
  ],

  // Recognition cards for the "Who I am" section.
  awards: [
    {
      icon: "◆",
      title: "Product Designer at UrbanPiper",
      sub: "Atlas · Restaurant delivery-platform operations",
    },
    {
      icon: "✦",
      title: "[Award or recognition]",
      sub: "[Add where and when]",
    },
    {
      icon: "✎",
      title: "[Publication or talk]",
      sub: "[Add venue or link]",
    },
  ],

  education: [
    {
      program: "[Degree / Program]",
      place: "[Institution]",
      period: "20XX — 20XX",
    },
  ],

  // Domain experience tags.
  domains: [
    "B2B SaaS",
    "Consumer",
    "Restaurant Tech",
    "Delivery / Logistics",
    "[Add a domain]",
  ],

  openTo:
    "Open to full-time product design roles, ideally with teams building complex, high-growth software products.",

  resumeHref: "/resume.pdf",

  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
    { label: "Dribbble", href: "https://dribbble.com/your-handle" },
  ],

  // Beyond product design — film work. Personal-branding subsection in About.
  // Thumbnails are pulled from each video's YouTube poster; whole card links out.
  film: {
    heading: "What else I do, outside work",
    intro:
      "I trained as a film student, and it stuck. I’m a relentless movie buff — films, series, all of it — and most weekends you’ll find me with friends, pulling scripts apart and helping out on whatever they’re shooting. Along the way I’ve edited, produced, and stepped in front of the camera too.",
    quote: "Cinema is a reflection of society.",
    lede: "It shows us back to ourselves — and that’s the part I’ve never put down.",
    works: [
      {
        title: "Chalava",
        native: "पहला चक्रव्यूह",
        role: "Assistant Film Editor",
        meta: "Web series · 25M+ views · Trended on Hotstar",
        blurb:
          "A horror–dark-drama web series I helped cut. It trended on Disney+ Hotstar for two weeks; after its year-long run there it lives on YouTube, where it’s now crossed 25M+ views.",
        source: "youtube",
        videoId: "JqDJhZ2xWGs",
      },
      {
        title: "Hey Jenny",
        native: "",
        role: "Production Manager · BTS",
        meta: "Short film · India Film Project ’18 · Undercurry",
        blurb:
          "A short film shot in 50 hours for the India Film Project challenge with the Undercurry team. I ran production and handled everything behind the scenes.",
        source: "youtube",
        videoId: "eJ6Mup118vI",
      },
      {
        title: "Ajeeb Dastaan Hai Yeh",
        native: "",
        role: "Cameo",
        meta: "Award-winning short · Old Window Studio",
        blurb:
          "A tiny cameo — and my first-ever time on set. We shot this in the second week of film school, so go easy on us: we were just kids figuring out a camera.",
        source: "youtube",
        videoId: "-razqDbP3uU",
      },
      {
        title: "Faded Dream",
        native: "",
        role: "Editor",
        meta: "Music video",
        blurb:
          "A music video I cut end to end — pacing the edit to the mood and rhythm of the track.",
        source: "drive",
        videoId: "1UftymEx_21MQN9vVlCuY4450I5cKLbBX",
      },
      {
        title: "Music Project",
        native: "",
        role: "Editor",
        meta: "Music video",
        blurb:
          "Another music-video edit — building the cut around the song’s energy and beats.",
        source: "drive",
        videoId: "1aT8_qjGpOgXeNyzaE-XdzuUDAhS7YMUp",
      },
    ],
    remixTitle: "Crossovers no one asked for",
    remixIntro:
      "Remixes and mashups I cut for fun — unexpected crossovers, purely for the joy of editing.",
    remixes: [
      { id: "1Y-9pZLi0Q7SlqJw0SXfb9MmBlWh8NKgA", title: "Allu Arjun × Ranbir Kapoor" },
      { id: "1TAeBEI3RxeVHD_2vifOPCfrTF5yYLRiq", title: "Bhai Ke Skechers" },
      { id: "1AB5fsmlR-IZdL5ttCNYUZjvs_FnL3b3o", title: "Ching’s × Tatad Tatad" },
      { id: "1cx4yfJLAOzFNvV9Qen_LEw7DoOjLctv5", title: "Eminem × Idhar Chala" },
      { id: "1GOLmIGAj7JgpNDvzmLHPUYnEPKCZvavR", title: "Money Heist × Happy New Year" },
      { id: "1rjpHrMNUhT7AEqjf27g3PDhCKcRSpM9R", title: "Roxanne" },
      { id: "1uFb6MveSnl_eVRDSniiTEo8o-bDUB-cL", title: "Rum Rum Rum" },
      { id: "1WeAlEjM5KzvMq3MIrpPP2myWhgMrW1l-", title: "Shinchan" },
      { id: "1DQVHqDntrrjvpOVMfX44vcCiolj5k-jV", title: "Wiggle × Bollywood" },
    ],
  },

  // Photo collage in About — moments from the last chapter.
  // Images live in /public/about/gallery/ as g-01.jpg … g-NN.jpg.
  gallery: {
    heading: "Life at UrbanPiper",
    intro:
      "A few moments from my last chapter — the people, the room, and the work behind the work.",
    count: 15,
  },
};

export type Profile = typeof profile;
