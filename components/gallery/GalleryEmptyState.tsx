import { ArrowRight, Camera } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { business } from '@/data/business';
import { resolved } from '@/lib/todo';

/**
 * Shown while `data/gallery.ts` is empty. We do not fill the grid with stock
 * photography, so the honest version of this page is a short explanation and
 * a way to get in touch.
 */
export function GalleryEmptyState() {
  const facebookUrl = resolved(business.facebookUrl);

  return (
    <div className="rounded-lg border border-dashed border-wv-border-strong bg-wv-surface p-8 sm:p-12">
      <Camera className="h-7 w-7 text-wv-subtle" aria-hidden="true" />
      <h2 className="mt-5 text-xl font-bold tracking-tight text-wv-text sm:text-2xl">
        Photos of recent work are coming soon
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-wv-muted">
        We only publish photos of vehicles we have actually detailed, shot
        before and after in the same light and the same framing. Rather than
        fill this page with stock images, we are leaving it empty until we have
        our own work to show.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <ButtonLink href="/quote" variant="primary" size="lg">
          Get a Quote
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
        {facebookUrl ? (
          <ButtonLink href={facebookUrl} variant="secondary" size="lg">
            See recent work on Facebook
          </ButtonLink>
        ) : null}
      </div>

      {facebookUrl ? null : (
        <p className="mt-6 text-sm text-wv-subtle">
          {/* TODO: add the verified Facebook page URL to data/business.ts and a
              "See recent work on Facebook" button appears here automatically. */}
          In the meantime, ask us for photos of a job like yours when you
          request a quote.
        </p>
      )}
    </div>
  );
}
