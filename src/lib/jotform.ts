/**
 * Normalize Jotform URL for embedding or linking.
 * Accepts full URL (https://form.jotform.com/123) or form ID only.
 */
export function getJotformUrl(input: string | undefined): string | null {
  if (!input?.trim()) return null;
  const trimmed = input.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://form.jotform.com/${trimmed}`;
}

/**
 * Convert to embed-friendly URL (append /embed if needed for iframe).
 * Jotform embed URL format: https://form.jotform.com/123456789 or same as view URL.
 */
export function getJotformEmbedUrl(input: string | undefined): string | null {
  const url = getJotformUrl(input);
  if (!url) return null;
  // Jotform forms work in iframe with the same URL; no need to change path
  return url;
}
