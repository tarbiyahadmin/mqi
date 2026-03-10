import { useRef } from "react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { PageSeo } from "@/components/PageSeo";
import { getAboutPage, getHomepage, type AboutTeacher, type AboutGraduate } from "@/lib/sanityQueries";
import { getIcon } from "@/lib/icons";
import { urlFor } from "@/lib/sanity";

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

  const heroImageUrl =
    aboutPage?.heroImage?.asset?.url && urlFor(aboutPage.heroImage).width(1200).height(800).fit("max").url();

  const seo = aboutPage?.seo;
  const teachers = (aboutPage?.teachers ?? []) as AboutTeacher[];
  const graduates = (aboutPage?.graduates ?? []) as AboutGraduate[];

  const scrollRow = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const delta = direction === "left" ? -scrollByAmount : scrollByAmount;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  /* Section styling: first two plain text (full width), rest card-style */
  const sectionStyles = (i: number) => (i < 2 ? "w-full" : "w-full py-8 md:py-10 rounded-2xl bg-muted/20 px-6 md:px-10 border border-border/40");

  return (
    <main className="py-16 md:py-24 pattern-stars">
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle} | MQI`} />

      {/* Hero - same container as rest of site */}
      <section className="mb-16 md:mb-20">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-10 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">{pageTitle}</h1>
            <div className="geometric-divider w-24 mx-auto mb-4" />
            {pageSubtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {pageSubtitle}
              </p>
            )}
          </motion.div>
          {heroImageUrl && (
            <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-border/50 aspect-[2/1] max-h-[480px] md:max-h-[520px]">
              <img
                src={heroImageUrl}
                alt="Milton Quran Institute"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <div className="container">

        {sections.length > 0 && (
          <div className="space-y-20 md:space-y-24 mb-20 md:mb-28">
            {sections.map((s, i) => (
              <motion.section key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={sectionStyles(i)}>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">{s.title}</h2>
                <div className="geometric-divider w-16 mb-6" />
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base md:text-lg">{s.content}</p>
              </motion.section>
            ))}
          </div>
        )}

        {/* Testimonials - minimal layout: quote + attribution */}
        {testimonials.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 md:mb-28">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight">{testimonialsSectionTitle}</h2>
            <div className="geometric-divider w-16 mb-10" />
            <div className="space-y-12 md:space-y-16 w-full">
              {testimonials.map((t, i) => (
                <blockquote key={t.name ?? i} className="border-l-4 border-primary/40 pl-6 md:pl-8 py-2">
                  <p className="text-muted-foreground text-lg md:text-xl leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 text-foreground font-semibold">{t.name}{t.role ? <span className="text-primary font-normal text-base ml-2">— {t.role}</span> : null}</footer>
                </blockquote>
              ))}
            </div>
          </motion.section>
        )}

        {/* Our Values - Cards */}
        {ourValuesCards.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 md:mb-28">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight">Our Values</h2>
            <div className="geometric-divider w-16 mb-10" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 content-max mx-auto">
              {ourValuesCards.map((v, i) => {
                const Icon = getIcon(v.icon);
                return (
                  <Card key={v.title + i} className="border-border/50 bg-card/80">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                          {v.description && <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Teachers */}
        {teachers.length > 0 && (
          <section className="mb-20 md:mb-28">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">Our Teachers</h2>
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
                        <div className="w-28 h-28 rounded-full overflow-hidden border border-border/60">
                          <img
                            src={photoUrl}
                            alt={t.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">Our Graduates</h2>
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
                        <div className="w-24 h-24 rounded-full overflow-hidden border border-border/60">
                          <img
                            src={photoUrl}
                            alt={g.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
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

