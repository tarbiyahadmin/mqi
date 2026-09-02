import { buildMetadata } from "@/lib/metadata";
import { EMPTY_STATIC_PARAM, programDetailPath } from "@/lib/routes";
import { getProgramBySlug, getProgramsForListing } from "@/lib/sanityQueries";
import { withStaticExportFallback } from "@/lib/staticParams";
import ProgramDetailPage from "@/views/ProgramDetail";

type PageProps = {
  params: Promise<{ category: string; programSlug: string }>;
};

export async function generateStaticParams(): Promise<{ category: string; programSlug: string }[]> {
  const programs = await getProgramsForListing();
  const params = programs
    .filter((p) => p.slug && p.category?.slug)
    .map((p) => ({ category: p.category!.slug!, programSlug: p.slug! }));
  const fallback = { category: EMPTY_STATIC_PARAM, programSlug: EMPTY_STATIC_PARAM };
  return [...params, fallback];
}

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps) {
  const { programSlug } = await params;
  if (programSlug === EMPTY_STATIC_PARAM) {
    return buildMetadata({ path: "/programs", noIndex: true });
  }
  try {
    const program = await getProgramBySlug(programSlug);
    return buildMetadata({
      title: program?.seo?.seoTitle ?? (program?.title ? `${program.title} | Milton Quran Institute` : undefined),
      description: program?.seo?.metaDescription ?? program?.shortDescription ?? program?.overview,
      path: program?.category?.slug && program.slug ? programDetailPath(program.category.slug, program.slug) : "/programs",
    });
  } catch {
    return buildMetadata({ path: "/programs" });
  }
}

export default function Page() {
  return <ProgramDetailPage />;
}
