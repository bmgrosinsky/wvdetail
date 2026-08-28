import Link from 'next/link';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const slots: readonly { readonly id: string; readonly label: string }[] = [
  { id: 'interior', label: 'Interior' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'complete', label: 'Complete detail' },
];

/**
 * Placeholder gallery. No stock photography is used.
 * Replace each slot with a real before/after pair once photos exist.
 */
export function BeforeAfterPlaceholder() {
  return (
    <Section tone="surface" containerSize="wide" ariaLabelledBy="gallery-heading">
      <SectionHeading
        id="gallery-heading"
        eyebrow="Our work"
        title="Before and after"
        description="Real photos from real jobs are on the way. We would rather show you our own work than someone else's stock images."
      />

      <ul className="mt-10 grid gap-5 sm:grid-cols-3">
        {slots.map((slot) => (
          <li key={slot.id}>
            <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-wv-border-strong bg-wv-surface-2 p-6 text-center">
              <ImageIcon className="h-6 w-6 text-wv-subtle" aria-hidden="true" />
              <p className="text-sm font-semibold text-wv-muted">{slot.label}</p>
              <p className="text-xs text-wv-subtle">Before / after photos coming soon</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-8">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-wv-text transition-colors hover:text-wv-red-soft"
        >
          Visit the gallery
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </p>
    </Section>
  );
}
