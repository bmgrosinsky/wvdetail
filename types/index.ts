/**
 * Shared domain types for the WV Detail website.
 * Strict TypeScript: no `any` anywhere in this project.
 */

/** A value that has not been verified yet is stored as a "TODO: ..." string. */
export type MaybeTodo = string;

export interface BusinessHours {
  readonly day: string;
  /** e.g. "9:00 AM - 6:00 PM" or a TODO placeholder. */
  readonly hours: MaybeTodo;
}

export interface Business {
  readonly name: string;
  readonly legalName: string;
  readonly tagline: string;
  readonly shortDescription: string;
  readonly city: string;
  readonly state: string;
  readonly stateFull: string;
  readonly cityState: string;
  readonly phone: MaybeTodo;
  readonly phoneHref: MaybeTodo;
  readonly email: MaybeTodo;
  readonly addressLine: MaybeTodo;
  readonly facebookUrl: MaybeTodo;
  readonly instagramUrl: MaybeTodo;
  readonly googleProfileUrl: MaybeTodo;
  readonly googleReviewsUrl: MaybeTodo;
  readonly hours: readonly BusinessHours[];
  readonly siteUrl: string;
}

/** Vehicle size classes used for tiered pricing. */
export type VehicleClass = 'car' | 'midsize' | 'large';

export interface VehicleClassInfo {
  readonly id: VehicleClass;
  readonly label: string;
  readonly examples: string;
}

/** Price in whole US dollars per vehicle class. */
export type PriceTiers = {
  readonly [K in VehicleClass]: number;
};

export type ServiceCategory = 'interior' | 'exterior' | 'complete';

export interface Service {
  readonly slug: string;
  readonly name: string;
  readonly category: ServiceCategory;
  /** One sentence, benefit-led. Used on cards. */
  readonly summary: string;
  /** Longer paragraph for the services page. */
  readonly description: string;
  readonly includes: readonly string[];
  readonly bestFor: string;
  readonly pricing: PriceTiers;
  /** Optional short label rendered as a badge on pricing cards. */
  readonly badge?: string;
  /** Show on the homepage "Featured Services" section. */
  readonly featured: boolean;
}

export interface AddOn {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  /** Display-ready price string, e.g. "$60", "$50-$100+", "Quote-based". */
  readonly price: string;
}

export type FaqCategory =
  | 'services'
  | 'pricing'
  | 'vehicles'
  | 'preparation'
  | 'area'
  | 'booking'
  | 'operations';

export interface Faq {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category: FaqCategory;
  /**
   * True when the answer depends on unverified operational details.
   * These entries are excluded from rendering until confirmed.
   */
  readonly todo: boolean;
  /** Show in the homepage FAQ preview. */
  readonly featured: boolean;
}

export interface Review {
  readonly id: string;
  readonly author: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly body: string;
  /** ISO date string, e.g. "2026-01-31". */
  readonly date: string;
  readonly source: 'google' | 'facebook';
  readonly sourceUrl?: string;
}

/** Gallery entries reuse the service categories so filters stay consistent. */
export type GalleryCategory = ServiceCategory;

/**
 * A paired before/after photo of real work. Never populated with stock
 * photography or generated imagery.
 */
export interface GalleryItem {
  readonly id: string;
  readonly category: GalleryCategory;
  /** Short label, e.g. "Interior deep clean". */
  readonly title: string;
  /** Optional one-line note about what was done. */
  readonly note?: string;
  /** Path under /public, e.g. "/gallery/0001-before.jpg". */
  readonly beforeSrc: string;
  readonly afterSrc: string;
  /** Descriptive alt text for each image. Required for accessibility. */
  readonly beforeAlt: string;
  readonly afterAlt: string;
  /** Intrinsic pixel dimensions of the pair (both images share them). */
  readonly width: number;
  readonly height: number;
}

export interface ServiceArea {
  readonly slug: string;
  readonly name: string;
  readonly county: string;
  readonly primary: boolean;
}

export interface NavLink {
  readonly label: string;
  readonly href: string;
}
