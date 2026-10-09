/**
 * Fills the %SEO_*% placeholders in index.html and emits sitemap.xml.
 * Values come from Sanity "Site settings & SEO" (via the cms.json snapshot) with
 * src/content/seo.js as the fallback.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { SITE_URL, defaultSeo } from "../src/content/seo.js";

const CMS_PATH = fileURLToPath(new URL("../src/content/generated/cms.json", import.meta.url));

const escapeAttr = (text) =>
  String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const readCms = () => {
  try {
    return JSON.parse(readFileSync(CMS_PATH, "utf8"));
  } catch {
    return {};
  }
};

const buildJsonLd = (seo, cms) => {
  const personId = `${SITE_URL}/#person`;
  const educations = cms.educations ?? [];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Ryan Back",
        description: seo.description,
        inLanguage: "en-CA",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        name: seo.title,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: seo.ogImage,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Ryan Back",
        url: `${SITE_URL}/`,
        image: seo.ogImage,
        jobTitle: "Full-Stack Software Engineer",
        description: seo.description,
        email: "mailto:ho0405@gmail.com",
        address: { "@type": "PostalAddress", addressLocality: "Calgary", addressRegion: "AB", addressCountry: "CA" },
        worksFor: { "@type": "Organization", name: "Daol Consulting", url: "https://daolconsulting.com" },
        ...(educations.length
          ? { alumniOf: educations.map((edu) => ({ "@type": "CollegeOrUniversity", name: edu.school })) }
          : {}),
        knowsAbout: [
          "React",
          "TypeScript",
          "Next.js",
          "Node.js",
          "Firestore",
          "Supabase",
          "PostgreSQL",
          "Google Apps Script",
          "Chrome extensions",
          "Headless Shopify",
          "Sanity CMS",
        ],
        sameAs: [
          "https://www.linkedin.com/in/ryan-back/",
          "https://github.com/ho0405",
          "https://github.com/consulting-daol/",
        ],
      },
    ],
  };
};

export default function seoPlugin() {
  return {
    name: "portfolio-seo",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const cms = readCms();
        const seo = {
          title: cms.seo?.title || defaultSeo.title,
          description: cms.seo?.description || defaultSeo.description,
          keywords: cms.seo?.keywords?.length ? cms.seo.keywords : defaultSeo.keywords,
          ogImage: cms.seo?.ogImage || defaultSeo.ogImage,
        };
        const jsonLd = JSON.stringify(buildJsonLd(seo, cms)).replace(/</g, "\\u003c");
        return html
          .replaceAll("%SEO_TITLE%", escapeAttr(seo.title))
          .replaceAll("%SEO_DESCRIPTION%", escapeAttr(seo.description))
          .replaceAll("%SEO_KEYWORDS%", escapeAttr(seo.keywords.join(", ")))
          .replaceAll("%SEO_IMAGE%", escapeAttr(seo.ogImage))
          .replaceAll("%SITE_URL%", SITE_URL)
          .replace("%SEO_JSON_LD%", () => jsonLd);
      },
    },
    generateBundle(options) {
      if (options.dir?.includes(".tmp")) return;
      const lastmod = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      });
    },
  };
}
