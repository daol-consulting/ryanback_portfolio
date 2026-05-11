/**
 * Portfolio narrative content (resume-backed).
 * Replace this file when you paste your real positions, projects, education, and links.
 * App and legacy section components import from here — not from constants.
 */
import {
  daolInvoiceAutomationWorkflow,
  dontgobrokePromo,
  hl7chatbotinterface,
  portfolio,
  web,
} from "../assets";
import careerCraLogo from "../assets/career-cra-logo.png";
import careerDaolLogo from "../assets/career-daol-logo.png";
import careerEmpoweredFuturesLogo from "../assets/career-empowered-futures-logo.png";
import careerPosyLogo from "../assets/career-posy-logo.png";

/**
 * Canonical profile URLs — Career, Projects, and quick-action buttons.
 * Set `blog`, `resumePdf`, or `calendly` when you have public URLs (hidden until non-empty).
 */
export const PROFILE_LINKS = {
  github: "https://github.com/ho0405",
  /** Daol Consulting — public org repos (client / studio delivery). */
  githubDaolOrg: "https://github.com/consulting-daol/",
  linkedin: "https://www.linkedin.com/in/ryan-back/",
  blog: "",
  resumePdf: "",
  calendly: "",
  emailMailto: "mailto:ho0405@gmail.com",
};

/** Buttons for About · Contact strips (entries with blank href omitted). */
export const profileQuickLinks = [
  { label: "LinkedIn", href: PROFILE_LINKS.linkedin },
  { label: "GitHub · ho0405", href: PROFILE_LINKS.github },
  { label: "GitHub · consulting-daol", href: PROFILE_LINKS.githubDaolOrg },
  { label: "Email", href: PROFILE_LINKS.emailMailto },
  { label: "Blog", href: PROFILE_LINKS.blog },
  { label: "Résumé (PDF)", href: PROFILE_LINKS.resumePdf },
  { label: "Book a call", href: PROFILE_LINKS.calendly },
].filter((item) => typeof item.href === "string" && item.href.trim().length > 0);

/**
 * Career layout (reference: logo column + project blocks with vertical accent).
 * @type {Array<{
 *   company_name: string;
 *   location: string;
 *   role_title: string;
 *   period: string;
 *   tagline: string;
 *   logo: string | null;
 *   logo_letter?: string; // lettermark when logo is null
 *   logo_bg?: string;
 *   invert_logo_for_light_bg?: boolean;
 *   logo_compact?: boolean;
 *   company_website?: string;
 *   highlights: string[];
 *   projects: Array<{ title: string; period: string; description: string }>;
 * }>}
 */
export const career = [
  {
    company_name: "Canada Revenue Agency (CRA)",
    location: "Calgary, AB",
    role_title: "Taxpayer Services Agent · SP-04",
    period: "Mar 2026 — Present",
    tagline:
      "High-volume public service for complex tax and program questions, balancing policy, systems data, and clear explanations for non-technical users.",
    logo: careerCraLogo,
    logo_bg: "#ffffff",
    logo_compact: true,
    highlights: ["Client service", "Systems navigation", "Policy & compliance"],
    projects: [
      {
        title: "Taxpayer services operations",
        period: "Mar 2026 — Present",
        description:
          "Resolve inquiries via multiple internal applications; diagnose account and procedural issues under pressure; communicate technical and regulatory details plainly. (Service delivery)",
      },
    ],
  },
  {
    company_name: "Daol Consulting",
    location: "Calgary, AB",
    role_title: "Self-Employed · Full-Stack Developer",
    period: "Jan 2025 — Present",
    tagline:
      "Independent studio: custom web, Google/Meta funnels, internal tooling, and invoicing—design through deploy and ongoing iteration. Active build: React + TypeScript storefront on Vercel with headless Shopify for e‑commerce and general‑merchandise sales.",
    logo: careerDaolLogo,
    logo_bg: "#ffffff",
    logo_compact: true,
    company_website: "https://daolconsulting.com",
    highlights: [
      "React / TypeScript · Vercel",
      "Headless Shopify",
      "Supabase",
      "Ads & analytics",
      "Product delivery",
    ],
    projects: [
      {
        title: "Headless Shopify e‑commerce storefront",
        period: "In progress · 2025",
        description:
          "React + TypeScript storefront deployed on Vercel, Shopify in a headless configuration (Storefront/catalog/checkout patterns)—selling miscellaneous product lines alongside core commerce UX. Currently in delivery; storefront owns presentation while Shopify anchors product and order primitives. (E‑commerce · in progress)",
      },
      {
        title: "Client web — performance & conversion",
        period: "Jan 2025 — Present",
        description:
          "10+ shipped custom sites (no templates), e.g. Taekwondo ON rebuild + funnel, MHK Taekwondo, Choi Martial Arts, Cosmos Dental Lab, WISE Institute CMS-style updates, MAVIS / BNA Builders—focused on speed, conversion, and maintainability. (Frontend · full-stack)",
      },
      {
        title: "Lead generation — Taekwondo ON",
        period: "Campaign · 2025",
        description:
          "Google Ads + Meta Ads, landing pages, and conversion tracking—roughly 100+ qualified leads in about two weeks. (Growth · implementation)",
      },
      {
        title: "Internal marketing management tool",
        period: "Jan 2025 — Present",
        description:
          "Campaign structure (Google/Meta), lead tracking, performance logging, and client segmentation so marketing work stays visible and repeatable. (React · data)",
      },
      {
        title: "Invoice automation",
        period: "Jan 2025 — Present",
        description:
          "Built with Make.com and n8n: Gmail and Google Docs wired so yearly subscription invoices go out automatically on each client’s renewal date—no manual resend chasing. (Automation)",
      },
    ],
  },
  {
    company_name: "Posy Inc",
    location: "Calgary, AB",
    role_title: "Full-Stack Software Engineer · Co-op",
    period: "Apr 2025 — Nov 2025",
    tagline:
      "Production ERP used in real operations—inventory, purchase orders, sales orders, and reporting—with strict data integrity and real-time synchronization.",
    logo: careerPosyLogo,
    logo_bg: "#ffffff",
    highlights: ["Full-stack", "React", "Firestore", "ERP / B2B"],
    projects: [
      {
        title: "ERP core — inventory & order operations",
        period: "Apr 2025 — Nov 2025",
        description:
          "Inventory and PO/SO workflows with validation that blocks unsafe product deletion when inventory, PO, or SO references exist (Firestore + hooks such as useInventoryExists). Real-time listeners for accurate stock; tier pricing; fixes for price mismatches and pipeline-breaking edge cases. (Frontend · data layer)",
      },
      {
        title: "Product catalog & discovery",
        period: "Apr 2025 — Nov 2025",
        description:
          "Keyword, brand, and availability search; sorting; infinite scroll; scroll restoration; persisted queries and recent searches for large catalogs. (UX · performance)",
      },
      {
        title: "Reporting & UI reliability",
        period: "Apr 2025 — Nov 2025",
        description:
          "Operations reporting with PO/SO visibility, inventory analytics, and Excel export. Resolved dropdown/popover freezes and z-index conflicts; standardized reusable UI. (Frontend · reporting)",
      },
    ],
  },
  {
    company_name: "Empowered Futures",
    location: "Calgary, AB",
    role_title: "Full-Stack Software Engineer · Co-op",
    period: "May 2024 — Aug 2024",
    tagline:
      "Registered Canadian charity (Calgary) helping emerging adults (18–28) build confidence through free mentorship—best known for EF Connect, pairing mentees with experienced professionals.",
    logo: careerEmpoweredFuturesLogo,
    logo_bg: "#ffffff",
    logo_compact: true,
    company_website: "https://www.empoweredfutures.ca/",
    highlights: ["Non-profit", "EF Connect", "Full-stack", "Mentorship"],
    projects: [
      {
        title: "EF Connect · mentorship platform",
        period: "May 2024 — Aug 2024",
        description:
          "Co-op delivery on the web platform that connects young adults with mentors—onboarding, program-facing flows, and iteration with a small mission-led team. (Full-stack · product)",
      },
      {
        title: "Public site & Get Involved pathways",
        period: "May 2024 — Aug 2024",
        description:
          "Contributed to mentor, mentee, and volunteer-facing experiences on empoweredfutures.ca—forms, validation, and responsive layout so visitors can move from interest to action without friction. (Frontend · full-stack)",
      },
      {
        title: "Quality & accessibility for non-technical users",
        period: "May 2024 — Aug 2024",
        description:
          "Polished outreach and contact flows for first-time visitors—copy/layout passes, mobile checks, and tighter validation so the mission reads clearly and sign-up feels trustworthy. (UX · reliability)",
      },
    ],
  },
];

/**
 * @type {Array<{
 *   connect: string;
 *   name: string;
 *   company: string;
 *   socialLink: string;
 *   omitHandlePrefix?: boolean;
 * }>}
 */
export const connect = [
  {
    connect:
      "Independent studio in Calgary—Next.js/React client sites and funnels, Google/Meta growth with attributable conversions, internal marketing tooling, subscription invoicing via Gmail/Google Docs on renewal dates (Make · n8n)—and an in‑flight headless Shopify store (React · TypeScript · Vercel) for e‑commerce and general merchandise.",
    name: "daolconsulting.com",
    company: "Daol Consulting",
    socialLink: "https://daolconsulting.com",
    omitHandlePrefix: true,
  },
  {
    connect:
      "Full-stack software engineer based in Calgary—production ERP work, Daol Consulting delivery (sites, ads, tooling), and a TypeScript-forward stack. Open to aligned roles and serious collaboration.",
    name: "ryan-back",
    company: "LinkedIn",
    socialLink: "https://www.linkedin.com/in/ryan-back/",
  },
  {
    connect:
      "Personal account—side projects and experiments (React, TypeScript, Supabase, Firebase when it fits). Employer ERP at Posy is proprietary and not mirrored here.",
    name: "ho0405",
    company: "GitHub · personal",
    socialLink: PROFILE_LINKS.github,
  },
  {
    connect:
      "Daol Consulting on GitHub—TypeScript repos for shipped client work (e.g. dental, institutes, restaurant landing systems). See github.com/consulting-daol.",
    name: "consulting-daol",
    company: "GitHub · Daol org",
    socialLink: PROFILE_LINKS.githubDaolOrg,
    omitHandlePrefix: true,
  },
];

/** @type {Array<{ degree: string; school: string; highlights: string }>} */
export const educations = [
  {
    degree: "Bachelor of Computer Science (Post-Diploma)",
    school: "University of Lethbridge",
    highlights: "GPA 3.88/4.0, Dean's Honour List",
  },
  {
    degree: "Diploma in Software Development (Honours)",
    school: "Southern Alberta Institute of Technology (SAIT)",
    highlights: "GPA 3.8/4.0, Jason Lang Scholarship",
  },
];

/** @type {Array<{ name: string; issuer: string; year: string }>} */
export const certifications = [
  {
    name: "Google IT Support Professional Certificate",
    issuer: "Google",
    year: "2023",
  },
  {
    name: "Scrum Fundamentals Certified (SFC)",
    issuer: "SCRUMstudy",
    year: "2024",
  },
  {
    name: "Critical Role of IT Support in Healthcare",
    issuer: "Johns Hopkins University",
    year: "2024",
  },
];

/**
 * About column copy — recruiter-friendly scans, grounded in Career / Projects.
 */
export const profileAbout = {
  eyebrow: "Calgary, AB · Full-stack (frontend-strong) · Production and consulting delivery",
  paragraphs: [
    "I focus on turning real operational workflows into software that people can actually rely on—inventory, purchase orders, sales orders, and reporting that stay consistent even when multiple users are working at the same time. I care a lot about edge cases and making sure the system doesn’t break under real usage.",
    "Alongside that, I run Daol Consulting. I build custom websites and keep working with clients after launch—checking in regularly, looking for friction in how they operate, and trying to solve those problems through software. Most of the time, the goal is simple: take something that’s inconvenient for small business owners and make it easier through better systems. Studio code paths split cleanly: personal work and experiments live on GitHub as ho0405, while Daol client delivery repos are under the consulting-daol organization (github.com/consulting-daol). Posy’s production ERP stays on employer systems only—not in my public repos.",
    "On my own time, I’m constantly paying attention to small inefficiencies—whether it’s something I experience myself or something people around me mention. I usually write these down and turn them into ideas I can explore later.",
  ],
  principle:
    "I’m less interested in how things look in mockups, and more in whether they hold up in real use—validation, real-time state, and reporting that stay reliable when things get messy. That’s where I tend to spend extra time.",
};

/**
 * Skills section context + grouped strengths (paired with chips below).
 */
export const skillsNarrative = {
  pitch:
    "These tags are shorthand. The groupings summarize how stacks show up in shipping work: ERP scale, consulting delivery, and product-oriented frontend foundations.",
};

export const skillStrengthThemes = [
  {
    title: "Production ERP and data-heavy UI",
    bullets: [
      "Firestore-backed inventory and PO/SO flows with guards against unsafe deletes",
      "Real-time listeners and searchable catalogs with persisted queries",
      "Operator reporting and Excel export pathways that tolerate busy screens",
    ],
  },
  {
    title: "Consulting and growth implementation",
    bullets: [
      "Next.js/React sites prioritized for conversion and measurable performance",
      "Headless Shopify storefront work (React + TypeScript on Vercel) for sellable catalogues and checkout-adjacent UX",
      "Google and Meta funnel wiring with attributable conversion checkpoints",
      "Internal React consoles so campaigns and leads remain auditable",
    ],
  },
  {
    title: "Frontend craft and disciplined stacks",
    bullets: [
      "TypeScript-forward components with attention to layering, scrolling, and popover edge cases",
      "Supabase and Capacitor used where fast iteration beats ceremony",
      "Comfort moving between greenfield prototypes and iterative client maintenance",
    ],
  },
];

/**
 * Showcase work (aligned with Career narrative — expand only when fact-backed).
 * @type {Array<{
 *   slug: string;
 *   featured: boolean;
 *   name: string;
 *   period: string;
 *   context?: string;
 *   summary: string;
 *   bullets: string[];
 *   stack: string[];
 *   tags: Array<{ name: string; color: string }>;
 *   image?: string | null;
 *   preview_video?: string; // public URL e.g. /videos/foo.mp4 — optional demo clip in project card
 *   source_code_link: string; // empty when no public repo (e.g. employer-owned, ads-only)
 *   demo_link?: string;
 *   readme_link?: string;
 *   roleLine?: string;
 *   impactLine?: string;
 * }>}
 */
export const projects = [
  {
    slug: "posy-erp-production",
    featured: true,
    name: "Production ERP — inventory, orders & reporting (Posy Inc.)",
    period: "Apr 2025 — Nov 2025",
    context: "Co-op · live operations",
    summary:
      "Full-stack work on a real ERP: inventory, purchase and sales orders, pricing, and operator-facing reporting with strict data integrity. Codebase is Posy Inc. property—there is no public copy under my personal GitHub.",
    bullets: [
      "Inventory and PO/SO flows with validation that blocks unsafe product deletion when inventory, PO, or SO references still exist (Firestore + hooks such as useInventoryExists).",
      "Real-time listeners and UI state so stock and order views stay accurate under concurrent use.",
      "Catalog discovery: search, filters, infinite scroll, scroll restoration, and persisted queries for large product sets.",
      "Operations reporting with PO/SO visibility, inventory analytics, and Excel export; stabilized dropdowns, popovers, and z-index issues across complex screens.",
    ],
    stack: ["React", "Firestore", "TypeScript", "ERP / B2B"],
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "firestore", color: "green-text-gradient" },
      { name: "real-time", color: "pink-text-gradient" },
      { name: "erp", color: "orange-text-gradient" },
    ],
    image: null,
    source_code_link: "",
    roleLine: "Full-stack co-op · production ERP frontend and data-heavy operator flows.",
    impactLine:
      "Live inventory / PO–SO safeguards, real-time stock views, catalog search at scale, and reporting exports trusted in daily ops.",
  },
  {
    slug: "dontgobroke-ios",
    featured: true,
    name: "DontGoBroke — minimal iOS expense tracker (shipped)",
    period: "2024 — ongoing",
    context: "Individual · shipped to App Store",
    summary:
      "Intentionally small expense tracker for people tired of bloated finance apps—focus on fast capture and a calm UI.",
    bullets: [
      "React + TypeScript (Vite), Tailwind and Radix primitives, Supabase for auth and persistence, Capacitor wrapper for iOS.",
      "Exploring FinanceKit / Apple Pay–driven ingestion to reduce manual line-by-line entry.",
      "Product decisions driven by shipping and iteration rather than feature sprawl.",
    ],
    stack: ["TypeScript", "React", "Vite", "Tailwind CSS", "Radix UI", "Supabase", "Capacitor", "iOS"],
    tags: [
      { name: "typescript", color: "blue-text-gradient" },
      { name: "supabase", color: "green-text-gradient" },
      { name: "capacitor", color: "pink-text-gradient" },
      { name: "ios", color: "orange-text-gradient" },
    ],
    image: dontgobrokePromo,
    source_code_link: PROFILE_LINKS.github,
    demo_link: "https://apps.apple.com/us/app/dontgobroke/id6760254186",
    roleLine: "Solo builder — UX, engineering, release on App Store (Capacitor / iOS).",
    impactLine: "Shipped consumer finance app focusing on sub-minute logging and calm defaults; iterating on ingestion (e.g. FinanceKit exploration).",
  },
  {
    slug: "chaeback-expense",
    featured: true,
    name: "Chaeback — AI-assisted expense platform",
    period: "2024 — ongoing",
    context: "Individual · full-stack product",
    summary:
      "Expense workflow built to cut manual bookkeeping: ingestion from receipts into structured transactions and categories.",
    bullets: [
      "OCR and extraction pipeline on receipts with categorization to reduce typing.",
      "Supabase-backed schema and APIs; React + TypeScript frontend for review and workflows.",
      "End-to-end ownership from ingestion UX to persistence and iterative product shape.",
    ],
    stack: ["TypeScript", "React", "Supabase", "OCR"],
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "typescript", color: "green-text-gradient" },
      { name: "supabase", color: "pink-text-gradient" },
      { name: "ocr-ai", color: "orange-text-gradient" },
    ],
    image: hl7chatbotinterface,
    preview_video: "/videos/chaeback-demo.mp4",
    source_code_link: PROFILE_LINKS.github,
    roleLine: "Owner-build · full-stack product (React · Supabase) from ingestion UX to persistence.",
    impactLine: "Receipt OCR → categorized transactions aimed at shrinking manual bookkeeping time per user.",
  },
  {
    slug: "daol-client-web",
    featured: false,
    name: "Client websites — performance & conversion (Daol Consulting)",
    period: "Jan 2025 — Present",
    context: "Studio · 10+ custom builds",
    summary:
      "Template-free sites for real businesses: speed, conversion, and maintainability—not theme churn.",
    bullets: [
      "Shipped bespoke sites across verticals (e.g. martial arts studios, builders, labs, institutes) with performance and funnel clarity as first-class constraints.",
      "Iterative UX and content handoff so operators can sustain sites without heavyweight stacks.",
      "Hosting and analytics wired for real-world measurement—not demo-only setups.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Analytics"],
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "performance", color: "green-text-gradient" },
      { name: "conversion", color: "pink-text-gradient" },
    ],
    image: web,
    demo_link: "https://daolconsulting.com",
    source_code_link: PROFILE_LINKS.github,
    roleLine: "Principal implementer · 10+ bespoke Next.js / React sites (studio delivery).",
    impactLine:
      "Template-free launches tuned for measurable speed and conversion; operators keep sites maintainable without heavy stacks.",
  },
  {
    slug: "daol-headless-shopify-ecommerce",
    featured: true,
    name: "Headless Shopify e‑commerce (Daol Consulting — in progress)",
    period: "2025 — in progress",
    context: "Studio · React storefront · Vercel · Shopify headless",
    summary:
      "React + TypeScript storefront hosted on Vercel, Shopify as headless commerce—catalogue-to-checkout patterns for miscellaneous product categories as the build advances.",
    bullets: [
      "Headless Shopify integration: storefront UI owns presentation while Shopify carries product, inventory, and commerce primitives.",
      "TypeScript-first React build and Vercel deployment—performance and iteration friendly for a sellable catalogue.",
      "Scope includes general merchandise / supplies alongside core e‑commerce flows; still in active delivery.",
    ],
    stack: ["React", "TypeScript", "Vercel", "Shopify", "Headless commerce"],
    tags: [
      { name: "shopify", color: "green-text-gradient" },
      { name: "react", color: "blue-text-gradient" },
      { name: "vercel", color: "pink-text-gradient" },
    ],
    image: web,
    source_code_link: PROFILE_LINKS.github,
    roleLine: "Daol Consulting — headless Shopify storefront (React · TypeScript · Vercel), e‑commerce and general merchandise in scope.",
    impactLine: "Commerce core in Shopify, experience layer in a modern TS/React stack—shipping toward a full sellable storefront.",
  },
  {
    slug: "peekaboo-product-site",
    featured: true,
    name: "Peekaboo — see through the web (Electron + product site)",
    period: "2026 — ongoing",
    context: "Daol Consulting · Electron · Next.js · Vercel",
    summary:
      "Peekaboo is a transparent, always-on-top desktop web window (Electron)—reference docs beside your editor, video beside notes. The public app source is ho0405/tranparent-browser (MIT); peekaboo-daol.vercel.app is the Next.js marketing site with downloads, 한/EN, and shortcut tables (⌘ / Ctrl).",
    bullets: [
      "Desktop app: Electron main/preload/renderer, context isolation, URL validation (http/https), opacity presets, always-on-top, bilingual UI, and global shortcuts—releases and .dmg builds via GitHub Releases (repo name: tranparent-browser).",
      "Product site: Next.js + TypeScript + Tailwind on Vercel (ho0405/peekaboo-landing), deployed at peekaboo-daol.vercel.app—features, download paths, and documented shortcuts aligned with the app.",
      "MIT licensed; README documents Mac (Intel + Apple Silicon) download flow and Windows roadmap where applicable.",
    ],
    stack: ["Electron", "JavaScript", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    tags: [
      { name: "electron", color: "blue-text-gradient" },
      { name: "nextjs", color: "green-text-gradient" },
      { name: "desktop", color: "pink-text-gradient" },
    ],
    image: web,
    preview_video: "/videos/peekaboo.mp4",
    source_code_link: "https://github.com/ho0405/tranparent-browser",
    demo_link: "https://peekaboo-daol.vercel.app/",
    roleLine: "Peekaboo — Electron desktop app (tranparent-browser) plus Next.js product site (peekaboo-landing · Vercel).",
    impactLine:
      "Open-source desktop shell plus a bilingual landing that turns transparency, pinning, and shortcuts into a clear install path from peekaboo-daol.vercel.app.",
  },
  {
    slug: "daol-taekwondo-leads",
    featured: false,
    name: "Lead generation — Taekwondo ON campaign",
    period: "Campaign · 2025",
    context: "Studio · ads + landing",
    summary:
      "Google and Meta funnel with landing pages and conversion tracking aimed at qualified school leads. Directionally ~100+ qualified leads in about two weeks for the focal campaign (attributed via conversion setup).",
    bullets: [
      "Structured campaigns on Google Ads and Meta with landing experiences aligned to creative and intent.",
      "Conversion instrumentation so spend maps to attributable outcomes.",
      "Roughly 100+ qualified leads in about two weeks for the focal campaign (directionally—see collateral for detail).",
    ],
    stack: ["Google Ads", "Meta Ads", "Landing pages", "Conversion tracking"],
    tags: [
      { name: "growth", color: "blue-text-gradient" },
      { name: "ads", color: "green-text-gradient" },
    ],
    image: null,
    source_code_link: "",
    roleLine: "Growth implementation — Google/Meta ads, landing pages, and conversion instrumentation.",
  },
  {
    slug: "daol-marketing-tool",
    featured: false,
    name: "Internal marketing operations tool",
    period: "Jan 2025 — Present",
    context: "Studio · React app",
    summary:
      "Single place for campaign structure, leads, performance logs, and client segmentation.",
    bullets: [
      "Models Google/Meta campaign structure alongside lead capture for reporting.",
      "Surfaces performance history and segmentation so recurring client work stays auditable.",
      "Built as a pragmatic internal console rather than an all-in-one enterprise suite.",
    ],
    stack: ["React", "TypeScript", "Data modeling"],
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "internal-tools", color: "green-text-gradient" },
    ],
    image: portfolio,
    source_code_link: PROFILE_LINKS.github,
    roleLine: "Internal tools — React console for campaign structure, leads, and performance history.",
    impactLine: "Makes recurring marketing work auditable instead of losing context in ad-hoc sheets.",
  },
  {
    slug: "daol-invoice-automation",
    featured: false,
    name: "Subscription invoice automation (Make · n8n · Gmail · Google Docs)",
    period: "Jan 2025 — Present",
    context: "Studio · renewals · Google Workspace",
    bullets: [
      "Google Docs for invoice/document generation; payloads and timing flow through automation instead of manual copy-paste.",
      "Gmail sends aligned to each client’s yearly subscription renewal—no forgetting the date or resending by hand.",
      "Built as a repeatable studio workflow for recurring billing, not a one-off spreadsheet ritual.",
    ],
    stack: ["n8n", "Make.com", "Gmail", "Google Docs", "Workflow automation"],
    tags: [
      { name: "n8n", color: "green-text-gradient" },
      { name: "make", color: "blue-text-gradient" },
      { name: "billing", color: "orange-text-gradient" },
    ],
    image: daolInvoiceAutomationWorkflow,
    source_code_link: PROFILE_LINKS.github,
    roleLine: "Renewal-day invoicing — Gmail + Google Docs driven by Make and n8n for yearly subscriptions.",
    impactLine: "Subscription invoices dispatch on schedule; operators are not chained to calendar reminders and manual sends.",
  },
];
