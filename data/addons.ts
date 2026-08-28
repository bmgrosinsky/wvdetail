import type { AddOn } from '@/types';

export const addOns: readonly AddOn[] = [
  {
    slug: 'engine-bay',
    name: 'Engine Bay Cleaning',
    description: 'Careful cleaning and dressing of the engine bay.',
    price: '$60',
  },
  {
    slug: 'pet-hair-removal',
    name: 'Pet Hair Removal',
    description:
      'Dedicated removal of embedded pet hair from carpets and upholstery.',
    price: '$40+',
  },
  {
    slug: 'stain-treatment',
    name: 'Stain Treatment / Extraction',
    description:
      'Targeted treatment and hot-water extraction for set-in stains and spills.',
    price: '$50-$100+',
  },
  {
    slug: 'odor-treatment',
    name: 'Odor Treatment',
    description: 'Treatment aimed at the source of lingering cabin odors.',
    price: '$50-$60+',
  },
  {
    slug: 'undercarriage-rinse',
    name: 'Undercarriage Rinse',
    description:
      'A rinse of the undercarriage, useful after a Michigan winter of road salt.',
    price: 'Quote-based',
  },
];
