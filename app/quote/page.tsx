import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { business } from '@/data/business';
import { serviceAreaNames } from '@/data/serviceAreas';
import { serviceOptionValues } from '@/lib/forms/schema';

export const metadata: Metadata = {
  title: { absolute: `Get a Quote | ${business.name}` },
  description: `Request a detailing quote from ${business.name} in ${business.cityState}. Tell us about your vehicle, the service you want, and its condition, and we'll follow up with pricing.`,
  alternates: { canonical: '/quote' },
  openGraph: {
    title: `Get a Quote | ${business.name}`,
    description: `Request a detailing quote from ${business.name} in ${business.cityState}.`,
    url: `${business.siteUrl}/quote`,
    type: 'website',
  },
};

type QuotePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function isServiceOption(value: string): value is (typeof serviceOptionValues)[number] {
  return (serviceOptionValues as readonly string[]).includes(value);
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const areas = serviceAreaNames.slice(0, 4).join(', ');
  const params = await searchParams;
  const requested = params.service;
  const serviceParam = typeof requested === 'string' ? requested : undefined;
  const initialService = serviceParam && isServiceOption(serviceParam) ? serviceParam : '';

  return (
    <div className="bg-wv-black pb-24 sm:pb-20">
      <Container size="narrow" className="pt-12 sm:pt-16 lg:pt-20">
        <header className="mb-8 sm:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
            Get a Quote
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl lg:text-5xl">
            Tell us about your vehicle
          </h1>
          <p className="mt-4 text-base leading-relaxed text-wv-muted sm:text-lg">
            The more you tell us about the vehicle and its condition, the more accurate
            the price we can give you. Serving {areas}, and the surrounding{' '}
            {business.stateFull} area.
          </p>
        </header>

        <QuoteForm initialService={initialService} />
      </Container>
    </div>
  );
}
