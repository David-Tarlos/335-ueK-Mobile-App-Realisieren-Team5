import axios from "axios";

/**
 * Extracts a human-readable error message from an Axios error response.
 * Checks the response body for a plain string or a `message` field.
 * Falls back to `fallbackMessage` if no usable message is found.
 * @param error - The caught error (any type).
 * @param fallbackMessage - The message to return if no API message is available.
 * @returns A user-friendly error string.
 */
export const getApiErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (axios.isAxiosError(error) && error.response?.data) {
    const data = error.response.data;

    if (typeof data === "string" && data.trim().length > 0) {
      return data;
    }

    if (typeof data === "object" && data !== null) {
      const message = (data as { message?: string }).message;
      if (message && message.trim().length > 0) {
        return message;
      }
    }
  }

  return fallbackMessage;
};

/**
 * Checks whether an Axios error response body contains a specific term (case-insensitive).
 * Useful for detecting specific backend error messages such as "already exists".
 * @param error - The caught error (any type).
 * @param term - The substring to search for in the response body.
 * @returns `true` if the term is found in the error response, `false` otherwise.
 */
export const apiErrorContains = (error: unknown, term: string): boolean => {
  if (!axios.isAxiosError(error) || !error.response?.data) {
    return false;
  }

  const data = error.response.data;
  const normalized = (typeof data === "string" ? data : JSON.stringify(data)).toLowerCase();
  return normalized.includes(term.toLowerCase());
};

