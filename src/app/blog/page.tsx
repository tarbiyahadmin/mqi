import { buildMetadata } from "@/lib/metadata";
import { getBlogPage } from "@/lib/sanityQueries";
import BlogPage from "@/views/Blog";

export async function generateMetadata() {
  try {
    const page = await getBlogPage();
    return buildMetadata({
      title: page?.seo?.seoTitle ?? (page?.title ? `${page.title} | Milton Quran Institute` : undefined),
      description: page?.seo?.metaDescription,
      path: "/blog",
    });
  } catch {
    return buildMetadata({ path: "/blog" });
  }
}

export default function Page() {
  return <BlogPage />;
}
