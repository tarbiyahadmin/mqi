import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { getCareerRoles, getCareersPage } from "@/lib/sanityQueries";
import { getIcon } from "@/lib/icons";
import { getJotformUrl } from "@/lib/jotform";
import { CtaLink } from "@/components/CtaLink";
import { PageSeo } from "@/components/PageSeo";

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
  const formUrl = role ? getJotformUrl(role.jotformLink) : null;
  const seo = careersPageData?.seo;

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

        {whyWorkAtMqi && (
          <section className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Why Work at MQI?</h2>
            <p className="text-muted-foreground whitespace-pre-line text-center">{whyWorkAtMqi}</p>
          </section>
        )}

        {!selectedRole ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {roles.map((r, i) => {
              const Icon = getIcon(r.icon);
              return (
                <div key={r._id}>
                  <Card
                    className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:-translate-y-1"
                    onClick={() => setSelectedRole(r._id)}
                  >
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            r.type === "Volunteer" ? "bg-accent/20 text-accent-foreground" : "bg-primary/10 text-primary"
                          }`}
                        >
                          {r.type}
                        </span>
                        {r.location && <span className="text-xs text-muted-foreground">{r.location}</span>}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{r.title}</h3>
                      <p className="text-sm text-muted-foreground">{r.description}</p>
                      <Button variant="link" className="p-0 h-auto text-primary font-medium">
                        View Details <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
            <button onClick={() => setSelectedRole(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <X className="h-4 w-4" /> Back to all positions
            </button>
            {role && (
              <>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${role.type === "Volunteer" ? "bg-accent/20 text-accent-foreground" : "bg-primary/10 text-primary"}`}>{role.type}</span>
                <h2 className="text-3xl font-bold text-foreground mt-3 mb-2">{role.title}</h2>
                <p className="text-muted-foreground mb-6">{role.description}</p>

                {role.requirements && role.requirements.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Requirements</h3>
                    <ul className="space-y-2 mb-10">
                      {role.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Apply CTA */}
                <section className="mt-10">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">{applyFormTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click the button below to submit your application via our form.
                  </p>
                  {formUrl ? (
                    <CtaLink label="Apply for this Position" to={formUrl} isExternal variant="accent" />
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
