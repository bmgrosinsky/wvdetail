import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: 'Page not found',
  description: `That page does not exist. Find detailing services, pricing, and quotes from ${business.name} in ${business.cityState}.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-wv-black py-20 sm:py-28">
      <Container size="default">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
            404 &middot; {business.name}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl lg:text-5xl">
            We could not find that page
          </h1>
          <p className="mt-5 text-base leading-relaxed text-wv-muted sm:text-lg">
            The link may be out of date or the address may have a typo. Here is
            where most people are headed.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/quote" variant="primary" size="lg">
              Get a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="lg">
              View Services
            </ButtonLink>
            <ButtonLink href="/" variant="secondary" size="lg">
              Back to Home
            </ButtonLink>
          </div>

          <p className="mt-10 text-sm text-wv-subtle">{business.tagline}</p>
        </div>
      </Container>
    </section>
  );
}
