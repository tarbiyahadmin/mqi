"use client";

import { memo, useMemo } from "react";
import { Link } from "@/lib/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ImageSoftFade } from "@/components/ui/ImageSoftFade";
import { resolveProgramCardImage } from "@/lib/programImages";

export interface ProgramCardProps {
  to: string;
  title: string;
  description?: string;
  image?: unknown;
  imageSeed: string;
  layout?: "carousel" | "listing";
}

function ProgramCardInner({ to, title, description, image, imageSeed, layout = "carousel" }: ProgramCardProps) {
  const imageUrl = useMemo(() => resolveProgramCardImage(image, imageSeed), [image, imageSeed]);
  const isListing = layout === "listing";

  return (
    <Link href={to} className={isListing ? "min-w-0 h-full" : "w-[min(86vw,300px)] shrink-0 snap-start sm:w-[min(72vw,320px)] md:w-[340px]"}>
      <Card
        className={`group relative h-full overflow-hidden border-border/50 shadow-md transition-shadow duration-300 hover:shadow-lg ${
          isListing ? "min-h-[280px]" : "min-h-[200px]"
        }`}
      >
        <ImageSoftFade className="relative aspect-[16/10] w-full overflow-hidden">
          <img src={imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </ImageSoftFade>
        <CardContent className={`relative z-[1] flex h-full flex-col space-y-4 ${isListing ? "space-y-5 p-8 md:p-10" : "p-8"}`}>
          <h3
            className={`font-semibold leading-snug text-foreground ${
              isListing ? "text-2xl tracking-tight md:text-3xl" : "text-xl md:text-2xl"
            }`}
          >
            {title}
          </h3>
          {description && (
            <p
              className={`flex-1 leading-relaxed text-muted-foreground ${
                isListing ? "line-clamp-5 text-base md:text-lg" : "line-clamp-3 text-base"
              }`}
            >
              {description}
            </p>
          )}
          <span
            className={`inline-block pt-1 font-medium text-foreground/80 group-hover:text-primary/90 group-hover:underline ${
              isListing ? "text-base md:text-lg" : "text-base"
            }`}
          >
            Learn more →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

export const ProgramCard = memo(ProgramCardInner);
