import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ContactActions } from '@/components/forms/ContactActions';
import { ContactForm } from '@/components/forms/ContactForm';
import { business } from '@/data/business';
import { primaryCta } from '@/data/navigation';
import { serviceAreaNames } from '@/data/serviceAreas';
import { isTodo, resolved } from '@/lib/todo';

export const metadata: Metadata = {
  title: { absolute: `Contact | ${business.name}` },
  description: `Contact ${business.name}, auto detailing in ${business.cityState}. Call, text, or send a message. For service pricing, request a quote.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact | ${business.name}`,
    description: `Contact ${business.name}, auto detailing in ${business.cityState}.`,
    url: `${business.siteUrl}/contact`,
    type: 'website',
  },
};

export default function ContactPage() {
  const email = resolved(business.email);
  const hours = business.hours.filter((entry) => !isTodo(entry.hours));
  const areas = serviceAreaNames.join(', ');

  return (
    <div className="bg-wv-black pb-24 sm:pb-20">
      <Container size="narrow" className="pt-12 sm:pt-16 lg:pt-20">
        <header className="mb-8 sm:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
            Contact
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl lg:text-5xl">
            Get in touch with {business.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-wv-muted sm:text-lg">
            Based in {business.cityState} and serving {areas}.
          </p>
        </header>

        <ContactActions />

        <div className="mt-8 rounded-lg border border-wv-border bg-wv-surface p-5 sm:p-7">
          <h2 className="text-lg font-bold tracking-tight text-wv-text">
            Looking for pricing?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-wv-muted">
            Service inquiries are handled fastest through the quote form, where you can
            tell us the vehicle, the service, and its condition in one go.
          </p>
          <Link
            href={primaryCta.href}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-wv-red-soft hover:text-wv-text"
          >
            {primaryCta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {email || hours.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {email ? (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-wv-subtle">
                  Email
                </h2>
                <a
                  href={`mailto:${email}`}
                  className="mt-2 inline-block text-base text-wv-text hover:text-wv-red-soft"
                >
                  {email}
                </a>
              </div>
            ) : null}

            {hours.length > 0 ? (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-wv-subtle">
                  Hours
                </h2>
                <dl className="mt-2 space-y-1 text-sm">
                  {hours.map((entry) => (
                    <div key={entry.day} className="flex justify-between gap-4">
                      <dt className="text-wv-muted">{entry.day}</dt>
                      <dd className="text-wv-text">{entry.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>
        ) : null}

        <section aria-labelledby="contact-form-heading" className="mt-12">
          <h2
            id="contact-form-heading"
            className="text-2xl font-bold tracking-tight text-wv-text sm:text-3xl"
          >
            Send a message
          </h2>
          <p className="mt-3 text-base leading-relaxed text-wv-muted">
            General questions only. Leave an email address or a phone number so we can
            reply.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
      </Container>
    </div>
  );
}
