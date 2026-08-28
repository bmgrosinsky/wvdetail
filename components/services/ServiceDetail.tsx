import Link from 'next/link';
import { Check } from 'lucide-react';
import type { Service } from '@/types';
import { vehicleClasses } from '@/data/services';
import { buttonClasses } from '@/components/ui/Button';

interface ServiceDetailProps {
  readonly service: Service;
  /** Heading level, so the block fits the page outline. */
  readonly as?: 'h2' | 'h3';
}

/**
 * Full write-up for one service: what it is, what is included,
 * who it suits, and the price for each vehicle class.
 */
export function ServiceDetail({ service, as: Heading = 'h3' }: ServiceDetailProps) {
  const headingId = `${service.slug}-heading`;

  return (
    <article
      id={service.slug}
      aria-labelledby={headingId}
      className="scroll-mt-24 rounded-lg border border-wv-border bg-wv-surface p-6 sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Heading
              id={headingId}
              className="text-xl font-bold tracking-tight text-wv-text sm:text-2xl"
            >
              {service.name}
            </Heading>
            {service.badge ? (
              <span className="rounded-full border border-wv-red/40 bg-wv-red/10 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-wv-red-soft">
                {service.badge}
              </span>
            ) : null}
          </div>

          <p className="mt-3 text-base leading-relaxed text-wv-muted">
            {service.description}
          </p>

          <p className="mt-4 text-sm text-wv-subtle">
            <span className="font-semibold text-wv-text">Ideal for:</span> {service.bestFor}
          </p>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-wv-subtle">
            What is included
          </h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-wv-muted">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-wv-red-soft"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-wv-subtle">
            Price by vehicle size
          </h4>
          <dl className="mt-3 divide-y divide-wv-border border-y border-wv-border">
            {vehicleClasses.map((vehicleClass) => (
              <div
                key={vehicleClass.id}
                className="flex items-baseline justify-between gap-4 py-2.5"
              >
                <dt className="text-sm text-wv-muted">{vehicleClass.label}</dt>
                <dd className="text-base font-semibold text-wv-text">
                  ${service.pricing[vehicleClass.id]}
                </dd>
              </div>
            ))}
          </dl>
          <Link
            href={`/quote?service=${service.slug}`}
            className={buttonClasses('primary', 'md', 'mt-5 w-full')}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
