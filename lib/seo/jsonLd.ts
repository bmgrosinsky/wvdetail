import { business } from '@/data/business';
import { serviceAreas } from '@/data/serviceAreas';
import { priceRange } from '@/data/services';
import type { Faq } from '@/types';
import { resolved } from '@/lib/todo';
import { absoluteUrl } from './config';

/** A JSON-serializable structured-data value. Strict: no `any`. */
export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonLdValue[]
  | { readonly [key: string]: JsonLdValue };

export type JsonLdObject = { readonly [key: string]: JsonLdValue };

/** Drops keys whose value is `undefined`/`null` so unverified data is omitted. */
function compact(
  entries: Readonly<Record<string, JsonLdValue | undefined>>,
): JsonLdObject {
  const out: Record<string, JsonLdValue> = {};
  for (const [key, value] of Object.entries(entries)) {
    if (value === undefined || value === null) continue;
    out[key] = value;
  }
  return out;
}

/**
 * Opening hours in schema.org format, only for days whose hours are verified
 * AND expressed as a parseable "H:MM AM - H:MM PM" range. Anything else is
 * omitted rather than guessed.
 */
const DAY_MAP: Readonly<Record<string, readonly string[]>> = {
  monday: ['Monday'],
  tuesday: ['Tuesday'],
  wednesday: ['Wednesday'],
  thursday: ['Thursday'],
  friday: ['Friday'],
  saturday: ['Saturday'],
  sunday: ['Sunday'],
};

const DAY_ORDER: readonly string[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

function parseDays(label: string): readonly string[] {
  const parts = label
    .toLowerCase()
    .split(/\s*(?:-|–|to|,|&|and)\s*/)
    .map((part) => part.trim())
    .filter((part) => part in DAY_MAP);

  if (parts.length === 2 && /-|–|to/.test(label)) {
    const start = DAY_ORDER.indexOf(parts[0]);
    const end = DAY_ORDER.indexOf(parts[1]);
    if (start >= 0 && end >= start) {
      return DAY_ORDER.slice(start, end + 1).flatMap((day) => DAY_MAP[day]);
    }
  }

  return parts.flatMap((part) => DAY_MAP[part]);
}

function to24Hour(time: string): string | null {
  const match = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i.exec(time.trim());
  if (!match) return null;
  const rawHour = Number(match[1]);
  const minutes = match[2] ?? '00';
  const meridiem = match[3]?.toLowerCase();
  if (Number.isNaN(rawHour) || rawHour < 1 || rawHour > 24) return null;

  let hour = rawHour;
  if (meridiem === 'pm' && hour < 12) hour += 12;
  if (meridiem === 'am' && hour === 12) hour = 0;
  if (hour > 23) return null;

  return `${String(hour).padStart(2, '0')}:${minutes}`;
}

function openingHoursSpecification(): readonly JsonLdObject[] {
  const specs: JsonLdObject[] = [];

  for (const entry of business.hours) {
    const value = resolved(entry.hours);
    if (!value) continue;

    const range = value.split(/\s*(?:-|–|to)\s*/);
    if (range.length !== 2) continue;

    const opens = to24Hour(range[0]);
    const closes = to24Hour(range[1]);
    if (!opens || !closes) continue;

    const days = parseDays(entry.day);
    if (days.length === 0) continue;

    specs.push({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days,
      opens,
      closes,
    });
  }

  return specs;
}

function sameAs(): readonly string[] {
  return [
    resolved(business.facebookUrl),
    resolved(business.instagramUrl),
    resolved(business.googleProfileUrl),
  ].filter((url): url is string => url !== null);
}

function postalAddress(): JsonLdObject | undefined {
  const street = resolved(business.addressLine);
  if (!street) return undefined;

  return {
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: business.city,
    addressRegion: business.state,
    addressCountry: 'US',
  };
}

/**
 * LocalBusiness (AutomotiveBusiness) schema built only from verified data.
 * Unverified "TODO:" values in `data/business.ts` are omitted entirely;
 * each field appears automatically once its value is filled in.
 *
 * `AutomotiveBusiness` (not `AutoWash`) because schema.org has no dedicated
 * "auto detailing" subtype, and `AutoWash` mischaracterizes the business as
 * an automated car wash. `AutomotiveBusiness` is the closest standard,
 * Google-recognized LocalBusiness type.
 */
export function localBusinessJsonLd(): JsonLdObject {
  const phone = resolved(business.phone);
  const email = resolved(business.email);
  const address = postalAddress();
  const hours = openingHoursSpecification();
  const profiles = sameAs();

  return compact({
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    '@id': `${absoluteUrl('/')}#business`,
    name: business.name,
    legalName: business.legalName,
    url: absoluteUrl('/'),
    description: business.shortDescription,
    slogan: business.tagline,
    telephone: phone ?? undefined,
    email: email ?? undefined,
    priceRange: priceRange(),
    address,
    areaServed: serviceAreas.map((area) => ({
      '@type': 'City',
      name: `${area.name}, ${business.state}`,
    })),
    openingHoursSpecification: hours.length > 0 ? hours : undefined,
    sameAs: profiles.length > 0 ? profiles : undefined,
  });
}

export interface BreadcrumbItem {
  readonly name: string;
  /** Site-relative path, e.g. "/service-area". */
  readonly path: string;
}

export function breadcrumbJsonLd(items: readonly BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** FAQPage schema for a set of published FAQ entries. */
export function faqPageJsonLd(items: readonly Faq[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
