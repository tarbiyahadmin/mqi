import type { CtaButton } from "@/lib/sanityQueries";
import { formPagePath } from "@/lib/routes";

/**
 * Resolves CTA href for internal form-page-only buttons.
 */
export function resolveCtaButtonTarget(btn: Pick<CtaButton, "formPage">): string | null {
  const formSlug = btn.formPage?.slug;
  if (formSlug) {
    return formPagePath(formSlug);
  }
  return null;
}
