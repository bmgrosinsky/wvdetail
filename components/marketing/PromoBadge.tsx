'use client';

import { Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { usePromoCountdown } from '@/lib/hooks/usePromoCountdown';

interface PromoBadgeProps {
  readonly className?: string;
}

/** Small pill: the Book Now offer and time remaining. Renders nothing once expired. */
export function PromoBadge({ className }: PromoBadgeProps) {
  const promo = usePromoCountdown();
  if (!promo.active) return null;

  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-wv-red-soft/40 bg-wv-red-soft/10 px-4 py-1.5 text-sm font-bold text-wv-red-soft sm:text-base',
        className,
      )}
    >
      <Clock className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      {promo.label} if you book in the next {promo.formatted}
    </p>
  );
}
