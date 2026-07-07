import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getBookMeetPage, type BookMeetPage } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { resolveCtaButtonTarget } from "@/lib/ctaDestinations";
import { PageSeo } from "@/components/PageSeo";
import { PageTitle } from "@/components/layout/PageTitle";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
import { ImageSoftFade } from "@/components/ui/ImageSoftFade";
import { CtaLink } from "@/components/CtaLink";
import fullTimeFallback from "@/assets/mqi-images/DSC00985.JPG";
import partTimeFallback from "@/assets/mqi-images/IMG_7176.JPG";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const DEFAULT_PAGE_TITLE = "Book A Meet";
const DEFAULT_PAGE_SUBTITLE =
  "Schedule a conversation with our team to learn more about our programs and find the right fit for you or your family.";

const DEFAULT_FULL_TIME_TITLE = "Full-Time";
const DEFAULT_FULL_TIME_BODY = `Our full-time track is designed for students who can dedicate structured weekday hours to Qur'anic learning, memorization, and Islamic studies. Meet with us to discuss placement, schedule, and how we support steady progress in a nurturing environment.

We will walk you through enrollment steps, answer questions about curriculum and expectations, and help you plan a pathway that honors both your goals and your family's routine.`;

const DEFAULT_PART_TIME_TITLE = "Part-Time";
const DEFAULT_PART_TIME_BODY = `Part-time options suit learners balancing school, work, or other commitments while still pursuing meaningful Qur'anic education. Whether weekend enrichment or evening sessions, we will help you explore what is available.

Book a meet to review schedules, discuss level placement, and learn how part-time students stay connected to teachers and community throughout the term.`;

type BookingSectionProps = {
  title: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  cta: BookMeetPage["fullTimeCta"];
};

function resolveImg(
  img: BookMeetPage["fullTimeImage"],
  w: number,
  h: number,
  fallbackUrl: string,
): string {
  if (img && typeof img === "object" && "asset" in img && img.asset) {
    return urlFor(img as never).width(w).height(h).fit("max").url();
  }
  return fallbackUrl;
}

function BookingSection({ title, body, imageUrl, imageAlt, cta }: BookingSectionProps) {
  const ctaTarget = cta ? resolveCtaButtonTarget(cta) : null;

  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
      <h2 className="heading-section-sm mb-4">{title}</h2>
      <div className="geometric-divider mb-8 w-16" />
      <div className="grid min-w-0 gap-8 md:grid-cols-2 md:items-start md:gap-10">
        <div className="space-y-6">
          <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">{body}</p>
          {cta && ctaTarget && (
            <div className="flex justify-start">
              <CtaLink label={cta.label} to={ctaTarget} variant={cta.variant ?? "primary"} />
            </div>
          )}
        </div>
        <ImageSoftFade className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/35 md:mx-0 md:max-w-none">
          <img src={imageUrl} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
        </ImageSoftFade>
      </div>
    </motion.section>
  );
}

const BookMeet = () => {
  const { data: page } = useQuery({
    queryKey: ["bookMeetPage"],
    queryFn: getBookMeetPage,
  });

  const pageTitle = page?.title?.trim() || DEFAULT_PAGE_TITLE;
  const pageSubtitle = page?.subtitle?.trim() || DEFAULT_PAGE_SUBTITLE;

  const fullTimeTitle = page?.fullTimeTitle ?? DEFAULT_FULL_TIME_TITLE;
  const fullTimeBody = page?.fullTimeBody ?? DEFAULT_FULL_TIME_BODY;
  const fullTimeImageUrl = resolveImg(page?.fullTimeImage, 960, 720, fullTimeFallback);

  const partTimeTitle = page?.partTimeTitle ?? DEFAULT_PART_TIME_TITLE;
  const partTimeBody = page?.partTimeBody ?? DEFAULT_PART_TIME_BODY;
  const partTimeImageUrl = resolveImg(page?.partTimeImage, 960, 720, partTimeFallback);

  const seo = page?.seo;

  return (
    <main className="section-soft-radial relative overflow-hidden pattern-stars">
      <DecorativeArabic variant="full" opacity={0.034} />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_52%_50%,transparent_20%,hsl(var(--background)/0.76)_100%)]"
        aria-hidden
      />
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${pageTitle} | MQI`} />

      <div className="section-y container relative z-10 space-y-20 md:space-y-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <PageTitle title={pageTitle} subtitle={pageSubtitle} />
        </motion.div>

        <BookingSection
          title={fullTimeTitle}
          body={fullTimeBody}
          imageUrl={fullTimeImageUrl}
          imageAlt={`${fullTimeTitle} program at Milton Quran Institute`}
          cta={page?.fullTimeCta}
        />

        <BookingSection
          title={partTimeTitle}
          body={partTimeBody}
          imageUrl={partTimeImageUrl}
          imageAlt={`${partTimeTitle} program at Milton Quran Institute`}
          cta={page?.partTimeCta}
        />
      </div>
    </main>
  );
};

export default BookMeet;
