import type { AddOn } from '@/types';
import { addOns as allAddOns } from '@/data/addons';

interface AddonListProps {
  readonly headingId?: string;
  readonly heading?: string;
  readonly intro?: string;
  /** Limit the list to these slugs. Defaults to every add-on. */
  readonly slugs?: readonly string[];
}

export function AddonList({
  headingId = 'addons-heading',
  heading = 'Add-ons',
  intro,
  slugs,
}: AddonListProps) {
  const items: readonly AddOn[] = slugs
    ? allAddOns.filter((addOn) => slugs.includes(addOn.slug))
    : allAddOns;

  if (items.length === 0) return null;

  return (
    <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-6">
      <h3 id={headingId} className="text-base font-bold tracking-tight text-wv-text">
        {heading}
      </h3>
      {intro ? (
        <p className="mt-2 text-sm leading-relaxed text-wv-muted">{intro}</p>
      ) : null}
      <dl className="mt-4 divide-y divide-wv-border border-y border-wv-border">
        {items.map((addOn) => (
          <div key={addOn.slug} className="py-3">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm font-semibold text-wv-text">{addOn.name}</dt>
              <dd className="shrink-0 text-sm font-semibold text-wv-text">{addOn.price}</dd>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-wv-muted">{addOn.description}</p>
          </div>
        ))}
      </dl>
    </div>
  );
}
