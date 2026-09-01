/** Optimized local images served from /public/images */

const MQI = "/images/mqi";

export const QURAN_HERO = "/images/quran-hero.webp";
export const GRAIN_TEXTURE = "/images/grain.webp";
export const ARABIC_PATTERN = "/images/arabic.svg";

export const EDITORIAL_PHOTOS = [
  `${MQI}/DSC00985.webp`,
  `${MQI}/IMG_7312.webp`,
  `${MQI}/DSC00518.webp`,
  `${MQI}/IMG_7382.webp`,
] as const;

export const CTA_BAND_PHOTO = `${MQI}/IMG_7176.webp`;
export const BOOK_MEET_FULL_TIME = `${MQI}/DSC00985.webp`;
export const BOOK_MEET_PART_TIME = `${MQI}/IMG_7176.webp`;
export const FINANCIAL_AID_FALLBACK = `${MQI}/IMG_7176.webp`;

export const PROGRAM_CARD_FALLBACK_IMAGES = [
  `${MQI}/DSC00394.webp`,
  `${MQI}/DSC00487.webp`,
  `${MQI}/DSC00508.webp`,
  `${MQI}/DSC00518.webp`,
  `${MQI}/DSC00979.webp`,
  `${MQI}/DSC00985.webp`,
  `${MQI}/IMG_7053.webp`,
  `${MQI}/IMG_7107.webp`,
  `${MQI}/IMG_7176.webp`,
  `${MQI}/IMG_7211.webp`,
  `${MQI}/IMG_7312.webp`,
  `${MQI}/IMG_7378.webp`,
  `${MQI}/IMG_7382.webp`,
] as const;

export function programCardFallbackImage(seed: string | number): string {
  const index =
    typeof seed === "number"
      ? Math.abs(seed) % PROGRAM_CARD_FALLBACK_IMAGES.length
      : Math.abs([...String(seed)].reduce((acc, char) => acc + char.charCodeAt(0), 0)) %
        PROGRAM_CARD_FALLBACK_IMAGES.length;
  return PROGRAM_CARD_FALLBACK_IMAGES[index];
}
