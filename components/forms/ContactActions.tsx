import { ArrowRight, ExternalLink, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';
import { business } from '@/data/business';
import { primaryCta } from '@/data/navigation';
import { resolved } from '@/lib/todo';
import { buttonClasses } from '@/components/ui/Button';

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
        <a href={phoneHref} className={buttonClasses('primary', 'lg')}>
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {phone}
        </a>
      ) : null}

      {phone && smsHref ? (
        <a href={smsHref} className={buttonClasses('secondary', 'lg')}>
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Text {phone}
        </a>
      ) : null}

      <Link
        href={primaryCta.href}
        className={buttonClasses(phone ? 'secondary' : 'primary', 'lg')}
      >
        {primaryCta.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>

      {facebookUrl ? (
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses('secondary', 'lg')}
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Facebook
        </a>
      ) : null}
    </div>
  );
}
