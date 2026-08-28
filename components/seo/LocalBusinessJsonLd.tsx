import { JsonLd } from './JsonLd';
import { localBusinessJsonLd } from '@/lib/seo/jsonLd';

/**
 * Site-wide LocalBusiness (AutomotiveBusiness) structured data.
 * Only verified fields from `data/business.ts` are emitted.
 */
export function LocalBusinessJsonLd() {
  return <JsonLd id="ld-local-business" data={localBusinessJsonLd()} />;
}
