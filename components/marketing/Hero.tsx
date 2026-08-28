import { ArrowRight, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { business } from '@/data/business';
import { primaryCta, secondaryCta } from '@/data/navigation';
import { services, startingPrice } from '@/data/services';

const lowestPrice = Math.min(...services.map(startingPrice));

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-wv-border bg-wv-black">
      <div className="wv-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-wv-red/60"
        aria-hidden="true"
      />
      <Container size="wide" className="relative py-20 sm:py-24 lg:py-32">
        <div className="max-w-3xl wv-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-wv-border bg-wv-surface px-3 py-1 text-xs font-medium text-wv-muted">
            <MapPin className="h-3.5 w-3.5 text-wv-red-soft" aria-hidden="true" />
            Serving {business.cityState} and surrounding areas
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-wv-text sm:text-5xl lg:text-6xl">
            Auto Detailing in Jackson, MI
          </h1>

          <p className="mt-3 text-lg font-semibold tracking-tight text-wv-red-soft sm:text-xl">
            {business.tagline}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-wv-muted sm:text-lg">
            Interior, exterior, and complete detailing for daily drivers in Jackson
            County. Starting prices are published by vehicle size. You get a firm
            quote before any work begins.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={primaryCta.href} variant="primary" size="lg">
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-wv-subtle">
            Services starting at ${lowestPrice}. Pricing confirmed before any work begins.
          </p>
        </div>
      </Container>
    </section>
  );
}
