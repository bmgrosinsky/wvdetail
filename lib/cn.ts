type ClassValue = string | number | null | undefined | false;

/** Minimal class-name joiner. No dependency needed for this project's scope. */
export function cn(...values: ClassValue[]): string {
  return values.filter((value): value is string | number => Boolean(value)).join(' ');
}
