/**
 * Standing "Jackson Serves" discount for military, veterans, and the local
 * public-service/care workforce. Unlike the session-based `PROMO_*` values in
 * `lib/promo.ts` (a time-boxed "Book Now" incentive), this discount has no
 * expiration - it is always available to anyone who qualifies.
 */

export const discountEligibilityValues = [
  'military',
  'veteran',
  'police',
  'fire',
  'ems',
  'corrections',
  'hospital',
  'teacher',
] as const;

export type DiscountEligibility = (typeof discountEligibilityValues)[number];

export const discountEligibilityOptions: readonly {
  readonly value: DiscountEligibility;
  readonly label: string;
}[] = [
  { value: 'military', label: 'Active-duty military' },
  { value: 'veteran', label: 'Veteran' },
  { value: 'police', label: 'Police' },
  { value: 'fire', label: 'Firefighter' },
  { value: 'ems', label: 'EMS' },
  { value: 'corrections', label: 'Corrections officer' },
  { value: 'hospital', label: 'Hospital staff' },
  { value: 'teacher', label: 'Teacher' },
];

export const jacksonServesDiscount = {
  name: 'Jackson Serves',
  threshold: 150,
  discountAboveThreshold: 20,
  discountBelowThreshold: 10,
  idNote: 'Valid ID required at time of service.',
  summary:
    '$20 off any service $150 or more, $10 off anything below that - for military, veterans, police, fire, EMS, corrections officers, hospital staff, and teachers.',
} as const;
