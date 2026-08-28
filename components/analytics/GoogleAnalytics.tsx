import Script from 'next/script';
import { gaMeasurementId } from '@/lib/analytics/gtag';

/**
 * Loads GA4 only when NEXT_PUBLIC_GA_ID is set, so local and preview builds
 * stay clean. Renders nothing otherwise.
 */
export function GoogleAnalytics() {
  if (gaMeasurementId === null) return null;

  const id = gaMeasurementId;

  return (
    <>
      <Script
        id="ga-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)});`}
      </Script>
    </>
  );
}
