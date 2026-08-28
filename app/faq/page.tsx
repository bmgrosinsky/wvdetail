import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { CTASection } from '@/components/marketing/CTASection';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
import { publishedFaqs } from '@/data/faqs';
import { business } from '@/data/business';
import type { Faq, FaqCategory } from '@/types';

export const metadata: Metadata = {
  title: { absolute: `FAQ | ${business.name}` },
  description: `Answers to common questions about detailing services, pricing, vehicle sizes, and preparation from ${business.name} in ${business.cityState}.`,
  alternates: { canonical: '/faq' },
};

/** Display order for the grouped sections. Operational FAQs stay excluded. */
const groupOrder: readonly FaqCategory[] = [
  'services',
  'pricing',
  'vehicles',
  'preparation',
  'area',
  'booking',
];

const groupLabels: Record<FaqCategory, string> = {
  services: 'Services and results',
  pricing: 'Pricing',
  vehicles: 'Vehicles and sizing',
  preparation: 'Before your appointment',
  area: 'Service area',
  booking: 'Quotes and booking',
  operations: 'Hours and logistics',
};

export default function FaqPage() {
  const groups = groupOrder
    .map((category) => ({
      category,
      items: publishedFaqs.filter((faq: Faq) => faq.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <FaqJsonLd items={publishedFaqs} />

      <section className="border-b border-wv-border bg-wv-black pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
              FAQ
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl lg:text-5xl">
              Questions we get asked
            </h1>
            <p className="mt-5 text-base leading-relaxed text-wv-muted sm:text-lg">
              Straight answers about what our services cover, how pricing works,
              and what detailing can realistically do for your vehicle. If your
              question is not here, ask us on the quote form.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="dark" containerSize="default" ariaLabel="Frequently asked questions">
        <div className="space-y-14">
          {groups.map((group) => (
            <div key={group.category}>
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-wv-subtle">
                {groupLabels[group.category]}
              </h2>
              <FAQAccordion items={group.items} />
            </div>
          ))}
        </div>

        {/*
          Operational FAQs (hours, payment methods, mobile vs. shop-based
          service, weather policy) are marked `todo: true` in data/faqs.ts and
          stay hidden until those answers are verified. Do not answer them here.
        */}

        <div className="mt-14 rounded-lg border border-wv-border bg-wv-surface p-6 sm:p-8">
          <h2 className="text-lg font-bold tracking-tight text-wv-text">
            Still have a question?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-wv-muted">
            Send it along with your quote request. Photos of the vehicle help us
            give you a real answer instead of a guess.
          </p>
          <div className="mt-6">
            <ButtonLink href="/quote" variant="primary" size="md">
              Get a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
