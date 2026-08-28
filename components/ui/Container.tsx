import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly size?: 'default' | 'narrow' | 'wide';
}

const sizes: Record<NonNullable<ContainerProps['size']>, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
};

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}
