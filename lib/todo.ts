/**
 * Helpers for values that have not been verified yet.
 * Unverified data is stored as a string beginning with "TODO".
 */

export function isTodo(value: string | undefined | null): boolean {
  return !value || value.trim().toUpperCase().startsWith('TODO');
}

/** Returns the value only when it has been verified, otherwise `null`. */
export function resolved(value: string | undefined | null): string | null {
  return isTodo(value) ? null : (value as string);
}
