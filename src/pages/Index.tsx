import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CtaLink } from "@/components/CtaLink";
import { PageSeo } from "@/components/PageSeo";
import heroImage from "@/assets/hero-classroom.jpg";
import { useQuery } from "@tanstack/react-query";
import { getHomepage, getAboutPage, type AboutTeacher } from "@/lib/sanityQueries";
import { getIcon } from "@/lib/icons";
import { urlFor } from "@/lib/sanity";

const defaultProgramCategories = [
  { title: "Courses", description: "Flexible courses in Qur'an recitation, Tajweed, Arabic, and Islamic Studies for all ages and levels.", icon: "BookOpen", to: "/programs" },
  { title: "Full Time School", description: "Comprehensive Hifz and Islamic Studies programs with structured daily schedules and qualified instructors.", icon: "GraduationCap", to: "/programs" },
  { title: "Summer Programs", description: "Engaging summer intensives combining Qur'anic learning with enrichment activities for youth.", icon: "Sun", to: "/programs" },
];

const defaultWhyChooseUs = [
  { icon: "Award", title: "Qualified Instructors", description: "Certified scholars with Ijazah in Qur'anic recitation" },
  { icon: "Users", title: "Small Class Sizes", description: "Personalized attention for every student" },
  { icon: "BookOpen", title: "Structured Curriculum", description: "Progressive learning paths tailored to each level" },
  { icon: "Heart", title: "Supportive Community", description: "A welcoming environment for families" },
  { icon: "Clock", title: "Flexible Scheduling", description: "Weekend, evening, and full-time options" },
  { icon: "Shield", title: "Safe Environment", description: "Background-checked staff and secure facilities" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Index = () => {
  const { data: homepage } = useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepage,
  });
  const { data: aboutPage } = useQuery({
    queryKey: ["aboutPageForHome"],
    queryFn: getAboutPage,
  });

  const heroEyebrow = homepage?.heroEyebrow ?? "— Milton Quran Institute —";
  const heroTitle = homepage?.heroTitle ?? "Nurturing Hearts Through Qur'anic Education";
  const heroSubtitle = homepage?.heroSubtitle ?? "Join a vibrant learning community dedicated to excellence in Qur'anic studies, Arabic language, and Islamic education for all ages.";
  const heroCtaButtons = homepage?.heroCtaButtons?.length ? homepage.heroCtaButtons : [
    { label: "Explore Programs", to: "/programs", variant: "primary" as const },
    { label: "Support Us", to: "/donate", variant: "accent" as const },
  ];
  const programsSectionTitle = homepage?.programsSectionTitle ?? "Our Programs";
  const programsSectionSubtitle = homepage?.programsSectionSubtitle ?? "Discover our range of programs designed to meet learners at every stage of their Qur'anic journey.";
  const featuredPrograms = homepage?.featuredPrograms ?? [];
  const programCategories = homepage?.programCategories?.length ? homepage.programCategories : defaultProgramCategories;
  const viewAllProgramsLabel = homepage?.viewAllProgramsLabel ?? "View All Programs";
  const heroStats = homepage?.heroStats ?? [];

  const allCategories = [...new Set((featuredPrograms as { category?: { slug?: string; title?: string } }[])
    .map((p) => p.category?.slug)
    .filter(Boolean))] as string[];
  const [programFilter, setProgramFilter] = useState<string | null>(null);
  const programsScrollRef = useRef<HTMLDivElement>(null);
  const testimonialsScrollRef = useRef<HTMLDivElement | null>(null);
  const filteredPrograms = programFilter
    ? featuredPrograms.filter((p: { category?: { slug?: string } }) => p.category?.slug === programFilter)
    : featuredPrograms;
  const whyChooseUsSectionTitle = homepage?.whyChooseUsSectionTitle ?? "Why Choose Us";
  const whyChooseUsSectionSubtitle = homepage?.whyChooseUsSectionSubtitle ?? "We are committed to providing the highest quality Qur'anic education in a nurturing environment.";
  const whyChooseUsItems = homepage?.whyChooseUsItems?.length ? homepage.whyChooseUsItems : defaultWhyChooseUs;
  const ctaTitle = homepage?.ctaTitle ?? "Begin Your Qur'anic Journey Today";
  const ctaSubtitle = homepage?.ctaSubtitle ?? "Enroll in one of our programs and join a community dedicated to learning, growth, and spiritual development.";
  const footerNote = homepage?.footerNote;
  const ctaButtons = homepage?.ctaButtons?.length ? homepage.ctaButtons : [
    { label: "View Programs", to: "/programs", variant: "primary" as const },
    { label: "Support Us", to: "/donate", variant: "accent" as const },
  ];
  const seo = homepage?.seo;

  const testimonialsSectionTitle = homepage?.testimonialsSectionTitle ?? "What Families Say";
  const testimonials = homepage?.testimonials ?? [];
  const aboutSectionTitle = aboutPage?.title ?? "About Us";
  const aboutSectionSubtitle = aboutPage?.subtitle ?? "";
  const aboutTextFull = aboutPage?.instituteText ?? aboutPage?.ourStory ?? "";
  const homeTeachers = (aboutPage?.teachers ?? []) as AboutTeacher[];
  const showAboutSection = !!aboutPage;

  return (
    <main>
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Milton Qur'an Institute classroom" className="w-full h-full object-cover rounded-b-3xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/50 rounded-b-3xl" />
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-2xl text-white space-y-6"
          >
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-accent font-sans font-medium mb-1 text-left">
              {heroEyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.4]">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-[1.5]">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {heroCtaButtons.map((btn, i) => (
                <CtaLink
                  key={`${btn.to}-${i}`}
                  label={btn.label}
                  to={btn.to}
                  isExternal={btn.isExternal}
                  variant={btn.variant ?? "primary"}
                  compact
                  className="shadow-lg shadow-black/20 hover:shadow-xl text-base"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Stats - scrolling marquee */}
      {heroStats.length > 0 && (
        <div className="bg-background py-4 overflow-hidden -mt-px">
          <div className="hero-stats-marquee flex items-center gap-20 px-4 md:px-8 whitespace-nowrap">
            {[...heroStats, ...heroStats, ...heroStats].map((s: any, i: number) => {
              const Icon = s?.icon ? getIcon(s.icon) : null;
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-4 text-base md:text-lg font-medium text-muted-foreground"
                >
                  {Icon && (
                    <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary/5 border border-primary/20">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                  )}
                  <span className="text-primary font-semibold">{s.label}</span>
                  {s.value && (
                    <span className="text-muted-foreground/80 text-sm md:text-base">
                      {s.value}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Our Programs */}
      <section className="py-20 md:py-28 pattern-stars">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{programsSectionTitle}</h2>
            <div className="geometric-divider w-24 mx-auto mt-4 mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">{programsSectionSubtitle}</p>
          </motion.div>

          {featuredPrograms.length > 0 ? (
            <>
              {allCategories.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <button
                    type="button"
                    onClick={() => setProgramFilter(null)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      !programFilter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All
                  </button>
                  {allCategories.map((slug) => {
                    const cat = (featuredPrograms as { category?: { slug?: string; title?: string } }[]).find((p) => p.category?.slug === slug);
                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => setProgramFilter(slug)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                          programFilter === slug ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat?.category?.title ?? slug}
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="relative">
              <div
                ref={programsScrollRef}
                className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-thin hide-scrollbar snap-x snap-mandatory"
              >
                  {filteredPrograms.map((prog: { _id: string; slug?: string; title?: string; category?: { slug?: string }; shortDescription?: string; mainImage?: unknown }) => {
                    const catSlug = prog.category?.slug ?? "programs";
                    const imageUrl = prog.mainImage && typeof prog.mainImage === "object" && "asset" in prog.mainImage && prog.mainImage.asset
                      ? urlFor(prog.mainImage as { asset?: { url: string } }).width(400).height(240).fit("crop").url()
                      : null;
                    return (
                      <Link
                        key={prog._id}
                        to={`/programs/${catSlug}/${prog.slug ?? ""}`}
                        className="flex-shrink-0 w-[280px] snap-start"
                      >
                        <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden">
                          {imageUrl && (
                            <div className="aspect-video overflow-hidden">
                              <img src={imageUrl} alt={prog.title ?? ""} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                            </div>
                          )}
                          <CardContent className="p-6 space-y-3">
                            <h3 className="text-lg font-semibold text-foreground">{prog.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">{prog.shortDescription}</p>
                            <span className="inline-block text-primary font-medium text-sm hover:underline">
                              Learn more →
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
                {filteredPrograms.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => programsScrollRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-background/90 shadow-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors z-10"
                      aria-label="Scroll left"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => programsScrollRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-background/90 shadow-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors z-10"
                      aria-label="Scroll right"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
              <div className="flex justify-center mt-10">
                <Link to="/programs">
                  <Button variant="default" size="lg" className="rounded-2xl font-semibold px-12 py-7 text-base shadow-lg hover:shadow-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    {viewAllProgramsLabel}
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {programCategories.map((cat) => {
                const Icon = getIcon(cat.icon);
                return (
                  <div key={cat.title}>
                    <Link to={cat.categorySlug ? `/programs?category=${cat.categorySlug}` : (cat.to ?? "/programs")}>
                      <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                        <CardContent className="p-8 text-center space-y-4">
                          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold text-foreground">{cat.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{cat.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* About Us */}
      {showAboutSection && (
        <section className="py-20 md:py-28 bg-background bg-pattern-subtle">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{aboutSectionTitle}</h2>
              <div className="geometric-divider w-24 mx-auto mt-4 mb-4" />
              {aboutSectionSubtitle && (
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {aboutSectionSubtitle}
                </p>
              )}
            </motion.div>

            {aboutTextFull && (
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line mb-10 max-w-4xl mx-auto">
                {aboutTextFull}
              </p>
            )}

            <div className="mt-10 flex justify-center">
              <Link to="/about">
                <Button variant="outline" className="rounded-2xl font-semibold px-10 py-6 text-base shadow-md hover:shadow-lg hover:bg-primary/5 hover:border-primary/30 transition-all">
                  Learn more about us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Our Teachers - separate section */}
      {showAboutSection && homeTeachers.length > 0 && (
        <section className="py-20 md:py-28 pattern-stars">
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Teachers</h2>
                <div className="geometric-divider w-24 mx-auto mt-4 mb-4" />
              </motion.div>
              <div className="flex gap-6 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-thin justify-center flex-wrap md:flex-nowrap md:justify-center">
                {homeTeachers.map((t) => {
                  const photoUrl = t.photo?.asset?.url
                    ? urlFor(t.photo).width(280).height(280).fit("crop").url()
                    : null;
                  return (
                    <Card
                      key={t.name}
                      className="min-w-[260px] max-w-[280px] flex-shrink-0 border-border/60 bg-card/80 backdrop-blur-sm"
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                        {photoUrl && (
                          <div className="w-20 h-20 rounded-full overflow-hidden border border-border/60">
                            <img src={photoUrl} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground">{t.name}</p>
                          {t.role && <p className="text-xs text-primary mt-0.5">{t.role}</p>}
                          {t.oneLineDescription && <p className="text-sm text-muted-foreground mt-1">{t.oneLineDescription}</p>}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
      )}

      {/* Testimonials - single-row carousel with arrows */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{testimonialsSectionTitle}</h2>
              <div className="geometric-divider w-24 mx-auto mt-4 mb-4" />
            </motion.div>
            <div className="relative content-max mx-auto">
              <div
                ref={testimonialsScrollRef}
                className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-thin hide-scrollbar snap-x snap-mandatory"
              >
                {testimonials.map((t, i) => (
                  <motion.div
                    key={t.name ?? i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex-shrink-0 w-[280px] snap-start"
                  >
                    <Card className="h-full border-border/50 bg-card/80">
                      <CardContent className="p-6">
                        <p className="text-muted-foreground italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                        <p className="font-semibold text-foreground">{t.name}</p>
                        {t.role && <p className="text-sm text-primary">{t.role}</p>}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              {testimonials.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => testimonialsScrollRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-background/90 shadow-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors z-10"
                    aria-label="Scroll testimonials left"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => testimonialsScrollRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-background/90 shadow-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors z-10"
                    aria-label="Scroll testimonials right"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-background geometric-border">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{whyChooseUsSectionTitle}</h2>
            <div className="geometric-divider w-24 mx-auto mt-4 mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">{whyChooseUsSectionSubtitle}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 content-max mx-auto">
            {whyChooseUsItems.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={item.title}>
                  <div className="flex items-start gap-4 p-6 rounded-xl bg-card/80 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 md:py-28 bg-secondary pattern-dark">
        <div className="container text-center space-y-6">
          {footerNote && (
            <p className="text-secondary-foreground/90 text-sm max-w-xl mx-auto">{footerNote}</p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground">{ctaTitle}</h2>
          <p className="text-secondary-foreground/80 max-w-xl mx-auto text-lg">{ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {ctaButtons.map((btn, i) => (
              <CtaLink
                key={`${btn.to}-${i}`}
                label={btn.label}
                to={btn.to}
                isExternal={btn.isExternal}
                variant={btn.variant ?? "primary"}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
