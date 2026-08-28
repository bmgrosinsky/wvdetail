import type { Business } from '@/types';

/**
 * Verified: name, city/state, tagline, service description.
 * UNVERIFIED values are stored as "TODO: ..." strings. Use `isTodo()` /
 * `resolved()` from `@/lib/todo` so components hide them gracefully.
 */
export const business: Business = {
  name: 'WV Detail',
  legalName: 'WV Detail',
  tagline: 'Drive Cleaner. Feel Better.',
  shortDescription:
    'Professional interior, exterior, and complete vehicle detailing with straightforward pricing and attention to detail.',
  city: 'Jackson',
  state: 'MI',
  stateFull: 'Michigan',
  cityState: 'Jackson, MI',
  phone: 'TODO: verified phone',
  phoneHref: 'TODO: verified phone href',
  email: 'TODO: verified email',
  addressLine: 'TODO: verified service address',
  facebookUrl: 'TODO: verified Facebook URL',
  instagramUrl: 'TODO: verified Instagram URL',
  googleProfileUrl: 'TODO: verified Google Business Profile URL',
  googleReviewsUrl: 'TODO: verified Google reviews URL',
  hours: [
    { day: 'Monday - Friday', hours: 'TODO: verified weekday hours' },
    { day: 'Saturday', hours: 'TODO: verified Saturday hours' },
    { day: 'Sunday', hours: 'TODO: verified Sunday hours' },
  ],
  siteUrl: 'https://wvdetail.com',
};
