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
import { getService } from '@/data/services';
import { publishedFaqs } from '@/data/faqs';
import { primaryCta } from '@/data/navigation';
import { business } from '@/data/business';
import type { Faq, Service } from '@/types';

export const metadata: Metadata = {
  title: 'Exterior Detailing',
  description: `Exterior detailing in ${business.cityState}. Hand wash, wheels and tires, paint decontamination, and sealant protection, priced by vehicle size.`,
  alternates: { canonical: '/services/exterior-detailing' },
};

const exteriorSlugs: readonly string[] = [
  'exterior-detail',
  'exterior-detail-decontamination',
];

const exteriorServices: readonly Service[] = exteriorSlugs
  .map(getService)
  .filter((service): service is Service => service !== undefined);

const faqIds: readonly string[] = [
  'paint-correction',
  'vehicle-size',
  'condition-pricing',
  'how-long',
];

const faqs: readonly Faq[] = publishedFaqs.filter((faq) => faqIds.includes(faq.id));

export default function ExteriorDetailingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Exterior detailing"
        title={`Exterior detailing in ${business.cityState}`}
        description="A hand wash done properly, wheels and tires included, finished with protection that outlasts a trip through the tunnel wash. Add decontamination when the paint needs more than soap."
      >
        <ButtonLink href={primaryCta.href} variant="primary" size="lg">
          {primaryCta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </ServicePageHeader>

      <Section tone="dark" containerSize="wide" ariaLabelledBy="exterior-services-heading">
        <SectionHeading
          id="exterior-services-heading"
          eyebrow="Pricing"
          title="Two exterior services, priced by vehicle size"
          description="The Exterior Detail keeps a well-kept vehicle looking sharp. Add decontamination when the paint feels rough or has not been treated in a long while."
        />

        <div className="mt-8 grid gap-5">
          {exteriorServices.map((service) => (
            <ServiceDetail key={service.slug} service={service} as="h2" />
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <VehicleSizeGuide />
          <PricingNote />
        </div>
      </Section>

      <Section tone="surface" containerSize="wide" ariaLabelledBy="exterior-detail-heading">
        <SectionHeading
          id="exterior-detail-heading"
          eyebrow="What to expect"
          title="What the exterior work actually covers"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-6">
            <h3 className="text-base font-bold tracking-tight text-wv-text">
              Wheels and tires
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-wv-muted">
              Brake dust and road grime bake onto wheels and do not come off in a drive-through
              wash. Wheels are cleaned by hand and tires are cleaned and dressed, which is
              usually the difference between a car that looks washed and one that looks
              detailed.
            </p>
          </div>

          <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-6">
            <h3 className="text-base font-bold tracking-tight text-wv-text">
              Decontamination and clay
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-wv-muted">
              Run your hand over clean paint. If it feels gritty, that is bonded
              contamination: rail dust, industrial fallout, tree sap, and overspray that
              soap cannot lift. Clay pulls it off the surface so the paint feels smooth
              again and protection can bond properly. It is a cleaning step, not a
              correction step.
            </p>
          </div>

          <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-6">
            <h3 className="text-base font-bold tracking-tight text-wv-text">
              Protection, not correction
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-wv-muted">
              We finish with a sealant so the paint has a layer between it and Michigan
              weather and road salt. We do not polish or do paint correction, so swirls,
              scratches, and other defects in the clear coat will still be there afterward.
              Clean, decontaminated, and protected is what these services deliver.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <AddonList
            heading="Exterior add-ons"
            intro="Useful additions, especially at the end of a salt season."
            slugs={['engine-bay', 'undercarriage-rinse']}
          />
        </div>
      </Section>

      {faqs.length > 0 ? (
        <Section tone="dark" containerSize="wide" ariaLabelledBy="exterior-faq-heading">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <SectionHeading
              id="exterior-faq-heading"
              eyebrow="FAQ"
              title="Exterior detailing questions"
              description="A few of the ones we hear most. Ask anything else when you request a quote."
            />
            <FAQAccordion items={faqs} defaultOpenId={faqs[0]?.id} />
          </div>
        </Section>
      ) : null}

      <CTASection
        title="Get your exterior quoted"
        description="Tell us the vehicle and how long it has been since its last detail. We will confirm the size class and a firm price."
      />
    </>
  );
}
