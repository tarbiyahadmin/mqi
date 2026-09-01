"use client";

import { useState } from "react";
import { Link, usePathname } from "@/lib/navigation";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import type { NavLink, PageCtaButton } from "@/lib/sanityQueries";
import { ConfigurableNavLink } from "@/components/layout/ConfigurableNavLink";
import { CtaLink } from "@/components/CtaLink";
import { isPageCtaExternal, resolvePageCtaTarget } from "@/lib/ctaDestinations";
import { ORG_NAME } from "@/lib/site";

const defaultNavLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Financial Aid", to: "/financial-aid" },
  { label: "Career & Volunteer", to: "/careers" },
  { label: "Blog", to: "/blog" },
];

function normalizeInternalPath(to: string): string {
  if (!to || /^https?:\/\//i.test(to) || to.startsWith("mailto:") || to.startsWith("tel:")) return to;
  return to.startsWith("/") ? to : `/${to}`;
}

function legacyNavCtaButtons(links: NavLink[]): PageCtaButton[] {
  return links
    .filter((link) => link.displayAsButton)
    .map((link) => ({
      label: link.label,
      to: normalizeInternalPath(link.to),
      variant: "primary" as const,
      openInNewTab: link.openInNewTab,
    }));
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const siteSettings = useSiteSettings();

  const rawLinks = (siteSettings?.navLinks?.length ? siteSettings.navLinks : defaultNavLinks) as NavLink[];
  const navLinks = rawLinks
    .filter((link) => !link.displayAsButton)
    .map((link) => ({ ...link, to: normalizeInternalPath(link.to) }));
  const legacyCtas = legacyNavCtaButtons(rawLinks);
  const navCtaButtons = (siteSettings?.navCtaButtons?.length ? siteSettings.navCtaButtons : legacyCtas).map((btn) => ({
    ...btn,
    to: normalizeInternalPath(btn.to),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 shadow-sm backdrop-blur-md">
      <div className="container flex h-[4.25rem] items-center justify-between md:h-[5.25rem]">
        <Link href="/" className="flex items-center gap-3">
          <img src="/mqi-logo.svg" alt={ORG_NAME} className="h-11 w-auto md:h-[3.25rem]" />
        </Link>

        <nav className="hidden flex-wrap items-center justify-end gap-2 lg:flex">
          {navLinks.map((link, index) => (
            <ConfigurableNavLink
              key={`${link.label}-${link.to}-${index}`}
              link={link}
              context="header-desktop"
              isActive={pathname === link.to}
            />
          ))}
          {navCtaButtons.map((btn, index) => {
            const to = resolvePageCtaTarget(btn);
            if (!to) return null;
            return (
              <CtaLink
                key={`${to}-${index}`}
                label={btn.label}
                to={to}
                variant={btn.variant ?? "primary"}
                isExternal={isPageCtaExternal(btn)}
                openInNewTab={btn.openInNewTab}
                compact
                className="!min-h-0 !px-6 !py-2 text-sm"
              />
            );
          })}
        </nav>

        <button
          className="rounded-lg p-2.5 hover:bg-muted lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-[2px] w-5 rounded-full bg-foreground transition-all duration-200 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-[2px] w-5 rounded-full bg-foreground transition-all duration-200 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-[2px] w-5 rounded-full bg-foreground transition-all duration-200 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card/95 pb-4 backdrop-blur-md lg:hidden">
          <nav className="container flex flex-col gap-2 pt-3">
            {navLinks.map((link, index) => (
              <ConfigurableNavLink
                key={`${link.label}-${link.to}-${index}`}
                link={link}
                context="header-mobile"
                isActive={pathname === link.to}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
            {navCtaButtons.map((btn, index) => {
              const to = resolvePageCtaTarget(btn);
              if (!to) return null;
              return (
                <div key={`${to}-${index}`} className="w-full" onClick={() => setMobileOpen(false)}>
                  <CtaLink
                    label={btn.label}
                    to={to}
                    variant={btn.variant ?? "primary"}
                    isExternal={isPageCtaExternal(btn)}
                    openInNewTab={btn.openInNewTab}
                    compact
                    className="w-full"
                  />
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
