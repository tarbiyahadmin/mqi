/** Placeholder used so static export can emit a rewrite target for unknown program URLs. */
export const EMPTY_STATIC_PARAM = "__empty__";

export function programDetailPath(categorySlug: string, programSlug: string): string {
  const category = categorySlug.replace(/^\/+|\/+$/g, "");
  const slug = programSlug.replace(/^\/+|\/+$/g, "");
  return `/programs/${category}/${slug}/`;
}

/** Read program slug from the browser path (needed after Netlify 200 rewrites). */
export function programSlugFromPathname(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "programs" && parts[2] && parts[2] !== EMPTY_STATIC_PARAM) {
    return decodeURIComponent(parts[2]);
  }
  return "";
}

/** Base path for CMS-managed form pages that embed Jotform. */
export const FORM_PAGE_BASE = "/forms";

export function formPagePath(slug: string): string {
  return `${FORM_PAGE_BASE}/${slug.replace(/^\/+|\/+$/g, "")}`;
}

/** Post-submit redirect target (configure the same URL in Jotform). */
export const THANK_YOU_PATH = "/thank-you";

/** CMS-managed Book A Meet landing page. */
export const BOOK_MEET_PATH = "/book-a-meet";
