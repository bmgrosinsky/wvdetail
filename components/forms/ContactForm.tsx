'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { business } from '@/data/business';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import {
  contactSchema,
  toFieldErrors,
  type ContactFormValues,
  type FieldErrors,
} from '@/lib/forms/schema';
import {
  isTurnstileConfigured,
  submitContactMessage,
  type SubmitContext,
} from '@/lib/forms/submit';
import { TurnstileWidget } from './TurnstileWidget';
import {
  Field,
  describedBy,
  fieldControlClasses,
  fieldErrorClasses,
} from './FormField';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface DraftState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const emptyDraft: DraftState = { name: '', email: '', phone: '', message: '' };

/** Short general-purpose message form. Service inquiries belong on /quote. */
export function ContactForm() {
  const uid = useId();
  const [draft, setDraft] = useState<DraftState>(emptyDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement | null>(null);
  const mountedAt = useRef<number | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const fieldId = (name: string): string => `${uid}-${name}`;

  // Records when the form became usable, for the minimum-submission-time check.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const update = (key: keyof DraftState, value: string): void => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (status === 'submitting') return;

    const parsed = contactSchema.safeParse({
      name: draft.name,
      email: draft.email,
      phone: draft.phone,
      message: draft.message,
    });

    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error));
      setStatus('idle');
      summaryRef.current?.focus();
      return;
    }

    setErrors({});
    setStatus('submitting');

    const context: SubmitContext = {
      honeypot: honeypotRef.current?.value ?? '',
      elapsedMs: mountedAt.current === null ? 0 : Date.now() - mountedAt.current,
      turnstileToken,
    };

    const values: ContactFormValues = parsed.data;
    const result = await submitContactMessage(values, context);

    if (result.ok) {
      setStatus('success');
      setDraft(emptyDraft);
      return;
    }

    setStatus('error');
    summaryRef.current?.focus();
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-lg border border-wv-border bg-wv-surface p-6 sm:p-8"
      >
        <h3 className="text-lg font-bold tracking-tight text-wv-text">
          Thanks. Your message has been sent to {business.name}.
        </h3>
        <p className="mt-3 text-base leading-relaxed text-wv-muted">
          We&apos;ll follow up using the contact information you provided.
        </p>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-lg border border-wv-border bg-wv-surface p-5 sm:p-7"
    >
      <div
        ref={summaryRef}
        tabIndex={-1}
        aria-live="polite"
        className="focus:outline-none"
      >
        {errorCount > 0 ? (
          <p className="rounded-md border border-wv-red-soft/40 bg-wv-surface-2 p-4 text-sm font-medium text-wv-red-soft">
            Please review the highlighted {errorCount === 1 ? 'field' : 'fields'} below.
          </p>
        ) : null}
        {status === 'error' ? (
          <p className="rounded-md border border-wv-red-soft/40 bg-wv-surface-2 p-4 text-sm font-medium text-wv-red-soft">
            We couldn&apos;t send your request. Please try again or contact{' '}
            {business.name} directly.
          </p>
        ) : null}
      </div>

      <Field id={fieldId('name')} label="Name" required error={errors.name}>
        <input
          id={fieldId('name')}
          name="name"
          type="text"
          autoComplete="name"
          value={draft.name}
          onChange={(event) => update('name', event.target.value)}
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy(errors.name && `${fieldId('name')}-error`)}
          className={cn(fieldControlClasses, errors.name && fieldErrorClasses)}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={fieldId('email')}
          label="Email"
          hint="Email or phone - whichever you prefer."
          error={errors.email}
        >
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={draft.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy(
              `${fieldId('email')}-hint`,
              errors.email && `${fieldId('email')}-error`,
            )}
            className={cn(fieldControlClasses, errors.email && fieldErrorClasses)}
          />
        </Field>

        <Field id={fieldId('phone')} label="Phone" error={errors.phone}>
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={draft.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy(errors.phone && `${fieldId('phone')}-error`)}
            className={cn(fieldControlClasses, errors.phone && fieldErrorClasses)}
          />
        </Field>
      </div>

      <Field id={fieldId('message')} label="Message" required error={errors.message}>
        <textarea
          id={fieldId('message')}
          name="message"
          rows={5}
          value={draft.message}
          onChange={(event) => update('message', event.target.value)}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy(errors.message && `${fieldId('message')}-error`)}
          className={cn(fieldControlClasses, errors.message && fieldErrorClasses)}
        />
      </Field>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId('company')}>Company</label>
        <input
          ref={honeypotRef}
          id={fieldId('company')}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {isTurnstileConfigured() ? <TurnstileWidget onToken={setTurnstileToken} /> : null}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  );
}
