import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { getDonatePage } from "@/lib/sanityQueries";
import { CtaLink } from "@/components/CtaLink";
import { PageSeo } from "@/components/PageSeo";
import { getJotformUrl } from "@/lib/jotform";

const defaultTrustBullets = [
  { title: "Tax Deductible", desc: "All donations are eligible for tax receipts." },
  { title: "100% Transparent", desc: "Funds go directly to programs and operations." },
  { title: "Secure Processing", desc: "Your information is encrypted and protected." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Donate = () => {
  const { data: donatePageData } = useQuery({
    queryKey: ["donatePage"],
    queryFn: getDonatePage,
  });

  const pageTitle = donatePageData?.title ?? "Support Our Mission";
  const pageSubtitle = donatePageData?.subtitle ?? "Your generous contribution helps us provide quality Qur'anic education and maintain our programs for the community.";
  const hadith = donatePageData?.hadith;
  const trustBullets = (donatePageData?.trustBullets?.length ? donatePageData.trustBullets : defaultTrustBullets) as Array<{ title?: string; desc?: string }>;
  const howDonationHelps = donatePageData?.howDonationHelps ?? [];
  const studentSponsorship = donatePageData?.studentSponsorship;
  const donateUrl = getJotformUrl(donatePageData?.jotformDonateUrl);
  const sponsorUrl = getJotformUrl(donatePageData?.jotformSponsorStudentUrl);
  const donateCtaLabel = donatePageData?.donateCtaLabel ?? "Make a Donation";
  const sponsorCtaLabel = donatePageData?.sponsorCtaLabel ?? "Sponsor a Student";
  const seo = donatePageData?.seo;

  return (
    <main className="py-20 md:py-28">
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle} | MQI`} />
      <div className="container max-w-3xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{pageTitle}</h1>
          <div className="geometric-divider w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {pageSubtitle}
          </p>
        </motion.div>

        {/* Hadith */}
        {hadith && (hadith.arabic || hadith.english) && (
          <blockquote className="mb-12 p-6 rounded-2xl border border-border/50 bg-card/50 space-y-3">
            {hadith.arabic && (
              <p className="text-2xl md:text-3xl font-arabic leading-loose" dir="rtl" style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}>
                {hadith.arabic}
              </p>
            )}
            {hadith.english && <p className="text-muted-foreground italic">"{hadith.english}"</p>}
            {hadith.reference && <footer className="text-muted-foreground/80 text-sm">— {hadith.reference}</footer>}
          </blockquote>
        )}

        {/* Trust section */}
        {trustBullets.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {trustBullets.map((item, i) => (
              <div key={item.title ?? `trust-${i}`} className="text-center p-4">
                <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* How Your Donation Helps */}
        {howDonationHelps.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">How Your Donation Helps</h2>
            <ul className="space-y-2">
              {howDonationHelps.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Student Sponsorship */}
        {studentSponsorship && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Sponsor a Student</h2>
            <p className="text-muted-foreground whitespace-pre-line">{studentSponsorship}</p>
          </section>
        )}

        {/* Two clear CTAs */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-8">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {donateUrl && (
              <CtaLink label={donateCtaLabel} to={donateUrl} isExternal variant="primary" />
            )}
            {sponsorUrl && (
              <CtaLink label={sponsorCtaLabel} to={sponsorUrl} isExternal variant="accent" />
            )}
          </div>

          {donatePageData?.additionalContent && donatePageData.additionalContent.length > 0 && (
            <div className="mt-12 prose prose-lg max-w-none prose-p:text-muted-foreground">
              <PortableText value={donatePageData.additionalContent} />
            </div>
          )}
        </motion.section>
      </div>
    </main>
  );
};

export default Donate;
