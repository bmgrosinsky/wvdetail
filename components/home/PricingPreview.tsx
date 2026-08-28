import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PricingCard } from '@/components/marketing/PricingCard';
import {
  conditionDisclaimer,
  getService,
  oversizeNote,
  vehicleClasses,
} from '@/data/services';
import { addOns } from '@/data/addons';
import type { Service } from '@/types';

const previewSlugs: readonly string[] = [
  'interior-refresh',
  'complete-detail',
  'deep-complete-detail',
];

const previewServices: readonly Service[] = previewSlugs
  .map(getService)
  .filter((service): service is Service => service !== undefined);

export function PricingPreview() {
  return (
    <Section tone="surface" containerSize="wide" ariaLabelledBy="pricing-heading">
      <SectionHeading
        id="pricing-heading"
        eyebrow="Pricing"
        title="Priced by vehicle size, not by guesswork"
        description="Three vehicle classes, one published price for each. Oversized or unusual vehicles are quoted individually."
      />

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {vehicleClasses.map((vehicleClass) => (
          <div
            key={vehicleClass.id}
            className="rounded-lg border border-wv-border bg-wv-surface-2 px-4 py-3"
          >
            <dt className="text-sm font-semibold text-wv-text">{vehicleClass.label}</dt>
            <dd className="mt-1 text-sm text-wv-muted">{vehicleClass.examples}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {previewServices.map((service) => (
          <PricingCard
            key={service.slug}
            service={service}
            highlighted={service.slug === 'deep-complete-detail'}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-6 lg:col-span-2">
          <h3 className="text-base font-bold tracking-tight text-wv-text">Add-ons</h3>
          <dl className="mt-4 divide-y divide-wv-border border-y border-wv-border">
            {addOns.map((addOn) => (
              <div
                key={addOn.slug}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="text-sm text-wv-muted">{addOn.name}</dt>
                <dd className="shrink-0 text-sm font-semibold text-wv-text">{addOn.price}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-6">
          <div className="flex items-start gap-2.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-wv-red-soft" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-bold tracking-tight text-wv-text">
                About these prices
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-wv-muted">
                {conditionDisclaimer}
              </p>
              <p className="mt-3 text-sm text-wv-subtle">
                Oversized vehicles: {oversizeNote}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-wv-text transition-colors hover:text-wv-red-soft"
        >
          See full pricing for every service
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </p>
    </Section>
  );
}
