import Link from 'next/link';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { business } from '@/data/business';
import { footerNav } from '@/data/navigation';
import { serviceAreaNames } from '@/data/serviceAreas';
import { categoryHref, services } from '@/data/services';
import { resolved } from '@/lib/todo';
import { Logo } from './Logo';

export function Footer() {
  const phone = resolved(business.phone);
  const phoneHref = resolved(business.phoneHref);
  const email = resolved(business.email);
  const facebookUrl = resolved(business.facebookUrl);
  const publishedHours = business.hours.filter((entry) => resolved(entry.hours));
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-wv-border bg-wv-black pb-24 pt-14 sm:pb-14">
      <Container size="wide">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo withTagline />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-wv-muted">
              Interior, exterior, and complete detailing for {business.cityState}
              drivers, priced by vehicle size.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-wv-subtle">
              Site
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-wv-muted transition-colors hover:text-wv-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-wv-subtle">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`${categoryHref(service.category)}#${service.slug}`}
                    className="text-sm text-wv-muted transition-colors hover:text-wv-text"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-wv-subtle">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-wv-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-wv-subtle" aria-hidden="true" />
                <span>
                  Serving {business.cityState} and surrounding areas
                </span>
              </li>
              {phone && phoneHref ? (
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-wv-subtle" aria-hidden="true" />
                  <a href={phoneHref} className="transition-colors hover:text-wv-text">
                    {phone}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-wv-subtle" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="transition-colors hover:text-wv-text">
                    {email}
                  </a>
                </li>
              ) : null}
              {facebookUrl ? (
                <li className="flex items-start gap-2.5">
                  <ExternalLink
                    className="mt-0.5 h-4 w-4 shrink-0 text-wv-subtle"
                    aria-hidden="true"
                  />
                  <a
                    href={facebookUrl}
                    className="transition-colors hover:text-wv-text"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                </li>
              ) : null}
            </ul>

            {publishedHours.length > 0 ? (
              <>
                <h2 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-wv-subtle">
                  Hours
                </h2>
                <ul className="mt-3 space-y-1.5 text-sm text-wv-muted">
                  {publishedHours.map((entry) => (
                    <li key={entry.day} className="flex justify-between gap-4">
                      <span>{entry.day}</span>
                      <span className="text-wv-subtle">{entry.hours}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-wv-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-wv-subtle">
            &copy; {year} {business.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-wv-subtle">
            Auto detailing in {business.city}, {business.stateFull} &mdash;{' '}
            {serviceAreaNames.slice(1).join(', ')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
