import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { CTASection } from '@/components/marketing/CTASection';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { business } from '@/data/business';
import { serviceAreas } from '@/data/serviceAreas';
import { primaryCta } from '@/data/navigation';

const title = `Service Area | Detailing Across ${serviceAreas[0].county}`;
const description = `${business.name} details vehicles in Jackson, Michigan Center, Blackman Township, Summit Township, Grass Lake, Napoleon, and Brooklyn, Michigan.`;

export const metadata: Metadata = {
  title: { absolute: `Service Area in ${serviceAreas[0].county}, Michigan | ${business.name}` },
  description,
  alternates: { canonical: '/service-area' },
  openGraph: {
    title,
    description,
    url: '/service-area',
    type: 'website',
  },
};

interface AreaNote {
  readonly slug: string;
  readonly heading: string;
  readonly body: string;
}

const areaNotes: readonly AreaNote[] = [
  {
    slug: 'jackson',
    heading: 'Jackson',
    body: 'Jackson is home base and where most of our work happens. City driving is hard on a vehicle in a specific way: short trips that never let the interior dry out, road salt from November through March, and construction dust in the summer. Most of the vehicles we see from Jackson are daily drivers that have simply never had a proper reset.',
  },
  {
    slug: 'michigan-center',
    heading: 'Michigan Center',
    body: 'A short drive east of the city, and close enough that scheduling is rarely a problem. Lake-adjacent living means sand tracked into carpets through the summer and a lot of vehicles that spend their weekends hauling gear, kids, and dogs.',
  },
  {
    slug: 'blackman-township',
    heading: 'Blackman Township',
    body: 'The north side of the Jackson area, along the I-94 corridor. Plenty of the vehicles we detail here are commuter cars putting on highway miles, which shows up as bug and tar buildup on the front end and bonded contamination in the paint that a normal wash will not lift.',
  },
  {
    slug: 'summit-township',
    heading: 'Summit Township',
    body: 'Just south of the city, and one of the areas we hear from most for full interior work. Family vehicles carry the evidence of everyday life, and a deep interior detail is usually what gets them back to something you actually want to sit in.',
  },
  {
    slug: 'grass-lake',
    heading: 'Grass Lake',
    body: 'East toward Washtenaw County. Gravel and dirt road driving is common out here, which means dust in every interior seam and a film on the paint that hangs on until the vehicle gets a proper hand wash rather than a run through a tunnel.',
  },
  {
    slug: 'napoleon',
    heading: 'Napoleon',
    body: 'South of Michigan Center, and firmly within our range. Trucks and larger vehicles make up more of the work here, and those get priced by size rather than by guesswork, so you know what you are paying before anything starts.',
  },
  {
    slug: 'brooklyn',
    heading: 'Brooklyn',
    body: 'Down by the Irish Hills, at the southern edge of the area we cover. A fair number of the vehicles we detail here are seasonal or weekend vehicles that need attention before they go away for the winter, or a full clean-up when they come back out in the spring.',
  },
];

export default function ServiceAreaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Service Area', path: '/service-area' },
        ]}
      />

      <Section tone="dark" containerSize="narrow">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
          Service area
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl lg:text-5xl">
          Where {business.name} Details Vehicles
        </h1>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-wv-muted sm:text-lg">
          <p>
            We are based in {business.cityState} and work across {serviceAreas[0].county}
            . That covers the city itself along with the townships and towns that ring
            it, from Blackman on the north side down to Brooklyn near the Irish Hills.
          </p>
          <p>
            The practical answer to &ldquo;do you come to me?&rdquo; is usually yes. The
            area is compact enough that a drive of twenty or thirty minutes covers most
            of it, so where you live matters far less than what your vehicle needs. If
            you are just outside the towns listed below, ask anyway. We would rather tell
            you honestly than have you assume the answer is no.
          </p>
        </div>
      </Section>

      <Section tone="surface" containerSize="narrow" ariaLabelledBy="towns-heading">
        <SectionHeading
          id="towns-heading"
          title="The towns we cover"
          description="A short note on each, and what tends to bring vehicles in from that part of the county."
        />
        <div className="mt-10 space-y-8">
          {areaNotes.map((note) => (
            <article key={note.slug}>
              <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-wv-text">
                <MapPin className="h-4 w-4 text-wv-red-soft" aria-hidden="true" />
                {note.heading}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-wv-muted">{note.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="dark" containerSize="narrow" ariaLabelledBy="jackson-link-heading">
        <SectionHeading
          id="jackson-link-heading"
          eyebrow="Primary city"
          title={`Detailing in ${business.city}, ${business.stateFull}`}
          description="Most of our work happens in the city itself. If that is where you are, there is a page with the detail."
        />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/service-area/jackson-mi" variant="secondary" size="lg">
            Auto detailing in {business.city}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={primaryCta.href} variant="primary" size="lg">
            {primaryCta.label}
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm leading-relaxed text-wv-subtle">
          Not sure whether you are inside the area? Send your location with your{' '}
          <Link href="/quote" className="text-wv-red-soft underline underline-offset-4">
            quote request
          </Link>{' '}
          and we will confirm before anything is scheduled.
        </p>
      </Section>

      <CTASection
        title="Tell us where you are and what your vehicle needs"
        description="Send a few details and we will come back with a firm price and whether we can reach you."
      />
    </>
  );
}
