import {
    mobile,
    backend,
    ai,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    mongodb,
    git,
    oracledb,
    python,
    java,
    flutter,
    vercel,
  } from "../assets";
import skillGoogleAdsLocal from "../assets/skill-icons/google-ads.svg";
import skillGoogleAnalyticsLocal from "../assets/skill-icons/google-analytics.svg";
import skillMetaLocal from "../assets/skill-icons/meta-brand.svg";
import skillOracleLocal from "../assets/skill-icons/oracle-brand.svg";
import skillShopifyLocal from "../assets/skill-icons/shopify-color.svg";

export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "career",
      title: "Career",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "connect",
      title: "Connect",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Frontend Specialist",
      icon: web,
    },
    {
      title: "Full-Stack Engineer",
      icon: backend,
    },
    {
      title: "UI Performance Engineer",
      icon: mobile,
    },
    {
      title: "AI Product Builder",
      icon: ai,
    },
  ];
  
  /** Skillicons.dev — branded color SVG tiles (theme=light matches site canvas). https://skillicons.dev */
  const skillIconAsset = (slug) =>
    `https://skillicons.dev/icons?i=${slug}&theme=light`;

  const SKILL_ICON_BY_NAME = {
    "HTML 5": skillIconAsset("html"),
    "CSS 3": skillIconAsset("css"),
    JavaScript: skillIconAsset("javascript"),
    TypeScript: skillIconAsset("typescript"),
    "React JS": skillIconAsset("react"),
    "Oracle DB": skillOracleLocal,
    "Tailwind CSS": skillIconAsset("tailwind"),
    "Node JS": skillIconAsset("nodejs"),
    "Next.js": skillIconAsset("nextjs"),
    MongoDB: skillIconAsset("mongodb"),
    "Firebase / Firestore": skillIconAsset("firebase"),
    git: skillIconAsset("git"),
    "GitHub Actions (CI/CD)": skillIconAsset("githubactions"),
    Vercel: skillIconAsset("vercel"),
    Shopify: skillShopifyLocal,
    "PostgreSQL / Supabase": skillIconAsset("supabase"),
    "Jest / RTL": skillIconAsset("jest"),
    Python: skillIconAsset("python"),
    Java: skillIconAsset("java"),
    Flutter: skillIconAsset("flutter"),
    "Google Ads": skillGoogleAdsLocal,
    "Google Analytics (GA4)": skillGoogleAnalyticsLocal,
    "Meta Ads": skillMetaLocal,
  };

  /** Per-category chip shells so pills read as tinted, icon colors pop (skill icons are full-color SVGs). */
  export const SKILL_GROUP_PILL_SURFACE = {
    frontend:
      "border-sky-200/95 bg-gradient-to-br from-white via-sky-50/90 to-blue-50/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:from-white hover:via-sky-50 hover:to-blue-50/95",
    backend:
      "border-emerald-200/95 bg-gradient-to-br from-white via-emerald-50/90 to-teal-50/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:from-white hover:via-emerald-50 hover:to-teal-50/92",
    tools:
      "border-violet-200/95 bg-gradient-to-br from-white via-violet-50/88 to-purple-50/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:from-white hover:via-violet-50 hover:to-purple-50/90",
    marketing:
      "border-amber-200/95 bg-gradient-to-br from-white via-amber-50/90 to-orange-50/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:from-white hover:via-amber-50 hover:to-orange-50/90",
  };

  /** @param {{ name: string; icon: string }[]} rows */
  const withSkillIcons = (rows) =>
    rows.map((tech) => ({
      ...tech,
      skillIcon: SKILL_ICON_BY_NAME[tech.name] ?? tech.icon,
    }));

  const frontendSkillsRaw = [
    { name: "CSS 3", icon: css },
    { name: "Flutter", icon: flutter },
    { name: "HTML 5", icon: html },
    { name: "JavaScript", icon: javascript },
    { name: "Jest / RTL", icon: javascript },
    { name: "Next.js", icon: reactjs },
    { name: "React JS", icon: reactjs },
    { name: "Tailwind CSS", icon: tailwind },
    { name: "TypeScript", icon: typescript },
  ];

  const backendSkillsRaw = [
    { name: "Firebase / Firestore", icon: mongodb },
    { name: "Java", icon: java },
    { name: "MongoDB", icon: mongodb },
    { name: "Node JS", icon: nodejs },
    { name: "Oracle DB", icon: oracledb },
    { name: "PostgreSQL / Supabase", icon: oracledb },
    { name: "Python", icon: python },
  ];

  const toolsSkillsRaw = [
    { name: "GitHub Actions (CI/CD)", icon: git },
    { name: "git", icon: git },
    { name: "Shopify", icon: web },
    { name: "Vercel", icon: vercel },
  ];

  const marketingSkillsRaw = [
    { name: "Google Ads", icon: web },
    { name: "Google Analytics (GA4)", icon: web },
    { name: "Meta Ads", icon: web },
  ];

  const sortByName = (a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" });

  /**
   * Skills panel: ordered categories with alphabetized items inside each (Three.js intentionally omitted).
   * @type {Array<{ id: string; title: string; items: Array<{ name: string; icon: string; skillIcon: string }>}>}
   */
  export const skillCategoryGroups = [
    { id: "frontend", title: "Frontend", items: withSkillIcons([...frontendSkillsRaw].sort(sortByName)) },
    { id: "backend", title: "Backend", items: withSkillIcons([...backendSkillsRaw].sort(sortByName)) },
    { id: "tools", title: "Tools", items: withSkillIcons([...toolsSkillsRaw].sort(sortByName)) },
    { id: "marketing", title: "Marketing", items: withSkillIcons([...marketingSkillsRaw].sort(sortByName)) },
  ];

  /** Flat list — legacy callers; excludes Three JS as before */
  export const technologies = skillCategoryGroups.flatMap((cat) => cat.items);

  export { services };