import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly id?: string;
  readonly as?: 'h2' | 'h3';
  readonly align?: 'left' | 'center';
  readonly tone?: 'dark' | 'light';
  readonly className?: string;
  readonly children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  as: Heading = 'h2',
  align = 'left',
  tone = 'dark',
  className,
  children,
}: SectionHeadingProps) {
  const isLight = tone === 'light';

  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'mb-3 text-xs font-semibold uppercase tracking-[0.18em]',
            isLight ? 'text-wv-red' : 'text-wv-red-soft',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          'text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl',
          isLight ? 'text-wv-ink' : 'text-wv-text',
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed sm:text-lg',
            isLight ? 'text-wv-ink-muted' : 'text-wv-muted',
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
