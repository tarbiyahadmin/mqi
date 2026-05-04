import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { PageSeo } from "@/components/PageSeo";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
import { getJotformEmbedUrl } from "@/lib/jotform";
import type { SeoData } from "@/lib/sanityQueries";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export interface FormPageShellProps {
  title: string;
  intro?: unknown[];
  /** Raw Jotform URL or ID from CMS */
  embedSource?: string;
  seo?: SeoData | null;
  missingEmbedMessage?: string;
}

/**
 * Shared layout for dedicated form routes: hero-style title, optional intro, embedded iframe.
 * Matches spacing and patterns used on Donate and Template pages.
 */
export function FormPageShell({
  title,
  intro,
  embedSource,
  seo,
  missingEmbedMessage = "This form is not available right now. Please try again later or contact us.",
}: FormPageShellProps) {
  const embedUrl = getJotformEmbedUrl(embedSource);

  return (
    <main className="section-soft-radial relative overflow-hidden py-16 md:py-28 lg:py-32">
      <DecorativeArabic variant="full" opacity={0.038} />
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} fallbackTitle={`${title} | MQI`} />
      <div className="container relative z-10 w-full max-w-6xl px-3 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10 text-center md:mb-12"
        >
          <h1 className="heading-section mb-4">{title}</h1>
          <div className="geometric-divider mx-auto w-28" />
        </motion.div>

        {intro && intro.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="prose prose-lg prose-editorial mb-10 max-w-none text-center prose-p:text-muted-foreground md:text-left"
          >
            <PortableText value={intro} />
          </motion.div>
        )}

        {embedUrl ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-border/50 bg-muted/20 shadow-md"
          >
            <iframe
              title={title}
              src={embedUrl}
              className="block min-h-[760px] w-full border-0 sm:min-h-[800px] lg:min-h-[880px]"
              loading="lazy"
              allow="geolocation; microphone; camera; fullscreen"
            />
          </motion.div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">{missingEmbedMessage}</p>
        )}
      </div>
    </main>
  );
}
