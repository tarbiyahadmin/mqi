import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "xqhurz2n",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: true,
  ...(process.env.SANITY_API_READ_TOKEN ? { token: process.env.SANITY_API_READ_TOKEN } : {}),
});
const roles = await client.fetch('*[_type == "careerRole"]{..., "slug": coalesce(slug.current, _id), "formSlug": applicationFormPage->slug.current}');
const listing = await readFile("out/careers/index.html", "utf8");
const sitemap = await readFile("out/sitemap.xml", "utf8");
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
const slugs = new Set();
for (const role of roles) {
  assert(!slugs.has(role.slug), "Duplicate job URL: " + role.slug);
  slugs.add(role.slug);
  const path = "/careers/" + encodeURIComponent(role.slug) + "/";
  assert(listing.includes('href="' + path + '"'), "Listing link missing: " + path);
  assert(sitemap.includes(path), "Sitemap link missing: " + path);
  const html = await readFile("out" + path + "index.html", "utf8");
  const markup = html.replace(/<script[\s\S]*?<\/script>/g, "");
  assert.equal((markup.match(/<h1[ >]/g) ?? []).length, 1, "Expected one job heading");
  assert(markup.includes('rel="canonical"'), "Missing canonical metadata");
  for (const value of [role.title, role.type, role.location, role.description, role.positionDetails, role.whatMqiOffers, ...(role.responsibilities ?? []), ...(role.requirements ?? [])]) {
    if (value) assert(markup.includes(escape(value)), "Missing server-rendered job detail: " + value);
  }
  assert(markup.includes('href="/careers/"'), "Missing back link");
  if (role.formSlug) {
    assert(markup.includes('/forms/' + role.formSlug), "Missing application link");
    await access("out/forms/" + role.formSlug + "/index.html");
  }
}
console.log("Verified " + roles.length + " CMS job pages, full details, unique links, metadata, sitemap and application destinations.");
