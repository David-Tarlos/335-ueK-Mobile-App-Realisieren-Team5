/**
 * Validates an email address using a standard RFC-compliant regex.
 * @param email - The email string to validate.
 * @returns `true` if the email format is valid, `false` otherwise.
 */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Checks whether a text contains at least one letter (A-Z).
 * Useful for validating names or passwords against all-numeric input.
 */
export const containsLetter = (value: string): boolean =>
  /[A-Za-z]/.test(value);

/**
 * Checks whether a text contains at least one uppercase letter (A-Z).
 */
export const containsUppercaseLetter = (value: string): boolean =>
  /[A-Z]/.test(value);

/**
 * Checks whether a text contains at least one digit (0-9).
 */
export const containsNumber = (value: string): boolean =>
  /\d/.test(value);

/**
 * Checks whether a text contains at least one special character.
 * Special characters are all non-letters and non-digits.
 */
export const containsSpecialCharacter = (value: string): boolean =>
  /[^A-Za-z0-9]/.test(value);

/**
 * Returns a list of missing password requirements.
 * Keeps validation logic centralized and enables clear user feedback.
 */
export const getMissingPasswordRequirements = (password: string): string[] => {
  const missing: string[] = [];

  if (password.length < 8) missing.push("at least 8 characters");
  if (!containsUppercaseLetter(password)) missing.push("one uppercase letter");
  if (!containsNumber(password)) missing.push("one number");
  if (!containsSpecialCharacter(password)) missing.push("one special character");

  return missing;
};

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

export type CountryFormValues = {
  name: string;
  capital: string;
  population: string;
  continent: string;
  language: string;
};

/**
 * Removes all non-digit characters from the population input.
 * This prevents letters and symbols from being stored in form state.
 */
export const sanitizePopulationInput = (value: string): string =>
  value.replace(/[^\d]/g, "");

/**
 * Validates the country form fields.
 * Country name, capital, population and region are required.
 * Main language is optional.
 * Population must be a number > 0.
 */
export const validateCountryForm = (values: CountryFormValues): CountryFormErrors => {
  const errors: CountryFormErrors = {};
  const normalizedPopulation = sanitizePopulationInput(values.population);

  if (!values.name.trim()) errors.name = "Country name is required";
  if (!values.capital.trim()) errors.capital = "Capital is required";
  if (!normalizedPopulation) {
    errors.population = "Population is required";
  } else if (Number(normalizedPopulation) <= 0) {
    errors.population = "Population must be greater than 0";
  }
  if (!values.continent.trim()) errors.continent = "Region is required";

  return errors;
};
