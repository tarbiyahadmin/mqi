import { buildMetadata } from "@/lib/metadata";
import { getDonatePage } from "@/lib/sanityQueries";
import DonatePage from "@/views/Donate";

export async function generateMetadata() {
  try {
    const page = await getDonatePage();
    return buildMetadata({
      title: page?.seo?.seoTitle ?? (page?.title ? `${page.title} | Milton Quran Institute` : undefined),
      description: page?.seo?.metaDescription,
      path: "/donate",
    });
  } catch {
    return buildMetadata({ path: "/donate" });
  }
}

export default function Page() {
  return <DonatePage />;
}
