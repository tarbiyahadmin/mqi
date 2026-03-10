import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getProgramCategories, getProgramsPage, getProgramsForListing } from "@/lib/sanityQueries";
import { getIcon } from "@/lib/icons";
import { urlFor } from "@/lib/sanity";
import { PageSeo } from "@/components/PageSeo";
import type { ProgramForListing } from "@/lib/sanityQueries";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Programs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategorySlug = searchParams.get("category") ?? null;

  const { data: programsPageData } = useQuery({
    queryKey: ["programsPage"],
    queryFn: getProgramsPage,
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["programCategories"],
    queryFn: getProgramCategories,
  });
  const { data: programs = [] } = useQuery({
    queryKey: ["programsForListing"],
    queryFn: getProgramsForListing,
  });

  const pageTitle = programsPageData?.title ?? "Our Programs";
  const pageSubtitle = programsPageData?.subtitle ?? "Explore our comprehensive range of Qur'anic education programs designed for learners at every stage.";
  const introContent = programsPageData?.introContent;

  const programsByCategoryId = (programs as ProgramForListing[]).reduce<Record<string, ProgramForListing[]>>((acc, prog) => {
    const id = prog.category?._id ?? "_none";
    if (!acc[id]) acc[id] = [];
    acc[id].push(prog);
    return acc;
  }, {});

  const filteredCategories = activeCategorySlug
    ? categories.filter((c) => c.slug === activeCategorySlug)
    : categories;
  const seo = programsPageData?.seo;

  return (
    <main className="py-20 md:py-28">
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle} | MQI`} />
      <div className="container">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
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

        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                !activeCategorySlug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                type="button"
                onClick={() => setSearchParams({ category: cat.slug })}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategorySlug === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        )}

          <div className="space-y-20">
          {filteredCategories.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              {activeCategorySlug
                ? "No programs found in this category."
                : "No programs available."}
            </p>
          ) : (
          filteredCategories.map((cat, ci) => {
            const Icon = getIcon(cat.icon);
            const categoryPrograms = programsByCategoryId[cat._id] ?? [];
            if (categoryPrograms.length === 0) return null;
            return (
              <section key={cat._id}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{cat.title}</h2>
                    <p className="text-muted-foreground text-sm mt-1">{cat.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {categoryPrograms.map((prog) => {
                    const imageUrl = prog.mainImage?.asset?.url
                      ? urlFor(prog.mainImage).width(600).height(340).fit("crop").url()
                      : null;
                    const categorySlug = prog.category?.slug ?? cat.slug;
                    return (
                      <Link key={prog._id} to={`/programs/${categorySlug}/${prog.slug}`}>
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                          {imageUrl && (
                            <div className="aspect-[16/9] overflow-hidden">
                              <img
                                src={imageUrl}
                                alt={prog.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              />
                            </div>
                          )}
                          <CardContent className="p-6 space-y-3">
                            <h3 className="text-lg font-semibold text-foreground">{prog.title}</h3>
                            {(prog.shortDescription || prog.overview) && (
                              <p className="text-sm text-muted-foreground line-clamp-2">{prog.shortDescription ?? prog.overview}</p>
                            )}
                            <Button variant="link" className="p-0 h-auto text-primary font-medium">
                              Learn More →
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })
          )}
        </div>
      </div>
    </main>
  );
};

export default Programs;
