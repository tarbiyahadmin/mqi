/** Canonical public site origin (no trailing slash). */
export const SITE_URL = "https://miltonquraninstitute.org";

/** Official organization name — use everywhere for entity consistency. */
export const ORG_NAME = "Milton Quran Institute";

/** Default SEO description when CMS does not provide one. */
export const DEFAULT_META_DESCRIPTION =
  "Milton Quran Institute offers Qur'anic education, Hifz, Tajweed, and Islamic studies programs for all ages in Milton, Ontario.";

/**
 * Verified MQI NAP — used when CMS fields are empty so placeholders never ship.
 * Keep in sync with Sanity Site Settings.
 */
export const MQI_NAP = {
  name: ORG_NAME,
  address: "700 Nipissing Rd Unit 8, Milton, ON L9T 4Z9",
  streetAddress: "700 Nipissing Rd Unit 8",
  addressLocality: "Milton",
  addressRegion: "ON",
  postalCode: "L9T 4Z9",
  addressCountry: "CA",
  phone: "+1 (905) 878-4300",
  phoneE164: "+19058784300",
  email: "admin@miltonquraninstitute.com",
} as const;

/** Absolute URL for Open Graph / schema logo (served from /public). */
export const OG_IMAGE_PATH = "/banner.png";
export const LOGO_PATH = "/mqi-logo.svg";

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "/" : normalized.replace(/\/+$/, "") || "/"}`;
}

export function absoluteAssetUrl(assetPath: string): string {
  return absoluteUrl(assetPath.startsWith("/") ? assetPath : `/${assetPath}`);
}
