import { business } from '@/data/business';
import { getService } from '@/data/services';
import { discountEligibilityOptions } from '@/data/promotions';
import { PROMO_HONORED_NOTE } from '@/lib/promo';
import {
  conditionFlagOptions,
  conditionLevelOptions,
  vehicleSizeOptions,
  type ContactFormValues,
  type QuoteFormValues,
} from './schema';

/**
 * Form submission transport, kept entirely separate from the form UI.
 *
 * Submissions go to Web3Forms (https://web3forms.com). Their access key is
 * designed to be public, so it lives in `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
 * Cloudflare Turnstile, a honeypot field, and a minimum time-on-form check
 * provide the spam defence.
 *
 * Nothing here surfaces an upstream response, key, or stack trace to the user:
 * callers only ever receive `{ ok: true }` or `{ ok: false }`.
 */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/** A submission faster than this is treated as automated. */
export const MIN_SUBMIT_MS = 3000;

export const web3formsAccessKey: string | null =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? null;

export const turnstileSiteKey: string | null =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? null;

export function isSubmissionConfigured(): boolean {
  return typeof web3formsAccessKey === 'string' && web3formsAccessKey.length > 0;
}

export function isTurnstileConfigured(): boolean {
  return typeof turnstileSiteKey === 'string' && turnstileSiteKey.length > 0;
}

export interface SubmitContext {
  /** Value of the hidden honeypot input. Anything non-empty is a bot. */
  readonly honeypot: string;
  /** Milliseconds since the form was mounted. */
  readonly elapsedMs: number;
  /** Turnstile token, when the widget is configured and solved. */
  readonly turnstileToken: string | null;
}

export type SubmitResult = { readonly ok: true } | { readonly ok: false };

const OK: SubmitResult = { ok: true };
const FAILED: SubmitResult = { ok: false };

function labelFor(
  options: readonly { readonly value: string; readonly label: string }[],
  value: string | undefined,
): string {
  if (!value) return 'Not specified';
  return options.find((option) => option.value === value)?.label ?? value;
}

function serviceLabel(slug: string): string {
  if (slug === 'not-sure') return 'Not sure - please recommend';
  return getService(slug)?.name ?? slug;
}

async function post(payload: Record<string, string>): Promise<SubmitResult> {
  const accessKey = web3formsAccessKey;
  if (!accessKey) return FAILED;

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ...payload, access_key: accessKey }),
    });

    if (!response.ok) return FAILED;

    const data: unknown = await response.json();
    const succeeded =
      typeof data === 'object' &&
      data !== null &&
      (data as { success?: unknown }).success === true;

    return succeeded ? OK : FAILED;
  } catch {
    // Network or parsing failure. Deliberately opaque to the caller.
    return FAILED;
  }
}

function passesSpamChecks(context: SubmitContext): boolean {
  if (context.honeypot.trim() !== '') return false;
  if (context.elapsedMs < MIN_SUBMIT_MS) return false;
  if (isTurnstileConfigured() && !context.turnstileToken) return false;
  return true;
}

function withCaptcha(
  payload: Record<string, string>,
  context: SubmitContext,
): Record<string, string> {
  if (isTurnstileConfigured() && context.turnstileToken) {
    return { ...payload, 'cf-turnstile-response': context.turnstileToken };
  }
  return payload;
}

export async function submitQuote(
  values: QuoteFormValues,
  context: SubmitContext,
  promoActive = false,
): Promise<SubmitResult> {
  if (!passesSpamChecks(context)) return FAILED;

  const flags =
    values.conditionFlags.length > 0
      ? values.conditionFlags
          .map((flag) => labelFor(conditionFlagOptions, flag))
          .join(', ')
      : 'None noted';

  const email = values.email?.trim() ?? '';

  const payload: Record<string, string> = {
    subject: `Quote request - ${values.vehicle}`,
    from_name: `${business.name} website`,
    'Customer name': values.name,
    Phone: values.phone,
    Email: email || 'Not provided',
    Vehicle: values.vehicle,
    'Vehicle size': labelFor(vehicleSizeOptions, values.size),
    'Service requested': serviceLabel(values.service),
    'Interior condition': labelFor(conditionLevelOptions, values.interiorCondition),
    'Exterior condition': labelFor(conditionLevelOptions, values.exteriorCondition),
    'Condition notes': flags,
    'Discount eligibility': values.discountEligibility
      ? labelFor(discountEligibilityOptions, values.discountEligibility)
      : 'None selected',
    'Preferred date': values.preferredDate?.trim() || 'Not specified',
    Notes: values.notes?.trim() || 'None',
  };

  if (email) payload.replyto = email;
  if (promoActive) payload.Promo = PROMO_HONORED_NOTE;

  return post(withCaptcha(payload, context));
}

export async function submitContactMessage(
  values: ContactFormValues,
  context: SubmitContext,
): Promise<SubmitResult> {
  if (!passesSpamChecks(context)) return FAILED;

  const email = values.email?.trim() ?? '';

  const payload: Record<string, string> = {
    subject: `Website message from ${values.name}`,
    from_name: `${business.name} website`,
    'Customer name': values.name,
    Email: email || 'Not provided',
    Phone: values.phone?.trim() || 'Not provided',
    Message: values.message,
  };

  if (email) payload.replyto = email;

  return post(withCaptcha(payload, context));
}
