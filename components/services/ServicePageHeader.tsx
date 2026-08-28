import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

interface ServicePageHeaderProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly children?: ReactNode;
}

/** Page-level header with the single h1 for each services route. */
export function ServicePageHeader({
  eyebrow,
  title,
  description,
  children,
}: ServicePageHeaderProps) {
  return (
    <section className="border-b border-wv-border bg-wv-black pt-14 pb-12 sm:pt-20 sm:pb-16">
      <Container size="wide">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-wv-muted sm:text-lg">
            {description}
          </p>
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
