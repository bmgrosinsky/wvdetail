import type {
  AnalyticsEventName,
  AnalyticsParams,
} from './events';

/** GA4 measurement id, or `null` when analytics is not configured. */
export const gaMeasurementId: string | null =
  process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID.trim() !== ''
    ? process.env.NEXT_PUBLIC_GA_ID
    : null;

export const isAnalyticsEnabled: boolean = gaMeasurementId !== null;

type GtagArgs =
  | readonly ['js', Date]
  | readonly ['config', string, AnalyticsParams?]
  | readonly ['event', string, AnalyticsParams?];

type GtagFn = (...args: readonly [string, ...unknown[]]) => void;

interface GtagWindow extends Window {
  dataLayer?: unknown[];
  gtag?: GtagFn;
}

function getGtag(): GtagFn | null {
  if (typeof window === 'undefined') return null;
  const w = window as GtagWindow;
  return typeof w.gtag === 'function' ? w.gtag : null;
}

function send(args: GtagArgs): void {
  const gtag = getGtag();
  if (!gtag) return;
  gtag(...(args as unknown as readonly [string, ...unknown[]]));
}

/**
 * Track a typed conversion or interaction event.
 * No-ops when GA is not configured or when called during SSR.
 */
export function trackEvent(
  name: AnalyticsEventName,
  params?: AnalyticsParams,
): void {
  if (!isAnalyticsEnabled) return;
  send(params ? ['event', name, params] : ['event', name]);
}

/** Manual pageview, for cases where the automatic GA4 pageview is not enough. */
export function trackPageView(path: string): void {
  if (!isAnalyticsEnabled || gaMeasurementId === null) return;
  send(['config', gaMeasurementId, { page_path: path }]);
}
