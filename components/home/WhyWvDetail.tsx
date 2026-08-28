import { ClipboardList, Sparkles, Timer, UserCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface Reason {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body: string;
}

const reasons: readonly Reason[] = [
  {
    icon: Sparkles,
    title: 'The details, done by hand',
    body: 'Vents, seams, crevices, door jambs, and the edges an automatic wash never touches. That hand work is the difference between clean and detailed.',
  },
  {
    icon: ClipboardList,
    title: 'Pricing you can read before you call',
    body: 'Every service has a published starting price by vehicle size. If your vehicle needs more than the standard scope, we tell you before we start, not after.',
  },
  {
    icon: UserCheck,
    title: 'Matched to your vehicle',
    body: 'A well-kept daily driver does not need our most expensive package. We will point you to the service that actually fits what you are driving.',
  },
  {
    icon: Timer,
    title: 'Careful, not rushed',
    body: 'We book realistically so each vehicle gets the time it needs. You get a time estimate up front so you can plan your day around it.',
  },
];

export function WhyWvDetail() {
  return (
    <Section tone="dark" containerSize="wide" ariaLabelledBy="why-heading">
      <SectionHeading
        id="why-heading"
        eyebrow="Why WV Detail"
        title="Straightforward work, straightforward pricing"
        description="No packages designed to confuse you, and no upsells you did not ask for."
      />

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {reasons.map((reason) => (
          <li
            key={reason.title}
            className="rounded-lg border border-wv-border bg-wv-surface p-6"
          >
            <reason.icon className="h-5 w-5 text-wv-red-soft" aria-hidden="true" />
            <h3 className="mt-4 text-base font-bold tracking-tight text-wv-text">
              {reason.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-wv-muted">{reason.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
