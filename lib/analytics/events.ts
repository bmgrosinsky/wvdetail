/**
 * Typed GA4 event names for the WV Detail site.
 * Never include personally identifying information in event parameters.
 */
export const analyticsEvents = {
  quoteStarted: 'quote_started',
  quoteSubmitted: 'quote_submitted',
  phoneClicked: 'phone_clicked',
  textClicked: 'text_clicked',
  serviceViewed: 'service_viewed',
  galleryViewed: 'gallery_viewed',
  googleReviewsClicked: 'google_reviews_clicked',
  facebookClicked: 'facebook_clicked',
} as const;

export type AnalyticsEventName =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];

/**
 * Allowed event parameter values. Keep these non-identifying:
 * service slugs, page paths, placement labels — never names, emails, or phones.
 */
export type AnalyticsParamValue = string | number | boolean;

export type AnalyticsParams = Readonly<Record<string, AnalyticsParamValue>>;
