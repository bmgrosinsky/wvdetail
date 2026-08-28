import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { CTASection } from '@/components/marketing/CTASection';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { GalleryEmptyState } from '@/components/gallery/GalleryEmptyState';
import {
  galleryCategoriesInUse,
  galleryItems,
  hasGalleryItems,
  showGalleryFilters,
} from '@/data/gallery';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: { absolute: `Gallery | ${business.name}` },
  description: `Before and after photos of interior, exterior, and complete detailing work by ${business.name} in ${business.cityState}.`,
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <>
      <section className="border-b border-wv-border bg-wv-black pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
              Our work
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl lg:text-5xl">
              Before and after
            </h1>
            <p className="mt-5 text-base leading-relaxed text-wv-muted sm:text-lg">
              Detailing is easiest to judge by looking at it. Every pair on this
              page is one vehicle, photographed before we started and again when
              we finished.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="dark" containerSize="wide" ariaLabel="Gallery">
        {hasGalleryItems ? (
          <GalleryGrid
            items={galleryItems}
            categories={galleryCategoriesInUse}
            showFilters={showGalleryFilters}
          />
        ) : (
          <GalleryEmptyState />
        )}
      </Section>

      <CTASection
        title="Want your vehicle on this page?"
        description="Tell us what you drive and what it needs. We will come back with a firm price."
      />
    </>
  );
}
