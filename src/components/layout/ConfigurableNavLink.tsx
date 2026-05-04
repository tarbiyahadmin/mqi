import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavLink as NavLinkFields } from "@/lib/sanityQueries";

export function isExternalNavigationTarget(to: string): boolean {
  return /^https?:\/\//i.test(to) || to.startsWith("mailto:") || to.startsWith("tel:");
}

export type NavLinkContext = "header-desktop" | "header-mobile" | "footer";

const headerDesktopText =
  "rounded-lg px-4 py-2.5 text-base font-medium text-foreground/70 transition-colors hover:text-foreground";
const headerMobileText =
  "block rounded-lg px-4 py-3.5 text-base font-medium text-foreground/70 transition-colors hover:text-foreground";
const footerText = "text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors";

function textClasses(context: NavLinkContext, isActive: boolean): string {
  const activeHeader = isActive ? "text-primary font-semibold" : "text-foreground/70";
  const activeMobile = isActive ? "text-primary font-semibold" : "";
  if (context === "header-desktop") return cn(headerDesktopText, activeHeader);
  if (context === "header-mobile") return cn(headerMobileText, activeMobile);
  return cn(footerText, isActive && "text-secondary-foreground font-medium");
}

function buttonClassName(context: NavLinkContext): string {
  if (context === "header-desktop") {
    return "shrink-0 rounded-xl border border-primary/70 bg-gradient-to-br from-[hsl(155_56%_36%)] via-[hsl(156_52%_33%)] to-[hsl(45_55%_48%)] px-6 py-2 text-sm font-semibold text-white shadow-[0_0_20px_hsl(var(--accent)/0.18)] hover:brightness-[1.04]";
  }
  if (context === "header-mobile") {
    return "w-full rounded-xl border border-primary/70 bg-gradient-to-br from-[hsl(155_56%_36%)] via-[hsl(156_52%_33%)] to-[hsl(45_55%_48%)] py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_hsl(var(--accent)/0.18)] hover:brightness-[1.04]";
  }
  return "h-10 rounded-xl border border-primary/70 bg-gradient-to-br from-[hsl(155_56%_36%)] via-[hsl(156_52%_33%)] to-[hsl(45_55%_48%)] px-5 text-sm font-semibold text-white shadow-sm hover:brightness-[1.04] md:text-sm";
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
