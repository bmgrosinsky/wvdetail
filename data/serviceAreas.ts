import type { ServiceArea } from '@/types';

export const serviceAreas: readonly ServiceArea[] = [
  { slug: 'jackson', name: 'Jackson', county: 'Jackson County', primary: true },
  {
    slug: 'michigan-center',
    name: 'Michigan Center',
    county: 'Jackson County',
    primary: false,
  },
  {
    slug: 'blackman-township',
    name: 'Blackman Township',
    county: 'Jackson County',
    primary: false,
  },
  {
    slug: 'summit-township',
    name: 'Summit Township',
    county: 'Jackson County',
    primary: false,
  },
  { slug: 'grass-lake', name: 'Grass Lake', county: 'Jackson County', primary: false },
  { slug: 'napoleon', name: 'Napoleon', county: 'Jackson County', primary: false },
  { slug: 'brooklyn', name: 'Brooklyn', county: 'Jackson County', primary: false },
];

export const serviceAreaNames: readonly string[] = serviceAreas.map(
  (area) => area.name,
);
