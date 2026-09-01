"use client";

import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";

import { PageTitle } from "@/components/layout/PageTitle";
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
 * Shared layout for dedicated form routes: page title stack, optional intro, embedded iframe.
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
    <main className="section-soft-radial relative overflow-hidden py-16 md:py-24 lg:py-28">
      <DecorativeArabic variant="full" opacity={0.038} />
      <div className="container relative z-10 w-full max-w-none px-3 sm:px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-10 md:mb-12">
          <PageTitle title={title} />
        </motion.div>

        {intro && intro.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="prose prose-lg prose-editorial mb-10 max-w-none text-center prose-p:text-muted-foreground md:text-left"
          >
            <PortableText value={intro as never} />
          </motion.div>
        )}

        {embedUrl ? (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-full">
            <iframe
              title={title}
              src={embedUrl}
              className="block min-h-[85vh] w-full border-0"
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
