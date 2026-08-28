import { Star } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buttonClasses } from '@/components/ui/Button';
import { reviews } from '@/data/reviews';
import { business } from '@/data/business';
import { resolved } from '@/lib/todo';
import { analyticsEvents } from '@/lib/analytics/events';
import { TrackedAnchor } from '@/components/analytics/TrackedAnchor';

export function ReviewsSection() {
  const googleReviewsUrl = resolved(business.googleReviewsUrl);
  const hasReviews = reviews.length > 0;

  return (
    <Section tone="dark" containerSize="wide" ariaLabelledBy="reviews-heading">
      <SectionHeading
        id="reviews-heading"
        eyebrow="Reviews"
        title="What customers say"
        description={
          hasReviews
            ? 'A few words from people in and around Jackson.'
            : 'We are collecting reviews from our customers. In the meantime, the best read on our work is the work itself.'
        }
      />

      {hasReviews ? (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="flex h-full flex-col rounded-lg border border-wv-border bg-wv-surface p-6"
            >
              <div
                className="flex items-center gap-0.5"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: review.rating }, (_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-wv-red-soft text-wv-red-soft"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-wv-muted">
                {review.body}
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-wv-text">{review.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-lg border border-dashed border-wv-border-strong bg-wv-surface p-8">
          <p className="max-w-xl text-sm leading-relaxed text-wv-muted">
            We do not publish reviews we have not received. Once customers leave
            feedback on Google, it will appear here in their own words.
          </p>
          <div className="mt-6">
            {googleReviewsUrl ? (
              <TrackedAnchor
                href={googleReviewsUrl}
                event={analyticsEvents.googleReviewsClicked}
                params={{ placement: 'reviews_section' }}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses('secondary', 'md')}
              >
                View Reviews on Google
              </TrackedAnchor>
            ) : (
              <p className="text-sm text-wv-subtle">
                {/* TODO: replace with the verified Google reviews URL, then this
                    renders as a "View Reviews on Google" button automatically. */}
                Google reviews link coming soon.
              </p>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
