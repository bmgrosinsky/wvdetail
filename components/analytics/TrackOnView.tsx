'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics/gtag';
import type { AnalyticsEventName, AnalyticsParams } from '@/lib/analytics/events';

interface TrackOnViewProps {
  readonly event: AnalyticsEventName;
  readonly params?: AnalyticsParams;
}

/**
 * Fires a GA4 event once when the page mounts. Renders nothing.
 * Lets a server component page attach a "viewed" event without becoming
 * a client component itself.
 */
export function TrackOnView({ event, params }: TrackOnViewProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackEvent(event, params);
    // Only the first mount should count as a view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
