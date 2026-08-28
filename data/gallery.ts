import type { GalleryCategory, GalleryItem } from '@/types';

/**
 * Intentionally empty. WV Detail only shows its own work.
 * No stock photography, no placeholder imagery, no generated photos.
 *
 * To add a pair:
 *   1. Put both files in /public/gallery (e.g. 0001-before.jpg, 0001-after.jpg).
 *   2. Shoot both frames from the same position with the same framing.
 *   3. Add an entry below with real `width`/`height` and honest alt text.
 *
 * The gallery page renders an empty state until at least one entry exists,
 * and shows category filters automatically once there are more than six.
 */
export const galleryItems: readonly GalleryItem[] = [];

export const hasGalleryItems: boolean = galleryItems.length > 0;

/** Filters are only worth showing once the grid is large enough to need them. */
export const GALLERY_FILTER_THRESHOLD = 6;

export const showGalleryFilters: boolean =
  galleryItems.length > GALLERY_FILTER_THRESHOLD;

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  interior: 'Interior',
  exterior: 'Exterior',
  complete: 'Complete detail',
};

/** Categories that actually have photos, in a stable display order. */
export const galleryCategoriesInUse: readonly GalleryCategory[] = (
  ['interior', 'exterior', 'complete'] as const
).filter((category) => galleryItems.some((item) => item.category === category));
