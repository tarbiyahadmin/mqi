import { buildMetadata } from "@/lib/metadata";
import { getFormPageBySlug, getFormPageSlugs } from "@/lib/sanityQueries";
import { withStaticExportFallback } from "@/lib/staticParams";
import FormPage from "@/views/FormPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const forms = await getFormPageSlugs();
    const params = forms.filter((f) => f.slug).map((f) => ({ slug: f.slug }));
    return withStaticExportFallback(params, { slug: "__empty__" });
  } catch {
    return [{ slug: "__empty__" }];
  }
}

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const page = await getFormPageBySlug(slug);
    return buildMetadata({
      title: page?.seo?.seoTitle ?? (page?.title ? `${page.title} | Milton Quran Institute` : undefined),
      description: page?.seo?.metaDescription,
      path: `/forms/${slug}`,
      noIndex: true,
    });
  } catch {
    return buildMetadata({ path: `/forms/${slug}`, noIndex: true });
  }
}

export default function Page() {
  return <FormPage />;
}
