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
        'inline-flex items-center gap-1.5 rounded-full border border-wv-red-soft/40 bg-wv-red-soft/10 px-3 py-1 text-xs font-semibold text-wv-red-soft',
        className,
      )}
    >
      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
      {promo.label} if you book in the next {promo.formatted}
    </p>
  );
}
