import { buildMetadata } from "@/lib/metadata";
import { getThankYouPage } from "@/lib/sanityQueries";
import ThankYouPage from "@/views/ThankYou";

export async function generateMetadata() {
  try {
    const page = await getThankYouPage();
    return buildMetadata({
      title: page?.seo?.seoTitle ?? (page?.title ? `${page.title} | Milton Quran Institute` : undefined),
      description: page?.seo?.metaDescription,
      path: "/thank-you",
      noIndex: true,
    });
  } catch {
    return buildMetadata({ path: "/thank-you", noIndex: true });
  }
}

export default function Page() {
  return <ThankYouPage />;
}
