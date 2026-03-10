import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getTemplatePageBySlug, type TemplatePageDoc, type ContentBlockRichText, type ContentBlockImage, type ContentBlockCta } from "@/lib/sanityQueries";
import { PageSeo } from "@/components/PageSeo";
import { urlFor } from "@/lib/sanity";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function TemplateSections({ sections }: { sections?: TemplatePageDoc["sections"] }) {
  if (!sections?.length) return null;
  return (
    <div className="space-y-12">
      {sections.map((block, i) => {
        if (block._type === "contentBlockRichText") {
          const b = block as ContentBlockRichText;
          return (
            <motion.section
              key={b._key ?? i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {b.heading && (
                <h2 className="text-2xl font-bold text-foreground mb-4">{b.heading}</h2>
              )}
              {b.body && b.body.length > 0 && (
                <div className="prose prose-lg max-w-none prose-p:text-muted-foreground">
                  <PortableText value={b.body} />
                </div>
              )}
            </motion.section>
          );
        }
        if (block._type === "contentBlockImage") {
          const b = block as ContentBlockImage;
          const imgUrl = b.image?.asset?.url ? urlFor(b.image).width(900).height(500).fit("max").url() : null;
          if (!imgUrl) return null;
          return (
            <motion.section
              key={b._key ?? i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-2xl overflow-hidden border border-border/50"
            >
              <img src={imgUrl} alt={b.caption ?? ""} className="w-full h-auto object-cover" />
              {b.caption && (
                <p className="text-sm text-muted-foreground mt-2 text-center">{b.caption}</p>
              )}
            </motion.section>
          );
        }
        if (block._type === "contentBlockCta") {
          const b = block as ContentBlockCta;
          return (
            <motion.section
              key={b._key ?? i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="py-10 px-6 rounded-2xl bg-muted/50 border border-border/50 text-center"
            >
              {b.title && (
                <h3 className="text-xl font-bold text-foreground mb-2">{b.title}</h3>
              )}
              {b.subtitle && (
                <p className="text-muted-foreground mb-4 max-w-xl mx-auto">{b.subtitle}</p>
              )}
              {b.buttons && b.buttons.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3">
                  {b.buttons.map((btn) => (
                    <Link key={btn.to} to={btn.to}>
                      <Button
                        className={
                          btn.variant === "accent"
                            ? "rounded-full font-semibold bg-accent text-accent-foreground hover:bg-accent/85"
                            : "rounded-full font-semibold"
                        }
                      >
                        {btn.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </motion.section>
          );
        }
        return null;
      })}
    </div>
  );
}

const TemplatePage = () => {
  const { slug } = useParams();
  const { data: page, isLoading } = useQuery({
    queryKey: ["templatePage", slug],
    queryFn: () => getTemplatePageBySlug(slug ?? ""),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Page not found</h1>
        <Link to="/"><Button>Back to Home</Button></Link>
      </div>
    );
  }

  const heroImageUrl =
    page.heroImage?.asset?.url &&
    urlFor(page.heroImage).width(1200).height(600).fit("max").url();

  return (
    <main className="py-16 md:py-24">
      <PageSeo title={page.seo?.seoTitle} description={page.seo?.metaDescription} fallbackTitle={`${page.title} | MQI`} />
      <div className="container max-w-4xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{page.title}</h1>
          <div className="geometric-divider w-24 mx-auto mb-4" />
          {page.subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {page.subtitle}
            </p>
          )}
        </motion.div>

        {page._type === "landingPage" && page.heroCtaButtons && page.heroCtaButtons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {page.heroCtaButtons.map((btn) => (
              <Link key={btn.to} to={btn.to}>
                <Button
                  size="lg"
                  className={
                    btn.variant === "accent"
                      ? "rounded-full font-semibold bg-accent text-accent-foreground hover:bg-accent/85"
                      : "rounded-full font-semibold"
                  }
                >
                  {btn.label}
                </Button>
              </Link>
            ))}
          </div>
        )}

        {heroImageUrl && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-2xl overflow-hidden border border-border/50 mb-12 aspect-[2/1] max-h-[400px]"
          >
            <img
              src={heroImageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {page._type === "infoPage" && "introText" in page && page.introText && (
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto text-center">
            {page.introText}
          </p>
        )}

        {"mainContent" in page && page.mainContent && page.mainContent.length > 0 && (
          <div className="prose prose-lg max-w-none prose-p:text-muted-foreground mb-12">
            <PortableText value={page.mainContent} />
          </div>
        )}

        {"body" in page && page.body && page.body.length > 0 && (
          <div className="prose prose-lg max-w-none prose-p:text-muted-foreground mb-12">
            <PortableText value={page.body} />
          </div>
        )}

        {"sections" in page && <TemplateSections sections={page.sections} />}
      </div>
    </main>
  );
};

export default TemplatePage;
