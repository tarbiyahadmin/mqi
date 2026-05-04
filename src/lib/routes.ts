/** Base path for CMS-managed form pages that embed Jotform. */
export const FORM_PAGE_BASE = "/forms";

export function formPagePath(slug: string): string {
  return `${FORM_PAGE_BASE}/${slug.replace(/^\/+|\/+$/g, "")}`;
}

/** Post-submit redirect target (configure the same URL in Jotform). */
export const THANK_YOU_PATH = "/thank-you";
