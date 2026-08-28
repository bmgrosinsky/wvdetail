'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { business } from '@/data/business';
import { primaryCta } from '@/data/navigation';
import { resolved } from '@/lib/todo';
import { buttonClasses } from '@/components/ui/Button';
import { analyticsEvents } from '@/lib/analytics/events';
import { TrackedAnchor } from '@/components/analytics/TrackedAnchor';

// Pages where a "Get Quote" CTA would be redundant with the page's own content.
const HIDDEN_ON = ['/quote', '/contact'];

/**
 * Restrained sticky action bar, mobile only.
 * The Call action is omitted entirely until a verified phone number exists.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const phoneHref = resolved(business.phoneHref);

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-wv-border bg-wv-black/95 backdrop-blur sm:hidden">
      <div className="flex gap-2.5 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        <Link href={primaryCta.href} className={buttonClasses('primary', 'md', 'flex-1')}>
          Get Quote
        </Link>
        {phoneHref ? (
          <TrackedAnchor
            href={phoneHref}
            event={analyticsEvents.phoneClicked}
            params={{ placement: 'mobile_action_bar' }}
            className={buttonClasses('secondary', 'md', 'flex-1')}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call
          </TrackedAnchor>
        ) : null}
      </div>
    </div>
  );
}
