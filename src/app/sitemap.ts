import type { MetadataRoute } from "next";
import { getBlogPosts, getProgramsForListing } from "@/lib/sanityQueries";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "programs", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "careers", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "donate", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "financial-aid", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "book-a-meet", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "contact", priority: 0.8, changeFrequency: "monthly" as const },
];

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path ? `${SITE_URL}/${path}/` : `${SITE_URL}/`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  try {
    const [programs, posts] = await Promise.all([getProgramsForListing(), getBlogPosts()]);
    for (const prog of programs) {
      const category = prog.category?.slug;
      if (prog.slug && category) {
        entries.push({
          url: `${SITE_URL}/programs/${category}/${prog.slug}/`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
    for (const post of posts) {
      if (post.slug) {
        entries.push({
          url: `${SITE_URL}/blog/${post.slug}/`,
          lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  } catch {
    // Static routes only if Sanity is unavailable at build time
  }

  return entries;
}
