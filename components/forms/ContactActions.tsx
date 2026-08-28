import { ArrowRight, ExternalLink, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';
import { business } from '@/data/business';
import { primaryCta } from '@/data/navigation';
import { resolved } from '@/lib/todo';
import { buttonClasses } from '@/components/ui/Button';
import { analyticsEvents } from '@/lib/analytics/events';
import { TrackedAnchor } from '@/components/analytics/TrackedAnchor';

/**
 * Tap-friendly contact actions. Anything still unverified in `data/business.ts`
 * (a "TODO: ..." value) is simply not rendered.
 */
export function ContactActions() {
  const phone = resolved(business.phone);
  const phoneHref = resolved(business.phoneHref);
  const smsHref = phoneHref ? phoneHref.replace(/^tel:/, 'sms:') : null;
  const facebookUrl = resolved(business.facebookUrl);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {phone && phoneHref ? (
        <TrackedAnchor
          href={phoneHref}
          event={analyticsEvents.phoneClicked}
          params={{ placement: 'contact_actions' }}
          className={buttonClasses('primary', 'lg')}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {phone}
        </TrackedAnchor>
      ) : null}

      {phone && smsHref ? (
        <TrackedAnchor
          href={smsHref}
          event={analyticsEvents.textClicked}
          params={{ placement: 'contact_actions' }}
          className={buttonClasses('secondary', 'lg')}
        >
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Text {phone}
        </TrackedAnchor>
      ) : null}

      <Link
        href={primaryCta.href}
        className={buttonClasses(phone ? 'secondary' : 'primary', 'lg')}
      >
        {primaryCta.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>

      {facebookUrl ? (
        <TrackedAnchor
          href={facebookUrl}
          event={analyticsEvents.facebookClicked}
          params={{ placement: 'contact_actions' }}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses('secondary', 'lg')}
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Facebook
        </TrackedAnchor>
      ) : null}
    </div>
  );
}
