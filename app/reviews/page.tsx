import type { Metadata } from 'next';
import { MessageSquareQuote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { CTASection } from '@/components/marketing/CTASection';
import { ReviewGrid } from '@/components/reviews/ReviewGrid';
import { reviews } from '@/data/reviews';
import { business } from '@/data/business';
import { resolved } from '@/lib/todo';

export const metadata: Metadata = {
  title: 'Reviews',
  description: `Customer reviews for ${business.name}, an auto detailing service in ${business.cityState}. We publish real feedback only.`,
  alternates: { canonical: '/reviews' },
};

export default function ReviewsPage() {
  const googleReviewsUrl = resolved(business.googleReviewsUrl);
  const hasReviews = reviews.length > 0;

  return (
    <>
      <section className="border-b border-wv-border bg-wv-black pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
              Reviews
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl lg:text-5xl">
              What customers say
            </h1>
            <p className="mt-5 text-base leading-relaxed text-wv-muted sm:text-lg">
              Everything on this page is a real review left by a real customer.
              We do not write them ourselves and we do not edit them.
            </p>
            {googleReviewsUrl ? (
              <div className="mt-7">
                <ButtonLink href={googleReviewsUrl} variant="secondary" size="lg">
                  View Reviews on Google
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <Section tone="dark" containerSize="wide" ariaLabel="Customer reviews">
        {hasReviews ? (
          <>
            <ReviewGrid reviews={reviews} />
            {reviews.length < 3 ? (
              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-wv-subtle">
                This is everything we have received so far. More will appear here
                as customers leave them.
              </p>
            ) : null}
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-wv-border-strong bg-wv-surface p-8 sm:p-12">
            <MessageSquareQuote className="h-7 w-7 text-wv-subtle" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-bold tracking-tight text-wv-text sm:text-2xl">
              No reviews published yet
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-wv-muted">
              We would rather show you nothing than show you something we made
              up. As soon as customers leave feedback, it will appear here in
              their own words, unedited.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-wv-muted">
              If we have detailed your vehicle, a short review helps more than
              you would think.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {googleReviewsUrl ? (
                <ButtonLink href={googleReviewsUrl} variant="secondary" size="lg">
                  View Reviews on Google
                </ButtonLink>
              ) : (
                <p className="text-sm text-wv-subtle">
                  {/* TODO: add the verified Google reviews URL to data/business.ts
                      and the "View Reviews on Google" button appears automatically. */}
                  Our Google reviews link will be added here once the profile is
                  live.
                </p>
              )}
            </div>
          </div>
        )}
      </Section>

      <CTASection
        title="Judge us by the work"
        description="Send us your vehicle and what it needs. We will tell you honestly what it takes and what it costs."
      />
    </>
  );
}
