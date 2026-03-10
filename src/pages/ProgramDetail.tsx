import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { getProgramBySlug } from "@/lib/sanityQueries";
import { getIcon } from "@/lib/icons";
import { urlFor } from "@/lib/sanity";
import { getJotformUrl } from "@/lib/jotform";
import { CtaLink } from "@/components/CtaLink";
import { PageSeo } from "@/components/PageSeo";
import { ScheduleBlocks } from "@/components/ScheduleBlocks";

const ProgramDetail = () => {
  const { programSlug } = useParams();
  const { data: program, isLoading } = useQuery({
    queryKey: ["program", programSlug],
    queryFn: () => getProgramBySlug(programSlug ?? ""),
    enabled: !!programSlug,
  });

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Program not found</h1>
        <Link to="/programs"><Button>Back to Programs</Button></Link>
      </div>
    );
  }

  const categoryTitle = program.category?.title ?? "";
  const categorySlug = program.category?.slug ?? "programs";
  const imageUrl = program.mainImage?.asset?.url
    ? urlFor(program.mainImage).width(1200).height(600).fit("max").url()
    : null;

  const infoCards = program.infoCards ?? [];

  const location = program.location;
  const hasLocation = location?.address;
  const locationStr = hasLocation
    ? [location.address, [location.city, location.province].filter(Boolean).join(", "), location.postalCode].filter(Boolean).join("\n")
    : "";

  const scheduleBlocks = program.scheduleBlocks ?? [];
  const formUrl = getJotformUrl(program.jotformUrl ?? program.jotformId);
  const feeStructureUrl = program.feeStructureCtaUrl;
  const feeStructureLabel = program.feeStructureCtaLabel?.trim() || "Request Fee Structure";

  const ProgramCta = () =>
    formUrl ? (
      <CtaLink label="Register Now" to={formUrl} isExternal variant="accent" />
    ) : (
      <Button asChild className="rounded-2xl font-semibold px-10 py-6 text-base shadow-lg hover:shadow-xl">
        <Link to="/programs">View Programs</Link>
      </Button>
    );

  return (
    <main className="py-12 md:py-20">
      <PageSeo title={program.seo?.seoTitle} description={program.seo?.metaDescription} fallbackTitle={`${program.title} | MQI`} />
      <div className="container max-w-4xl">
        <Link to="/programs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Programs
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Hero */}
          <section className="mb-14">
            <span className="text-xs uppercase tracking-wider text-primary font-semibold">{categoryTitle}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-2">{program.title}</h1>
            {program.heroText && <p className="text-lg text-muted-foreground mb-6">{program.heroText}</p>}
            <div className="geometric-divider w-16 mb-8" />
          </section>

          {imageUrl && (
            <div className="rounded-2xl overflow-hidden mb-14 aspect-[2/1] shadow-md">
              <img src={imageUrl} alt={program.title} loading="lazy" className="w-full h-full object-cover" />
            </div>
          )}

          {program.overview ? (
            <section className="mb-14">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{program.overview}</p>
              <div className="flex flex-wrap gap-4">
                <ProgramCta />
              </div>
            </section>
          ) : (
            <section className="mb-14">
              <div className="flex flex-wrap gap-4">
                <ProgramCta />
              </div>
            </section>
          )}

          {infoCards.length > 0 && (
            <section className="mb-14">
              <div className="grid sm:grid-cols-2 gap-4">
                {infoCards.map((card, i) => {
                  const Icon = getIcon(card.icon);
                  return (
                    <Card key={card.title + i} className="border-border/50 shadow-sm">
                      <CardContent className="p-5 flex items-start gap-3">
                        <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">{card.title}</p>
                          <p className="text-sm font-medium text-foreground">{card.text}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          {(program.curriculum?.length ?? 0) > 0 && (
            <section className="mb-14 py-10 px-6 rounded-2xl bg-muted/30 border border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6">Curriculum</h2>
              <ul className="space-y-3">
                {program.curriculum!.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-semibold shrink-0 mt-0.5">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasLocation && locationStr && (
            <section className="mb-14">
              <h2 className="text-2xl font-bold text-foreground mb-4">Location</h2>
              <div className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border/50 shadow-sm">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-muted-foreground whitespace-pre-line">{locationStr}</p>
              </div>
            </section>
          )}

          {scheduleBlocks.length > 0 && (
            <section className="mb-14 py-10 px-6 rounded-2xl bg-muted/20 border border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6">Schedule</h2>
              <ScheduleBlocks blocks={scheduleBlocks} />
              <div className="mt-8">
                <ProgramCta />
              </div>
            </section>
          )}

          {program.specialOffers && program.specialOffers.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-bold text-foreground mb-4">Special Offers</h2>
              <div className="space-y-4">
                {program.specialOffers.map((offer, i) => (
                  <Card key={i} className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">{offer.title}</h3>
                      {offer.description && <p className="text-muted-foreground text-sm">{offer.description}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Final CTA - main conversion focus */}
          <section className="mb-14 pt-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Enroll?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {formUrl ? "Complete the registration form to secure your spot." : "View our programs to get started."}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <ProgramCta />
              {feeStructureUrl && (
                <CtaLink
                  label={feeStructureLabel}
                  to={feeStructureUrl}
                  isExternal
                  variant="accent"
                  compact
                  className="bg-background text-primary border border-primary/40 hover:bg-primary/5"
                />
              )}
            </div>
          </section>

          {program.faqs && program.faqs.length > 0 && (
            <section className="py-10 px-6 rounded-2xl bg-muted/20 border border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {program.faqs.map((faq, i) =>
                  faq?.q ? (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger>{faq.q}</AccordionTrigger>
                      <AccordionContent>{faq.a ?? ""}</AccordionContent>
                    </AccordionItem>
                  ) : null
                )}
              </Accordion>
            </section>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default ProgramDetail;
