"use client";

import { motion } from "framer-motion";
import { PageTitle } from "@/components/layout/PageTitle";
import { DecorativeArabic } from "@/components/layout/DecorativeArabic";
import type { ContactPage } from "@/lib/sanityQueries";
import { resolveEmailEntries, resolveMapsLinkUrl } from "@/lib/contactEmails";
import { MQI_NAP, ORG_NAME } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export interface ContactViewProps {
  page: ContactPage | null;
}

export function ContactView({ page }: ContactViewProps) {
  const pageTitle = page?.title ?? "Contact Us";
  const pageSubtitle =
    page?.subtitle ?? "Reach out to Milton Quran Institute with questions about programs, enrollment, or visiting our campus.";
  const intro =
    page?.intro ??
    "We welcome families and learners at every stage. Call, email, or visit us during office hours and our team will be happy to help.";
  const contactSectionTitle = page?.contactSectionTitle ?? ORG_NAME;
  const address = page?.address?.trim() || MQI_NAP.address;
  const phone = page?.phone?.trim() || MQI_NAP.phone;
  const contactEmails = resolveEmailEntries(page?.contactEmails);
  const visitSectionTitle = page?.visitSectionTitle ?? "Visit & Hours";
  const officeHours = page?.officeHours ?? "Monday – Friday, 9:00 AM – 5:00 PM";
  const mapNote = page?.mapNote ?? "Located in Milton, Ontario. Free parking available on site.";
  const mapsLinkLabel = page?.mapsLinkLabel ?? "Open in Google Maps →";
  const mapsLinkUrl = resolveMapsLinkUrl(page?.mapsLinkUrl, address);

  return (
    <main className="section-soft-radial section-y relative overflow-hidden">
      <DecorativeArabic variant="full" opacity={0.032} />
      <div className="container relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto mb-12 max-w-3xl md:mb-16">
          <PageTitle title={pageTitle} subtitle={pageSubtitle} />
          {intro && <p className="mt-6 text-center text-base leading-relaxed text-muted-foreground md:text-left md:text-lg">{intro}</p>}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2"
        >
          <section className="rounded-2xl border border-border/60 bg-card/80 p-8 shadow-sm">
            <h2 className="heading-section-sm mb-4">{contactSectionTitle}</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <span className="mb-1 block text-sm font-medium uppercase tracking-wide text-foreground/80">Address</span>
                <address className="not-italic leading-relaxed">{address}</address>
              </li>
              <li>
                <span className="mb-1 block text-sm font-medium uppercase tracking-wide text-foreground/80">Phone</span>
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-primary">
                  {phone}
                </a>
              </li>
              {contactEmails.map((entry) => (
                <li key={`${entry.title}-${entry.email}`}>
                  <span className="mb-1 block text-sm font-medium uppercase tracking-wide text-foreground/80">{entry.title}</span>
                  <a href={`mailto:${entry.email}`} className="hover:text-primary">
                    {entry.email}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border/60 bg-card/80 p-8 shadow-sm">
            <h2 className="heading-section-sm mb-4">{visitSectionTitle}</h2>
            <div className="space-y-4 text-muted-foreground">
              {officeHours && (
                <div>
                  <span className="mb-1 block text-sm font-medium uppercase tracking-wide text-foreground/80">Office Hours</span>
                  <p className="whitespace-pre-line leading-relaxed">{officeHours}</p>
                </div>
              )}
              {mapNote && (
                <div>
                  <span className="mb-1 block text-sm font-medium uppercase tracking-wide text-foreground/80">Directions</span>
                  <p className="leading-relaxed">{mapNote}</p>
                </div>
              )}
              <a
                href={mapsLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm font-medium text-primary hover:underline"
              >
                {mapsLinkLabel}
              </a>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}

export default ContactView;
