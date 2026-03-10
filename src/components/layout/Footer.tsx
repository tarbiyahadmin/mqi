import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter, Linkedin } from "lucide-react";
import mqiLogo from "@/assets/mqi-logo.svg";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/sanityQueries";

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
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettings,
  });

  const tagline = siteSettings?.footerTagline ?? "Nurturing minds and hearts through Qur'anic education, fostering a community of lifelong learners.";
  const rawQuickLinks = (siteSettings?.footerQuickLinks?.length ? siteSettings.footerQuickLinks : defaultQuickLinks) as { label: string; to: string }[];
  const quickLinks = rawQuickLinks.filter((link) => link.to !== "/contact");
  const programLinks = (siteSettings?.footerProgramLinks?.length ? siteSettings.footerProgramLinks : defaultProgramLinks) as { label: string; to: string }[];
  const address = siteSettings?.footerAddress ?? "123 Main Street, Milton, ON L9T 1X1";
  const phone = siteSettings?.footerPhone ?? "(905) 555-0123";
  const email = siteSettings?.footerEmail ?? "info@miltonquran.org";
  const socialLinks = siteSettings?.socialLinks ?? [];
  const copyright = siteSettings?.footerCopyright ?? `© ${new Date().getFullYear()} Milton Qur'an Institute. All rights reserved.`;
  const copyrightText = copyright.includes('{year}') ? copyright.replace('{year}', String(new Date().getFullYear())) : copyright;

  const socialIcons: Record<string, typeof Instagram> = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    twitter: Twitter,
    linkedin: Linkedin,
    tiktok: Instagram, // Lucide has no TikTok, use generic
  };

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
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/90">Programs</h4>
            <ul className="space-y-2.5">
              {programLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/90">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-secondary-foreground/60">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/60">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/60">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                {socialLinks.map((s) => {
                  const Icon = socialIcons[s.platform] ?? Mail;
                  return (
                    <a
                      key={s.platform + s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors p-1.5 rounded-lg hover:bg-secondary-foreground/10"
                      aria-label={s.platform}
                    >
                      <Icon className="h-5 w-5" />
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
