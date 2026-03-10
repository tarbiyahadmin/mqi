import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts, getBlogPage } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { format } from "date-fns";
import { PageSeo } from "@/components/PageSeo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Blog = () => {
  const { data: blogPageData } = useQuery({
    queryKey: ["blogPage"],
    queryFn: getBlogPage,
  });
  const { data: posts = [] } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: getBlogPosts,
  });

  const pageTitle = blogPageData?.title ?? "Blog";
  const pageSubtitle = blogPageData?.subtitle ?? "Insights, reflections, and updates from Milton Qur'an Institute.";
  const introContent = blogPageData?.introContent;
  const seo = blogPageData?.seo;

  return (
    <main className="py-16 md:py-24">
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle} | MQI`} />
      <div className="container">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{pageTitle}</h1>
          <div className="geometric-divider w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {pageSubtitle}
          </p>
          {introContent && introContent.length > 0 && (
            <div className="prose prose-lg max-w-2xl mx-auto mt-6 text-center prose-p:text-muted-foreground">
              <PortableText value={introContent} />
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post, i) => {
            const imageUrl = post.mainImage?.asset?.url
              ? urlFor(post.mainImage).width(600).height(400).fit("crop").url()
              : undefined;
            const dateStr = post.publishedAt
              ? format(new Date(post.publishedAt), "MMMM d, yyyy")
              : "";
            return (
              <div key={post._id}>
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                    <div className="aspect-[3/2] overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">No image</div>
                      )}
                    </div>
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {dateStr}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground leading-snug">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Blog;
