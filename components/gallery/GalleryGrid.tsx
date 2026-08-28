'use client';

import { useMemo, useState } from 'react';
import type { GalleryCategory, GalleryItem } from '@/types';
import { cn } from '@/lib/cn';
import { galleryCategoryLabels } from '@/data/gallery';
import { BeforeAfterComparison } from './BeforeAfterComparison';

type Filter = GalleryCategory | 'all';

interface GalleryGridProps {
  readonly items: readonly GalleryItem[];
  /** Categories offered as filters. Pass an empty list to hide the filter bar. */
  readonly categories: readonly GalleryCategory[];
  readonly showFilters: boolean;
}

export function GalleryGrid({ items, categories, showFilters }: GalleryGridProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo<readonly GalleryItem[]>(
    () => (filter === 'all' ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  const filtersEnabled = showFilters && categories.length > 1;
  const options: readonly Filter[] = ['all', ...categories];

  return (
    <div>
      {filtersEnabled ? (
        <div
          role="group"
          aria-label="Filter photos by service type"
          className="mb-8 flex flex-wrap gap-2"
        >
          {options.map((option) => {
            const active = filter === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option)}
                className={cn(
                  'h-9 rounded-md border px-4 text-sm font-semibold tracking-tight transition-colors',
                  active
                    ? 'border-wv-text-subtle bg-wv-surface-2 text-wv-text'
                    : 'border-wv-border text-wv-muted hover:border-wv-border-strong hover:text-wv-text',
                )}
              >
                {option === 'all' ? 'All work' : galleryCategoryLabels[option]}
              </button>
            );
          })}
        </div>
      ) : null}

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <li key={item.id}>
            <BeforeAfterComparison item={item} priority={index === 0} />
          </li>
        ))}
      </ul>

      <p aria-live="polite" className="mt-6 text-sm text-wv-subtle">
        Showing {visible.length} of {items.length} {items.length === 1 ? 'pair' : 'pairs'}.
      </p>
    </div>
  );
}
