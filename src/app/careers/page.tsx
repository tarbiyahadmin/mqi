import { buildMetadata } from "@/lib/metadata";
import { getCareersPage } from "@/lib/sanityQueries";
import CareersPage from "@/views/Careers";

export async function generateMetadata() {
  try {
    const page = await getCareersPage();
    return buildMetadata({
      title: page?.seo?.seoTitle ?? (page?.title ? `${page.title} | Milton Quran Institute` : undefined),
      description: page?.seo?.metaDescription,
      path: "/careers",
    });
  } catch {
    return buildMetadata({ path: "/careers" });
  }
}

export default function Page() {
  return <CareersPage />;
}
