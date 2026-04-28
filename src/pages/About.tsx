import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { PageSeo } from "@/components/PageSeo";
import { getAboutPage, getHomepage, type AboutTeacher, type AboutGraduate } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
import { ImageSoftFade } from "@/components/ui/ImageSoftFade";
import photoEditorialA from "@/assets/mqi-images/DSC00985.JPG";
import photoEditorialB from "@/assets/mqi-images/IMG_7312.JPG";
import photoEditorialC from "@/assets/mqi-images/DSC00518.JPG";
import photoEditorialD from "@/assets/mqi-images/IMG_7382.JPG";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const scrollByAmount = 320;

const About = () => {
  const { data: aboutPage } = useQuery({
    queryKey: ["aboutPage"],
    queryFn: getAboutPage,
  });
  const { data: homepage } = useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepage,
  });
  const testimonials = homepage?.testimonials ?? [];
  const testimonialsSectionTitle = homepage?.testimonialsSectionTitle ?? "What Families Say";

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

  const teachersRef = useRef<HTMLDivElement | null>(null);
  const graduatesRef = useRef<HTMLDivElement | null>(null);

  const pageTitle = aboutPage?.title ?? "About Us";
  const pageSubtitle = aboutPage?.subtitle;
  const sections = [
    { title: "Our Story", content: aboutPage?.ourStory },
    { title: "Our Mission", content: aboutPage?.ourMission },
    { title: "Our Vision", content: aboutPage?.ourVision },
    { title: "Our Approach", content: aboutPage?.ourApproach },
  ].filter((s) => s.content);
  const ourValuesCards = Array.isArray(aboutPage?.ourValues) ? aboutPage.ourValues : [];

  const seo = aboutPage?.seo;
  const teachers = (aboutPage?.teachers ?? []) as AboutTeacher[];
  const graduates = (aboutPage?.graduates ?? []) as AboutGraduate[];

  const scrollRow = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const delta = direction === "left" ? -scrollByAmount : scrollByAmount;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <main className="section-soft-radial section-y relative overflow-hidden pattern-stars">
      <DecorativeArabic variant="full" opacity={0.036} />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_68%_58%_at_52%_50%,transparent_22%,hsl(var(--background)/0.7)_100%)]"
        aria-hidden
      />
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle} | MQI`} />

      {/* Hero - same container as rest of site */}
      <section className="relative z-10 mb-12 md:mb-16">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center">
            <h1 className="heading-section mb-5">{pageTitle}</h1>
            <div className="geometric-divider mx-auto mb-5 w-28" />
            {pageSubtitle && (
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
                {pageSubtitle}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <div className="container relative z-10">

        {sections.length > 0 && (
          <div className="mb-20 space-y-14 md:mb-28 md:space-y-20">
            {sections.map((s, i) => {
              const imgUrl = editorialPhotoUrls[i % 4];
              const layout = i % 3;
              return (
                <motion.section
                  key={s.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="w-full"
                >
                  <h2 className="heading-section-sm mb-4">{s.title}</h2>
                  <div className="geometric-divider mb-6 w-16" />
                  {layout === 0 && (
                    <div className="grid min-w-0 gap-8 md:grid-cols-2 md:items-start md:gap-10">
                      <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line md:text-lg">
                        {s.content}
                      </p>
                      <ImageSoftFade className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/35 md:mx-0 md:max-w-none">
                        <img src={imgUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                      </ImageSoftFade>
                    </div>
                  )}
                  {layout === 1 && (
                    <>
                      <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line md:text-lg">
                        {s.content}
                      </p>
                      <div className="mt-8 md:mt-10">
                        <ImageSoftFade className="relative aspect-[21/10] max-h-[240px] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/35 sm:max-h-[280px] md:max-h-[300px]">
                          <img src={imgUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                        </ImageSoftFade>
                      </div>
                    </>
                  )}
                  {layout === 2 && (
                    <div className="grid min-w-0 gap-8 md:grid-cols-2 md:items-center md:gap-10">
                      <ImageSoftFade className="relative order-2 aspect-[3/4] max-h-[280px] overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/35 md:order-1 md:max-h-[min(52vh,380px)] md:aspect-[4/5]">
                        <img src={imgUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                      </ImageSoftFade>
                      <p className="order-1 text-base leading-relaxed text-muted-foreground whitespace-pre-line md:order-2 md:text-lg">
                        {s.content}
                      </p>
                    </div>
                  )}
                </motion.section>
              );
            })}
          </div>
        )}

        {/* Testimonials - minimal layout: quote + attribution */}
        {testimonials.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 md:mb-28">
            <h2 className="heading-section-sm relative mb-4">
              <span className="gold-accent-radial pointer-events-none absolute -inset-x-4 -inset-y-3 -z-10 rounded-3xl opacity-50" aria-hidden />
              {testimonialsSectionTitle}
            </h2>
            <div className="geometric-divider mb-10 w-16" />
            <div className="w-full space-y-12 md:space-y-16">
              {testimonials.map((t, i) => (
                <blockquote key={t.name ?? i} className="border-l-4 border-primary/30 py-2 pl-6 md:pl-8">
                  <p className="font-sans text-lg font-normal leading-relaxed tracking-tight text-foreground md:text-xl md:leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-4 font-semibold text-foreground">
                    {t.name}
                    {t.role ? (
                      <span className="ml-2 text-base font-normal text-muted-foreground">— {t.role}</span>
                    ) : null}
                  </footer>
                </blockquote>
              ))}
            </div>
          </motion.section>
        )}

        {/* Our Values */}
        {ourValuesCards.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative mb-20 md:mb-28">
            <div
              className="pointer-events-none absolute -left-6 top-0 h-40 w-[min(100%,28rem)] rounded-full gold-accent-radial opacity-40 blur-2xl md:left-0"
              aria-hidden
            />
            <h2 className="heading-section-sm relative mb-4">Our Values</h2>
            <div className="geometric-divider mb-10 w-16" />
            <div className="grid gap-8 content-max mx-auto sm:grid-cols-2 lg:grid-cols-3">
              {ourValuesCards.map((v, i) => {
                return (
                  <div key={v.title + i} className="space-y-3 border-l-2 border-primary/35 pl-4">
                    <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
                    {v.description && <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>}
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Teachers */}
        {teachers.length > 0 && (
          <section className="mb-20 md:mb-28">
            <h2 className="heading-section-sm mb-2">Our Teachers</h2>
            <div className="geometric-divider w-16 mb-6" />
            <div className="flex items-center justify-end gap-4 mb-4">
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollRow(teachersRef, "left")}
                  className="w-8 h-8 rounded-full border border-border/60 text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => scrollRow(teachersRef, "right")}
                  className="w-8 h-8 rounded-full border border-border/60 text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  ›
                </button>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 w-full">
              Meet the dedicated instructors guiding our students on their Qur&apos;anic journey.
            </p>
            <div
              ref={teachersRef}
              className="flex gap-6 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-thin"
            >
              {teachers.map((t) => {
                const photoUrl = t.photo?.asset?.url ? urlFor(t.photo).width(360).height(360).fit("crop").url() : null;
                return (
                  <Card
                    key={t.name}
                    className="min-w-[280px] max-w-[300px] flex-shrink-0 border-border/60 bg-card/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      {photoUrl && (
                        <ImageSoftFade className="h-28 w-28 shrink-0 rounded-2xl border border-border/60">
                          <img src={photoUrl} alt={t.name} loading="lazy" className="h-full w-full object-cover" />
                        </ImageSoftFade>
                      )}
                      <div>
                        <h3 className="font-semibold text-foreground">{t.name}</h3>
                        {t.role && <p className="text-sm text-primary mt-0.5">{t.role}</p>}
                        {t.oneLineDescription && (
                          <p className="text-sm text-muted-foreground mt-1">{t.oneLineDescription}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Graduates */}
        {graduates.length > 0 && (
          <section>
            <h2 className="heading-section-sm mb-2">Our Graduates</h2>
            <div className="geometric-divider w-16 mb-6" />
            <div className="flex items-center justify-end gap-4 mb-4">
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollRow(graduatesRef, "left")}
                  className="w-8 h-8 rounded-full border border-border/60 text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => scrollRow(graduatesRef, "right")}
                  className="w-8 h-8 rounded-full border border-border/60 text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  ›
                </button>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 w-full">
              A glimpse of the students who have completed their studies with us.
            </p>
            <div
              ref={graduatesRef}
              className="flex gap-6 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-thin"
            >
              {graduates.map((g) => {
                const photoUrl = g.photo?.asset?.url ? urlFor(g.photo).width(360).height(360).fit("crop").url() : null;
                return (
                  <Card
                    key={g.name}
                    className="min-w-[260px] max-w-[280px] flex-shrink-0 border-border/60 bg-card/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      {photoUrl && (
                        <ImageSoftFade className="h-24 w-24 shrink-0 rounded-2xl border border-border/60">
                          <img src={photoUrl} alt={g.name} loading="lazy" className="h-full w-full object-cover" />
                        </ImageSoftFade>
                      )}
                      <div>
                        <h3 className="font-semibold text-foreground">{g.name}</h3>
                        {g.title && <p className="text-sm text-primary mt-0.5">{g.title}</p>}
                        {g.yearOfGraduation && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Class of {g.yearOfGraduation}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {aboutPage?.additionalContent && aboutPage.additionalContent.length > 0 && (
          <section className="mt-14">
            <div className="prose prose-lg max-w-none prose-p:text-muted-foreground">
              <PortableText value={aboutPage.additionalContent as React.ComponentProps<typeof PortableText>['value']} />
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default About;

