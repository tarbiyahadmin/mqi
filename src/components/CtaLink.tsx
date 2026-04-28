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

  const baseCompact =
    "rounded-xl border px-7 py-4 text-sm font-semibold min-h-[3rem] shadow-sm transition-all hover:shadow-md";
  const baseProminent =
    "rounded-xl border px-10 py-6 md:px-12 md:py-7 text-sm md:text-[0.95rem] font-semibold min-h-[3.4rem] shadow-md transition-all hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantStyles = compact
    ? {
        primary: `${baseCompact} border-primary/70 bg-gradient-to-br from-[hsl(155_56%_36%)] via-[hsl(156_52%_33%)] to-[hsl(45_55%_48%)] text-white shadow-[0_0_20px_hsl(var(--primary)/0.18)] hover:brightness-[1.04] focus-visible:ring-primary/40`,
        accent: `${baseCompact} border-primary/70 bg-gradient-to-br from-[hsl(45_56%_50%)] via-[hsl(43_60%_46%)] to-[hsl(155_52%_33%)] text-white shadow-[0_0_20px_hsl(var(--accent)/0.2)] hover:brightness-[1.04] focus-visible:ring-accent/40`,
      }
    : {
        primary: `${baseProminent} border-primary/70 bg-gradient-to-br from-[hsl(155_56%_36%)] via-[hsl(156_52%_33%)] to-[hsl(45_55%_48%)] text-white shadow-[0_0_24px_hsl(var(--primary)/0.22)] hover:brightness-[1.04] focus-visible:ring-primary/45`,
        accent: `${baseProminent} border-primary/70 bg-gradient-to-br from-[hsl(45_56%_50%)] via-[hsl(43_60%_46%)] to-[hsl(155_52%_33%)] text-white shadow-[0_0_24px_hsl(var(--accent)/0.22)] hover:brightness-[1.04] focus-visible:ring-accent/45`,
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
