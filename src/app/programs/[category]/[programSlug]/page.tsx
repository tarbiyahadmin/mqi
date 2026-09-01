import { buildMetadata } from "@/lib/metadata";
import { getProgramBySlug, getProgramsForListing } from "@/lib/sanityQueries";
import { withStaticExportFallback } from "@/lib/staticParams";
import ProgramDetailPage from "@/views/ProgramDetail";

type PageProps = {
  params: Promise<{ category: string; programSlug: string }>;
};

export async function generateStaticParams(): Promise<{ category: string; programSlug: string }[]> {
  try {
    const programs = await getProgramsForListing();
    const params = programs
      .filter((p) => p.slug && p.category?.slug)
      .map((p) => ({ category: p.category!.slug!, programSlug: p.slug! }));
    return withStaticExportFallback(params, { category: "__empty__", programSlug: "__empty__" });
  } catch {
    return [{ category: "__empty__", programSlug: "__empty__" }];
  }
}

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps) {
  const { programSlug } = await params;
  try {
    const program = await getProgramBySlug(programSlug);
    return buildMetadata({
      title: program?.seo?.seoTitle ?? (program?.title ? `${program.title} | Milton Quran Institute` : undefined),
      description: program?.seo?.metaDescription ?? program?.shortDescription ?? program?.overview,
      path: program?.category?.slug && program.slug ? `/programs/${program.category.slug}/${program.slug}` : "/programs",
    });
  } catch {
    return buildMetadata({ path: "/programs" });
  }
}

export default function Page() {
  return <ProgramDetailPage />;
}
