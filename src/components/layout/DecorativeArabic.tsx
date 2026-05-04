import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import arabicUrl from "@/assets/arabic.svg";

interface DecorativeArabicProps {
  className?: string;
  /** Lower = more subtle */
  opacity?: number;
  /**
   * `full` — large centered calligraphy spanning the section.
   * `corner` — partial bleed from the right (default).
   * `bandLeft` — anchored left for dark bands (e.g. homepage CTA); fades right into the layout.
   */
  variant?: "corner" | "full" | "bandLeft";
  /**
   * When true (default for `full` and `corner`), masks top/bottom/side edges so decor does not hard-cut at section boundaries.
   */
  edgeFade?: boolean;
}

const sectionEdgeMask: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskImage:
    "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
  maskComposite: "intersect",
};

const bandLeftMask: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, black 0%, black 32%, transparent 82%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskImage:
    "linear-gradient(to right, black 0%, black 32%, transparent 82%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
  maskComposite: "intersect",
};

/** Low-opacity calligraphy watermark for section backgrounds. */
export function DecorativeArabic({
  className,
  opacity = 0.04,
  variant = "corner",
  edgeFade,
}: DecorativeArabicProps) {
  const fadeSection = edgeFade ?? (variant === "full" || variant === "corner");

  if (variant === "bandLeft") {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-[1] w-[min(62%,520px)] select-none overflow-hidden",
          className,
        )}
        style={bandLeftMask}
      >
        <img
          src={arabicUrl}
          alt=""
          className="absolute left-[-8%] top-1/2 w-[min(112%,620px)] max-w-none -translate-y-1/2 object-contain mix-blend-soft-light dark:mix-blend-soft-light"
          style={{ opacity }}
          loading="lazy"
        />
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 select-none overflow-hidden", className)}
        style={fadeSection ? sectionEdgeMask : undefined}
      >
        <img
          src={arabicUrl}
          alt=""
          className="absolute left-1/2 top-1/2 max-h-none w-[min(122%,920px)] min-w-[100%] -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-multiply dark:mix-blend-soft-light"
          style={{ opacity }}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 select-none overflow-hidden", className)}
      style={fadeSection ? sectionEdgeMask : undefined}
    >
      <img
        src={arabicUrl}
        alt=""
        className="absolute -right-[2%] top-1/2 w-[min(82vw,620px)] max-w-none -translate-y-1/2 object-contain mix-blend-multiply dark:mix-blend-soft-light md:w-[min(62vw,700px)]"
        style={{ opacity }}
        loading="lazy"
      />
    </div>
  );
}
