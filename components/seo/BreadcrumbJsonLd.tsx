import { JsonLd } from './JsonLd';
import { breadcrumbJsonLd, type BreadcrumbItem } from '@/lib/seo/jsonLd';

interface BreadcrumbJsonLdProps {
  readonly items: readonly BreadcrumbItem[];
  /** Unique element id when a page renders more than one JSON-LD block. */
  readonly id?: string;
}

export function BreadcrumbJsonLd({ items, id = 'ld-breadcrumb' }: BreadcrumbJsonLdProps) {
  return <JsonLd id={id} data={breadcrumbJsonLd(items)} />;
}
