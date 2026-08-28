import { ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ButtonLink, buttonClasses } from '@/components/ui/Button';
import { business } from '@/data/business';
import { primaryCta } from '@/data/navigation';
import { resolved } from '@/lib/todo';
import { analyticsEvents } from '@/lib/analytics/events';
import { TrackedAnchor } from '@/components/analytics/TrackedAnchor';

interface CTASectionProps {
  readonly title?: string;
  readonly description?: string;
}

export function CTASection({
  title = 'Ready for a cleaner vehicle?',
  description = 'Tell us about your vehicle and what it needs. We will come back with a firm price, not a range.',
}: CTASectionProps) {
  const phone = resolved(business.phone);
  const phoneHref = resolved(business.phoneHref);

  return (
    <section aria-labelledby="final-cta-heading" className="border-t border-wv-border bg-wv-offwhite py-16 sm:py-20">
      <Container size="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="final-cta-heading"
              className="text-2xl font-bold tracking-tight text-wv-ink sm:text-3xl lg:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-wv-ink-muted sm:text-lg">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <ButtonLink href={primaryCta.href} variant="primary" size="lg">
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            {phone && phoneHref ? (
              <TrackedAnchor
                href={phoneHref}
                event={analyticsEvents.phoneClicked}
                params={{ placement: 'cta_section' }}
                className={buttonClasses('light', 'lg')}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {phone}
              </TrackedAnchor>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
