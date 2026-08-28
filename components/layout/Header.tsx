import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { buttonClasses } from '@/components/ui/Button';
import { mainNav, primaryCta } from '@/data/navigation';
import { business } from '@/data/business';
import { resolved } from '@/lib/todo';
import { analyticsEvents } from '@/lib/analytics/events';
import { TrackedAnchor } from '@/components/analytics/TrackedAnchor';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';

export function Header() {
  const phone = resolved(business.phone);
  const phoneHref = resolved(business.phoneHref);

  return (
    <header className="sticky top-0 z-40 border-b border-wv-border bg-wv-black/90 backdrop-blur supports-[backdrop-filter]:bg-wv-black/75">
      <Container size="wide">
        <div className="flex h-14 items-center justify-between gap-4 sm:h-16">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-wv-muted transition-colors hover:text-wv-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {phone && phoneHref ? (
              <TrackedAnchor
                href={phoneHref}
                event={analyticsEvents.phoneClicked}
                params={{ placement: 'header' }}
                className="hidden items-center gap-2 text-sm font-medium text-wv-muted transition-colors hover:text-wv-text lg:inline-flex"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {phone}
              </TrackedAnchor>
            ) : null}
            <Link
              href={primaryCta.href}
              className={buttonClasses('primary', 'sm', 'hidden sm:inline-flex')}
            >
              {primaryCta.label}
            </Link>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
