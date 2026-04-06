import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavLink as NavLinkFields } from "@/lib/sanityQueries";

export function isExternalNavigationTarget(to: string): boolean {
  return /^https?:\/\//i.test(to) || to.startsWith("mailto:") || to.startsWith("tel:");
}

export type NavLinkContext = "header-desktop" | "header-mobile" | "footer";

const headerDesktopText =
  "px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted";
const headerMobileText =
  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-muted";
const footerText = "text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors";

function textClasses(context: NavLinkContext, isActive: boolean): string {
  const activeHeader = isActive ? "text-primary font-semibold" : "text-foreground/70";
  const activeMobile = isActive ? "text-primary font-semibold bg-primary/5" : "text-foreground/70";
  if (context === "header-desktop") return cn(headerDesktopText, activeHeader);
  if (context === "header-mobile") return cn(headerMobileText, activeMobile);
  return cn(footerText, isActive && "text-secondary-foreground font-medium");
}

function buttonClassName(context: NavLinkContext): string {
  if (context === "header-desktop") {
    return "shrink-0 rounded-full px-6 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-none";
  }
  if (context === "header-mobile") {
    return "w-full rounded-full font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-none";
  }
  return "h-9 rounded-full px-4 text-sm font-medium border border-secondary-foreground/35 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10 shadow-none";
}

export interface ConfigurableNavLinkProps {
  link: NavLinkFields;
  context: NavLinkContext;
  isActive: boolean;
  onNavigate?: () => void;
}

export function ConfigurableNavLink({ link, context, isActive, onNavigate }: ConfigurableNavLinkProps) {
  const external = isExternalNavigationTarget(link.to);
  const newTab = link.openInNewTab === true;
  const target = newTab ? "_blank" : undefined;
  const rel = newTab ? "noopener noreferrer" : undefined;
  const displayAsButton = link.displayAsButton === true;

  const textCn = textClasses(context, isActive);
  const btnCn = buttonClassName(context);

  if (displayAsButton) {
    if (external) {
      return (
        <Button asChild className={btnCn}>
          <a href={link.to} target={target} rel={rel} onClick={onNavigate}>
            {link.label}
          </a>
        </Button>
      );
    }
    return (
      <Button asChild className={btnCn}>
        <Link to={link.to} target={target} rel={rel} onClick={onNavigate}>
          {link.label}
        </Link>
      </Button>
    );
  }

  if (external) {
    return (
      <a href={link.to} className={textCn} target={target} rel={rel} onClick={onNavigate}>
        {link.label}
      </a>
    );
  }

  return (
    <Link to={link.to} className={textCn} onClick={onNavigate} target={target} rel={rel}>
      {link.label}
    </Link>
  );
}
