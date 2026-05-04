import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PageTitleProps {
  title: string;
  /** Small label or pill above the title (e.g. program category). */
  eyebrow?: ReactNode;
  /** Muted supporting text below the divider. */
  subtitle?: ReactNode;
  /** Renders only an accessible document title (no visible heading). */
  visuallyHidden?: boolean;
  /** Use `h2` when an sr-only `h1` already names the page (e.g. Financial Aid). */
  headingLevel?: "h1" | "h2";
  hideDivider?: boolean;
  className?: string;
  wrapperClassName?: string;
}

/**
 * Centered page title stack: gradient heading, geometric divider, optional subtitle.
 * Matches sitewide `.container` alignment; inner width capped at `max-w-4xl`.
 */
export function PageTitle({
  title,
  eyebrow,
  subtitle,
  visuallyHidden,
  headingLevel = "h1",
  hideDivider,
  className,
  wrapperClassName,
}: PageTitleProps) {
  if (visuallyHidden) {
    return <h1 className="sr-only">{title}</h1>;
  }

  const HeadingTag = headingLevel;

  return (
    <header className={cn("page-title-block", wrapperClassName)}>
      {eyebrow ? <div className="mb-3 flex justify-center md:mb-4">{eyebrow}</div> : null}
      <HeadingTag className={cn("heading-section", className)}>{title}</HeadingTag>
      {!hideDivider ? <div className="page-title-divider" aria-hidden /> : null}
      {subtitle ? <div className="page-title-subtitle">{subtitle}</div> : null}
    </header>
  );
}
