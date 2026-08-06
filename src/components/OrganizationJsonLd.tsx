import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/sanityQueries";
import {
  LOGO_PATH,
  MQI_NAP,
  ORG_NAME,
  SITE_URL,
  absoluteAssetUrl,
} from "@/lib/site";

const SCRIPT_ID = "mqi-organization-jsonld";

function toE164(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return MQI_NAP.phoneE164;
}

function buildOrganizationJsonLd(socialUrls: string[], email: string, phone: string) {
  const sameAs = [...new Set(socialUrls.filter(Boolean))];
  const phoneE164 = toE164(phone);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "Organization"],
        "@id": `${SITE_URL}/#organization`,
        name: ORG_NAME,
        legalName: ORG_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absoluteAssetUrl(LOGO_PATH),
        },
        image: absoluteAssetUrl(LOGO_PATH),
        email,
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
          email,
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

/** Injects MQI-only Organization / EducationalOrganization JSON-LD. */
export function OrganizationJsonLd() {
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettings,
  });

  useEffect(() => {
    const socialUrls = (siteSettings?.socialLinks ?? []).map((s) => s.url).filter(Boolean);
    const email = siteSettings?.footerEmail?.trim() || MQI_NAP.email;
    const phone = siteSettings?.footerPhone?.trim() || MQI_NAP.phone;
    const payload = buildOrganizationJsonLd(socialUrls, email, phone);
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(payload);
  }, [siteSettings?.socialLinks, siteSettings?.footerEmail, siteSettings?.footerPhone]);

  return null;
}
