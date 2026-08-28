'use client';

import type { AnchorHTMLAttributes } from 'react';
import { trackEvent } from '@/lib/analytics/gtag';
import type { AnalyticsEventName, AnalyticsParams } from '@/lib/analytics/events';

interface TrackedAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly event: AnalyticsEventName;
  readonly params?: AnalyticsParams;
}

/**
 * A plain `<a>` that fires a GA4 event on click before letting the browser
 * follow the link. Lets server components attach click tracking to a link
 * (tel:, sms:, or an external URL) without becoming client components
 * themselves.
 */
export function TrackedAnchor({
  event,
  params,
  onClick,
  children,
  ...rest
}: TrackedAnchorProps) {
  return (
    <a
      {...rest}
      onClick={(nativeEvent) => {
        trackEvent(event, params);
        onClick?.(nativeEvent);
      }}
    >
      {children}
    </a>
  );
}
