'use client';

import { useEffect, useRef } from 'react';
import { turnstileSiteKey } from '@/lib/forms/submit';

/**
 * Cloudflare Turnstile, rendered explicitly so the token can be handed to the
 * submission library. The script is injected by this component, so it only
 * loads on pages that actually render a form.
 *
 * When `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is absent the component renders
 * nothing and the form continues to work without a captcha.
 */

interface TurnstileRenderOptions {
  readonly sitekey: string;
  readonly theme?: 'auto' | 'light' | 'dark';
  readonly callback?: (token: string) => void;
  readonly 'expired-callback'?: () => void;
  readonly 'error-callback'?: () => void;
}

interface TurnstileApi {
  render: (element: HTMLElement, options: TurnstileRenderOptions) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_ID = 'cf-turnstile-script';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('load')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('load')), { once: true });
    document.head.appendChild(script);
  });
}

interface TurnstileWidgetProps {
  /** Receives the solved token, or `null` when it expires or errors. */
  readonly onToken: (token: string | null) => void;
}

export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onTokenRef = useRef(onToken);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!turnstileSiteKey) return;

    let widgetId: string | null = null;
    let cancelled = false;

    const render = async (): Promise<void> => {
      try {
        await loadScript();
      } catch {
        onTokenRef.current(null);
        return;
      }

      const api = window.turnstile;
      const container = containerRef.current;
      if (cancelled || !api || !container || !turnstileSiteKey) return;

      widgetId = api.render(container, {
        sitekey: turnstileSiteKey,
        theme: 'dark',
        callback: (token: string) => onTokenRef.current(token),
        'expired-callback': () => onTokenRef.current(null),
        'error-callback': () => onTokenRef.current(null),
      });
    };

    void render();

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, []);

  if (!turnstileSiteKey) return null;

  return <div ref={containerRef} className="mt-2" />;
}
