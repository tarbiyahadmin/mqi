import {
  LOGO_PATH,
  MQI_NAP,
  ORG_NAME,
  SITE_URL,
  absoluteAssetUrl,
  absoluteUrl,
} from "@/lib/site";
import type { ContactPage } from "@/lib/sanityQueries";
import { resolveEmailEntries, resolveMapsLinkUrl } from "@/lib/contactEmails";

function toE164(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return MQI_NAP.phoneE164;
}

export function buildOrganizationJsonLd(socialUrls: string[] = [], email?: string, phone?: string) {
  const sameAs = [...new Set(socialUrls.filter(Boolean))];
  const resolvedEmail = email?.trim() || MQI_NAP.email;
  const resolvedPhone = phone?.trim() || MQI_NAP.phone;
  const phoneE164 = toE164(resolvedPhone);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "Organization"],
        "@id": `${SITE_URL}/#organization`,
        name: ORG_NAME,
        legalName: ORG_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: absoluteAssetUrl(LOGO_PATH) },
        image: absoluteAssetUrl(LOGO_PATH),
        email: resolvedEmail,
        telephone: phoneE164,
        address: {
          "@type": "PostalAddress",
          streetAddress: MQI_NAP.streetAddress,
          addressLocality: MQI_NAP.addressLocality,
          addressRegion: MQI_NAP.addressRegion,
          postalCode: MQI_NAP.postalCode,
          addressCountry: MQI_NAP.addressCountry,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: phoneE164,
          email: resolvedEmail,
          contactType: "customer service",
          areaServed: "CA",
          availableLanguage: ["English", "Arabic"],
        },
        ...(sameAs.length ? { sameAs } : {}),
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

export function buildContactPageJsonLd(page: ContactPage | null) {
  const address = page?.address?.trim() || MQI_NAP.address;
  const phone = page?.phone?.trim() || MQI_NAP.phone;
  const emails = resolveEmailEntries(page?.contactEmails);
  const mapsUrl = resolveMapsLinkUrl(page?.mapsLinkUrl, address);

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: page?.title ?? "Contact Us",
    description: page?.seo?.metaDescription ?? page?.subtitle ?? page?.intro,
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: page?.contactSectionTitle ?? ORG_NAME,
      url: SITE_URL,
      logo: absoluteAssetUrl(LOGO_PATH),
      telephone: toE164(phone),
      email: emails.map((e) => e.email),
      address: {
        "@type": "PostalAddress",
        streetAddress: MQI_NAP.streetAddress,
        addressLocality: MQI_NAP.addressLocality,
        addressRegion: MQI_NAP.addressRegion,
        postalCode: MQI_NAP.postalCode,
        addressCountry: MQI_NAP.addressCountry,
      },
      hasMap: mapsUrl,
    },
  };
}
