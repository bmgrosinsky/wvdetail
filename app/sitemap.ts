import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo/config';

interface SitemapEntry {
  readonly path: string;
  readonly priority: number;
  readonly changeFrequency: 'weekly' | 'monthly' | 'yearly';
}

const routes: readonly SitemapEntry[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/interior-detailing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/exterior-detailing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/complete-detailing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/reviews', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/quote', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/service-area', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/service-area/jackson-mi', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
