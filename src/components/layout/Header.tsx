import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mqiLogo from "@/assets/mqi-logo.svg";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/sanityQueries";
import type { NavLink } from "@/lib/sanityQueries";
import { ConfigurableNavLink } from "@/components/layout/ConfigurableNavLink";

const defaultNavLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Career & Volunteer", to: "/careers" },
  { label: "Blog", to: "/blog" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettings,
  });

  const rawLinks = (siteSettings?.navLinks?.length ? siteSettings.navLinks : defaultNavLinks) as NavLink[];
  const navLinks = rawLinks.filter((link) => link.to !== "/contact");

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex h-[4.25rem] items-center justify-between md:h-[5.25rem]">
        <Link to="/" className="flex items-center gap-3">
          <img src={mqiLogo} alt="Milton Qur'an Institute" className="h-11 w-auto md:h-[3.25rem]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-2 flex-wrap justify-end">
          {navLinks.map((link, index) => (
            <ConfigurableNavLink
              key={`${link.label}-${link.to}-${index}`}
              link={link}
              context="header-desktop"
              isActive={location.pathname === link.to}
            />
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden rounded-lg p-2.5 hover:bg-muted"
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

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card/95 pb-4 backdrop-blur-md">
          <nav className="container flex flex-col gap-2 pt-3">
            {navLinks.map((link, index) => (
              <ConfigurableNavLink
                key={`${link.label}-${link.to}-${index}`}
                link={link}
                context="header-mobile"
                isActive={location.pathname === link.to}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
