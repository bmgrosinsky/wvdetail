import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types';
import { categoryHref, startingPrice } from '@/data/services';
import { buttonClasses } from '@/components/ui/Button';

interface ServiceCardProps {
  readonly service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const price = startingPrice(service);

  return (
    <article className="flex h-full flex-col rounded-lg border border-wv-border bg-wv-surface p-6 transition-colors hover:border-wv-border-strong">
      {service.badge ? (
        <p className="mb-3 inline-flex w-fit rounded-full border border-wv-red/40 bg-wv-red/10 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-wv-red-soft">
          {service.badge}
        </p>
      ) : null}

      <h3 className="text-lg font-bold tracking-tight text-wv-text">{service.name}</h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-wv-muted">{service.summary}</p>

      <p className="mt-5 text-sm text-wv-subtle">
        Starting at{' '}
        <span className="text-xl font-bold text-wv-text">${price}</span>
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-wv-border pt-5">
        <Link href={`/quote?service=${service.slug}`} className={buttonClasses('primary', 'sm')}>
          Get a Quote
        </Link>
        <Link
          href={`${categoryHref(service.category)}#${service.slug}`}
          className="-my-2 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-wv-muted transition-colors hover:text-wv-text"
        >
          Details
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
