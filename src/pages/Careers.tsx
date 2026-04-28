import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { getCareerRoles, getCareersPage } from "@/lib/sanityQueries";
import { getJotformUrl } from "@/lib/jotform";
import { formPagePath } from "@/lib/routes";
import { CtaLink } from "@/components/CtaLink";
import { PageSeo } from "@/components/PageSeo";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Careers = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const { data: careersPageData } = useQuery({
    queryKey: ["careersPage"],
    queryFn: getCareersPage,
  });
  const { data: roles = [] } = useQuery({
    queryKey: ["careerRoles"],
    queryFn: getCareerRoles,
  });

  const role = selectedRole ? roles.find((r) => r._id === selectedRole) : null;
  const pageTitle = careersPageData?.title ?? "Career & Volunteer Opportunities";
  const pageSubtitle = careersPageData?.subtitle ?? "Join our team and make a meaningful impact in the community through Qur'anic education.";
  const whyWorkAtMqi = careersPageData?.whyWorkAtMqi;
  const applyFormTitle = careersPageData?.applyFormTitle ?? "Apply for this Position";
  const introContent = careersPageData?.introContent;
  const applicationPath =
    role?.applicationFormPage?.slug != null ? formPagePath(role.applicationFormPage.slug) : null;
  const legacyApplyUrl = role ? getJotformUrl(role.jotformLink) : null;
  const applyTo = applicationPath ?? legacyApplyUrl;
  const applyIsExternal = !applicationPath && !!legacyApplyUrl;
  const seo = careersPageData?.seo;

  return (
    <main className="section-soft-radial section-y relative overflow-hidden">
      <DecorativeArabic variant="full" opacity={0.034} />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_62%_at_52%_48%,transparent_20%,hsl(var(--background)/0.78)_100%)]"
        aria-hidden
      />
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle} | MQI`} />
      <div className="container relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <h1 className="heading-section mb-6">{pageTitle}</h1>
          <div className="geometric-divider mx-auto mb-6 w-28" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
            {pageSubtitle}
          </p>
          {introContent && introContent.length > 0 && (
            <div className="prose prose-lg max-w-2xl mx-auto mt-6 text-center prose-p:text-muted-foreground">
              <PortableText value={introContent} />
            </div>
          )}
        </motion.div>

        {whyWorkAtMqi && (
          <section className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Why Work at MQI?</h2>
            <p className="text-muted-foreground whitespace-pre-line text-center">{whyWorkAtMqi}</p>
          </section>
        )}

        {!selectedRole ? (
          <div className="mx-auto flex max-w-5xl flex-col gap-8">
            {roles.map((r, i) => {
              return (
                <div key={r._id}>
                  <Card
                    className="h-full cursor-pointer border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => setSelectedRole(r._id)}
                  >
                    <CardContent className="space-y-5 p-8 md:p-10">
                      <div className="flex items-center justify-between">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            r.type === "Volunteer" ? "bg-accent/20 text-accent-foreground" : "bg-primary/10 text-primary"
                          }`}
                        >
                          {r.type}
                        </span>
                        {r.location && <span className="text-sm text-muted-foreground">{r.location}</span>}
                      </div>
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{r.title}</h3>
                      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{r.description}</p>
                      <Button variant="link" className="p-0 h-auto text-primary font-medium">
                        View Details <span aria-hidden className="ml-1">→</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-4xl">
            <button onClick={() => setSelectedRole(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <span aria-hidden>×</span> Back to all positions
            </button>
            {role && (
              <>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${role.type === "Volunteer" ? "bg-accent/20 text-accent-foreground" : "bg-primary/10 text-primary"}`}>{role.type}</span>
                <h2 className="mt-4 mb-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{role.title}</h2>
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{role.description}</p>

                {role.requirements && role.requirements.length > 0 && (
                  <>
                    <h3 className="mb-4 text-2xl font-semibold text-foreground">Requirements</h3>
                    <ul className="mb-12 space-y-3">
                      {role.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Apply CTA */}
                <section className="mt-12">
                  <h3 className="mb-3 text-3xl font-semibold text-foreground">{applyFormTitle}</h3>
                  <p className="mb-5 text-base text-muted-foreground">
                    Click the button below to submit your application via our form.
                  </p>
                  {applyTo ? (
                    <CtaLink label="Apply for this Position" to={applyTo} isExternal={applyIsExternal} variant="accent" />
                  ) : (
                    <p className="text-muted-foreground text-sm">No application form URL is configured for this role.</p>
                  )}
                </section>
              </>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Careers;
