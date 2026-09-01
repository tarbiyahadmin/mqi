import { buildMetadata } from "@/lib/metadata";
import { getFinancialAidPage } from "@/lib/sanityQueries";
import FinancialAidPage from "@/views/FinancialAid";

export async function generateMetadata() {
  try {
    const page = await getFinancialAidPage();
    return buildMetadata({
      title: page?.seo?.seoTitle ?? (page?.title ? `${page.title} | Milton Quran Institute` : undefined),
      description: page?.seo?.metaDescription,
      path: "/financial-aid",
    });
  } catch {
    return buildMetadata({ path: "/financial-aid" });
  }
}

export default function Page() {
  return <FinancialAidPage />;
}
