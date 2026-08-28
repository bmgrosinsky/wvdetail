import { oversizeNote, vehicleClasses } from '@/data/services';

interface VehicleSizeGuideProps {
  readonly headingId?: string;
  readonly heading?: string;
}

/** Explains which price column a customer's vehicle falls into. */
export function VehicleSizeGuide({
  headingId = 'vehicle-size-guide-heading',
  heading = 'Which size is my vehicle?',
}: VehicleSizeGuideProps) {
  return (
    <div className="rounded-lg border border-wv-border bg-wv-surface-2 p-6">
      <h3 id={headingId} className="text-base font-bold tracking-tight text-wv-text">
        {heading}
      </h3>
      <dl className="mt-4 grid gap-4 sm:grid-cols-3">
        {vehicleClasses.map((vehicleClass) => (
          <div key={vehicleClass.id}>
            <dt className="text-sm font-semibold text-wv-text">{vehicleClass.label}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-wv-muted">
              {vehicleClass.examples}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 border-t border-wv-border pt-4 text-sm text-wv-subtle">
        Dually pickups, cargo vans, and other oversized or unusual vehicles: {oversizeNote}.
      </p>
    </div>
  );
}
