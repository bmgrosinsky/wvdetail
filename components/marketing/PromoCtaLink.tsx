'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { usePromoCountdown } from '@/lib/hooks/usePromoCountdown';

interface PromoCtaLinkProps {
  readonly href: string;
  readonly className: string;
  readonly children: ReactNode;
  readonly onClick?: () => void;
}

/** Drop-in replacement for a plain CTA <Link> that glows while the Book Now offer is active. */
export function PromoCtaLink({ href, className, children, onClick }: PromoCtaLinkProps) {
  const promo = usePromoCountdown();

  return (
    <Link href={href} onClick={onClick} className={cn(className, promo.active && 'wv-cta-glow')}>
      {children}
    </Link>
  );
}
