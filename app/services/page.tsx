import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { CTASection } from '@/components/marketing/CTASection';
import { ServicePageHeader } from '@/components/services/ServicePageHeader';
import { ServiceDetail } from '@/components/services/ServiceDetail';
import { VehicleSizeGuide } from '@/components/services/VehicleSizeGuide';
import { AddonList } from '@/components/services/AddonList';
import { PricingNote } from '@/components/services/PricingNote';
import { services } from '@/data/services';
import { primaryCta } from '@/data/navigation';
import { business } from '@/data/business';
import type { Service, ServiceCategory } from '@/types';

export const metadata: Metadata = {
  title: 'Detailing Services & Pricing',
  description: `Interior, exterior, and complete auto detailing in ${business.cityState}. See what each service includes and what it costs for your vehicle size.`,
  alternates: { canonical: '/services' },
};

interface CategoryGroup {
  readonly id: ServiceCategory;
  readonly label: string;
  readonly href: string;
  readonly blurb: string;
}

const groups: readonly CategoryGroup[] = [
  {
    id: 'interior',
    label: 'Interior detailing',
    href: '/services/interior-detailing',
    blurb:
      'Cabin work: vacuuming, surfaces, carpets and seats, glass, and the crevices ordinary cleaning skips.',
  },
  {
    id: 'exterior',
    label: 'Exterior detailing',
    href: '/services/exterior-detailing',
    blurb:
      'Hand washing, wheels and tires, decontamination, and paint protection. No tunnel brushes.',
  },
  {
    id: 'complete',
    label: 'Complete detailing',
    href: '/services/complete-detailing',
    blurb:
      'Inside and out in one appointment, bundled below the price of booking the two separately.',
  },
];

const chooseHelp: readonly { readonly situation: string; readonly answer: string }[] = [
  {
    situation: 'You keep up with it and it just needs a clean-up',
    answer: 'Interior Refresh, Exterior Detail, or the Complete Detail for both.',
  },
  {
    situation: 'It has not been detailed in a year or more',
    answer:
      'Step up to the Deep Interior Detail or Exterior Detail + Decontamination.',
  },
  {
    situation: 'You are selling, trading in, or want a full reset',
    answer: 'The Deep Complete Detail takes the whole vehicle as far as cleaning goes.',
  },
];

function servicesIn(category: ServiceCategory): readonly Service[] {
  return services.filter((service) => service.category === category);
}

export default function ServicesPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Services"
        title={`Auto detailing services in ${business.cityState}`}
        description="Six services across interior, exterior, and complete detailing. Every one is priced by vehicle size, so you know roughly what to expect before you ask."
      >
        <ButtonLink href={primaryCta.href} variant="primary" size="lg">
          {primaryCta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </ServicePageHeader>

      <Section tone="surface" containerSize="wide" ariaLabelledBy="choose-heading">
        <SectionHeading
          id="choose-heading"
          eyebrow="Start here"
          title="Not sure which service you need?"
          description="Three quick reference points. If none of them fit, send photos with your quote request and we will tell you what your vehicle actually needs."
        />

        <dl className="mt-8 grid gap-4 lg:grid-cols-3">
          {chooseHelp.map((item) => (
            <div
              key={item.situation}
              className="rounded-lg border border-wv-border bg-wv-surface-2 p-5"
            >
              <dt className="text-sm font-semibold text-wv-text">{item.situation}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-wv-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <VehicleSizeGuide />
        </div>
      </Section>

      {groups.map((group, index) => (
        <Section
          key={group.id}
          id={group.id}
          tone={index % 2 === 0 ? 'dark' : 'surface'}
          containerSize="wide"
          ariaLabelledBy={`${group.id}-group-heading`}
        >
          <SectionHeading
            id={`${group.id}-group-heading`}
            eyebrow={`${servicesIn(group.id).length} services`}
            title={group.label}
            description={group.blurb}
          >
            <p className="mt-6">
              <Link
                href={group.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-wv-text transition-colors hover:text-wv-red-soft"
              >
                More about {group.label.toLowerCase()}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          </SectionHeading>

          <div className="mt-8 grid gap-5">
            {servicesIn(group.id).map((service) => (
              <ServiceDetail key={service.slug} service={service} />
            ))}
          </div>
        </Section>
      ))}

      <Section tone="dark" containerSize="wide" ariaLabelledBy="extras-heading">
        <SectionHeading
          id="extras-heading"
          eyebrow="Add-ons and pricing"
          title="Extras you can add to any service"
          description="Some jobs take dedicated time beyond a standard detail. These are priced separately so nobody pays for work their vehicle does not need."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <AddonList headingId="addons-heading" />
          <div className="grid gap-5">
            <PricingNote />
            <VehicleSizeGuide
              headingId="vehicle-size-guide-repeat-heading"
              heading="Vehicle size guide"
            />
          </div>
        </div>
      </Section>

      <CTASection
        title="Tell us about your vehicle"
        description="Send the year, make, model, and a couple of photos. We will confirm the size class and a firm price before any work starts."
      />
    </>
  );
}
