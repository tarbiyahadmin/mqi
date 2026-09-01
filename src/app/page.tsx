import { buildMetadata } from "@/lib/metadata";
import { getHomepage } from "@/lib/sanityQueries";
import HomePage from "@/views/Index";

export async function generateMetadata() {
  try {
    const homepage = await getHomepage();
    return buildMetadata({
      title: homepage?.seo?.seoTitle,
      description: homepage?.seo?.metaDescription,
      path: "/",
    });
  } catch {
    return buildMetadata({ path: "/" });
  }
}

export default function Page() {
  return <HomePage />;
}
