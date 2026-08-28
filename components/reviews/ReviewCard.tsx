import { Star } from 'lucide-react';
import type { Review } from '@/types';

interface ReviewCardProps {
  readonly review: Review;
}

const sourceLabels: Record<Review['source'], string> = {
  google: 'Google',
  facebook: 'Facebook',
};

function formatDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
}

export function ReviewCard({ review }: ReviewCardProps) {
  const date = formatDate(review.date);

  return (
    <article className="flex h-full flex-col rounded-lg border border-wv-border bg-wv-surface p-6">
      <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
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

      <footer className="mt-5 border-t border-wv-border pt-4">
        <p className="text-sm font-semibold text-wv-text">{review.author}</p>
        <p className="mt-1 text-xs text-wv-subtle">
          {sourceLabels[review.source]}
          {date ? ` · ${date}` : ''}
        </p>
      </footer>
    </article>
  );
}
