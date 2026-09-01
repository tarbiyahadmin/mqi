import { buildMetadata } from "@/lib/metadata";
import { getAboutPage } from "@/lib/sanityQueries";
import AboutPage from "@/views/About";

export async function generateMetadata() {
  try {
    const page = await getAboutPage();
    return buildMetadata({
      title: page?.seo?.seoTitle ?? (page?.title ? `${page.title} | Milton Quran Institute` : undefined),
      description: page?.seo?.metaDescription,
      path: "/about",
    });
  } catch {
    return buildMetadata({ path: "/about" });
  }
}

export default function Page() {
  return <AboutPage />;
}
