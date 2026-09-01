import { buildMetadata } from "@/lib/metadata";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanityQueries";
import { withStaticExportFallback } from "@/lib/staticParams";
import BlogPostPage from "@/views/BlogPost";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const posts = await getBlogPosts();
    const params = posts.filter((p) => p.slug).map((p) => ({ slug: p.slug! }));
    return withStaticExportFallback(params, { slug: "__empty__" });
  } catch {
    return [{ slug: "__empty__" }];
  }
}

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "__empty__") return buildMetadata({ path: "/blog", noIndex: true });
  try {
    const post = await getBlogPostBySlug(slug);
    return buildMetadata({
      title: post?.seo?.seoTitle ?? (post?.title ? `${post.title} | Milton Quran Institute` : undefined),
      description: post?.seo?.metaDescription ?? post?.excerpt,
      path: `/blog/${slug}`,
    });
  } catch {
    return buildMetadata({ path: "/blog" });
  }
}

export default function Page() {
  return <BlogPostPage />;
}
