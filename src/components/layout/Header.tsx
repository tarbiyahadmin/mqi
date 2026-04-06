import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={mqiLogo} alt="Milton Qur'an Institute" className="h-10 md:h-12 w-auto" />
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
          className="lg:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card pb-4">
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
