/**
 * Snapshot published Sanity content into src/content/generated/cms.json.
 * Runs before every build (see "prebuild") and on demand with `npm run cms:pull`.
 * If Sanity is unreachable the existing snapshot is kept so the build still succeeds.
 */
import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const PROJECT_ID = process.env.SANITY_PROJECT_ID || "z0se41xa";
const DATASET = process.env.SANITY_DATASET || "production";
const API_VERSION = "2025-02-19";
const OUT = fileURLToPath(new URL("../src/content/generated/cms.json", import.meta.url));

const QUERY = `{
  "seo": *[_id == "siteSettings"][0]{
    "title": seoTitle,
    "description": seoDescription,
    keywords,
    "ogImage": ogImage.asset->url
  },
  "about": *[_id == "about"][0]{ eyebrow, paragraphs, principle, facts[]{label, value}, coreStack },
  "career": *[_type == "careerEntry"] | order(order asc, _createdAt asc){
    "company_name": companyName,
    location,
    "role_title": roleTitle,
    period,
    tagline,
    "logo": logo.asset->url,
    "company_website": companyWebsite,
    highlights,
    projects[]{title, period, description}
  },
  "projects": *[_type == "project"] | order(order asc, _createdAt asc){
    "slug": slug.current,
    featured,
    name,
    period,
    context,
    summary,
    bullets,
    stack,
    tags,
    "image": image.asset->url,
    "imageAlt": image.alt,
    "preview_video": coalesce(previewVideo.asset->url, previewVideoUrl),
    "source_code_link": sourceCodeLink,
    "demo_link": demoLink,
    roleLine,
    impactLine
  },
  "educations": *[_type == "education"] | order(order asc, _createdAt asc){ degree, school, highlights },
  "certifications": *[_type == "certification"] | order(order asc, _createdAt asc){ name, issuer, year }
}`;

/** Drop nulls so components can keep using `??` and truthiness checks. */
const clean = (value) => {
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, clean(v)])
    );
  }
  return value;
};

const sized = (url, width) => (url ? `${url}?w=${width}&fit=max&auto=format` : url);

const normalize = (data) => {
  const out = clean(data);
  out.career = (out.career ?? []).map((entry) => ({
    ...entry,
    logo: sized(entry.logo, 256) ?? null,
    logo_bg: "#ffffff",
    highlights: entry.highlights ?? [],
    projects: entry.projects ?? [],
  }));
  out.projects = (out.projects ?? []).map((project) => ({
    ...project,
    image: sized(project.image, 900) ?? null,
    bullets: project.bullets ?? [],
    stack: project.stack ?? [],
    tags: (project.tags ?? []).map((name) => ({ name })),
    source_code_link: project.source_code_link ?? "",
  }));
  if (out.seo?.ogImage) out.seo.ogImage = `${out.seo.ogImage}?w=1200&h=630&fit=crop&fm=png`;
  return out;
};

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?perspective=published&query=${encodeURIComponent(QUERY)}`;

try {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity responded ${res.status}: ${await res.text()}`);
  const { result } = await res.json();
  const next = `${JSON.stringify(normalize(result), null, 2)}\n`;
  const prev = await readFile(OUT, "utf8").catch(() => "");
  if (next === prev) {
    console.log("[cms] content unchanged");
  } else {
    await writeFile(OUT, next);
    console.log(
      `[cms] pulled ${result.projects?.length ?? 0} projects, ${result.career?.length ?? 0} career entries`
    );
  }
} catch (error) {
  console.warn(`[cms] pull failed, keeping the existing snapshot. ${error.message}`);
}
