import { MapPin } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { serviceAreas } from '@/data/serviceAreas';
import { business } from '@/data/business';
import { primaryCta } from '@/data/navigation';

export function ServiceAreaSection() {
  return (
    <Section tone="surface" containerSize="wide" ariaLabelledBy="service-area-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
        <SectionHeading
          id="service-area-heading"
          eyebrow="Service area"
          title={`Detailing across ${business.city} County`}
          description={`Based in ${business.cityState}, we serve the city and the surrounding communities. If you are close by but do not see your town listed, ask us.`}
        >
          <div className="mt-7">
            <ButtonLink href={primaryCta.href} variant="primary" size="md">
              {primaryCta.label}
            </ButtonLink>
          </div>
        </SectionHeading>

        <ul className="grid gap-3 sm:grid-cols-2">
          {serviceAreas.map((area) => (
            <li
              key={area.slug}
              className="flex items-center gap-2.5 rounded-lg border border-wv-border bg-wv-surface-2 px-4 py-3"
            >
              <MapPin className="h-4 w-4 shrink-0 text-wv-red-soft" aria-hidden="true" />
              <span className="text-sm font-medium text-wv-text">{area.name}</span>
              {area.primary ? (
                <span className="ml-auto text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-wv-subtle">
                  Home base
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
