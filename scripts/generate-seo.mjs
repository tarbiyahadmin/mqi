#!/usr/bin/env node
/**
 * Build-time SEO artifacts:
 * - public/sitemap.xml (also copied into dist by Vite)
 * - Route-specific HTML shells in dist/ so crawlers get meta + JSON-LD without JS
 *
 * Run after `vite build` (see package.json "build" script).
 */
import { createClient } from "@sanity/client";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const publicDir = join(root, "public");

const SITE_URL = "https://miltonquraninstitute.org";
const ORG_NAME = "Milton Quran Institute";
const DEFAULT_DESCRIPTION =
  "Milton Quran Institute offers Qur'anic education, Hifz, Tajweed, and Islamic studies programs for all ages in Milton, Ontario.";

const NAP = {
  address: "700 Nipissing Rd Unit 8, Milton, ON L9T 4Z9",
  streetAddress: "700 Nipissing Rd Unit 8",
  addressLocality: "Milton",
  addressRegion: "ON",
  postalCode: "L9T 4Z9",
  addressCountry: "CA",
  phoneE164: "+19058784300",
  email: "admin@miltonquraninstitute.com",
};

/** Static indexable routes (forms / thank-you excluded). */
const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly", title: ORG_NAME, description: DEFAULT_DESCRIPTION },
  { path: "/about", priority: "0.9", changefreq: "monthly", title: `About | ${ORG_NAME}`, description: DEFAULT_DESCRIPTION },
  { path: "/programs", priority: "0.9", changefreq: "weekly", title: `Programs | ${ORG_NAME}`, description: DEFAULT_DESCRIPTION },
  { path: "/blog", priority: "0.8", changefreq: "weekly", title: `Blog | ${ORG_NAME}`, description: DEFAULT_DESCRIPTION },
  { path: "/careers", priority: "0.7", changefreq: "monthly", title: `Careers | ${ORG_NAME}`, description: DEFAULT_DESCRIPTION },
  { path: "/donate", priority: "0.8", changefreq: "monthly", title: `Donate | ${ORG_NAME}`, description: DEFAULT_DESCRIPTION },
  { path: "/financial-aid", priority: "0.8", changefreq: "monthly", title: `Financial Aid | ${ORG_NAME}`, description: DEFAULT_DESCRIPTION },
  { path: "/book-a-meet", priority: "0.8", changefreq: "monthly", title: `Book A Meet | ${ORG_NAME}`, description: DEFAULT_DESCRIPTION },
];

function loadEnvFile() {
  const envPath = join(root, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

function abs(path) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/+$/, "");
}

function organizationJsonLd(socialUrls = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "Organization"],
        "@id": `${SITE_URL}/#organization`,
        name: ORG_NAME,
        legalName: ORG_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/mqi-logo.svg` },
        image: `${SITE_URL}/mqi-logo.svg`,
        email: NAP.email,
        telephone: NAP.phoneE164,
        address: {
          "@type": "PostalAddress",
          streetAddress: NAP.streetAddress,
          addressLocality: NAP.addressLocality,
          addressRegion: NAP.addressRegion,
          postalCode: NAP.postalCode,
          addressCountry: NAP.addressCountry,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: NAP.phoneE164,
          email: NAP.email,
          contactType: "customer service",
          areaServed: "CA",
          availableLanguage: ["English", "Arabic"],
        },
        ...(socialUrls.length ? { sameAs: socialUrls } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: ORG_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-CA",
      },
    ],
  };
}

function buildSitemapXml(urls) {
  const today = new Date().toISOString().slice(0, 10);
  const body = urls
    .map(
      (u) => `  <url>
    <loc>${abs(u.path)}</loc>
    <lastmod>${u.lastmod || today}</lastmod>
    <changefreq>${u.changefreq || "monthly"}</changefreq>
    <priority>${u.priority || "0.5"}</priority>
  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function injectSeoIntoHtml(html, { title, description, path, jsonLd }) {
  const canonical = abs(path);
  const ogImage = `${SITE_URL}/banner.png`;
  const jsonLdTag = `<script type="application/ld+json" id="mqi-organization-jsonld">${JSON.stringify(jsonLd)}</script>`;

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeAttr(description)}" />`,
  );
  out = out.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeAttr(title)}" />`);
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
  );
  out = out.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${ogImage}" />`);
  out = out.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}" />`);
  out = out.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`);
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
  );
  out = out.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${ogImage}" />`);

  // Replace existing JSON-LD block if present
  if (/id="mqi-organization-jsonld"/i.test(out)) {
    out = out.replace(
      /<script type="application\/ld\+json" id="mqi-organization-jsonld">[\s\S]*?<\/script>/i,
      jsonLdTag,
    );
  } else {
    out = out.replace("</head>", `${jsonLdTag}\n</head>`);
  }

  if (!/rel="canonical"/i.test(out)) {
    out = out.replace(
      "</head>",
      `<link rel="canonical" href="${canonical}" />\n<meta property="og:url" content="${canonical}" />\n</head>`,
    );
  }

  if (!/<noscript>/i.test(out)) {
    out = out.replace(
      "</body>",
      `<noscript><p>${escapeHtml(ORG_NAME)} — ${escapeHtml(NAP.address)} — ${escapeHtml(NAP.email)}</p></noscript>\n</body>`,
    );
  }

  return out;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/'/g, "&#39;");
}

function writeRouteHtml(template, route, jsonLd) {
  const html = injectSeoIntoHtml(template, {
    title: route.title,
    description: route.description || DEFAULT_DESCRIPTION,
    path: route.path,
    jsonLd,
  });
  if (route.path === "/") {
    writeFileSync(join(distDir, "index.html"), html, "utf8");
    return;
  }
  const dir = join(distDir, route.path.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
}

async function fetchDynamicRoutes(client) {
  const [programs, posts, social] = await Promise.all([
    client.fetch(`*[_type == "program" && defined(slug.current)]{
      "slug": slug.current,
      "category": category->slug.current,
      title,
      shortDescription,
      "seoTitle": seo.seoTitle,
      "metaDescription": seo.metaDescription,
      _updatedAt
    }`),
    client.fetch(`*[_type == "blogPost" && defined(slug.current)]{
      "slug": slug.current,
      title,
      excerpt,
      "seoTitle": seo.seoTitle,
      "metaDescription": seo.metaDescription,
      _updatedAt
    }`),
    client.fetch(`*[_type == "siteSettings"][0]{ socialLinks[]{ url } }`),
  ]);

  const programRoutes = (programs || [])
    .filter((p) => p.slug && p.category)
    .map((p) => ({
      path: `/programs/${p.category}/${p.slug}`,
      priority: "0.7",
      changefreq: "monthly",
      lastmod: p._updatedAt?.slice(0, 10),
      title: p.seoTitle || `${p.title} | ${ORG_NAME}`,
      description: p.metaDescription || p.shortDescription || DEFAULT_DESCRIPTION,
    }));

  const blogRoutes = (posts || []).map((p) => ({
    path: `/blog/${p.slug}`,
    priority: "0.6",
    changefreq: "monthly",
    lastmod: p._updatedAt?.slice(0, 10),
    title: p.seoTitle || `${p.title} | ${ORG_NAME}`,
    description: p.metaDescription || p.excerpt || DEFAULT_DESCRIPTION,
  }));

  const socialUrls = (social?.socialLinks || []).map((s) => s.url).filter(Boolean);
  return { programRoutes, blogRoutes, socialUrls };
}

async function main() {
  loadEnvFile();
  const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "xqhurz2n";
  const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || "production";
  const apiVersion = process.env.VITE_SANITY_API_VERSION || "2024-01-01";

  const client = createClient({ projectId, dataset, apiVersion, useCdn: true });

  let programRoutes = [];
  let blogRoutes = [];
  let socialUrls = [
    "https://www.instagram.com/miltonquraninstitute/",
    "https://www.facebook.com/miltonquraninstitute/",
  ];

  try {
    const dynamic = await fetchDynamicRoutes(client);
    programRoutes = dynamic.programRoutes;
    blogRoutes = dynamic.blogRoutes;
    if (dynamic.socialUrls.length) socialUrls = dynamic.socialUrls;
  } catch (err) {
    console.warn("[seo] Sanity fetch failed; writing static routes only:", err.message);
  }

  const allRoutes = [...STATIC_ROUTES, ...programRoutes, ...blogRoutes];
  const sitemap = buildSitemapXml(allRoutes);
  writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
  if (existsSync(distDir)) {
    writeFileSync(join(distDir, "sitemap.xml"), sitemap, "utf8");
  }
  console.log(`[seo] sitemap.xml written (${allRoutes.length} URLs)`);

  if (!existsSync(distDir)) {
    console.log("[seo] dist/ missing — skip prerender shells (run after vite build)");
    return;
  }

  const templatePath = join(distDir, "index.html");
  if (!existsSync(templatePath)) {
    console.warn("[seo] dist/index.html missing — skip prerender");
    return;
  }

  // Ensure public assets landed in dist
  for (const asset of ["mqi-logo.svg", "banner.png", "robots.txt", "sitemap.xml"]) {
    const src = join(publicDir, asset);
    const dest = join(distDir, asset);
    if (existsSync(src) && !existsSync(dest)) {
      copyFileSync(src, dest);
    }
  }

  const template = readFileSync(templatePath, "utf8");
  const jsonLd = organizationJsonLd(socialUrls);

  for (const route of allRoutes) {
    writeRouteHtml(template, route, jsonLd);
  }
  console.log(`[seo] prerendered ${allRoutes.length} HTML shells into dist/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
