import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { featuredFaqs } from '@/data/faqs';

export function FaqPreview() {
  if (featuredFaqs.length === 0) return null;

  return (
    <Section tone="dark" containerSize="wide" ariaLabelledBy="faq-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Questions we get asked a lot"
          description="If yours is not here, ask when you request a quote and we will answer it directly."
        >
          <p className="mt-7">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-wv-text transition-colors hover:text-wv-red-soft"
            >
              Read all FAQs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </SectionHeading>

        <FAQAccordion items={featuredFaqs} defaultOpenId={featuredFaqs[0]?.id} />
      </div>
    </Section>
  );
}
