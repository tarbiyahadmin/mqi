import { buildMetadata } from "@/lib/metadata";
import { getBookMeetPage } from "@/lib/sanityQueries";
import BookMeetPage from "@/views/BookMeet";

export async function generateMetadata() {
  try {
    const page = await getBookMeetPage();
    return buildMetadata({
      title: page?.seo?.seoTitle ?? (page?.title ? `${page.title} | Milton Quran Institute` : undefined),
      description: page?.seo?.metaDescription,
      path: "/book-a-meet",
    });
  } catch {
    return buildMetadata({ path: "/book-a-meet" });
  }
}

export default function Page() {
  return <BookMeetPage />;
}
