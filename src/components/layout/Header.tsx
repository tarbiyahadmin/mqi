import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import mqiLogo from "@/assets/mqi-logo.svg";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/sanityQueries";

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

  const rawLinks = (siteSettings?.navLinks?.length ? siteSettings.navLinks : defaultNavLinks) as { label: string; to: string }[];
  const navLinks = rawLinks.filter((link) => link.to !== "/contact");

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={mqiLogo} alt="Milton Qur'an Institute" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === link.to
                  ? "text-primary font-semibold"
                  : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/donate">
            <Button className="ml-3 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-full px-6">
              Donate
            </Button>
          </Link>
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
          <nav className="container flex flex-col gap-1 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-muted ${
                  location.pathname === link.to
                    ? "text-primary font-semibold bg-primary/5"
                    : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/donate" onClick={() => setMobileOpen(false)}>
              <Button className="mt-2 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-full">
                Donate
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
