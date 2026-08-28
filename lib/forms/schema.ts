import { z } from 'zod';
import { services } from '@/data/services';

/**
 * Shared validation for the quote and contact forms.
 * The same schemas run in the browser before submission; keeping them here
 * means the form UI never owns validation rules.
 */

const serviceSlugs = services.map((service) => service.slug);

/** Values accepted by the "Service Needed" control. */
export const serviceOptionValues = [...serviceSlugs, 'not-sure'] as const;

export const vehicleSizeValues = ['car', 'midsize', 'large', 'oversize'] as const;
export type VehicleSizeValue = (typeof vehicleSizeValues)[number];

export const conditionLevelValues = ['light', 'moderate', 'heavy'] as const;
export type ConditionLevel = (typeof conditionLevelValues)[number];

export const conditionFlagValues = [
  'pet-hair',
  'stains',
  'odor',
  'salt-dirt',
  'other',
] as const;
export type ConditionFlag = (typeof conditionFlagValues)[number];

export const vehicleSizeOptions: readonly {
  readonly value: VehicleSizeValue;
  readonly label: string;
  readonly hint: string;
}[] = [
  { value: 'car', label: 'Car', hint: 'Sedans, coupes, hatchbacks, small crossovers' },
  {
    value: 'midsize',
    label: 'Mid-size',
    hint: 'Mid-size SUVs, crossovers, small trucks',
  },
  {
    value: 'large',
    label: 'Large',
    hint: 'Full-size SUVs, trucks, minivans, 3-row vehicles',
  },
  {
    value: 'oversize',
    label: 'Oversize',
    hint: 'Anything larger or unusual - we will quote it directly',
  },
];

export const conditionLevelOptions: readonly {
  readonly value: ConditionLevel;
  readonly label: string;
}[] = [
  { value: 'light', label: 'Light' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'heavy', label: 'Heavy' },
];

export const conditionFlagOptions: readonly {
  readonly value: ConditionFlag;
  readonly label: string;
}[] = [
  { value: 'pet-hair', label: 'Pet hair' },
  { value: 'stains', label: 'Stains' },
  { value: 'odor', label: 'Odor' },
  { value: 'salt-dirt', label: 'Heavy salt or dirt' },
  { value: 'other', label: 'Other' },
];

/** Digits only, 10 or 11 (with a leading 1). */
const phonePattern = /^\+?1?[-.\s()]*\d{3}[-.\s()]*\d{3}[-.\s()]*\d{4}$/;

const nameField = z
  .string()
  .trim()
  .min(2, 'Please enter your name.')
  .max(80, 'Please use 80 characters or fewer.');

const emailField = z
  .string()
  .trim()
  .min(1, 'Please enter your email address.')
  .max(160, 'Please use 160 characters or fewer.')
  .pipe(z.email('Please enter a valid email address.'));

const phoneField = z
  .string()
  .trim()
  .min(1, 'Please enter a phone number.')
  .regex(phonePattern, 'Please enter a 10-digit phone number.');

const currentYear = new Date().getFullYear();

export const quoteSchema = z.object({
  year: z
    .string()
    .trim()
    .regex(/^\d{4}$/, 'Please enter a 4-digit year.')
    .refine(
      (value) => {
        const parsed = Number.parseInt(value, 10);
        return parsed >= 1900 && parsed <= currentYear + 2;
      },
      { message: `Please enter a year between 1900 and ${currentYear + 2}.` },
    ),
  make: z.string().trim().min(1, 'Please enter the vehicle make.').max(40),
  model: z.string().trim().min(1, 'Please enter the vehicle model.').max(40),
  size: z.enum(vehicleSizeValues, { message: 'Please choose a vehicle size.' }),
  service: z.enum(serviceOptionValues, { message: 'Please choose a service.' }),
  interiorCondition: z.enum(conditionLevelValues).optional(),
  exteriorCondition: z.enum(conditionLevelValues).optional(),
  conditionFlags: z.array(z.enum(conditionFlagValues)),
  name: nameField,
  phone: phoneField,
  email: emailField,
  preferredDate: z.string().trim().max(40).optional(),
  notes: z.string().trim().max(2000, 'Please use 2000 characters or fewer.').optional(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const contactSchema = z
  .object({
    name: nameField,
    email: z.string().trim().max(160).optional(),
    phone: z.string().trim().max(40).optional(),
    message: z
      .string()
      .trim()
      .min(5, 'Please include a short message.')
      .max(2000, 'Please use 2000 characters or fewer.'),
  })
  .superRefine((values, ctx) => {
    const hasEmail = (values.email ?? '') !== '';
    const hasPhone = (values.phone ?? '') !== '';

    if (!hasEmail && !hasPhone) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Please provide either an email address or a phone number.',
      });
      return;
    }

    if (hasEmail && !emailField.safeParse(values.email).success) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Please enter a valid email address.',
      });
    }

    if (hasPhone && !phoneField.safeParse(values.phone).success) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone'],
        message: 'Please enter a 10-digit phone number.',
      });
    }
  });

export type ContactFormValues = z.infer<typeof contactSchema>;

/** Flat `field -> first error message` map, ready for rendering. */
export type FieldErrors = Readonly<Record<string, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !(key in errors)) {
      errors[key] = issue.message;
    }
  }

  return errors;
}
