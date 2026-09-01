import type { Metadata } from "next";
import {
  DEFAULT_META_DESCRIPTION,
  OG_IMAGE_PATH,
  ORG_NAME,
  SITE_URL,
  absoluteAssetUrl,
  absoluteUrl,
} from "@/lib/site";

type BuildMetadataOptions = {
  title?: string | null;
  description?: string | null;
  path?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const resolvedTitle = title?.trim() || ORG_NAME;
  const resolvedDescription = description?.trim() || DEFAULT_META_DESCRIPTION;
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteAssetUrl(OG_IMAGE_PATH);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    applicationName: ORG_NAME,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: ORG_NAME,
      locale: "en_CA",
      type: "website",
      images: [{ url: imageUrl, alt: ORG_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [imageUrl],
    },
    metadataBase: new URL(SITE_URL),
  };
}
