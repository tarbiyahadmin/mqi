import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CtaLinkProps {
  label: string;
  to: string;
  isExternal?: boolean;
  variant?: "primary" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
  /** Use compact styling (e.g. for hero). Default false = prominent sitewide CTA. */
  compact?: boolean;
  className?: string;
}

export function CtaLink({
  label,
  to,
  isExternal = false,
  variant = "primary",
  size = "lg",
  compact = false,
  className = "",
}: CtaLinkProps) {
  const isExternalUrl = isExternal || /^https?:\/\//i.test(to);

  const baseCompact = "rounded-full font-semibold px-6 py-4 shadow-md hover:shadow-lg transition-all";
  const baseProminent = "rounded-2xl font-semibold px-10 py-6 text-base shadow-lg hover:shadow-xl transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary";

  const variantStyles = compact
    ? {
        primary: `${baseCompact} bg-primary text-primary-foreground hover:bg-primary/90`,
        accent: `${baseCompact} bg-accent text-accent-foreground hover:bg-accent/90`,
      }
    : {
        primary: `${baseProminent} bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary`,
        accent: `${baseProminent} bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent`,
      };

  const buttonClass = `${variantStyles[variant]} ${className}`;

  if (isExternalUrl && /^https?:\/\//i.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer">
        <Button size={size} className={buttonClass}>
          {label}
        </Button>
      </a>
    );
  }

  return (
    <Link to={to}>
      <Button size={size} className={buttonClass}>
        {label}
      </Button>
    </Link>
  );
}
