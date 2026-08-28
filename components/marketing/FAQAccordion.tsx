'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Faq } from '@/types';
import { cn } from '@/lib/cn';

interface FAQAccordionProps {
  readonly items: readonly Faq[];
  /** id of the item open on first render. */
  readonly defaultOpenId?: string;
}

export function FAQAccordion({ items, defaultOpenId }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-wv-border border-y border-wv-border">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-wv-text"
              >
                <span
                  className={cn(
                    'text-base font-semibold tracking-tight',
                    isOpen ? 'text-wv-text' : 'text-wv-text/90',
                  )}
                >
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'h-5 w-5 shrink-0 text-wv-subtle transition-transform duration-200',
                    isOpen && 'rotate-180 text-wv-red-soft',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5"
            >
              <p className="max-w-2xl text-sm leading-relaxed text-wv-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
