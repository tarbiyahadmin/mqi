"use client";

import { usePathname } from "@/lib/navigation";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import type { NavLink as NavLinkFields } from "@/lib/sanityQueries";
import { ConfigurableNavLink } from "@/components/layout/ConfigurableNavLink";
import { resolveEmailEntries } from "@/lib/contactEmails";
import { MQI_NAP, ORG_NAME } from "@/lib/site";

const defaultQuickLinks = [
  { label: "Programs", to: "/programs" },
  { label: "Career & Volunteer", to: "/careers" },
  { label: "Blog", to: "/blog" },
  { label: "Donate", to: "/donate" },
];

const defaultProgramLinks = [
  { label: "Courses", to: "/programs" },
  { label: "Full Time School", to: "/programs" },
  { label: "Summer Programs", to: "/programs" },
];

function normalizeInternalPath(to: string): string {
  if (!to || /^https?:\/\//i.test(to) || to.startsWith("mailto:") || to.startsWith("tel:")) return to;
  return to.startsWith("/") ? to : `/${to}`;
}

const Footer = () => {
  const pathname = usePathname();
  const siteSettings = useSiteSettings();

  const tagline =
    siteSettings?.footerTagline ??
    "Where your child’s Quranic journey begins and flourishes. Milton’s first and most trusted Islamic educational institute.";
  const rawQuickLinks = (siteSettings?.footerQuickLinks?.length ? siteSettings.footerQuickLinks : defaultQuickLinks) as NavLinkFields[];
  const quickLinks = rawQuickLinks.map((link) => ({ ...link, to: normalizeInternalPath(link.to) }));
  const programLinks = (
    (siteSettings?.footerProgramLinks?.length ? siteSettings.footerProgramLinks : defaultProgramLinks) as NavLinkFields[]
  ).map((link) => ({ ...link, to: normalizeInternalPath(link.to) }));

  const address = siteSettings?.footerAddress?.trim() || MQI_NAP.address;
  const phone = siteSettings?.footerPhone?.trim() || MQI_NAP.phone;
  const footerEmails = resolveEmailEntries(siteSettings?.footerEmails, siteSettings?.footerEmail);
  const socialLinks = siteSettings?.socialLinks ?? [];
  const copyright =
    siteSettings?.footerCopyright ?? `© ${new Date().getFullYear()} ${ORG_NAME}. All rights reserved.`;
  const copyrightText = copyright.includes("{year}")
    ? copyright.replace("{year}", String(new Date().getFullYear()))
    : copyright;

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="geometric-divider" />
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <img src="/mqi-logo.svg" alt={ORG_NAME} className="h-12 w-auto brightness-0 invert" />
            <p className="text-sm leading-relaxed text-secondary-foreground/70">{tagline}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground/90">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={`${link.label}-${link.to}-${index}`}>
                  <ConfigurableNavLink link={link} context="footer" isActive={pathname === link.to} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground/90">Programs</h4>
            <ul className="space-y-2.5">
              {programLinks.map((link, index) => (
                <li key={`${link.label}-${link.to}-${index}`}>
                  <ConfigurableNavLink link={link} context="footer" isActive={pathname === link.to} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground/90">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-sm text-secondary-foreground/60">
                <address className="not-italic">{address}</address>
              </li>
              <li className="text-sm text-secondary-foreground/60">
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-secondary-foreground">
                  {phone}
                </a>
              </li>
              {footerEmails.map((entry) => (
                <li key={`${entry.title}-${entry.email}`} className="text-sm text-secondary-foreground/60">
                  <span className="mb-0.5 block text-xs font-medium uppercase tracking-wide text-secondary-foreground/80">
                    {entry.title}
                  </span>
                  <a href={`mailto:${entry.email}`} className="hover:text-secondary-foreground">
                    {entry.email}
                  </a>
                </li>
              ))}
            </ul>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.platform + s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-secondary-foreground/25 px-2.5 py-1 text-xs uppercase tracking-wide text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
                    aria-label={s.platform}
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="geometric-divider mb-6 mt-10" />
        <p className="text-center text-xs text-secondary-foreground/40">{copyrightText}</p>
      </div>
    </footer>
  );
};

export default Footer;
