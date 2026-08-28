import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

type Tone = 'dark' | 'surface' | 'light';

interface SectionProps {
  readonly children: ReactNode;
  readonly id?: string;
  readonly tone?: Tone;
  readonly className?: string;
  readonly containerClassName?: string;
  readonly containerSize?: 'default' | 'narrow' | 'wide';
  readonly ariaLabelledBy?: string;
  readonly ariaLabel?: string;
}

const tones: Record<Tone, string> = {
  dark: 'bg-wv-black text-wv-text',
  surface: 'bg-wv-surface text-wv-text border-y border-wv-border',
  light: 'bg-wv-offwhite text-wv-ink',
};

/** Standard vertical rhythm + tone switch for every page section. */
export function Section({
  children,
  id,
  tone = 'dark',
  className,
  containerClassName,
  containerSize = 'default',
  ariaLabelledBy,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={cn('py-16 sm:py-20 lg:py-24', tones[tone], className)}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
