import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_META_DESCRIPTION,
  OG_IMAGE_PATH,
  ORG_NAME,
  absoluteAssetUrl,
  absoluteUrl,
} from "@/lib/site";

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export interface PageSeoProps {
  title?: string | null;
  description?: string | null;
  fallbackTitle?: string;
  /** Override path for canonical (defaults to current location). */
  path?: string;
  /** Absolute or site-relative image path for OG/Twitter. */
  image?: string | null;
  noIndex?: boolean;
}

/**
 * Sets document title, description, canonical, Open Graph, and Twitter tags.
 * Uses the current route for canonical when `path` is omitted.
 */
export function PageSeo({
  title,
  description,
  fallbackTitle = ORG_NAME,
  path,
  image,
  noIndex = false,
}: PageSeoProps) {
  const location = useLocation();

  useEffect(() => {
    const resolvedTitle = title?.trim() || fallbackTitle;
    const resolvedDescription = description?.trim() || DEFAULT_META_DESCRIPTION;
    const canonicalPath = path ?? (`${location.pathname}${location.search}` || "/");
    const canonical = absoluteUrl(canonicalPath.split("?")[0] || "/");
    const imageUrl = absoluteAssetUrl(image?.trim() || OG_IMAGE_PATH);

    document.title = resolvedTitle;

    upsertMeta('meta[name="description"]', { name: "description", content: resolvedDescription });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex, nofollow" : "index, follow",
    });

    upsertLink("canonical", canonical);

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: resolvedTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: resolvedDescription });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: ORG_NAME });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_CA" });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: resolvedTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: resolvedDescription });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });
  }, [title, description, fallbackTitle, path, image, noIndex, location.pathname, location.search]);

  return null;
}
