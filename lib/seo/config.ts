/**
 * Central SEO configuration.
 * The canonical origin comes from NEXT_PUBLIC_SITE_URL so preview and
 * production deployments emit correct absolute URLs.
 */

const FALLBACK_SITE_URL = 'https://wvdetail.com';

function normalize(url: string): string {
  return url.replace(/\/+$/, '');
}

/** Absolute origin, no trailing slash. */
export const siteUrl: string = normalize(
  process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL,
);

/** Builds an absolute URL for a site-relative path such as "/service-area". */
export function absoluteUrl(path: string): string {
  if (path === '/') return `${siteUrl}/`;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
