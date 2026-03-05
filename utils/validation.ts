/**
 * Validates an email address using a standard RFC-compliant regex.
 * @param email - The email string to validate.
 * @returns `true` if the email format is valid, `false` otherwise.
 */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Validation error messages for the country form fields.
 * Each field is optional — only fields with errors are populated.
 */
export type CountryFormErrors = {
  name?: string;
  capital?: string;
  population?: string;
  continent?: string;
  language?: string;
};
