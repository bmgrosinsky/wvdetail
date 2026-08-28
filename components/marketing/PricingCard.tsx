import Link from 'next/link';
import { Check } from 'lucide-react';
import type { Service } from '@/types';
import { vehicleClasses } from '@/data/services';
import { primaryCta } from '@/data/navigation';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface PricingCardProps {
  readonly service: Service;
  readonly highlighted?: boolean;
  readonly showIncludes?: boolean;
}

export function PricingCard({
  service,
  highlighted = false,
  showIncludes = true,
}: PricingCardProps) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-lg border bg-wv-surface p-6 transition-colors',
        highlighted ? 'border-wv-red/50' : 'border-wv-border hover:border-wv-border-strong',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold tracking-tight text-wv-text">{service.name}</h3>
        {service.badge ? (
          <span className="shrink-0 rounded-full border border-wv-red/40 bg-wv-red/10 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-wv-red-soft">
            {service.badge}
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-sm leading-relaxed text-wv-muted">{service.summary}</p>

      <dl className="mt-5 divide-y divide-wv-border border-y border-wv-border">
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

      {showIncludes ? (
        <ul className="mt-5 flex-1 space-y-2">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-wv-muted">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-wv-red-soft" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1" />
      )}

      <Link
        href={primaryCta.href}
        className={buttonClasses(highlighted ? 'primary' : 'secondary', 'md', 'mt-6 w-full')}
      >
        {primaryCta.label}
      </Link>
    </article>
  );
}
