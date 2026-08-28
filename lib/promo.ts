/**
 * "Book Now" promo: a 10% discount held open for a fixed window from the
 * moment a visitor's browser session starts. The deadline is written to
 * sessionStorage once and never rewritten, so reloading the page or
 * browsing to another page does not reset the clock — only a genuinely new
 * tab/session gets a fresh window. This is deliberate: a countdown that
 * resets on every refresh is a manufactured-urgency dark pattern.
 */
export const PROMO_ENABLED = true;
export const PROMO_LABEL = '10% off';
export const PROMO_DURATION_MS = 20 * 60 * 1000;

/** Appended to the quote email when the request was submitted inside the window. */
export const PROMO_HONORED_NOTE =
  'Book Now offer: 10% off - requested inside the 20-minute countdown window. Please honor.';

const STORAGE_KEY = 'wv-promo-deadline';

export function readOrStartPromoDeadline(): number {
  if (typeof window === 'undefined') return 0;

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    const existing = stored ? Number(stored) : NaN;
    if (Number.isFinite(existing)) return existing;

    const deadline = Date.now() + PROMO_DURATION_MS;
    window.sessionStorage.setItem(STORAGE_KEY, String(deadline));
    return deadline;
  } catch {
    // Storage unavailable (private mode, disabled storage). Not persisted,
    // but still a real 20 minutes from now for this page view.
    return Date.now() + PROMO_DURATION_MS;
  }
}
