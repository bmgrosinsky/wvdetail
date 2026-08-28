import type { JsonLdObject } from '@/lib/seo/jsonLd';

interface JsonLdProps {
  readonly id: string;
  readonly data: JsonLdObject;
}

/**
 * Renders a structured-data block. Server-rendered only: no client JS.
 * `<` is escaped so the payload can never close the script tag early.
 */
export function JsonLd({ id, data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
