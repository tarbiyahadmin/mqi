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

export function isJotformEventOrigin(origin: string): boolean {
  try {
    const host = new URL(origin).hostname;
    return host === "jotform.com" || host.endsWith(".jotform.com");
  } catch {
    return false;
  }
}

/** True when the iframe posts Jotform's successful-submit message. */
export function isJotformSubmissionMessage(data: unknown): boolean {
  if (data == null) return false;
  if (typeof data === "string") {
    try {
      return isJotformSubmissionMessage(JSON.parse(data) as unknown);
    } catch {
      return data.includes("submission-completed");
    }
  }
  if (typeof data === "object" && "action" in data) {
    return (data as { action?: unknown }).action === "submission-completed";
  }
  return false;
}
