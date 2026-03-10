import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { getBlogPostBySlug } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { format } from "date-fns";
import { PageSeo } from "@/components/PageSeo";

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
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-6">This blog post will be available soon through our CMS.</p>
        <Link to="/blog"><Button>Back to Blog</Button></Link>
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
    <main className="py-12 md:py-20">
      <PageSeo title={post.seo?.seoTitle} description={post.seo?.metaDescription} fallbackTitle={`${post.title} | MQI`} />
      <div className="container max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {post.category && (
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{post.category}</span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            {post.author && (
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
            )}
            {dateStr && (
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {dateStr}</span>
            )}
          </div>

          {imageUrl && (
            <div className="rounded-2xl overflow-hidden mb-10">
              <img
                src={imageUrl}
                alt={post.title}
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
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
