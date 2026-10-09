/**
 * One-off: turn the local fallback content in src/content/siteContent.js into an NDJSON
 * file that `sanity dataset import` understands (images included).
 *
 *   node scripts/cms-seed.mjs
 *   cd studio && npx sanity dataset import ../.tmp/seed.ndjson production --replace
 */
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const outDir = path.join(root, ".tmp");

const vite = await createServer({ root, server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const { localContent } = await vite.ssrLoadModule("/src/content/siteContent.js");
const { defaultSeo } = await vite.ssrLoadModule("/src/content/seo.js");
await vite.close();

const key = (prefix, i) => `${prefix}${i}`;
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

/** Vite dev asset URL (/src/assets/x.png) to a Sanity import reference. */
const imageRef = (assetUrl) => {
  if (!assetUrl) return undefined;
  const file = path.join(root, decodeURIComponent(assetUrl.split("?")[0]));
  if (!existsSync(file)) return undefined;
  return { _type: "image", _sanityAsset: `image@file://${file}` };
};

const docs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    seoTitle: defaultSeo.title,
    seoDescription: defaultSeo.description,
    keywords: defaultSeo.keywords,
  },
  {
    _id: "about",
    _type: "about",
    eyebrow: localContent.about.eyebrow,
    paragraphs: localContent.about.paragraphs,
    principle: localContent.about.principle,
    facts: localContent.about.facts.map((fact, i) => ({ _key: key("fact", i), _type: "fact", ...fact })),
    coreStack: localContent.about.coreStack,
  },
  ...localContent.career.map((entry, i) => ({
    _id: `career-${slugify(entry.company_name)}`,
    _type: "careerEntry",
    companyName: entry.company_name,
    roleTitle: entry.role_title,
    period: entry.period,
    location: entry.location,
    tagline: entry.tagline,
    logo: imageRef(entry.logo),
    companyWebsite: entry.company_website,
    highlights: entry.highlights,
    projects: entry.projects.map((item, j) => ({ _key: key("work", j), _type: "workItem", ...item })),
    order: (i + 1) * 10,
  })),
  ...localContent.projects.map((project, i) => ({
    _id: `project-${project.slug}`,
    _type: "project",
    name: project.name,
    slug: { _type: "slug", current: project.slug },
    featured: project.featured,
    period: project.period,
    context: project.context,
    roleLine: project.roleLine,
    impactLine: project.impactLine,
    summary: project.summary,
    bullets: project.bullets,
    stack: project.stack,
    tags: project.tags.map((tag) => tag.name),
    image: imageRef(project.image),
    previewVideoUrl: project.preview_video,
    demoLink: project.demo_link,
    sourceCodeLink: project.source_code_link || undefined,
    order: (i + 1) * 10,
  })),
  ...localContent.educations.map((edu, i) => ({
    _id: `education-${slugify(edu.degree)}`,
    _type: "education",
    ...edu,
    order: (i + 1) * 10,
  })),
  ...localContent.certifications.map((cert, i) => ({
    _id: `certification-${slugify(cert.name)}`,
    _type: "certification",
    ...cert,
    order: (i + 1) * 10,
  })),
];

await mkdir(outDir, { recursive: true });
const out = path.join(outDir, "seed.ndjson");
await writeFile(out, `${docs.map((doc) => JSON.stringify(doc)).join("\n")}\n`);
console.log(`[cms] wrote ${docs.length} documents to ${path.relative(root, out)}`);
