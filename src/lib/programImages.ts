import { urlFor } from "@/lib/sanity";
import { programCardFallbackImage } from "@/lib/localImages";

export { programCardFallbackImage, PROGRAM_CARD_FALLBACK_IMAGES } from "@/lib/localImages";

export function resolveProgramCardImage(
  image: unknown,
  seed: string | number,
  width = 640,
  height = 400,
): string {
  if (image && typeof image === "object" && "asset" in image && image.asset) {
    return urlFor(image as never).width(width).height(height).fit("crop").url();
  }
  return programCardFallbackImage(seed);
}
