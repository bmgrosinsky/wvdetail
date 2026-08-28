import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Shared form primitives: visible labels always, errors associated with their
 * control through `aria-describedby`, generous tap targets on small screens.
 */

export const fieldControlClasses =
  'block w-full rounded-md border border-wv-border bg-wv-black px-3.5 py-3 text-base text-wv-text placeholder:text-wv-subtle transition-colors focus:border-wv-border-strong focus:outline-none';

export const fieldErrorClasses = 'border-wv-red-soft';

export function describedBy(...ids: readonly (string | false | null | undefined)[]) {
  const list = ids.filter((id): id is string => typeof id === 'string' && id.length > 0);
  return list.length > 0 ? list.join(' ') : undefined;
}

interface FieldProps {
  readonly id: string;
  readonly label: string;
  readonly children: ReactNode;
  readonly hint?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly className?: string;
}

/** A labelled control with optional hint and error text. */
export function Field({
  id,
  label,
  children,
  hint,
  error,
  required = false,
  className,
}: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-wv-text">
        {label}
        {required ? (
          <span className="ml-1 text-wv-red-soft" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-wv-subtle">Optional</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-wv-muted">
          {hint}
        </p>
      ) : null}
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

interface FieldsetProps {
  readonly legend: string;
  readonly children: ReactNode;
  readonly hint?: string;
  readonly error?: string;
  readonly errorId?: string;
  readonly hintId?: string;
  readonly required?: boolean;
  readonly className?: string;
}

/** A grouped set of radios or checkboxes. */
export function Fieldset({
  legend,
  children,
  hint,
  error,
  errorId,
  hintId,
  required = false,
  className,
}: FieldsetProps) {
  return (
    <fieldset
      className={cn('flex flex-col gap-2', className)}
      aria-describedby={describedBy(hint && hintId, error && errorId)}
    >
      <legend className="text-sm font-semibold text-wv-text">
        {legend}
        {required ? (
          <span className="ml-1 text-wv-red-soft" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-wv-subtle">Optional</span>
        )}
      </legend>
      {hint ? (
        <p id={hintId} className="text-sm text-wv-muted">
          {hint}
        </p>
      ) : null}
      {children}
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

interface FieldErrorProps {
  readonly id?: string;
  readonly message?: string;
}

export function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm font-medium text-wv-red-soft">
      {message}
    </p>
  );
}

interface FormGroupProps {
  readonly step: number;
  readonly title: string;
  readonly description?: string;
  readonly children: ReactNode;
}

/** One numbered visual group of the quote form. */
export function FormGroup({ step, title, description, children }: FormGroupProps) {
  const headingId = `form-group-${step}`;

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-lg border border-wv-border bg-wv-surface p-5 sm:p-7"
    >
      <div className="mb-5 flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-wv-border-strong text-sm font-semibold text-wv-red-soft"
        >
          {step}
        </span>
        <div>
          <h2 id={headingId} className="text-lg font-bold tracking-tight text-wv-text">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-sm text-wv-muted">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

interface ChoiceCardProps {
  readonly type: 'radio' | 'checkbox';
  readonly name: string;
  readonly value: string;
  readonly label: string;
  readonly hint?: string;
  readonly checked: boolean;
  readonly onChange: (value: string, checked: boolean) => void;
}

/** Tap-friendly radio/checkbox rendered as a bordered card. */
export function ChoiceCard({
  type,
  name,
  value,
  label,
  hint,
  checked,
  onChange,
}: ChoiceCardProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-md border p-3.5 transition-colors',
        checked
          ? 'border-wv-red bg-wv-surface-2'
          : 'border-wv-border bg-wv-black hover:border-wv-border-strong',
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange(value, event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--wv-red)]"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-wv-text">{label}</span>
        {hint ? <span className="mt-0.5 block text-xs text-wv-muted">{hint}</span> : null}
      </span>
    </label>
  );
}
