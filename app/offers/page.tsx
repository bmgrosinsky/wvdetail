import type { Metadata } from 'next';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { CTASection } from '@/components/marketing/CTASection';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { business } from '@/data/business';
import { primaryCta } from '@/data/navigation';
import { discountEligibilityOptions, jacksonServesDiscount } from '@/data/promotions';

export const metadata: Metadata = {
  title: {
    absolute: `${jacksonServesDiscount.name} Discount | Military & First Responder Savings | ${business.name}`,
  },
  description: `Military, veterans, police, fire, EMS, corrections officers, hospital staff, and teachers save $${jacksonServesDiscount.discountBelowThreshold}-$${jacksonServesDiscount.discountAboveThreshold} on detailing at ${business.name} in ${business.cityState}.`,
  alternates: { canonical: '/offers' },
};

export default function OffersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Offers', path: '/offers' },
        ]}
      />

      <Section tone="dark" containerSize="narrow">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
          Offers
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl lg:text-5xl">
          {jacksonServesDiscount.name} Discount
        </h1>
        <p className="mt-5 text-base leading-relaxed text-wv-muted sm:text-lg">
          A standing thank-you to the people who keep {business.cityState} running:
          military, veterans, police, fire, EMS, corrections officers, hospital staff,
          and teachers get a discount on every service, every time. No coupon code, no
          expiration date.
        </p>
      </Section>

      <Section tone="surface" containerSize="narrow" ariaLabelledBy="how-it-works-heading">
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="How it works"
          title="Two tiers, based on your service total"
        />
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-5">
            <dt className="text-sm font-semibold text-wv-text">
              Services ${jacksonServesDiscount.threshold} and up
            </dt>
            <dd className="mt-2 text-2xl font-bold tracking-tight text-wv-red-soft">
              ${jacksonServesDiscount.discountAboveThreshold} off
            </dd>
          </div>
          <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-5">
            <dt className="text-sm font-semibold text-wv-text">
              Services under ${jacksonServesDiscount.threshold}
            </dt>
            <dd className="mt-2 text-2xl font-bold tracking-tight text-wv-red-soft">
              ${jacksonServesDiscount.discountBelowThreshold} off
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-wv-muted">
          {jacksonServesDiscount.idNote} Mention it when you request a quote and we will
          apply it when we follow up.
        </p>
      </Section>

      <Section tone="dark" containerSize="narrow" ariaLabelledBy="who-qualifies-heading">
        <SectionHeading
          id="who-qualifies-heading"
          eyebrow="Who qualifies"
          title="Anyone with valid ID in one of these groups"
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {discountEligibilityOptions.map((group) => (
            <li
              key={group.value}
              className="flex items-center gap-2.5 rounded-lg border border-wv-border bg-wv-surface p-4"
            >
              <BadgeCheck className="h-4 w-4 shrink-0 text-wv-red-soft" aria-hidden="true" />
              <span className="text-sm font-medium text-wv-text">{group.label}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-relaxed text-wv-subtle">
          Not sure if you qualify? Ask on the quote form and we will tell you honestly
          either way.
        </p>
      </Section>

      <Section tone="surface" containerSize="narrow" ariaLabelledBy="redeem-heading">
        <SectionHeading
          id="redeem-heading"
          eyebrow="How to use it"
          title="Select it on your quote request"
          description="Choose your group from the discount field on the quote form. We confirm eligibility and apply the discount to your final price - bring valid ID at the time of service."
        />
        <div className="mt-8">
          <ButtonLink href={primaryCta.href} variant="primary" size="lg">
            {primaryCta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Section>

      <CTASection
        title="Serving Jackson? We would like to return the favor."
        description="Send your vehicle and service details, select your group on the form, and we will take it from there."
      />
    </>
  );
}
