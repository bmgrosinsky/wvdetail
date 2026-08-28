import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { TrustStrip } from '@/components/marketing/TrustStrip';
import { CTASection } from '@/components/marketing/CTASection';
import { FeaturedServices } from '@/components/home/FeaturedServices';
import { BeforeAfterPlaceholder } from '@/components/home/BeforeAfterPlaceholder';
import { WhyWvDetail } from '@/components/home/WhyWvDetail';
import { PricingPreview } from '@/components/home/PricingPreview';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ServiceAreaSection } from '@/components/home/ServiceAreaSection';
import { FaqPreview } from '@/components/home/FaqPreview';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: `Auto Detailing in ${business.cityState}`,
  description: business.shortDescription,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedServices />
      <BeforeAfterPlaceholder />
      <WhyWvDetail />
      <PricingPreview />
      <ReviewsSection />
      <ServiceAreaSection />
      <FaqPreview />
      <CTASection />
    </>
  );
}
