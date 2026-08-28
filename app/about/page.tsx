import type { Metadata } from 'next';
import { ArrowRight, ClipboardCheck, Eye, MapPin, Tag } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { CTASection } from '@/components/marketing/CTASection';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: 'About',
  description: `${business.name} is an auto detailing service in ${business.cityState}: careful workmanship, straightforward pricing, and results you can see.`,
  alternates: { canonical: '/about' },
};

interface Value {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body: string;
}

const values: readonly Value[] = [
  {
    icon: ClipboardCheck,
    title: 'Careful workmanship',
    body:
      'Door jambs, seat rails, cup holders, the seam where the carpet meets the console. The parts nobody photographs are the parts that tell you whether a detail was done properly.',
  },
  {
    icon: Tag,
    title: 'Straightforward pricing',
    body:
      'Prices are published by service and vehicle size. If your vehicle needs more than the listed work, we tell you what and why before we start, not after.',
  },
  {
    icon: Eye,
    title: 'Visible results',
    body:
      'You should be able to see the difference the moment you open the door. If something did not come out the way we hoped, we will say so rather than let you find it later.',
  },
  {
    icon: MapPin,
    title: 'Local service',
    body: `We work in ${business.cityState} and the surrounding communities. Local means you can reach an actual person, and that we care what people around here say about the work.`,
  },
];

const expectations: readonly string[] = [
  'A clear quote before any work starts, based on your vehicle and its actual condition.',
  'An honest read on what can and cannot be fixed. Some stains and odors do not fully come out, and we will tell you that up front.',
  'A realistic time estimate so you can plan the day around it.',
  'Your belongings left alone. Anything you leave in the vehicle gets set aside, not moved around or thrown out.',
  'A walkthrough at the end so you can look it over while we are still there.',
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-wv-border bg-wv-black pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
              About
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl lg:text-5xl">
              Detailing done properly, in {business.cityState}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-wv-muted sm:text-lg">
              {business.name} is a detailing service for people who spend real
              time in their vehicles. Commutes, work trucks, car seats, dogs,
              winter roads. We clean them the way we would want ours cleaned.
            </p>
            <p className="mt-4 text-base leading-relaxed text-wv-muted sm:text-lg">
              {business.tagline}
            </p>
          </div>
        </Container>
      </section>

      {/*
        TODO: owner background. Nothing about the owner has been verified —
        name, years in the trade, training, certifications, how the business
        started, or how many vehicles have been detailed. Do not invent any of
        it. Once the owner confirms these details, add a short paragraph here
        (three or four sentences is plenty) and, if a real photo exists, an
        image beside it.
      */}

      <Section tone="surface" containerSize="wide" ariaLabelledBy="values-heading">
        <SectionHeading
          id="values-heading"
          eyebrow="What we care about"
          title="Four things we do not cut corners on"
          description="No secret process and no miracle products. Just time, the right materials, and attention where it matters."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <li
                key={value.title}
                className="rounded-lg border border-wv-border bg-wv-surface-2 p-6"
              >
                <Icon className="h-5 w-5 text-wv-red-soft" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold tracking-tight text-wv-text">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-wv-muted">{value.body}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="dark" containerSize="wide" ariaLabelledBy="expect-heading">
        <SectionHeading
          id="expect-heading"
          eyebrow="What to expect"
          title="How a job actually goes"
          description="Detailing goes better when nobody is guessing. Here is what you get every time."
        />

        <ul className="mt-10 max-w-3xl space-y-4">
          {expectations.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-wv-red-soft"
              />
              <span className="text-base leading-relaxed text-wv-muted">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/quote" variant="primary" size="lg">
            Get a Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary" size="lg">
            View Services
          </ButtonLink>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
