import img01 from "@/assets/mqi-images/DSC00394.JPG";
import img02 from "@/assets/mqi-images/DSC00487.JPG";
import img03 from "@/assets/mqi-images/DSC00508.JPG";
import img04 from "@/assets/mqi-images/DSC00518.JPG";
import img05 from "@/assets/mqi-images/DSC00979.JPG";
import img06 from "@/assets/mqi-images/DSC00985.JPG";
import img07 from "@/assets/mqi-images/IMG_7053.jpg";
import img08 from "@/assets/mqi-images/IMG_7107.jpg";
import img09 from "@/assets/mqi-images/IMG_7176.JPG";
import img10 from "@/assets/mqi-images/IMG_7211.JPG";
import img11 from "@/assets/mqi-images/IMG_7312.JPG";
import img12 from "@/assets/mqi-images/IMG_7378.JPG";
import img13 from "@/assets/mqi-images/IMG_7382.JPG";
import { urlFor } from "@/lib/sanity";

export const PROGRAM_CARD_FALLBACK_IMAGES = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  img08,
  img09,
  img10,
  img11,
  img12,
  img13,
] as const;

export function programCardFallbackImage(seed: string | number): string {
  const index =
    typeof seed === "number"
      ? Math.abs(seed) % PROGRAM_CARD_FALLBACK_IMAGES.length
      : Math.abs([...String(seed)].reduce((acc, char) => acc + char.charCodeAt(0), 0)) %
        PROGRAM_CARD_FALLBACK_IMAGES.length;
  return PROGRAM_CARD_FALLBACK_IMAGES[index];
}

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
