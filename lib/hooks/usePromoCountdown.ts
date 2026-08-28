'use client';

import { useEffect, useState } from 'react';
import { PROMO_ENABLED, PROMO_LABEL, readOrStartPromoDeadline } from '@/lib/promo';

interface PromoCountdown {
  /** True once mounted and time remains. False during SSR/first paint to avoid a hydration mismatch. */
  readonly active: boolean;
  readonly label: string;
  readonly formatted: string;
}

function format(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function usePromoCountdown(): PromoCountdown {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    if (!PROMO_ENABLED) return;
    const deadline = readOrStartPromoDeadline();

    const tick = (): void => {
      setRemainingMs(Math.max(0, deadline - Date.now()));
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const active = PROMO_ENABLED && remainingMs !== null && remainingMs > 0;

  return {
    active,
    label: PROMO_LABEL,
    formatted: format(remainingMs ?? 0),
  };
}
