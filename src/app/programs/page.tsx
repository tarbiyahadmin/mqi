import { Suspense } from "react";
import { buildMetadata } from "@/lib/metadata";
import { getProgramsPage } from "@/lib/sanityQueries";
import ProgramsPage from "@/views/Programs";

export async function generateMetadata() {
  try {
    const page = await getProgramsPage();
    return buildMetadata({
      title: page?.seo?.seoTitle ?? (page?.title ? `${page.title} | Milton Quran Institute` : undefined),
      description: page?.seo?.metaDescription,
      path: "/programs",
    });
  } catch {
    return buildMetadata({ path: "/programs" });
  }
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProgramsPage />
    </Suspense>
  );
}
