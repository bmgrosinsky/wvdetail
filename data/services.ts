import type { Service, VehicleClass, VehicleClassInfo } from '@/types';

export const vehicleClasses: readonly VehicleClassInfo[] = [
  {
    id: 'car',
    label: 'Car',
    examples: 'Sedans, coupes, hatchbacks, small crossovers',
  },
  {
    id: 'midsize',
    label: 'Mid-size',
    examples: 'Mid-size SUVs, crossovers, small trucks',
  },
  {
    id: 'large',
    label: 'Large',
    examples: 'Full-size SUVs, trucks, minivans, 3-row vehicles',
  },
];

/** Copy used anywhere an oversized or unusual vehicle needs a price. */
export const oversizeNote = 'Contact us for pricing';

/** Shown near any pricing display. */
export const conditionDisclaimer =
  'Prices are starting estimates for normally soiled vehicles. Heavy pet hair, severe staining, odors, excessive dirt, unusual contamination, or oversized vehicles may require additional pricing.';

export const services: readonly Service[] = [
  {
    slug: 'interior-refresh',
    name: 'Interior Refresh',
    category: 'interior',
    summary:
      'A thorough clean-up of the cabin that makes a well-kept vehicle feel new again.',
    description:
      'A straightforward interior clean for vehicles that are already reasonably well maintained. We vacuum throughout, wipe down the main touch surfaces, clean the mats and interior glass, and leave the cabin looking sharp.',
    includes: [
      'Full interior vacuum',
      'Dash, console, and door panels wiped down',
      'Floor mats cleaned',
      'Interior glass cleaned',
      'Light surface cleaning throughout',
    ],
    bestFor: 'Normally maintained vehicles',
    pricing: { car: 75, midsize: 90, large: 110 },
    featured: true,
  },
  {
    slug: 'deep-interior-detail',
    name: 'Deep Interior Detail',
    category: 'interior',
    summary:
      'A full interior reset for vehicles that need more than a wipe-down.',
    description:
      'Everything in the Interior Refresh plus detailed work on the surfaces that ordinary cleaning misses: carpets and seats are cleaned, crevices and seams are worked by hand, leather is cleaned and conditioned where applicable, and door jambs are finished.',
    includes: [
      'Everything in the Interior Refresh',
      'Detailed cleaning of interior surfaces',
      'Carpet and seat cleaning',
      'Crevice and seam detail work',
      'Leather cleaned and conditioned (where applicable)',
      'Door jambs cleaned',
    ],
    bestFor: 'Vehicles with built-up dirt, spills, or daily-driver wear',
    pricing: { car: 150, midsize: 175, large: 200 },
    featured: true,
  },
  {
    slug: 'exterior-detail',
    name: 'Exterior Detail',
    category: 'exterior',
    summary:
      'A careful hand wash with wheels, glass, and a protective sealant finish.',
    description:
      'A proper hand wash rather than a tunnel run. Wheels and tires are cleaned and dressed, exterior glass is finished clean, and a sealant is applied to help the paint stay protected.',
    includes: [
      'Hand wash',
      'Wheels cleaned',
      'Tires cleaned and dressed',
      'Exterior glass cleaned',
      'Paint sealant applied',
    ],
    bestFor: 'Regular upkeep between deeper details',
    pricing: { car: 75, midsize: 90, large: 105 },
    featured: true,
  },
  {
    slug: 'exterior-detail-decontamination',
    name: 'Exterior Detail + Decontamination',
    category: 'exterior',
    summary:
      'A deeper exterior clean that removes bonded contamination washing leaves behind.',
    description:
      'Everything in the Exterior Detail plus paint decontamination, with clay used where appropriate to lift bonded contaminants a wash cannot. Longer-lasting protection is applied and exterior trim is treated.',
    includes: [
      'Everything in the Exterior Detail',
      'Paint decontamination',
      'Clay treatment where appropriate',
      'Longer-lasting paint protection',
      'Exterior trim treated',
    ],
    bestFor: 'Paint that feels rough or has not been decontaminated recently',
    pricing: { car: 125, midsize: 145, large: 165 },
    featured: false,
  },
  {
    slug: 'complete-detail',
    name: 'Complete Detail',
    category: 'complete',
    summary: 'Inside and out in one visit, at a better price than booking both.',
    description:
      'The Interior Refresh paired with the Exterior Detail. A practical option when the whole vehicle needs attention but nothing is badly neglected.',
    includes: ['Everything in the Interior Refresh', 'Everything in the Exterior Detail'],
    bestFor: 'A full clean-up of a normally maintained vehicle',
    pricing: { car: 140, midsize: 165, large: 195 },
    featured: false,
  },
  {
    slug: 'deep-complete-detail',
    name: 'Deep Complete Detail',
    category: 'complete',
    summary:
      'Our most thorough service, top to bottom, inside and out.',
    description:
      'The flagship service. Deep interior work paired with a decontaminated, sealed exterior, so the whole vehicle is brought back as far as cleaning can take it.',
    includes: [
      'Everything in the Deep Interior Detail',
      'Everything in the Exterior Detail + Decontamination',
      'Door jambs, crevices, and trim finished throughout',
    ],
    bestFor: 'A full reset',
    pricing: { car: 225, midsize: 255, large: 285 },
    badge: 'Best for a full reset',
    featured: true,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const featuredServices: readonly Service[] = services.filter(
  (service) => service.featured,
);

/** Lowest tier price, used for "starting at" copy. */
export function startingPrice(service: Service): number {
  const tiers: readonly VehicleClass[] = ['car', 'midsize', 'large'];
  return Math.min(...tiers.map((tier) => service.pricing[tier]));
}
