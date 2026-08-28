import Link from 'next/link';
import { business } from '@/data/business';
import { cn } from '@/lib/cn';

interface LogoProps {
  readonly className?: string;
  readonly tone?: 'dark' | 'light';
  readonly withTagline?: boolean;
}

export function Logo({ className, tone = 'dark', withTagline = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label={`${business.name} home`}
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-wv-red text-[0.8rem] font-bold leading-none tracking-tight text-white"
      >
        WV
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[1.05rem] font-bold tracking-tight',
            tone === 'light' ? 'text-wv-ink' : 'text-wv-text',
          )}
        >
          {business.name}
        </span>
        {withTagline ? (
          <span className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-wv-subtle">
            {business.tagline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
