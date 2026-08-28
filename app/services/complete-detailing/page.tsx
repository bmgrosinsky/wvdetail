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
import { getService, vehicleClasses } from '@/data/services';
import { publishedFaqs } from '@/data/faqs';
import { primaryCta } from '@/data/navigation';
import { business } from '@/data/business';
import type { Faq, Service, VehicleClass } from '@/types';

export const metadata: Metadata = {
  title: 'Complete Detailing',
  description: `Complete interior and exterior detailing in ${business.cityState}. Both halves of the vehicle in one appointment, bundled below the price of booking them separately.`,
  alternates: { canonical: '/services/complete-detailing' },
};

const completeSlugs: readonly string[] = ['complete-detail', 'deep-complete-detail'];

const completeServices: readonly Service[] = completeSlugs
  .map(getService)
  .filter((service): service is Service => service !== undefined);

interface BundleRow {
  readonly id: VehicleClass;
  readonly label: string;
  readonly separate: number;
  readonly bundled: number;
  readonly saving: number;
}

/** Bundle savings, derived from the data files rather than written down. */
function bundleRows(
  bundle: Service | undefined,
  parts: readonly (Service | undefined)[],
): readonly BundleRow[] {
  if (!bundle || parts.some((part) => part === undefined)) return [];
  const included = parts.filter((part): part is Service => part !== undefined);

  return vehicleClasses.map((vehicleClass) => {
    const separate = included.reduce(
      (total, part) => total + part.pricing[vehicleClass.id],
      0,
    );
    const bundled = bundle.pricing[vehicleClass.id];
    return {
      id: vehicleClass.id,
      label: vehicleClass.label,
      separate,
      bundled,
      saving: separate - bundled,
    };
  });
}

const completeRows = bundleRows(getService('complete-detail'), [
  getService('interior-refresh'),
  getService('exterior-detail'),
]);

const deepRows = bundleRows(getService('deep-complete-detail'), [
  getService('deep-interior-detail'),
  getService('exterior-detail-decontamination'),
]);

const bundles: readonly { readonly name: string; readonly rows: readonly BundleRow[] }[] = [
  { name: 'Complete Detail', rows: completeRows },
  { name: 'Deep Complete Detail', rows: deepRows },
].filter((bundle) => bundle.rows.length > 0);

const useCases: readonly { readonly title: string; readonly body: string }[] = [
  {
    title: 'Selling or trading in',
    body: 'A clean vehicle photographs better and shows better in person. Buyers and appraisers read a spotless cabin as a well-cared-for vehicle, and the Deep Complete Detail is the version that makes that case for you.',
  },
  {
    title: 'A full reset',
    body: 'Some vehicles have quietly gotten away from their owners: a couple of winters of salt, kids, work gear, dogs. This is the service that gets it back to a place you are happy to drive.',
  },
  {
    title: 'End of a season',
    body: 'After a Michigan winter, salt is in the carpet and on the paint at the same time. Handling both halves in one appointment is simpler than booking two.',
  },
  {
    title: 'A new-to-you vehicle',
    body: 'Starting fresh in a used vehicle is worth doing before it becomes yours. Interior surfaces cleaned, paint decontaminated and protected, and no leftovers from the last owner.',
  },
];

const faqIds: readonly string[] = [
  'which-service',
  'how-long',
  'condition-pricing',
  'belongings',
];

const faqs: readonly Faq[] = publishedFaqs.filter((faq) => faqIds.includes(faq.id));

export default function CompleteDetailingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Complete detailing"
        title={`Complete detailing in ${business.cityState}`}
        description="Interior and exterior handled together in a single appointment, priced below what the same two services cost booked on their own. The Deep Complete Detail is our most thorough option."
      >
        <ButtonLink href={primaryCta.href} variant="primary" size="lg">
          {primaryCta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </ServicePageHeader>

      <Section tone="dark" containerSize="wide" ariaLabelledBy="complete-services-heading">
        <SectionHeading
          id="complete-services-heading"
          eyebrow="Pricing"
          title="Two complete packages"
          description="The Complete Detail pairs the Interior Refresh with the Exterior Detail. The Deep Complete Detail pairs the deep interior work with a decontaminated, sealed exterior."
        />

        <div className="mt-8 grid gap-5">
          {completeServices.map((service) => (
            <ServiceDetail key={service.slug} service={service} as="h2" />
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <VehicleSizeGuide />
          <PricingNote />
        </div>
      </Section>

      {bundles.length > 0 ? (
        <Section tone="surface" containerSize="wide" ariaLabelledBy="bundle-heading">
          <SectionHeading
            id="bundle-heading"
            eyebrow="Bundle value"
            title="What bundling actually saves you"
            description="One appointment, one trip, and a lower total than booking the same two services separately."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {bundles.map((bundle) => (
              <div
                key={bundle.name}
                className="rounded-lg border border-wv-border bg-wv-surface-2 p-6"
              >
                <h3 className="text-base font-bold tracking-tight text-wv-text">
                  {bundle.name}
                </h3>
                <dl className="mt-4 divide-y divide-wv-border border-y border-wv-border">
                  {bundle.rows.map((row) => (
                    <div key={row.id} className="py-3">
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm font-semibold text-wv-text">{row.label}</dt>
                        <dd className="shrink-0 text-sm text-wv-muted">
                          <span className="font-semibold text-wv-text">${row.bundled}</span>{' '}
                          instead of ${row.separate}
                        </dd>
                      </div>
                      {row.saving > 0 ? (
                        <p className="mt-1 text-sm text-wv-red-soft">
                          Saves ${row.saving}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="dark" containerSize="wide" ariaLabelledBy="use-cases-heading">
        <SectionHeading
          id="use-cases-heading"
          eyebrow="When it makes sense"
          title="Why customers book a complete detail"
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="rounded-lg border border-wv-border bg-wv-surface p-6"
            >
              <h3 className="text-base font-bold tracking-tight text-wv-text">
                {useCase.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-wv-muted">{useCase.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <AddonList
            heading="Add-ons"
            intro="Anything beyond a standard detail is priced separately, so you only pay for what your vehicle needs."
          />
        </div>
      </Section>

      {faqs.length > 0 ? (
        <Section tone="surface" containerSize="wide" ariaLabelledBy="complete-faq-heading">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <SectionHeading
              id="complete-faq-heading"
              eyebrow="FAQ"
              title="Complete detailing questions"
              description="A few of the ones we hear most. Ask anything else when you request a quote."
            />
            <FAQAccordion items={faqs} defaultOpenId={faqs[0]?.id} />
          </div>
        </Section>
      ) : null}

      <CTASection
        title="Book the full reset"
        description="Tell us the vehicle, its condition, and what you are getting it ready for. We will confirm the right package and a firm price."
      />
    </>
  );
}
