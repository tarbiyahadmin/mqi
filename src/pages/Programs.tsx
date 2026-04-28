import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getProgramCategories, getProgramsPage, getProgramsForListing } from "@/lib/sanityQueries";
import { PageSeo } from "@/components/PageSeo";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
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
    <main className="section-soft-radial section-y relative overflow-hidden">
      <DecorativeArabic variant="full" opacity={0.036} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/90" aria-hidden />
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle} | MQI`} />
      <div className="container relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 text-center md:mb-20">
          <h1 className="heading-section mb-6">{pageTitle}</h1>
          <div className="geometric-divider mx-auto mb-6 w-28" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
            {pageSubtitle}
          </p>
          {introContent && introContent.length > 0 && (
            <div className="prose prose-lg prose-editorial mx-auto mt-6 max-w-2xl text-center prose-p:text-muted-foreground">
              <PortableText value={introContent} />
            </div>
          )}
        </motion.div>

        {categories.length > 0 && (
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                !activeCategorySlug
                  ? "border-primary/80 bg-primary text-primary-foreground shadow-sm"
                  : "border-transparent bg-muted/70 text-muted-foreground hover:border-primary/75 hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                type="button"
                onClick={() => setSearchParams({ category: cat.slug })}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategorySlug === cat.slug
                    ? "border-primary/80 bg-primary text-primary-foreground shadow-sm"
                    : "border-transparent bg-muted/70 text-muted-foreground hover:border-primary/75 hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-20 md:space-y-24">
          {filteredCategories.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              {activeCategorySlug ? "No programs found in this category." : "No programs available."}
            </p>
          ) : (
            filteredCategories.map((cat) => {
              const categoryPrograms = programsByCategoryId[cat._id] ?? [];
              if (categoryPrograms.length === 0) return null;
              return (
                <section key={cat._id}>
                  <div className="mb-8">
                    <h2 className="heading-section-sm">{cat.title}</h2>
                    {cat.description && <p className="mt-2 text-sm text-muted-foreground md:text-base">{cat.description}</p>}
                  </div>
                  <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
                    {categoryPrograms.map((prog) => {
                      const categorySlug = prog.category?.slug ?? cat.slug;
                      return (
                        <Link key={prog._id} to={`/programs/${categorySlug}/${prog.slug}`} className="min-w-0">
                          <Card className="group relative h-full min-h-[220px] overflow-hidden border-border/50 shadow-md transition-shadow hover:shadow-lg">
                            <CardContent className="relative z-[1] flex h-full flex-col space-y-4 p-8">
                              <h3 className="text-xl font-semibold leading-snug text-foreground md:text-2xl">{prog.title}</h3>
                              {(prog.shortDescription || prog.overview) && (
                                <p className="line-clamp-4 flex-1 text-base leading-relaxed text-muted-foreground">
                                  {prog.shortDescription ?? prog.overview}
                                </p>
                              )}
                              <Button variant="link" className="h-auto p-0 text-base font-medium text-primary group-hover:no-underline">
                                Learn more →
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
