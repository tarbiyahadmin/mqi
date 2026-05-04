import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CtaLink } from "@/components/CtaLink";
import { PageSeo } from "@/components/PageSeo";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
import { ImageSoftFade } from "@/components/ui/ImageSoftFade";
import quranHero from "@/assets/quran.png";
import photoEditorialA from "@/assets/mqi-images/DSC00985.JPG";
import photoEditorialB from "@/assets/mqi-images/IMG_7312.JPG";
import photoEditorialC from "@/assets/mqi-images/DSC00518.JPG";
import photoEditorialD from "@/assets/mqi-images/IMG_7382.JPG";
import photoCtaBand from "@/assets/mqi-images/IMG_7176.JPG";
import { useQuery } from "@tanstack/react-query";
import { getHomepage, getAboutPage, type AboutTeacher } from "@/lib/sanityQueries";
import { resolveCtaButtonTarget } from "@/lib/ctaDestinations";
import { urlFor } from "@/lib/sanity";

const defaultProgramCategories = [
  { title: "Courses", description: "Flexible courses in Qur'an recitation, Tajweed, Arabic, and Islamic Studies for all ages and levels.", to: "/programs" },
  { title: "Full Time School", description: "Comprehensive Hifz and Islamic Studies programs with structured daily schedules and qualified instructors.", to: "/programs" },
  { title: "Summer Programs", description: "Engaging summer intensives combining Qur'anic learning with enrichment activities for youth.", to: "/programs" },
];

const defaultWhyChooseUs = [
  { title: "Qualified Instructors", description: "Certified scholars with Ijazah in Qur'anic recitation" },
  { title: "Small Class Sizes", description: "Personalized attention for every student" },
  { title: "Structured Curriculum", description: "Progressive learning paths tailored to each level" },
  { title: "Supportive Community", description: "A welcoming environment for families" },
  { title: "Flexible Scheduling", description: "Weekend, evening, and full-time options" },
  { title: "Safe Environment", description: "Background-checked staff and secure facilities" },
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

  const allCategories = [...new Set((featuredPrograms as { category?: { slug?: string; title?: string } }[])
    .map((p) => p.category?.slug)
    .filter(Boolean))] as string[];
  const [programFilter, setProgramFilter] = useState<string | null>(null);
  const programsScrollRef = useRef<HTMLDivElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const editorialPhotoUrls = useMemo(() => {
    const fromCms = (homepage?.editorialPhotos ?? [])
      .map((img) => {
        if (img && typeof img === "object" && "asset" in img && img.asset) {
          return urlFor(img as never).width(960).height(720).fit("max").url();
        }
        return null;
      })
      .filter((u): u is string => !!u);
    const defaults = [photoEditorialA, photoEditorialB, photoEditorialC, photoEditorialD];
    const base = fromCms.length >= 2 ? fromCms : defaults;
    return [0, 1, 2, 3].map((i) => base[i] ?? defaults[i]);
  }, [homepage?.editorialPhotos]);
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

  useEffect(() => {
    setTestimonialIndex(0);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 10000);
    return () => window.clearInterval(id);
  }, [testimonials.length]);
  const aboutSectionTitle = aboutPage?.title ?? "About Us";
  const aboutSectionSubtitle = aboutPage?.subtitle ?? "";
  const aboutTextFull = aboutPage?.instituteText ?? aboutPage?.ourStory ?? "";
  const homeTeachers = (aboutPage?.teachers ?? []) as AboutTeacher[];
  const showAboutSection = !!aboutPage;

  return (
    <main>
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} />
      {/* Hero — full viewport, editorial two-column */}
      <section className="section-soft-radial relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="hero-editorial-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/75" />

        <div className="container relative z-10 py-16 md:py-20 lg:py-24">
          <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-4 lg:items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="relative z-20 order-1 max-w-xl space-y-7 text-left lg:order-1 lg:max-w-[42rem]"
            >
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary md:text-sm">
                {heroEyebrow}
              </p>
              <h1 className="hero-headline-gradient max-w-[20ch] text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                {heroTitle}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed max-w-xl">
                {heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-3.5 pt-2">
                {heroCtaButtons.map((btn, i) => {
                  const { to, isExternal } = resolveCtaButtonTarget(btn);
                  return (
                    <CtaLink
                      key={`${to}-${i}`}
                      label={btn.label}
                      to={to}
                      isExternal={isExternal}
                      variant={btn.variant ?? "primary"}
                      compact
                    />
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -right-8 bottom-2 z-10 flex justify-end md:-right-10 md:bottom-4 lg:pointer-events-auto lg:relative lg:order-2 lg:-ml-16 lg:bottom-auto lg:right-auto lg:justify-end xl:-ml-20"
            >
              <div className="relative">
                <div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-[48%] bg-[radial-gradient(ellipse_52%_48%_at_42%_52%,hsl(var(--primary)/0.15),transparent_72%)] blur-2xl"
                  aria-hidden
                />
                <img
                  src={quranHero}
                  alt=""
                  className="relative w-[min(68vw,300px)] max-h-[34vh] object-contain object-bottom opacity-[0.42] drop-shadow-[0_12px_32px_rgba(0,0,0,0.08)] [filter:saturate(0.86)_contrast(0.88)] [mask-image:linear-gradient(to_left,black_52%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,black_52%,transparent_100%)] sm:w-[min(58vw,340px)] sm:max-h-[38vh] sm:opacity-[0.5] lg:absolute lg:right-[-2%] lg:top-1/2 lg:z-10 lg:w-[min(55vw,580px)] lg:max-w-none lg:max-h-[min(82vh,680px)] lg:-translate-y-[47%] lg:translate-x-[-6%] lg:opacity-[0.9] lg:[filter:saturate(0.92)_contrast(0.93)] lg:[mask-image:linear-gradient(to_left,black_76%,transparent_100%)] lg:[-webkit-mask-image:linear-gradient(to_left,black_76%,transparent_100%)] xl:w-[min(52vw,620px)]"
                  width={800}
                  height={800}
                  decoding="async"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="section-soft-radial section-y pattern-stars relative overflow-hidden">
        <div className="container relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center md:mb-20">
            <h2 className="heading-section">{programsSectionTitle}</h2>
            <div className="geometric-divider mx-auto mt-6 mb-6 w-28" />
            <p className="heading-section-sub">{programsSectionSubtitle}</p>
          </motion.div>

          {featuredPrograms.length > 0 ? (
            <>
              {allCategories.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <button
                    type="button"
                    onClick={() => setProgramFilter(null)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      !programFilter
                        ? "border-primary/80 bg-primary text-primary-foreground shadow-sm"
                        : "border-transparent bg-muted/70 text-muted-foreground hover:border-primary/75 hover:bg-primary hover:text-primary-foreground"
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
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                          programFilter === slug
                            ? "border-primary/80 bg-primary text-primary-foreground shadow-sm"
                            : "border-transparent bg-muted/70 text-muted-foreground hover:border-primary/75 hover:bg-primary hover:text-primary-foreground"
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
                className="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2 md:mx-0 md:gap-6 md:px-0 scrollbar-thin hide-scrollbar snap-x snap-mandatory"
              >
                  {filteredPrograms.map((prog: { _id: string; slug?: string; title?: string; category?: { slug?: string }; shortDescription?: string; mainImage?: unknown }) => {
                    const catSlug = prog.category?.slug ?? "programs";
                    return (
                      <Link
                        key={prog._id}
                        to={`/programs/${catSlug}/${prog.slug ?? ""}`}
                        className="w-[min(86vw,300px)] shrink-0 snap-start sm:w-[min(72vw,320px)] md:w-[340px]"
                      >
                        <Card className="group relative h-full min-h-[200px] overflow-hidden border-border/50 shadow-md transition-shadow duration-300 hover:shadow-lg">
                          <CardContent className="relative z-[1] flex h-full flex-col space-y-4 p-8">
                            <h3 className="text-xl font-semibold leading-snug text-foreground md:text-2xl">{prog.title}</h3>
                            <p className="line-clamp-3 flex-1 text-base leading-relaxed text-muted-foreground">{prog.shortDescription}</p>
                            <span className="inline-block pt-1 text-base font-medium text-foreground/80 group-hover:text-primary/90 group-hover:underline">
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
              <div className="mt-12 flex justify-center">
                <Link to="/programs">
                  <Button variant="secondary" size="lg" className="px-12 py-7">
                    {viewAllProgramsLabel}
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {programCategories.map((cat) => {
                return (
                  <div key={cat.title}>
                    <Link to={cat.categorySlug ? `/programs?category=${cat.categorySlug}` : (cat.to ?? "/programs")}>
                      <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                        <CardContent className="p-8 text-center space-y-4">
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
        <section className="section-soft-radial relative overflow-hidden py-20 md:py-28">
          <DecorativeArabic variant="full" opacity={0.048} className="z-[1] scale-[1.08]" />
          <div
            className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_74%_66%_at_48%_52%,transparent_16%,hsl(var(--background)/0.76)_100%)]"
            aria-hidden
          />
          <div className="container relative z-10">
            <div className="content-max mx-auto grid w-full items-start gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="order-1 text-center lg:col-span-6 lg:self-center lg:text-left"
              >
                <div className="relative">
                  <div
                    className="pointer-events-none absolute -inset-x-6 -top-8 bottom-1/2 hidden rounded-[40%] gold-accent-radial opacity-70 lg:block"
                    aria-hidden
                  />
                  <h2 className="heading-section relative">{aboutSectionTitle}</h2>
                </div>
                <div className="geometric-divider mx-auto mt-5 mb-5 w-28 lg:mx-0" />
                {aboutSectionSubtitle && (
                  <p className="heading-section-sub !mx-0 max-w-2xl text-center lg:text-left">
                    {aboutSectionSubtitle}
                  </p>
                )}
                {aboutTextFull && (
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg md:leading-relaxed whitespace-pre-line">
                    {aboutTextFull}
                  </p>
                )}
                <div className="mt-8 flex justify-center lg:justify-start">
                  <Link to="/about">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-2xl border-primary/22 bg-background/80 px-10 py-7 text-base font-medium shadow-sm backdrop-blur-sm hover:border-primary/32 hover:bg-primary/[0.06]"
                    >
                      Learn more about us
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-2 lg:col-span-6 lg:self-center"
              >
                <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
                  <div className="grid h-[min(56vw,360px)] grid-cols-12 grid-rows-6 gap-2 sm:h-[400px] sm:gap-3 lg:h-[min(440px,44vh)]">
                    <ImageSoftFade className="relative col-span-7 row-span-6 overflow-hidden rounded-2xl shadow-md ring-1 ring-border/35">
                      <img
                        src={editorialPhotoUrls[2] ?? photoEditorialC}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </ImageSoftFade>
                    <ImageSoftFade className="relative col-span-5 col-start-8 row-span-3 -translate-y-0.5 overflow-hidden rounded-xl shadow-sm ring-1 ring-border/30 sm:-translate-y-1">
                      <img
                        src={editorialPhotoUrls[0] ?? photoEditorialA}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </ImageSoftFade>
                    <ImageSoftFade className="relative col-span-5 col-start-8 row-span-3 row-start-4 translate-y-0.5 overflow-hidden rounded-xl shadow-sm ring-1 ring-border/30 sm:translate-y-1">
                      <img
                        src={editorialPhotoUrls[1] ?? photoEditorialB}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </ImageSoftFade>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Our Teachers - separate section */}
      {showAboutSection && homeTeachers.length > 0 && (
        <section className="section-y pattern-stars relative">
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center md:mb-16">
                <h2 className="heading-section">Our Teachers</h2>
                <div className="geometric-divider mx-auto mt-6 w-28" />
              </motion.div>
              <div className="flex flex-wrap justify-center gap-8 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-thin md:flex-nowrap">
                {homeTeachers.map((t) => {
                  const photoUrl = t.photo?.asset?.url
                    ? urlFor(t.photo).width(280).height(280).fit("crop").url()
                    : null;
                  return (
                    <Card
                      key={t.name}
                      className="min-w-[260px] max-w-[280px] flex-shrink-0 border-border/50 bg-card/90 shadow-sm backdrop-blur-sm"
                    >
                      <CardContent className="flex flex-col items-center gap-4 p-7 text-center">
                        {photoUrl && (
                          <div className="h-24 w-24 overflow-hidden rounded-2xl border border-border/50 shadow-inner ring-2 ring-background">
                            <img src={photoUrl} alt={t.name} loading="lazy" className="h-full w-full object-cover" />
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

      {/* Testimonials — centered editorial, one at a time */}
      {testimonials.length > 0 && (
        <section className="section-soft-radial section-y relative overflow-hidden">
          <div className="container relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-16 text-center md:mb-20"
            >
              <h2 className="heading-section">{testimonialsSectionTitle}</h2>
              <div className="geometric-divider mx-auto mt-6 w-28" />
            </motion.div>

            <div className="content-max relative mx-auto max-w-4xl px-4 md:px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="text-center"
                >
                  <blockquote className="font-sans text-2xl font-normal leading-snug tracking-tight text-foreground md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight">
                    <span className="text-primary/55">&ldquo;</span>
                    {testimonials[testimonialIndex]?.quote}
                    <span className="text-primary/55">&rdquo;</span>
                  </blockquote>
                  <footer className="mt-12 space-y-2 border-t border-border/40 pt-10">
                    <p className="text-lg font-semibold text-foreground md:text-xl">
                      {testimonials[testimonialIndex]?.name}
                    </p>
                    {testimonials[testimonialIndex]?.role && (
                      <p className="text-base text-muted-foreground md:text-lg">{testimonials[testimonialIndex]?.role}</p>
                    )}
                  </footer>
                </motion.div>
              </AnimatePresence>

              {testimonials.length > 1 && (
                <div className="mt-14 flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-border/60 shadow-sm"
                      aria-label="Previous testimonial"
                      onClick={() =>
                        setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
                      }
                    >
                      <span aria-hidden>‹</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-border/60 shadow-sm"
                      aria-label="Next testimonial"
                      onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
                    >
                      <span aria-hidden>›</span>
                    </Button>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to testimonial ${i + 1}`}
                        aria-current={i === testimonialIndex}
                        onClick={() => setTestimonialIndex(i)}
                        className={`h-2.5 rounded-full transition-all ${
                          i === testimonialIndex
                            ? "w-10 bg-gradient-to-r from-primary/50 to-accent/45"
                            : "w-2.5 bg-border/90 hover:bg-primary/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="section-soft-radial section-y relative overflow-hidden">
        <div className="container relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative mb-16 text-center md:mb-20">
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-36 w-[min(90%,36rem)] -translate-x-1/2 rounded-full gold-accent-radial opacity-45 blur-2xl"
              aria-hidden
            />
            <h2 className="heading-section relative">{whyChooseUsSectionTitle}</h2>
            <div className="geometric-divider relative mx-auto mt-6 w-28" />
            <p className="heading-section-sub">{whyChooseUsSectionSubtitle}</p>
          </motion.div>
          <div className="content-max mx-auto grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
            {whyChooseUsItems.map((item, i) => {
              return (
                <div key={item.title}>
                  <div className="space-y-3 border-l-2 border-primary/35 pl-4">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner — calligraphy (left) → green → photo (right), soft blends */}
      <section className="section-y relative min-h-[260px] overflow-hidden bg-secondary pattern-dark text-secondary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-[hsl(166_49%_20%)]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_75%_at_30%_48%,hsl(45_42%_58%/0.18),transparent_58%)]"
          aria-hidden
        />
        <DecorativeArabic variant="bandLeft" opacity={0.075} />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[68%] bg-gradient-to-r from-secondary/0 via-secondary/42 to-secondary md:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[min(54%,620px)] md:block"
          aria-hidden
        >
          <div
            className="relative h-full w-full"
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.45) 16%, rgba(0,0,0,0.82) 30%, #000 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.45) 16%, rgba(0,0,0,0.82) 30%, #000 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
              maskComposite: "intersect",
            }}
          >
            <img
              src={photoCtaBand}
              alt=""
              className="h-full min-h-[300px] w-full object-cover object-center opacity-[0.9]"
              loading="lazy"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-secondary/0 to-secondary/80 mix-blend-multiply"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--secondary)/0.35)_0%,transparent_14%,transparent_86%,hsl(var(--secondary)/0.45)_100%)]"
            aria-hidden
          />
        </div>
        <div className="container relative z-10 space-y-8 text-center md:space-y-10">
          {footerNote && (
            <p className="mx-auto max-w-xl text-base leading-relaxed text-secondary-foreground/90">{footerNote}</p>
          )}
          <h2 className="heading-section-on-dark mx-auto max-w-4xl leading-tight">
            {ctaTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-secondary-foreground/85 md:text-xl md:leading-relaxed">
            {ctaSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-5 pt-4">
            {ctaButtons.map((btn, i) => {
              const { to, isExternal } = resolveCtaButtonTarget(btn);
              return (
                <CtaLink
                  key={`${to}-${i}`}
                  label={btn.label}
                  to={to}
                  isExternal={isExternal}
                  variant={btn.variant ?? "primary"}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
