import type { Faq } from '@/types';
import { JsonLd } from './JsonLd';
import { faqPageJsonLd } from '@/lib/seo/jsonLd';

interface FaqJsonLdProps {
  /** Pass only published (non-TODO) FAQ entries that are visible on the page. */
  readonly items: readonly Faq[];
  readonly id?: string;
}

/**
 * Reusable FAQPage structured data. Google requires the questions and answers
 * to be visible on the page that emits this schema.
 */
export function FaqJsonLd({ items, id = 'ld-faq' }: FaqJsonLdProps) {
  if (items.length === 0) return null;
  return <JsonLd id={id} data={faqPageJsonLd(items)} />;
}
