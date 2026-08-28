'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, MessageSquare, Phone } from 'lucide-react';
import { business } from '@/data/business';
import { conditionDisclaimer, services } from '@/data/services';
import { discountEligibilityOptions, discountEligibilityValues } from '@/data/promotions';
import { resolved } from '@/lib/todo';
import { cn } from '@/lib/cn';
import { trackEvent } from '@/lib/analytics/gtag';
import { analyticsEvents } from '@/lib/analytics/events';
import { buttonClasses, Button } from '@/components/ui/Button';
import { PromoBadge } from '@/components/marketing/PromoBadge';
import { usePromoCountdown } from '@/lib/hooks/usePromoCountdown';
import {
  conditionFlagOptions,
  conditionLevelOptions,
  conditionLevelValues,
  quoteSchema,
  toFieldErrors,
  vehicleSizeOptions,
  type ConditionFlag,
  type ConditionLevel,
  type FieldErrors,
  type QuoteFormValues,
} from '@/lib/forms/schema';
import {
  isTurnstileConfigured,
  submitQuote,
  type SubmitContext,
} from '@/lib/forms/submit';
import { TurnstileWidget } from './TurnstileWidget';
import {
  ChoiceCard,
  Field,
  Fieldset,
  FormGroup,
  describedBy,
  fieldControlClasses,
  fieldErrorClasses,
} from './FormField';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface DraftState {
  vehicle: string;
  size: string;
  service: string;
  interiorCondition: string;
  exteriorCondition: string;
  conditionFlags: readonly ConditionFlag[];
  name: string;
  phone: string;
  email: string;
  discountEligibility: string;
  preferredDate: string;
  notes: string;
}

const emptyDraft: DraftState = {
  vehicle: '',
  size: '',
  service: '',
  interiorCondition: '',
  exteriorCondition: '',
  conditionFlags: [],
  name: '',
  phone: '',
  email: '',
  discountEligibility: '',
  preferredDate: '',
  notes: '',
};

function isConditionLevel(value: string): value is ConditionLevel {
  return (conditionLevelValues as readonly string[]).includes(value);
}

function isDiscountEligibility(
  value: string,
): value is (typeof discountEligibilityValues)[number] {
  return (discountEligibilityValues as readonly string[]).includes(value);
}

interface QuoteFormProps {
  /** Pre-selects the "Service Needed" field, e.g. from a `?service=` link. */
  readonly initialService?: string;
}

export function QuoteForm({ initialService = '' }: QuoteFormProps) {
  const uid = useId();
  const [draft, setDraft] = useState<DraftState>({
    ...emptyDraft,
    service: initialService,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const honeypotRef = useRef<HTMLInputElement | null>(null);
  const mountedAt = useRef<number | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const hasStartedRef = useRef(false);
  const promo = usePromoCountdown();
  const [promoHonored, setPromoHonored] = useState(false);

  const phone = resolved(business.phone);
  const phoneHref = resolved(business.phoneHref);
  const smsHref = phoneHref ? phoneHref.replace(/^tel:/, 'sms:') : null;

  const fieldId = (name: string): string => `${uid}-${name}`;

  // Records when the form became usable, for the minimum-submission-time check.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const markStarted = (): void => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackEvent(analyticsEvents.quoteStarted);
  };

  const update = <K extends keyof DraftState>(key: K, value: DraftState[K]): void => {
    markStarted();
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const toggleFlag = (value: string, checked: boolean): void => {
    markStarted();
    const flag = value as ConditionFlag;
    setDraft((current) => ({
      ...current,
      conditionFlags: checked
        ? [...current.conditionFlags, flag]
        : current.conditionFlags.filter((item) => item !== flag),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (status === 'submitting') return;

    const candidate = {
      vehicle: draft.vehicle,
      size: draft.size,
      service: draft.service,
      interiorCondition: isConditionLevel(draft.interiorCondition)
        ? draft.interiorCondition
        : undefined,
      exteriorCondition: isConditionLevel(draft.exteriorCondition)
        ? draft.exteriorCondition
        : undefined,
      conditionFlags: [...draft.conditionFlags],
      name: draft.name,
      phone: draft.phone,
      email: draft.email,
      discountEligibility: isDiscountEligibility(draft.discountEligibility)
        ? draft.discountEligibility
        : undefined,
      preferredDate: draft.preferredDate,
      notes: draft.notes,
    };

    const parsed = quoteSchema.safeParse(candidate);

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

    const values: QuoteFormValues = parsed.data;
    const result = await submitQuote(values, context, promo.active);

    if (result.ok) {
      setStatus('success');
      setPromoHonored(promo.active);
      trackEvent(analyticsEvents.quoteSubmitted, { service: values.service });
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
        <h2 className="text-xl font-bold tracking-tight text-wv-text sm:text-2xl">
          Thanks. Your quote request has been sent to {business.name}.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-wv-muted">
          We&apos;ll review the vehicle and service information and follow up using the
          contact information you provided.
        </p>
        {promoHonored ? (
          <p className="mt-3 text-sm font-medium text-wv-red-soft">
            Your 10% Book Now discount was noted on this request — we&apos;ll apply it
            when we follow up.
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {phone && phoneHref ? (
            <a
              href={phoneHref}
              onClick={() =>
                trackEvent(analyticsEvents.phoneClicked, { placement: 'quote_success' })
              }
              className={buttonClasses('primary', 'md')}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {phone}
            </a>
          ) : null}
          {phone && smsHref ? (
            <a
              href={smsHref}
              onClick={() =>
                trackEvent(analyticsEvents.textClicked, { placement: 'quote_success' })
              }
              className={buttonClasses('secondary', 'md')}
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Text {phone}
            </a>
          ) : null}
          <Link href="/services" className={buttonClasses('secondary', 'md')}>
            Back to services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  const requiredFields = [
    draft.vehicle,
    draft.size,
    draft.service,
    draft.name,
    draft.phone,
  ] as const;
  const completedCount = requiredFields.filter((value) => value.trim() !== '').length;
  const totalRequired = requiredFields.length;

  // Force the optional-detail disclosure open if validation finds an error inside it,
  // so a hidden error is never silently missed. Derived at render time rather than
  // synced via an effect, so the user can still close it once the error clears.
  const hasDetailErrors = Boolean(errors.notes || errors.preferredDate);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <PromoBadge />

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

      <div className="flex flex-col gap-1.5">
        <div
          role="progressbar"
          aria-valuenow={completedCount}
          aria-valuemin={0}
          aria-valuemax={totalRequired}
          aria-label="Required fields completed"
          className="h-1.5 w-full overflow-hidden rounded-full bg-wv-surface-2"
        >
          <div
            className="h-full rounded-full bg-wv-red-soft"
            style={{ width: `${(completedCount / totalRequired) * 100}%` }}
          />
        </div>
        <p className="text-xs text-wv-subtle">
          {completedCount} of {totalRequired} required fields complete
        </p>
      </div>

      <FormGroup
        step={1}
        title="Your Vehicle"
        description="Size and service determine the price; the rest helps us confirm it."
      >
        <Field
          id={fieldId('vehicle')}
          label="Year, make, and model"
          hint="For example: 2020 Toyota Camry"
          required
          error={errors.vehicle}
        >
          <input
            id={fieldId('vehicle')}
            name="vehicle"
            type="text"
            autoComplete="off"
            value={draft.vehicle}
            onChange={(event) => update('vehicle', event.target.value)}
            aria-required="true"
            aria-invalid={errors.vehicle ? true : undefined}
            aria-describedby={describedBy(
              `${fieldId('vehicle')}-hint`,
              errors.vehicle && `${fieldId('vehicle')}-error`,
            )}
            className={cn(fieldControlClasses, errors.vehicle && fieldErrorClasses)}
          />
        </Field>

        <Fieldset
          legend="Vehicle size"
          required
          error={errors.size}
          errorId={`${fieldId('size')}-error`}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {vehicleSizeOptions.map((option) => (
              <ChoiceCard
                key={option.value}
                type="radio"
                name="size"
                value={option.value}
                label={option.label}
                hint={option.hint}
                checked={draft.size === option.value}
                onChange={(value) => update('size', value)}
              />
            ))}
          </div>
        </Fieldset>

        <Field
          id={fieldId('service')}
          label="Service"
          required
          error={errors.service}
        >
          <select
            id={fieldId('service')}
            name="service"
            value={draft.service}
            onChange={(event) => update('service', event.target.value)}
            aria-required="true"
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={describedBy(
              errors.service && `${fieldId('service')}-error`,
            )}
            className={cn(fieldControlClasses, errors.service && fieldErrorClasses)}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
            <option value="not-sure">Not sure - please recommend</option>
          </select>
        </Field>
      </FormGroup>

      <FormGroup step={2} title="Contact Info">
        <div className="grid gap-6 sm:grid-cols-2">
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

          <Field id={fieldId('phone')} label="Phone" required error={errors.phone}>
            <input
              id={fieldId('phone')}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={draft.phone}
              onChange={(event) => update('phone', event.target.value)}
              aria-required="true"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy(errors.phone && `${fieldId('phone')}-error`)}
              className={cn(fieldControlClasses, errors.phone && fieldErrorClasses)}
            />
          </Field>

          <Field
            id={fieldId('email')}
            label="Email"
            error={errors.email}
            className="sm:col-span-2"
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
              aria-describedby={describedBy(errors.email && `${fieldId('email')}-error`)}
              className={cn(fieldControlClasses, errors.email && fieldErrorClasses)}
            />
          </Field>

          <Field
            id={fieldId('discountEligibility')}
            label="Discount eligibility"
            hint="Military, veterans, police, fire, EMS, corrections, hospital, or teachers."
            className="sm:col-span-2"
          >
            <select
              id={fieldId('discountEligibility')}
              name="discountEligibility"
              value={draft.discountEligibility}
              onChange={(event) => update('discountEligibility', event.target.value)}
              aria-describedby={describedBy(`${fieldId('discountEligibility')}-hint`)}
              className={fieldControlClasses}
            >
              <option value="">Not applicable</option>
              {discountEligibilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-wv-subtle">
              <Link href="/offers" className="text-wv-red-soft hover:text-wv-text">
                See Jackson Serves discount details
              </Link>
              .
            </p>
          </Field>
        </div>
      </FormGroup>

      <details
        open={detailsOpen || hasDetailErrors}
        onToggle={(event) => setDetailsOpen(event.currentTarget.open)}
        className="group rounded-lg border border-wv-border bg-wv-surface p-5 sm:p-7"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
          <div>
            <p className="text-lg font-bold tracking-tight text-wv-text">
              Add more detail
              <span className="ml-2 text-xs font-normal text-wv-subtle">Optional</span>
            </p>
            <p className="mt-1 text-sm text-wv-muted">
              Vehicle condition, a preferred date, or anything else. We&apos;ll ask when
              we follow up if you skip it.
            </p>
          </div>
          <ChevronDown
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-wv-muted transition-transform group-open:rotate-180"
          />
        </summary>

        <div className="mt-6 flex flex-col gap-6">
          <Fieldset legend="Interior condition">
            <div className="grid gap-3 sm:grid-cols-3">
              {conditionLevelOptions.map((option) => (
                <ChoiceCard
                  key={option.value}
                  type="radio"
                  name="interiorCondition"
                  value={option.value}
                  label={option.label}
                  checked={draft.interiorCondition === option.value}
                  onChange={(value) => update('interiorCondition', value)}
                />
              ))}
            </div>
          </Fieldset>

          <Fieldset legend="Exterior condition">
            <div className="grid gap-3 sm:grid-cols-3">
              {conditionLevelOptions.map((option) => (
                <ChoiceCard
                  key={option.value}
                  type="radio"
                  name="exteriorCondition"
                  value={option.value}
                  label={option.label}
                  checked={draft.exteriorCondition === option.value}
                  onChange={(value) => update('exteriorCondition', value)}
                />
              ))}
            </div>
          </Fieldset>

          <Fieldset
            legend="Anything that applies"
            hint="Select all that apply."
            hintId={`${fieldId('flags')}-hint`}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {conditionFlagOptions.map((option) => (
                <ChoiceCard
                  key={option.value}
                  type="checkbox"
                  name="conditionFlags"
                  value={option.value}
                  label={option.label}
                  checked={draft.conditionFlags.includes(option.value)}
                  onChange={toggleFlag}
                />
              ))}
            </div>
          </Fieldset>

          <Field
            id={fieldId('preferredDate')}
            label="Preferred date"
            hint="If you have a day in mind."
            error={errors.preferredDate}
          >
            <input
              id={fieldId('preferredDate')}
              name="preferredDate"
              type="date"
              value={draft.preferredDate}
              onChange={(event) => update('preferredDate', event.target.value)}
              aria-describedby={describedBy(`${fieldId('preferredDate')}-hint`)}
              className={cn(fieldControlClasses)}
            />
          </Field>

          <Field
            id={fieldId('notes')}
            label="Anything else we should know"
            error={errors.notes}
          >
            <textarea
              id={fieldId('notes')}
              name="notes"
              rows={4}
              value={draft.notes}
              onChange={(event) => update('notes', event.target.value)}
              aria-invalid={errors.notes ? true : undefined}
              aria-describedby={describedBy(errors.notes && `${fieldId('notes')}-error`)}
              className={cn(fieldControlClasses, errors.notes && fieldErrorClasses)}
            />
          </Field>
          {phone && smsHref ? (
            <p className="text-sm text-wv-muted">
              Have photos of the vehicle? Text them to{' '}
              <a href={smsHref} className="font-medium text-wv-red-soft hover:text-wv-text">
                {phone}
              </a>{' '}
              after you submit and we&apos;ll match them to your quote.
            </p>
          ) : null}
        </div>
      </details>

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

      <div className="flex flex-col gap-4 rounded-lg border border-wv-border bg-wv-surface p-5 sm:p-7">
        <p className="text-sm leading-relaxed text-wv-muted">{conditionDisclaimer}</p>

        {isTurnstileConfigured() ? <TurnstileWidget onToken={setTurnstileToken} /> : null}

        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending...' : 'Send quote request'}
        </Button>

        {phone && phoneHref ? (
          <p className="text-sm text-wv-muted">
            Prefer to talk it through?{' '}
            <a href={phoneHref} className="font-medium text-wv-red-soft hover:text-wv-text">
              Call {phone}
            </a>{' '}
            instead.
          </p>
        ) : null}
      </div>
    </form>
  );
}
