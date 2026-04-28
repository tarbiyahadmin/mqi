import { useLocation } from "react-router-dom";
import mqiLogo from "@/assets/mqi-logo.svg";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/sanityQueries";
import type { NavLink as NavLinkFields } from "@/lib/sanityQueries";
import { ConfigurableNavLink } from "@/components/layout/ConfigurableNavLink";

const defaultQuickLinks = [
  { label: "Programs", to: "/programs" },
  { label: "Career & Volunteer", to: "/careers" },
  { label: "Blog", to: "/blog" },
  { label: "Donate", to: "/donate" },
];

const defaultProgramLinks = [
  { label: "Courses", to: "/programs/courses" },
  { label: "Full Time School", to: "/programs/full-time" },
  { label: "Summer Programs", to: "/programs/summer" },
];

const Footer = () => {
  const location = useLocation();
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettings,
  });

  const tagline = siteSettings?.footerTagline ?? "Nurturing minds and hearts through Qur'anic education, fostering a community of lifelong learners.";
  const rawQuickLinks = (siteSettings?.footerQuickLinks?.length ? siteSettings.footerQuickLinks : defaultQuickLinks) as NavLinkFields[];
  const quickLinks = rawQuickLinks.filter((link) => link.to !== "/contact");
  const programLinks = (siteSettings?.footerProgramLinks?.length ? siteSettings.footerProgramLinks : defaultProgramLinks) as NavLinkFields[];
  const address = siteSettings?.footerAddress ?? "123 Main Street, Milton, ON L9T 1X1";
  const phone = siteSettings?.footerPhone ?? "(905) 555-0123";
  const email = siteSettings?.footerEmail ?? "info@miltonquran.org";
  const socialLinks = siteSettings?.socialLinks ?? [];
  const copyright = siteSettings?.footerCopyright ?? `© ${new Date().getFullYear()} Milton Qur'an Institute. All rights reserved.`;
  const copyrightText = copyright.includes('{year}') ? copyright.replace('{year}', String(new Date().getFullYear())) : copyright;

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="geometric-divider" />
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <img src={mqiLogo} alt="Milton Qur'an Institute" className="h-12 w-auto brightness-0 invert" />
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/90">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={`${link.label}-${link.to}-${index}`}>
                  <ConfigurableNavLink
                    link={link}
                    context="footer"
                    isActive={location.pathname === link.to}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/90">Programs</h4>
            <ul className="space-y-2.5">
              {programLinks.map((link, index) => (
                <li key={`${link.label}-${link.to}-${index}`}>
                  <ConfigurableNavLink
                    link={link}
                    context="footer"
                    isActive={location.pathname === link.to}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/90">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-sm text-secondary-foreground/60">{address}</li>
              <li className="text-sm text-secondary-foreground/60">{phone}</li>
              <li className="text-sm text-secondary-foreground/60">{email}</li>
            </ul>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {socialLinks.map((s) => {
                  return (
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
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="geometric-divider mt-10 mb-6" />
        <p className="text-center text-xs text-secondary-foreground/40">
          {copyrightText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
