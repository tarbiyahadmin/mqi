import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { getDonatePage } from "@/lib/sanityQueries";
import { CtaLink } from "@/components/CtaLink";
import { PageSeo } from "@/components/PageSeo";
import { getJotformUrl } from "@/lib/jotform";
import { formPagePath } from "@/lib/routes";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";

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
  const donatePath =
    donatePageData?.donateFormPage?.slug != null
      ? formPagePath(donatePageData.donateFormPage.slug)
      : null;
  const sponsorPath =
    donatePageData?.sponsorFormPage?.slug != null
      ? formPagePath(donatePageData.sponsorFormPage.slug)
      : null;
  const legacyDonateUrl = getJotformUrl(donatePageData?.jotformDonateUrl);
  const legacySponsorUrl = getJotformUrl(donatePageData?.jotformSponsorStudentUrl);
  const donateUrl = donatePath ?? legacyDonateUrl;
  const sponsorUrl = sponsorPath ?? legacySponsorUrl;
  const donateIsExternal = !donatePath && !!legacyDonateUrl;
  const sponsorIsExternal = !sponsorPath && !!legacySponsorUrl;
  const donateCtaLabel = donatePageData?.donateCtaLabel ?? "Make a Donation";
  const sponsorCtaLabel = donatePageData?.sponsorCtaLabel ?? "Sponsor a Student";
  const seo = donatePageData?.seo;

  return (
    <main className="section-soft-radial section-y relative overflow-hidden">
      <DecorativeArabic variant="full" opacity={0.034} />
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle} | MQI`} />
      <div className="container relative z-10 max-w-4xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-14 text-center md:mb-16">
          <h1 className="heading-section mb-6">{pageTitle}</h1>
          <div className="geometric-divider mx-auto mb-6 w-28" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
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
              <CtaLink label={donateCtaLabel} to={donateUrl} isExternal={donateIsExternal} variant="primary" />
            )}
            {sponsorUrl && (
              <CtaLink label={sponsorCtaLabel} to={sponsorUrl} isExternal={sponsorIsExternal} variant="accent" />
            )}
          </div>

          {donatePageData?.additionalContent && donatePageData.additionalContent.length > 0 && (
            <div className="prose prose-lg prose-editorial mt-12 max-w-none prose-p:text-muted-foreground">
              <PortableText value={donatePageData.additionalContent} />
            </div>
          )}
        </motion.section>
      </div>
    </main>
  );
};

export default Donate;
