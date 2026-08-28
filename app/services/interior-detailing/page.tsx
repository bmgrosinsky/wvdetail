import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { CTASection } from '@/components/marketing/CTASection';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { ServicePageHeader } from '@/components/services/ServicePageHeader';
import { ServiceDetail } from '@/components/services/ServiceDetail';
import { VehicleSizeGuide } from '@/components/services/VehicleSizeGuide';
import { AddonList } from '@/components/services/AddonList';
import { PricingNote } from '@/components/services/PricingNote';
import { TrackOnView } from '@/components/analytics/TrackOnView';
import { getService } from '@/data/services';
import { publishedFaqs } from '@/data/faqs';
import { primaryCta } from '@/data/navigation';
import { business } from '@/data/business';
import { analyticsEvents } from '@/lib/analytics/events';
import type { Faq, Service } from '@/types';

export const metadata: Metadata = {
  title: { absolute: `Interior Detailing in ${business.cityState} | ${business.name}` },
  description: `Interior detailing in ${business.cityState}. Vacuuming, carpets and seats, pet hair, salt and stain work, priced by vehicle size. Get a firm quote.`,
  alternates: { canonical: '/services/interior-detailing' },
};

const interiorSlugs: readonly string[] = ['interior-refresh', 'deep-interior-detail'];

const interiorServices: readonly Service[] = interiorSlugs
  .map(getService)
  .filter((service): service is Service => service !== undefined);

const faqIds: readonly string[] = [
  'which-service',
  'pet-hair',
  'stains-odors',
  'belongings',
  'condition-pricing',
];

const faqs: readonly Faq[] = publishedFaqs.filter((faq) => faqIds.includes(faq.id));

export default function InteriorDetailingPage() {
  return (
    <>
      <TrackOnView event={analyticsEvents.serviceViewed} params={{ category: 'interior' }} />

      <ServicePageHeader
        eyebrow="Interior detailing"
        title={`Interior detailing in ${business.cityState}`}
        description="Two levels of interior work: a refresh for a vehicle you already keep up with, and a deep detail for one that has taken a few Michigan winters of salt, spills, and daily use."
      >
        <ButtonLink href={primaryCta.href} variant="primary" size="lg">
          {primaryCta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </ServicePageHeader>

      <Section tone="dark" containerSize="wide" ariaLabelledBy="interior-services-heading">
        <SectionHeading
          id="interior-services-heading"
          eyebrow="Pricing"
          title="Two interior services, priced by vehicle size"
          description="If the cabin is tidy and just needs cleaning up, the Refresh is enough. If dirt has worked into the carpet and seats, the Deep Interior Detail is the one that fixes it."
        />

        <div className="mt-8 grid gap-5">
          {interiorServices.map((service) => (
            <ServiceDetail key={service.slug} service={service} as="h2" />
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <VehicleSizeGuide />
          <PricingNote />
        </div>
      </Section>

      <Section tone="surface" containerSize="wide" ariaLabelledBy="interior-detail-heading">
        <SectionHeading
          id="interior-detail-heading"
          eyebrow="What to expect"
          title="The parts customers ask about most"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-6">
            <h3 className="text-base font-bold tracking-tight text-wv-text">Pet hair</h3>
            <p className="mt-3 text-sm leading-relaxed text-wv-muted">
              Loose hair vacuums out with the rest of the interior. Hair that has woven
              itself into carpet fibers and upholstery does not, and pulling it out takes
              dedicated hand and tool work well beyond a normal vacuum pass. That is why
              pet hair removal is a separate add-on rather than something folded into the
              base price: the amount of hair and how deeply it is embedded change the job
              substantially.
            </p>
          </div>

          <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-6">
            <h3 className="text-base font-bold tracking-tight text-wv-text">
              Stains, and what is realistic
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-wv-muted">
              Most stains improve a lot and many come out completely. Some do not. Coffee,
              soda, and mud usually respond well. Dye transfer, ink, bleach, sun-faded
              areas, and anything that has sat through a summer are harder, and heavily
              worn fabric can look clean without looking new. We tell you what to expect
              before we start instead of promising a result we cannot guarantee.
            </p>
          </div>

          <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-6">
            <h3 className="text-base font-bold tracking-tight text-wv-text">
              Road salt and winter dirt
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-wv-muted">
              Jackson winters leave white salt rings on carpet and mats, and the grit that
              comes in with them grinds into the fibers. Cleaning the carpet and mats
              properly is part of the Deep Interior Detail, and heavy salt buildup is worth
              mentioning when you request a quote so we plan enough time for it.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <AddonList
            heading="Interior add-ons"
            intro="Add these to either interior service when your vehicle needs them."
            slugs={['pet-hair-removal', 'stain-treatment', 'odor-treatment']}
          />
        </div>
      </Section>

      {faqs.length > 0 ? (
        <Section tone="dark" containerSize="wide" ariaLabelledBy="interior-faq-heading">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <SectionHeading
              id="interior-faq-heading"
              eyebrow="FAQ"
              title="Interior detailing questions"
              description="A few of the ones we hear most. Ask anything else when you request a quote."
            />
            <FAQAccordion items={faqs} defaultOpenId={faqs[0]?.id} />
          </div>
        </Section>
      ) : null}

      <CTASection
        title="Get your interior quoted"
        description="Tell us the vehicle, the condition, and whether there is pet hair or staining. Photos help. We will come back with a firm price."
      />
    </>
  );
}
