import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { business } from '@/data/business';
import { resolved } from '@/lib/todo';

export const metadata: Metadata = {
  title: { absolute: `Privacy | ${business.name}` },
  description: `How ${business.name} handles the information you send through the website.`,
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: `Privacy | ${business.name}`,
    description: `How ${business.name} handles the information you send through the website.`,
    url: '/privacy',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

interface Block {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export default function PrivacyPage() {
  const email = resolved(business.email);

  const blocks: readonly Block[] = [
    {
      heading: 'What you send us',
      paragraphs: [
        'The only information we collect directly is what you type into a quote or contact form: your name, how to reach you, your vehicle, and whatever you tell us about what it needs. Nothing on this site asks for payment details, and we do not ask for anything we do not need in order to quote your vehicle.',
        'You can also reach us by phone, text, message, or email instead of using a form. In that case we have whatever you chose to send us, and nothing more.',
      ],
    },
    {
      heading: 'How form submissions reach us',
      paragraphs: [
        'Form submissions on this site are delivered through Web3Forms, a third-party form processing service. When you submit a form, what you typed passes through their systems in order to be delivered to us as a message. We do not run our own database of submissions on this website.',
        'That means Web3Forms handles your submission in transit and is subject to its own privacy practices, which you can read at web3forms.com. We use them only to deliver messages, not to build a mailing list.',
      ],
    },
    {
      heading: 'How we use your contact information',
      paragraphs: [
        'We use it to answer you: to send a quote, ask a follow-up question about your vehicle, arrange a time, or confirm details before work begins. That is the whole purpose.',
        'We do not sell your information, rent it, or trade it. We do not add you to a marketing list because you asked for a price, and we do not send promotional messages you did not ask for. We keep quote conversations only as long as they are useful for serving you.',
      ],
    },
    {
      heading: 'Analytics and cookies',
      paragraphs: [
        'This site may use Google Analytics to understand how the site is used in aggregate: which pages people visit, roughly where visitors come from, and what device they use. That helps us know which pages are worth improving.',
        'Google Analytics sets cookies in your browser and collects technical information such as your approximate location, browser, and the pages you view. We do not send your name, email, phone number, or the contents of your quote request to Google Analytics.',
        'If you would rather not be measured at all, most browsers let you block or delete cookies, and Google publishes a browser add-on that opts you out of Google Analytics entirely. Blocking either will not stop the site from working.',
      ],
    },
    {
      heading: 'Links to other sites',
      paragraphs: [
        'Some pages link out to places like our Google Business Profile or Facebook page. Once you follow a link off this site, that company is handling your visit under its own privacy policy, not ours.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'This is a business site for vehicle owners. It is not directed at children, and we do not knowingly collect information from them.',
      ],
    },
    {
      heading: 'Changes to this page',
      paragraphs: [
        'If how we handle information changes, we will update this page. Because this is a short, plain-language description rather than a legal contract, we would rather keep it accurate than keep it long.',
      ],
    },
  ];

  return (
    <>
      <Section tone="dark" containerSize="narrow">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-wv-red-soft">
          Privacy
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-wv-text sm:text-4xl">
          Privacy at {business.name}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-wv-muted sm:text-lg">
          Short version: we collect what you send us so we can quote your vehicle and
          get back to you. We use basic analytics to see how the site is used. We do not
          sell your information to anyone.
        </p>

        <div className="mt-12 space-y-10">
          {blocks.map((block) => (
            <section key={block.heading}>
              <h2 className="text-lg font-semibold tracking-tight text-wv-text">
                {block.heading}
              </h2>
              {block.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-3 text-base leading-relaxed text-wv-muted"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section>
            <h2 className="text-lg font-semibold tracking-tight text-wv-text">
              Questions
            </h2>
            <p className="mt-3 text-base leading-relaxed text-wv-muted">
              If you want to know what we have on file, or you want it removed, just
              ask{email ? ' at ' : ' through the '}
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="text-wv-red-soft underline underline-offset-4"
                >
                  {email}
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="text-wv-red-soft underline underline-offset-4"
                >
                  contact page
                </Link>
              )}
              . We will take care of it.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
