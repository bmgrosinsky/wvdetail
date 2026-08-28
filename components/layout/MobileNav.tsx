'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { mainNav, primaryCta } from '@/data/navigation';
import { business } from '@/data/business';
import { resolved } from '@/lib/todo';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { analyticsEvents } from '@/lib/analytics/events';
import { trackEvent } from '@/lib/analytics/gtag';

export function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const phone = resolved(business.phone);
  const phoneHref = resolved(business.phoneHref);

  // Lock scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-wv-border text-wv-text transition-colors hover:bg-wv-surface-2"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" id="mobile-menu">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70"
          />
          <div
            ref={panelRef}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-wv-border bg-wv-surface outline-none"
          >
            <div className="flex h-16 items-center justify-between border-b border-wv-border px-5">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-wv-subtle">
                Menu
              </span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-wv-border text-wv-text transition-colors hover:bg-wv-surface-2"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="flex flex-col gap-1">
                {mainNav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'block rounded-md px-3 py-3 text-lg font-medium transition-colors',
                          active
                            ? 'bg-wv-surface-2 text-wv-text'
                            : 'text-wv-muted hover:bg-wv-surface-2 hover:text-wv-text',
                        )}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-wv-border px-5 py-5">
              <Link
                href={primaryCta.href}
                onClick={() => setOpen(false)}
                className={buttonClasses('primary', 'lg', 'w-full')}
              >
                {primaryCta.label}
              </Link>
              {phone && phoneHref ? (
                <a
                  href={phoneHref}
                  onClick={() =>
                    trackEvent(analyticsEvents.phoneClicked, { placement: 'mobile_nav' })
                  }
                  className={buttonClasses('secondary', 'lg', 'mt-3 w-full')}
                >
                  Call {phone}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
