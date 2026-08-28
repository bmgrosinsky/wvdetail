import { BadgeCheck, Handshake, MapPin, Tag } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface TrustItem {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly detail: string;
}

const items: readonly TrustItem[] = [
  {
    icon: MapPin,
    title: 'Local to Jackson',
    detail: 'Serving Jackson County and the surrounding communities.',
  },
  {
    icon: Tag,
    title: 'Straightforward pricing',
    detail: 'Published starting prices by vehicle size. No guesswork.',
  },
  {
    icon: BadgeCheck,
    title: 'Detail-first work',
    detail: 'Hand work on the surfaces a quick wash always misses.',
  },
  {
    icon: Handshake,
    title: 'Honest recommendations',
    detail: 'We tell you what your vehicle needs, not what costs the most.',
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Why customers choose WV Detail"
      className="border-b border-wv-border bg-wv-surface py-8 sm:py-10"
    >
      <Container size="wide">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <item.icon
                className="mt-0.5 h-5 w-5 shrink-0 text-wv-red-soft"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-wv-text">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-wv-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
