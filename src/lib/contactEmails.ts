import type { LabeledEmail } from "@/lib/sanityQueries";
import { MQI_NAP } from "@/lib/site";

/** Resolve footer/contact email entries with legacy single-email fallback. */
export function resolveEmailEntries(
  entries: LabeledEmail[] | undefined,
  legacyEmail?: string,
  legacyTitle = "Email",
): LabeledEmail[] {
  if (entries?.length) return entries;
  const fallback = legacyEmail?.trim() || MQI_NAP.email;
  return [{ title: legacyTitle, email: fallback }];
}

/** Resolve Google Maps link from CMS URL or address fallback. */
export function resolveMapsLinkUrl(mapsLinkUrl?: string, address?: string): string {
  const custom = mapsLinkUrl?.trim();
  if (custom) return custom;
  const addr = address?.trim() || MQI_NAP.address;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
}