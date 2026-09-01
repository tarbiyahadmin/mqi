import { buildMetadata } from "@/lib/metadata";
import { buildContactPageJsonLd } from "@/lib/jsonLd";
import { getContactPage } from "@/lib/sanityQueries";
import ContactView from "@/views/Contact";

export async function generateMetadata() {
  try {
    const page = await getContactPage();
    return buildMetadata({
      title: page?.seo?.seoTitle ?? (page?.title ? `${page.title} | Milton Quran Institute` : undefined),
      description: page?.seo?.metaDescription ?? page?.intro ?? page?.subtitle,
      path: "/contact",
    });
  } catch {
    return buildMetadata({ path: "/contact" });
  }
}

export default async function Page() {
  const page = await getContactPage();
  const jsonLd = buildContactPageJsonLd(page);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactView page={page} />
    </>
  );
}
