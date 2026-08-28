import type { Review } from '@/types';
import { cn } from '@/lib/cn';
import { ReviewCard } from './ReviewCard';

interface ReviewGridProps {
  readonly reviews: readonly Review[];
}

/**
 * Renders whatever real reviews exist. With one or two entries a three-column
 * grid looks broken, so the layout narrows instead of stretching to fill.
 */
export function ReviewGrid({ reviews }: ReviewGridProps) {
  if (reviews.length === 0) return null;

  const isSmallSet = reviews.length < 3;

  return (
    <ul
      className={cn(
        'grid gap-5',
        isSmallSet
          ? 'max-w-3xl sm:grid-cols-2'
          : 'sm:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {reviews.map((review) => (
        <li key={review.id}>
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}
