import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { getBlogPostBySlug } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { format } from "date-fns";
import { PageSeo } from "@/components/PageSeo";
import { PageTitle } from "@/components/layout/PageTitle";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
import { ImageSoftFade } from "@/components/ui/ImageSoftFade";

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => getBlogPostBySlug(slug ?? ""),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-20">
        <PageTitle title="Post not found" subtitle="This blog post will be available soon through our CMS." />
        <div className="mt-10 flex justify-center">
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = post.mainImage?.asset?.url
    ? urlFor(post.mainImage).width(1200).height(600).fit("max").url()
    : null;
  const dateStr = post.publishedAt
    ? format(new Date(post.publishedAt), "MMMM d, yyyy")
    : "";

  return (
    <main className="section-soft-radial relative py-16 md:py-28 lg:py-32">
      <DecorativeArabic variant="full" opacity={0.034} />
      <PageSeo title={post.seo?.seoTitle} description={post.seo?.metaDescription} fallbackTitle={`${post.title} | MQI`} />
      <div className="container relative z-10 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <span aria-hidden>←</span> Back to Blog
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <PageTitle
            eyebrow={
              post.category ? (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
              ) : undefined
            }
            title={post.title}
          />
          <div className="mb-10 mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground md:mt-4">
            {post.author && (
              <span>{post.author}</span>
            )}
            {dateStr && (
              <span>{dateStr}</span>
            )}
          </div>

          {imageUrl && (
            <ImageSoftFade className="mb-10 rounded-2xl">
              <img src={imageUrl} alt={post.title} loading="lazy" className="h-auto w-full" />
            </ImageSoftFade>
          )}

          {post.body && post.body.length > 0 ? (
            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-headings:font-semibold">
              <PortableText value={post.body} />
            </div>
          ) : (
            <p className="text-muted-foreground">Content coming soon.</p>
          )}
        </motion.article>
      </div>
    </main>
  );
};

export default BlogPost;
