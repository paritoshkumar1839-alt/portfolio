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
  // Subtle hero metadata line (kept light on purpose).
  tagline:
    "4+ years in product design — B2B SaaS, web apps, and the design systems behind them.",

  // Bio — used in the "Who I am" section.
  bio: [
    "I'm a product designer who spent the last few years at UrbanPiper, the platform restaurants use to run every delivery channel they sell on. I designed across its three core products — Meraki, the white-labeled app diners order from; Prime, the point-of-sale system cashiers run; and Atlas, the dashboard restaurant teams use to manage it all — which meant designing for consumers, cashiers, and operators, on web and mobile.",
    "My work lives wherever a workflow is too complex for the person stuck inside it. I start with why a step exists and who it actually serves, work with engineering from day one so decisions survive the handoff, and treat design QA as part of the job rather than an afterthought. Before product, I trained as a film editor — the instinct for pacing and story never left, and it still shapes how I think about a flow.",
  ],

  // Stat band under the hero. Keep these honest.
  stats: [
    { value: "4+", label: "Years of experience" },
    { value: "4", label: "Global markets shipped for" },
    { value: "0→1", label: "Full-lifecycle products" },
    { value: "[N]+", label: "Products shipped to production" },
  ],

  // Scrolling highlights marquee — the best things to know, at a glance.
  credentials: [
    "Product Designer",
    "UrbanPiper",
    "Meraki · consumer ordering",
    "Prime · point of sale",
    "Atlas · merchant dashboard",
    "MENA · UK · US · India",
    "0 → 1 product design",
    "Design systems",
    "Systems thinking",
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

  // Tools grouped by category (order here is the order they scroll in).
  tools: [
    { category: "Design", items: ["Figma", "Adobe XD", "Framer", "Wix", "Stitch"] },
    { category: "AI", items: ["Claude Code", "Claude", "ChatGPT", "Lovable"] },
    { category: "Product", items: ["Linear", "Slack", "PostHog", "Hotjar"] },
    { category: "Video", items: ["Adobe Premiere Pro"] },
  ],

  // Career timeline — one company, owned deeply.
  experience: [
    {
      role: "Product Designer",
      company: "UrbanPiper",
      period: "Apr 2022 — Jul 2026",
      current: false,
      impact:
        "Designed across UrbanPiper's three core products — Meraki (consumer ordering), Prime (point of sale), and Atlas (the merchant dashboard) — for diners, cashiers, and restaurant operators, on web and mobile.",
      achievements: [
        "Led the self-serve Request-to-Go-Live flow, letting restaurant teams connect their own stores to delivery platforms instead of waiting on an account manager.",
        "Designed Menu Rules — targeted exceptions by platform, location, and item that replaced dozens of duplicated menus with a single source of truth.",
        "Owned features end to end: discovery, interaction design, prototyping, and design QA alongside engineering.",
        "Stepped into graphic and motion work when the product needed it, not just screens.",
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
      program: "Full-Stack UI/UX Design Diploma",
      place: "Masai School",
      period: "Aug 2020 — Feb 2021",
    },
    {
      program: "BSc in Cinema",
      place: "Asian Academy of Film & Television",
      period: "2018 — 2021",
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

  // Testimonials — real LinkedIn recommendations from people I've worked with.
  // The two longest were lightly trimmed for balanced cards; wording is verbatim.
  testimonials: [
    {
      name: "Abhishek Tomar",
      role: "Senior Product Manager, UrbanPiper",
      image: "/testimonials/abhishek-tomar.jpg",
      company: "UrbanPiper",
      logo: "/testimonials/urbanpiper.jpeg",
      quote:
        "Paritosh consistently impressed me with how he approaches his craft. What stood out most was his ability to juggle multiple projects and products at once — even with heavy context switching, he never lost sight of the details or dropped the ball. Before jumping into solutions, he always took the time to deeply understand the user and their actual pain points; it genuinely shaped the direction of his designs and led to better outcomes. Whether working with PMs, engineers, or other designers, he made sure everyone's perspective was heard, and once something was his responsibility, he took complete ownership of it, end to end, no hand-holding required.",
    },
    {
      name: "Akshay Kadam",
      role: "Software Engineer, Novulis Consulting",
      image: "/testimonials/akshay-kadam.jpg",
      company: "Novulis Consulting",
      logo: "/testimonials/novulis.jpeg",
      quote:
        "I had the absolute pleasure of working closely with Paritosh at UrbanPiper for three years. As a developer, finding a design partner who truly understands the technical nuances of product development is rare, but Paritosh bridges that gap effortlessly. He led design across multiple core products simultaneously — Meraki, Prime, and Atlas — balancing the distinct experiences of consumers, cashiers, and merchants brilliantly. What always stood out was his meticulous approach to developer handoffs: his files and specs were consistently clear and thoroughly thought-out, which significantly streamlined our engineering cycles. Any engineering team would be incredibly lucky to have Paritosh as their design partner.",
    },
    {
      name: "Vaibhavraj Roham",
      role: "Engineering, UrbanPiper",
      image: "/testimonials/vaibhavraj-roham.jpg",
      company: "UrbanPiper",
      logo: "/testimonials/urbanpiper.jpeg",
      quote:
        "What stood out most about Paritosh was his ability to translate complex product problems into simple, intuitive experiences. He didn't just make interfaces look good — he consistently asked the right questions, challenged assumptions, and ensured every design decision was grounded in user needs. He's highly collaborative with engineers, incredibly receptive to feedback, and someone you can trust to take ownership from discovery through polished execution. Any team looking for a designer who combines strong product thinking with excellent execution would be fortunate to have Paritosh.",
    },
    {
      name: "Kaviya Anandaraman",
      role: "Product Designer, UrbanPiper · prev. Lollypop",
      image: "/testimonials/kaviya-anandaraman.jpg",
      company: "UrbanPiper",
      logo: "/testimonials/urbanpiper.jpeg",
      quote:
        "I worked with Paritosh at UrbanPiper, and I genuinely enjoyed collaborating with him. His designs consistently reflected a good understanding of both the user experience and the practical constraints of the product, and many of our discussions felt less like handoffs and more like solving problems together. I always found him open to feedback, easy to work with, and willing to think through edge cases before jumping to solutions. I'm sure any team would value having him as part of their design team.",
    },
    {
      name: "Vishal Maurya",
      role: "Product Designer, Mankind · studied together",
      image: "/testimonials/vishal-maurya.jpg",
      company: "Mankind",
      logo: "/testimonials/mankind.jpeg",
      quote:
        "Paritosh possesses a remarkable ability to understand user needs and translate them into outstanding user experiences. He consistently demonstrated a strong grasp of design principles and methodologies, and his attention to detail was unparalleled. His designs were not only visually captivating but also highly functional, striking the perfect balance between aesthetics and usability.",
    },
  ],

  openTo:
    "Open to full-time product design roles, ideally with teams building complex, high-growth software products.",

  resumeHref: "/resume.pdf",

  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/iamparitoshkumar" },
    { label: "Behance", href: "https://behance.net/paritoshkumar4" },
  ],

  // Beyond product design — film work. Personal-branding subsection in About.
  // Thumbnails are pulled from each video's YouTube poster; whole card links out.
  film: {
    heading: "Always a movie buff",
    intro:
      "I trained as a film student, and it stuck — a relentless movie buff who still edits, produces, and occasionally steps in front of the camera.",
    quote: "Cinema is a reflection of society.",
    lede: "It shows us back to ourselves — and that’s the part I’ve never put down.",
    works: [
      {
        title: "Chalava",
        native: "पहला चक्रव्यूह",
        role: "Assistant Film Editor",
        meta: "Web series · 25M+ views · Trended on Hotstar",
        blurb:
          "A horror-drama web series I helped cut — it trended on Disney+ Hotstar and has since crossed 25M+ views on YouTube.",
        source: "youtube",
        videoId: "JqDJhZ2xWGs",
      },
      {
        title: "Hey Jenny",
        native: "",
        role: "Production Manager · BTS",
        meta: "Short film · India Film Project ’18 · Undercurry",
        blurb:
          "A short film shot in 50 hours for the India Film Project. I ran production and everything behind the scenes.",
        source: "youtube",
        videoId: "eJ6Mup118vI",
      },
      {
        title: "Ajeeb Dastaan Hai Yeh",
        native: "",
        role: "Cameo",
        meta: "Award-winning short · Old Window Studio",
        blurb:
          "A tiny cameo, and my first-ever time on a set — filmed in my second week of film school.",
        source: "youtube",
        videoId: "-razqDbP3uU",
      },
      {
        title: "Faded Dream",
        native: "",
        role: "Editor",
        meta: "Music video",
        blurb:
          "A music video I cut end to end, pacing the edit to the mood and rhythm of the track.",
        source: "drive",
        videoId: "1UftymEx_21MQN9vVlCuY4450I5cKLbBX",
      },
      {
        title: "Music Project",
        native: "",
        role: "Editor",
        meta: "Music video",
        blurb:
          "Another music-video edit, built around the song’s energy and beats.",
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
