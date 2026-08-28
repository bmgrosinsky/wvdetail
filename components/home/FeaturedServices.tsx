import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { featuredServices } from '@/data/services';

export function FeaturedServices() {
  return (
    <Section id="services" tone="dark" containerSize="wide" ariaLabelledBy="featured-services-heading">
      <SectionHeading
        id="featured-services-heading"
        eyebrow="Services"
        title="Detailing built around what your vehicle actually needs"
        description="Four of our most requested services. Every service is available for cars, mid-size vehicles, and large vehicles."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredServices.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <p className="mt-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-wv-text transition-colors hover:text-wv-red-soft"
        >
          See all services and what each one includes
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </p>
    </Section>
  );
}
