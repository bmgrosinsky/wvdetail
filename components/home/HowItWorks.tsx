import { CalendarCheck, ClipboardList, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface Step {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body: string;
}

const steps: readonly Step[] = [
  {
    icon: ClipboardList,
    title: 'Request a quote',
    body: 'Tell us the vehicle, the service, and its condition. Photos help us quote accurately the first time.',
  },
  {
    icon: CalendarCheck,
    title: 'Confirm price and time',
    body: 'We come back with a firm price and a realistic time estimate before any work begins. Nothing gets billed that you have not agreed to.',
  },
  {
    icon: Sparkles,
    title: 'We detail your vehicle',
    body: 'Hand work on the surfaces a quick wash always misses, priced by vehicle size, not by guesswork.',
  },
];

export function HowItWorks() {
  return (
    <Section tone="surface" containerSize="wide" ariaLabelledBy="how-it-works-heading">
      <SectionHeading
        id="how-it-works-heading"
        eyebrow="How it works"
        title="From quote to a clean vehicle in three steps"
      />

      <ol className="mt-10 grid gap-6 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-lg border border-wv-border bg-wv-surface-2 p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wv-red/10 text-sm font-bold text-wv-red-soft">
                {index + 1}
              </span>
              <step.icon className="h-5 w-5 text-wv-red-soft" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-base font-bold tracking-tight text-wv-text">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-wv-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
