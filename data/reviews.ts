import type { Review } from '@/types';

/**
 * Intentionally empty. Reviews are never fabricated.
 * Add entries here only by transcribing real, published customer reviews.
 */
export const reviews: readonly Review[] = [];

export const hasReviews: boolean = reviews.length > 0;
