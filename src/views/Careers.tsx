import { MotionDiv } from "@/components/Motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { PortableText } from "@portabletext/react";
import type { CareerRole, CareersPage } from "@/lib/sanityQueries";
import { formPagePath, careerDetailPath } from "@/lib/routes";
import { CtaLink } from "@/components/CtaLink";

import { PageTitle } from "@/components/layout/PageTitle";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Careers = ({ careersPageData, roles = [], role = null }: { careersPageData: CareersPage | null; roles?: CareerRole[]; role?: CareerRole | null }) => {
  const pageTitle = careersPageData?.title ?? "Career & Volunteer Opportunities";
  const pageSubtitle = careersPageData?.subtitle ?? "Join our team and make a meaningful impact in the community through Qur'anic education.";
  const whyWorkAtMqi = careersPageData?.whyWorkAtMqi;
  const applyFormTitle = careersPageData?.applyFormTitle ?? "Apply for this Position";
  const introContent = careersPageData?.introContent;
  const applicationPath =
    role?.applicationFormPage?.slug != null ? formPagePath(role.applicationFormPage.slug) : null;

  return (
    <main className="section-soft-radial section-y relative overflow-hidden">
      <DecorativeArabic variant="full" opacity={0.034} />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_62%_at_52%_48%,transparent_20%,hsl(var(--background)/0.78)_100%)]"
        aria-hidden
      />
      <div className="container relative z-10">
        <MotionDiv initial="hidden" animate="visible" variants={fadeUp} className="mb-16">
          <PageTitle title={pageTitle} subtitle={pageSubtitle} headingLevel={role ? "h2" : "h1"} />
          {introContent && introContent.length > 0 && (
            <div className="prose prose-lg mx-auto mt-8 max-w-2xl text-center prose-p:text-muted-foreground">
              <PortableText value={introContent as never} />
            </div>
          )}
        </MotionDiv>

        {whyWorkAtMqi && (
          <section className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Why Work at MQI?</h2>
            <p className="text-muted-foreground whitespace-pre-line text-center">{whyWorkAtMqi}</p>
          </section>
        )}

        {!role ? (
          <div className="mx-auto flex max-w-5xl flex-col gap-8">
            {roles.map((r) => {
              return (
                <Link key={r._id} href={careerDetailPath(r.slug)} className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                  <Card
                    className="h-full cursor-pointer border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
                      <span className={buttonVariants({ variant: "link", className: "p-0 h-auto text-primary font-medium" })}>
                        View Details <span aria-hidden className="ml-1">→</span>
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-4xl">
            <Link href="/careers/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <span aria-hidden>×</span> Back to all positions
            </Link>
            {role && (
              <>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${role.type === "Volunteer" ? "bg-accent/20 text-accent-foreground" : "bg-primary/10 text-primary"}`}>{role.type}</span>
                <h1 className="mt-4 mb-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{role.title}</h1>
                {role.location && <p className="mb-3 text-sm text-muted-foreground">{role.location}</p>}
                <p className="mb-10 text-lg leading-relaxed text-muted-foreground">{role.description}</p>

                {role.positionDetails && (
                  <section className="mb-10">
                    <h3 className="mb-4 text-2xl font-semibold text-foreground">Position Details</h3>
                    <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">{role.positionDetails}</p>
                  </section>
                )}

                {role.responsibilities && role.responsibilities.length > 0 && (
                  <section className="mb-10">
                    <h3 className="mb-4 text-2xl font-semibold text-foreground">Responsibilities</h3>
                    <ul className="space-y-3">
                      {role.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {role.requirements && role.requirements.length > 0 && (
                  <section className="mb-10">
                    <h3 className="mb-4 text-2xl font-semibold text-foreground">Requirements</h3>
                    <ul className="space-y-3">
                      {role.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {role.whatMqiOffers && (
                  <section className="mb-12">
                    <h3 className="mb-4 text-2xl font-semibold text-foreground">What MQI Offers</h3>
                    <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">{role.whatMqiOffers}</p>
                  </section>
                )}

                {/* Apply CTA */}
                <section className="mt-12">
                  <h3 className="mb-3 text-3xl font-semibold text-foreground">{applyFormTitle}</h3>
                  <p className="mb-5 text-base text-muted-foreground">
                    Click the button below to submit your application via our form.
                  </p>
                  {applicationPath ? (
                    <CtaLink label="Apply for this Position" to={applicationPath} isExternal={false} variant="accent" />
                  ) : (
                    <p className="text-muted-foreground text-sm">No application form URL is configured for this role.</p>
                  )}
                </section>
              </>
            )}
          </MotionDiv>
        )}
      </div>
    </main>
  );
};

export default Careers;
