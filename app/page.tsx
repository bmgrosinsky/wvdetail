import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { TrustStrip } from '@/components/marketing/TrustStrip';
import { CTASection } from '@/components/marketing/CTASection';
import { FeaturedServices } from '@/components/home/FeaturedServices';
import { HowItWorks } from '@/components/home/HowItWorks';
import { BeforeAfterPlaceholder } from '@/components/home/BeforeAfterPlaceholder';
import { WhyWvDetail } from '@/components/home/WhyWvDetail';
import { PricingPreview } from '@/components/home/PricingPreview';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ServiceAreaSection } from '@/components/home/ServiceAreaSection';
import { FaqPreview } from '@/components/home/FaqPreview';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: { absolute: `Auto Detailing in ${business.cityState} | ${business.name}` },
  description: `Interior, exterior, and complete auto detailing in ${business.cityState}. Starting at $75. Published prices by vehicle size, confirmed before we start. Request a quote.`,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedServices />
      <HowItWorks />
      <WhyWvDetail />
      <PricingPreview />
      <BeforeAfterPlaceholder />
      <ReviewsSection />
      <ServiceAreaSection />
      <FaqPreview />
      <CTASection />
    </>
  );
}
