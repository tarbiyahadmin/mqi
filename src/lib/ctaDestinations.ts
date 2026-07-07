import type { CtaButton, PageCtaButton } from "@/lib/sanityQueries";
import { formPagePath } from "@/lib/routes";
import { isExternalNavigationTarget } from "@/components/layout/ConfigurableNavLink";

/**
 * Resolves CTA href for internal form-page buttons.
 */
export function resolveCtaButtonTarget(btn: Pick<CtaButton, "formPage">): string | null {
  const formSlug = btn.formPage?.slug;
  if (formSlug) {
    return formPagePath(formSlug);
  }
  return null;
}

/**
 * Resolves CTA href for buttons that link to internal pages or external URLs.
 */
export function resolvePageCtaTarget(btn: Pick<PageCtaButton, "to">): string | null {
  const path = btn.to?.trim();
  return path || null;
}

export function isPageCtaExternal(btn: Pick<PageCtaButton, "to" | "openInNewTab">): boolean {
  const path = btn.to?.trim();
  if (!path) return false;
  return btn.openInNewTab === true || isExternalNavigationTarget(path);
}

