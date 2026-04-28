import type { CtaButton } from "@/lib/sanityQueries";
import { formPagePath } from "@/lib/routes";

function isHttpUrl(to: string): boolean {
  return /^https?:\/\//i.test(to);
}

/**
 * Resolves CTA href and whether to open in a new tab.
 * Prefer a linked Form Page over a raw Jotform URL in `to`.
 */
export function resolveCtaButtonTarget(btn: Pick<CtaButton, "to" | "isExternal" | "formPage">): {
  to: string;
  isExternal: boolean;
} {
  const formSlug = btn.formPage?.slug;
  if (formSlug) {
    return { to: formPagePath(formSlug), isExternal: false };
  }
  const to = btn.to;
  return {
    to,
    isExternal: isHttpUrl(to) || btn.isExternal === true,
  };
}
