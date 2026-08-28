import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { CTASection } from '@/components/marketing/CTASection';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { business } from '@/data/business';
import { serviceAreas } from '@/data/serviceAreas';
import { conditionDisclaimer, services, startingPrice } from '@/data/services';
import { primaryCta } from '@/data/navigation';

const pageHeading = `Detailing for drivers in ${business.city}, ${business.stateFull}`;
const pageTitle = `${business.city}, ${business.state} Service Area | ${business.name}`;
const pageDescription = `Interior, exterior, and complete auto detailing in ${business.cityState}. Straightforward starting prices by vehicle size, and a firm quote before any work begins.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/service-area/jackson-mi' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: '/service-area/jackson-mi',
    type: 'website',
  },
};

interface Reason {
  readonly heading: string;
  readonly body: string;
}

const reasons: readonly Reason[] = [
  {
    heading: 'Road salt from November to March',
    body: 'Michigan winters put brine and salt on every road in the county, and it does not stay on the road. It works into carpet and floor mats, dries into white rings, and sits on paint and lower panels where it holds moisture against the finish. A wash removes what is loose; decontamination and a sealant deal with what a wash leaves behind, and a proper interior clean pulls the salt out of the carpet instead of pushing it deeper.',
  },
  {
    heading: 'Pet hair that a vacuum will not touch',
    body: 'Hair that has worked its way into upholstery and carpet fibers is a different job than surface debris, and it is one of the most common reasons drivers here call. It takes dedicated time and the right tools rather than another pass with a shop vac, so we price it separately and tell you up front what it will take.',
  },
  {
    heading: 'Getting a vehicle ready to sell or trade',
    body: 'A clean vehicle photographs better and holds its ground in a trade appraisal. If you are listing privately or heading to a dealer, a deep interior detail with a decontaminated, sealed exterior is usually the version worth doing, because it addresses the things a buyer actually notices first: the smell, the seats, and how the paint reflects light.',
  },
  {
    heading: 'Daily-driver wear that builds up quietly',
    body: 'Most vehicles are not neglected, they are just used. Coffee on the console, dust in the vents, sand from a lake weekend, bug and tar buildup from the I-94 run. None of it is dramatic on its own, and all of it comes off at once with the right service.',
  },
];

interface LocalFaq {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

const localFaqs: readonly LocalFaq[] = [
  {
    id: 'winter',
    question: 'Is it worth detailing in the middle of a Michigan winter?',
    answer:
      'Yes, and winter is when salt does the most damage. Clearing salt out of carpet and off paint partway through the season keeps it from sitting for five straight months, and a sealed exterior sheds brine far better than an unprotected one.',
  },
  {
    id: 'which-service',
    question: 'Which service does a normal Jackson daily driver need?',
    answer:
      'If the vehicle is kept up and just needs a reset, the Interior Refresh or the Exterior Detail usually covers it. If it has not been detailed in a year or more, or there is embedded dirt, staining, or pet hair, the deeper versions are the honest answer.',
  },
  {
    id: 'how-long',
    question: 'How long does a detail take?',
    answer:
      'It depends on the service and the condition of the vehicle. A refresh is a short appointment; a deep complete detail is a substantially longer one. We give you a realistic time estimate along with your quote rather than a number that only works on a perfect vehicle.',
  },
  {
    id: 'price-certainty',
    question: 'Will the price change once you see my vehicle?',
    answer:
      'The listed prices are starting estimates for normally soiled vehicles. If yours needs more than that, we tell you before we start, not after. Nothing gets billed that you have not agreed to.',
  },
];

export default function JacksonDetailingPage() {
  const otherAreas = serviceAreas.filter((area) => !area.primary);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Service Area', path: '/service-area' },
          {
            name: `${business.city}, ${business.state}`,
            path: '/service-area/jackson-mi',
          },
        ]}
      />

      <Section tone="dark" containerSize="narrow">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
          {business.cityState}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl lg:text-5xl">
          {pageHeading}
        </h1>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-wv-muted sm:text-lg">
          <p>
            {business.name} details vehicles for drivers in and around {business.city}.
            Interior, exterior, or both, priced by vehicle size and by what the vehicle
            actually needs rather than by a package name that hides the work.
          </p>
          <p>
            Vehicles in this part of Michigan take a particular kind of beating. Salt in
            the winter, dust and gravel in the summer, and a lot of short trips in
            between. The sections below cover why local drivers book a detail, what each
            service starts at, and how to get a firm price for your vehicle.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primaryCta.href} variant="primary" size="lg">
            {primaryCta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary" size="lg">
            See all services
          </ButtonLink>
        </div>
      </Section>

      <Section tone="surface" containerSize="narrow" ariaLabelledBy="why-heading">
        <SectionHeading
          id="why-heading"
          eyebrow="Why local drivers book"
          title="What brings vehicles in around here"
        />
        <div className="mt-10 space-y-8">
          {reasons.map((reason) => (
            <article key={reason.heading}>
              <h3 className="text-lg font-semibold tracking-tight text-wv-text">
                {reason.heading}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-wv-muted">
                {reason.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="dark" containerSize="default" ariaLabelledBy="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="Service options"
          title={`What we offer in ${business.city}`}
          description="Every price below is a starting point for a car-sized vehicle. Mid-size and large vehicles are priced up from there."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <li
              key={service.slug}
              className="rounded-lg border border-wv-border bg-wv-surface p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base font-semibold tracking-tight text-wv-text">
                  {service.name}
                </h3>
                <p className="shrink-0 text-sm font-semibold text-wv-red-soft">
                  From ${startingPrice(service)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-wv-muted">
                {service.summary}
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm text-wv-subtle">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-wv-red-soft"
                  aria-hidden="true"
                />
                <span>Best for: {service.bestFor}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-relaxed text-wv-subtle">
          {conditionDisclaimer}
        </p>
      </Section>

      <Section tone="surface" containerSize="narrow" ariaLabelledBy="area-heading">
        <SectionHeading
          id="area-heading"
          eyebrow="Service area"
          title={`${business.city} and the surrounding towns`}
          description={`We work across ${serviceAreas[0].county}, so ${business.city} customers are the closest work we do.`}
        />
        <p className="mt-6 text-base leading-relaxed text-wv-muted">
          Outside the city, we also serve{' '}
          {otherAreas.map((area, index) => (
            <span key={area.slug}>
              {index === otherAreas.length - 1 ? 'and ' : ''}
              {area.name}
              {index < otherAreas.length - 1 ? ', ' : '. '}
            </span>
          ))}
          If you are nearby but not on that list, ask.
        </p>
        <div className="mt-8">
          <ButtonLink href="/service-area" variant="secondary" size="md">
            See the full service area
          </ButtonLink>
        </div>
      </Section>

      <Section tone="dark" containerSize="narrow" ariaLabelledBy="faq-heading">
        <SectionHeading
          id="faq-heading"
          eyebrow="Questions"
          title={`Common questions from ${business.city} drivers`}
        />
        <dl className="mt-10 divide-y divide-wv-border border-y border-wv-border">
          {localFaqs.map((faq) => (
            <div key={faq.id} className="py-6">
              <dt className="text-base font-semibold tracking-tight text-wv-text">
                {faq.question}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-wv-muted">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-sm leading-relaxed text-wv-subtle">
          More answers are on the{' '}
          <Link href="/faq" className="text-wv-red-soft underline underline-offset-4">
            FAQ page
          </Link>
          .
        </p>
      </Section>

      <CTASection
        title={`Get a quote for your vehicle in ${business.city}`}
        description="Tell us the vehicle, the condition, and what is bothering you about it. We will come back with a firm price."
      />
    </>
  );
}
