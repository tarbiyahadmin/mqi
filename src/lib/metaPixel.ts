export const META_PIXEL_ID = "2165175151547851";

const PENDING_KEY = "mqi_meta_complete_registration_pending";
const FIRED_AT_KEY = "mqi_meta_complete_registration_fired_at";
/** Ignore a second CompleteRegistration shortly after the first (iframe + parent both hitting Thank You). */
const CONVERSION_DEDUPE_MS = 5000;

type FacebookPixel = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: FacebookPixel;
    _fbq?: FacebookPixel;
  }
}

function withFbq(callback: (fbq: FacebookPixel) => void, attempts = 25): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    callback(window.fbq);
    return;
  }
  if (attempts <= 0) return;
  window.setTimeout(() => withFbq(callback, attempts - 1), 100);
}

export function trackPageView(): void {
  withFbq((fbq) => fbq("track", "PageView"));
}

export function trackCompleteRegistration(eventId?: string): void {
  try {
    const lastFiredAt = Number(sessionStorage.getItem(FIRED_AT_KEY) || 0);
    if (lastFiredAt && Date.now() - lastFiredAt < CONVERSION_DEDUPE_MS) return;
    sessionStorage.setItem(FIRED_AT_KEY, String(Date.now()));
  } catch {
    // Storage is only used for client-side dedupe.
  }

  withFbq((fbq) => {
    if (eventId) {
      fbq("track", "CompleteRegistration", {}, { eventID: eventId });
      return;
    }
    fbq("track", "CompleteRegistration");
  });
}

/** Mark a successful Jotform submit so Thank You can fire the conversion once. */
export function markRegistrationSuccess(): string {
  const eventId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  try {
    sessionStorage.setItem(PENDING_KEY, eventId);
  } catch {
    // Private mode / blocked storage: Thank You still uses Jotform referrer fallback.
  }
  return eventId;
}

export function consumePendingRegistrationEventId(): string | null {
  try {
    const eventId = sessionStorage.getItem(PENDING_KEY);
    if (!eventId) return null;
    sessionStorage.removeItem(PENDING_KEY);
    return eventId;
  } catch {
    return null;
  }
}

export function isDocumentReload(): boolean {
  if (typeof performance === "undefined") return false;
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
}

export function isJotformReferrer(): boolean {
  if (typeof document === "undefined" || !document.referrer) return false;
  try {
    const host = new URL(document.referrer).hostname;
    return host === "jotform.com" || host.endsWith(".jotform.com");
  } catch {
    return false;
  }
}
