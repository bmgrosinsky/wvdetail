import Link from 'next/link';
import { Info } from 'lucide-react';
import { conditionDisclaimer, oversizeNote } from '@/data/services';
import { jacksonServesDiscount } from '@/data/promotions';

/** Condition/pricing disclaimer. Render this near any price display. */
export function PricingNote() {
  return (
    <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-6">
      <div className="flex items-start gap-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-wv-red-soft" aria-hidden="true" />
        <div>
          <h3 className="text-sm font-bold tracking-tight text-wv-text">
            About these prices
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-wv-muted">{conditionDisclaimer}</p>
          <p className="mt-3 text-sm text-wv-subtle">Oversized vehicles: {oversizeNote}.</p>
          <p className="mt-3 text-sm text-wv-subtle">
            Military, veterans, police, fire, EMS, corrections, hospital, and teachers:
            ask about the{' '}
            <Link
              href="/offers"
              className="font-medium text-wv-red-soft hover:text-wv-text"
            >
              {jacksonServesDiscount.name} discount
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
