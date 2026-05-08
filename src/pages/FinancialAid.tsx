import type { ComponentProps } from "react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { getFinancialAidPage, getSiteSettings, type CtaButton, type FinancialAidPage } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { resolveCtaButtonTarget } from "@/lib/ctaDestinations";
import { PageSeo } from "@/components/PageSeo";
import { PageTitle } from "@/components/layout/PageTitle";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
import { ImageSoftFade } from "@/components/ui/ImageSoftFade";
import { CtaLink } from "@/components/CtaLink";
import img01 from "@/assets/mqi-images/DSC00394.JPG";
import img02 from "@/assets/mqi-images/DSC00487.JPG";
import img03 from "@/assets/mqi-images/DSC00508.JPG";
import img04 from "@/assets/mqi-images/DSC00518.JPG";
import img05 from "@/assets/mqi-images/DSC00979.JPG";
import img06 from "@/assets/mqi-images/DSC00985.JPG";
import img07 from "@/assets/mqi-images/IMG_7053.jpg";
import img08 from "@/assets/mqi-images/IMG_7107.jpg";
import img09 from "@/assets/mqi-images/IMG_7176.JPG";
import img10 from "@/assets/mqi-images/IMG_7211.JPG";
import img11 from "@/assets/mqi-images/IMG_7312.JPG";
import img12 from "@/assets/mqi-images/IMG_7378.JPG";
import img13 from "@/assets/mqi-images/IMG_7382.JPG";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FALLBACK_IMAGES = [img01, img02, img03, img04, img05, img06, img07, img08, img09, img10, img11, img12, img13];

const DEFAULT_PAGE_TITLE = "Financial Aid";

const DEFAULT_OVERVIEW_TITLE = "Scholarship overview";
const DEFAULT_OVERVIEW_BODY = `The Zayd ibn Thābit Scholarship reflects our belief that financial circumstances should not stand between a sincere learner and sound Qur'anic education. Awards are funded through community generosity and administered with care, discretion, and fairness.

Whether your family is enrolling in weekend enrichment or a structured full-time track, we invite you to explore this pathway and speak with us early in your planning.`;

const DEFAULT_HOW_TITLE = "How it works";
const DEFAULT_STEPS = [
  {
    title: "Request information",
    description: "Reach out to our team with your program interest and timeline.",
  },
  {
    title: "Submit your application",
    description: "Complete the financial assistance application during the published enrollment window. Supporting details are kept confidential.",
  },
  {
    title: "Holistic review",
    description: "A small committee reviews each request with attention to both household circumstances and the student's readiness and commitment.",
  },
  {
    title: "Decision & enrollment",
    description: "You will receive a clear, private response. Awards align with institute policy and may be reviewed periodically.",
  },
];

const DEFAULT_MERIT_TITLE = "Merit and need";
const DEFAULT_MERIT_INTRO =
  "We do not treat financial aid as a single score or checkbox. Need is understood in context—family size, obligations, and seasonal changes—while merit acknowledges effort, character, and steady engagement with learning.";
const DEFAULT_MERIT_BULLETS = [
  "Need is assessed through the confidential materials families provide; only designated staff review this information.",
  "Merit includes attendance, attitude, and progression appropriate to the student's level—not competition with peers.",
  "Awards aim to complement family commitment; we may suggest a personalized contribution plan when helpful.",
  "Previous support does not guarantee the same award in a new term; circumstances and enrollment may change.",
];

const DEFAULT_QUOTE_EYEBROW = "Sadaqah Jariyah";
const DEFAULT_QUOTE = {
  english:
    "When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.",
  reference: "Sahih Muslim",
};

const DEFAULT_CLOSING_TITLE = "Fuel lasting reward";
const DEFAULT_CLOSING_SUBTITLE =
  "Your zakāh and general donations help keep tuition accessible for neighbors who long to learn but face genuine hardship. Supporting this fund is an investment in Qur'anic literacy across generations.";

function mergeClosingButton(raw: CtaButton | null | undefined, fallback: CtaButton): CtaButton {
  if (!raw) return fallback;
  const hasDestination = Boolean(raw.formPage?.slug) || Boolean(raw.to?.trim());
  if (!hasDestination) return fallback;
  return {
    ...fallback,
    ...raw,
    label: raw.label?.trim() || fallback.label,
    variant: raw.variant ?? fallback.variant,
  };
}

function resolveImg(
  img: FinancialAidPage["scholarshipOverviewImage"],
  w: number,
  h: number,
  fallbackUrl: string,
): string {
  if (img && typeof img === "object" && "asset" in img && img.asset) {
    return urlFor(img as never).width(w).height(h).fit("max").url();
  }
  return fallbackUrl;
}

const FinancialAid = () => {
  const { data: page } = useQuery({
    queryKey: ["financialAidPage"],
    queryFn: getFinancialAidPage,
  });
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettings,
  });

  const instituteEmail = siteSettings?.footerEmail ?? "info@miltonquran.org";

  const img = (cms: FinancialAidPage["scholarshipOverviewImage"], i: number, w: number, h: number) =>
    resolveImg(cms, w, h, FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]);

  const pageTitle = page?.title?.trim() || DEFAULT_PAGE_TITLE;
  const scholarshipOverviewTitle = page?.scholarshipOverviewTitle ?? DEFAULT_OVERVIEW_TITLE;
  const scholarshipOverviewBody = page?.scholarshipOverviewBody ?? DEFAULT_OVERVIEW_BODY;
  const howItWorksTitle = page?.howItWorksTitle ?? DEFAULT_HOW_TITLE;
  const howItWorksSteps = page?.howItWorksSteps?.length ? page.howItWorksSteps : DEFAULT_STEPS;
  const meritNeedTitle = page?.meritNeedTitle ?? DEFAULT_MERIT_TITLE;
  const meritNeedIntro = page?.meritNeedIntro ?? DEFAULT_MERIT_INTRO;
  const meritNeedBullets = page?.meritNeedBullets?.length ? page.meritNeedBullets : DEFAULT_MERIT_BULLETS;
  const quoteEyebrow = page?.quoteEyebrow ?? DEFAULT_QUOTE_EYEBROW;
  const quote =
    page?.quote && (page.quote.english?.trim() || page.quote.arabic?.trim()) ? page.quote : DEFAULT_QUOTE;
  const closingCtaTitle = page?.closingCtaTitle ?? DEFAULT_CLOSING_TITLE;
  const closingCtaSubtitle = page?.closingCtaSubtitle ?? DEFAULT_CLOSING_SUBTITLE;

  const defaultApply: CtaButton = {
    label: "Apply",
    to: `mailto:${instituteEmail}`,
    isExternal: true,
    variant: "primary",
  };
  const defaultDonate: CtaButton = {
    label: "Donate",
    to: "/donate",
    variant: "accent",
  };

  const applyCta = mergeClosingButton(page?.closingApplyCta ?? undefined, defaultApply);
  const donateCta = mergeClosingButton(page?.closingDonateCta ?? undefined, defaultDonate);

  const seo = page?.seo;

  const closingFallbackPhoto = img09;

  const applyTarget = resolveCtaButtonTarget(applyCta);
  const donateTarget = resolveCtaButtonTarget(donateCta);

  return (
    <main className="section-soft-radial relative overflow-hidden pattern-stars pb-0">
      <DecorativeArabic variant="full" opacity={0.034} />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_52%_50%,transparent_20%,hsl(var(--background)/0.76)_100%)]"
        aria-hidden
      />
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle} | MQI`} />

      <PageTitle visuallyHidden title={pageTitle} />

      <div className="section-y container relative z-10 space-y-20 md:space-y-28">
        {/* Overview */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <PageTitle
            headingLevel="h2"
            title={scholarshipOverviewTitle}
            subtitle="We partner with families to make meaningful Qur'anic learning accessible with dignity, clarity, and care."
          />
          <div className="grid min-w-0 gap-8 md:grid-cols-2 md:items-start md:gap-10">
            <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">{scholarshipOverviewBody}</p>
            <ImageSoftFade className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/35 md:mx-0 md:max-w-none">
              <img
                src={img(page?.scholarshipOverviewImage, 1, 960, 720)}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </ImageSoftFade>
          </div>
          <div className="mt-8 flex justify-start">
            <CtaLink label={applyCta.label} to={applyTarget.to} isExternal={applyTarget.isExternal} variant={applyCta.variant ?? "primary"} />
          </div>
        </motion.section>

        {/* How it works */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="heading-section-sm mb-4">{howItWorksTitle}</h2>
          <div className="geometric-divider mb-8 w-16" />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <ol className="space-y-6">
              {howItWorksSteps.map((step, i) => (
                <li key={step.title ?? i} className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/35 bg-primary/10 text-sm font-bold text-primary"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    {step.description && (
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">{step.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <ImageSoftFade className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/35 lg:aspect-auto lg:min-h-[280px]">
              <img src={img(page?.howItWorksImage, 2, 960, 720)} alt="" className="h-full w-full object-cover" loading="lazy" />
            </ImageSoftFade>
          </div>
          <div className="mt-8 flex justify-start">
            <CtaLink
              label={donateCta.label}
              to={donateTarget.to}
              isExternal={donateTarget.isExternal}
              variant={donateCta.variant ?? "accent"}
            />
          </div>
        </motion.section>

        {/* Merit & need — larger image */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="heading-section-sm mb-4">{meritNeedTitle}</h2>
          <div className="geometric-divider mb-6 w-16" />
          <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <ImageSoftFade className="relative order-2 aspect-[16/10] min-h-[260px] overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/35 sm:min-h-[300px] lg:order-1 lg:col-span-7 lg:aspect-auto lg:min-h-[min(62vh,560px)] lg:max-h-[720px]">
              <img src={img(page?.meritNeedImage, 3, 1600, 1000)} alt="" className="h-full w-full object-cover" loading="lazy" />
            </ImageSoftFade>
            <div className="order-1 lg:order-2 lg:col-span-5">
              <p className="mb-6 whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">{meritNeedIntro}</p>
              <ul className="space-y-3">
                {meritNeedBullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex justify-start">
            <CtaLink
              label="Ask about eligibility"
              to={`mailto:${instituteEmail}`}
              isExternal
              variant="primary"
            />
          </div>
        </motion.section>

        {/* Hadith / quote */}
        {(quote.arabic || quote.english) && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 md:p-10">
              <div className="gold-accent-radial pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl" aria-hidden />
              <DecorativeArabic variant="corner" opacity={0.05} />
              <p className="relative z-10 mb-4 text-center text-xs font-medium uppercase tracking-[0.22em] text-primary">{quoteEyebrow}</p>
              <blockquote className="relative z-10 mx-auto max-w-3xl space-y-4 text-center">
                {quote.arabic && (
                  <p
                    className="text-2xl font-arabic leading-loose md:text-3xl"
                    dir="rtl"
                    style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
                  >
                    {quote.arabic}
                  </p>
                )}
                {quote.english && <p className="text-lg italic leading-relaxed text-muted-foreground md:text-xl">&ldquo;{quote.english}&rdquo;</p>}
                {quote.reference && (
                  <footer className="text-sm text-muted-foreground/85 md:text-base">— {quote.reference}</footer>
                )}
              </blockquote>
            </div>
          </motion.section>
        )}

        {page?.additionalContent && page.additionalContent.length > 0 && (
          <section>
            <div className="prose prose-lg max-w-none prose-p:text-muted-foreground">
              <PortableText value={page.additionalContent as ComponentProps<typeof PortableText>["value"]} />
            </div>
          </section>
        )}
      </div>

      {/* Closing CTA — full viewport width (matches homepage closing band) */}
      <section className="section-y relative mt-16 min-h-[260px] w-full overflow-hidden bg-secondary pattern-dark text-secondary-foreground md:mt-20">
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
              src={resolveImg(page?.closingCtaImage, 1600, 900, closingFallbackPhoto)}
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
          <h2 className="heading-section-on-dark mx-auto max-w-4xl leading-tight">{closingCtaTitle}</h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-secondary-foreground/85 md:text-xl md:leading-relaxed">
            {closingCtaSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-5 pt-4">
            <CtaLink
              label={applyCta.label}
              to={applyTarget.to}
              isExternal={applyTarget.isExternal}
              variant={applyCta.variant ?? "primary"}
            />
            <CtaLink
              label={donateCta.label}
              to={donateTarget.to}
              isExternal={donateTarget.isExternal}
              variant={donateCta.variant ?? "accent"}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default FinancialAid;
