import { buildMetadata } from "@/lib/metadata";
import { getHomepage, getAboutPage } from "@/lib/sanityQueries";
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

export default async function Page() {
  const [homepage, aboutPage] = await Promise.all([getHomepage(), getAboutPage()]);
  return <HomePage homepage={homepage} aboutPage={aboutPage} />;
}
