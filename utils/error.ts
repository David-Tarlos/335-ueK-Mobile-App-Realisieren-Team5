import axios from "axios";

const TIMEOUT_MESSAGE = "Request timed out. Please try again.";

const getErrorData = (error: unknown): unknown => {
  if (!axios.isAxiosError(error)) return undefined;
  return error.response?.data;
};

/**
 * Extracts a human-readable error message from an Axios error response.
 * Checks the response body for a plain string or a `message` field.
 * Falls back to `fallbackMessage` if no usable message is found.
 * @param error - The caught error (any type).
 * @param fallbackMessage - The message to return if no API message is available.
 * @returns A user-friendly error string.
 */
export const getApiErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return TIMEOUT_MESSAGE;
    }

    // Network failures (e.g. backend offline) often arrive without a response object.
    if (!error.response) {
      return TIMEOUT_MESSAGE;
    }
  }

  const data = getErrorData(error);
  if (data !== undefined) {

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
  const data = getErrorData(error);
  if (data === undefined) {
    return false;
  }

  const normalized = (typeof data === "string" ? data : JSON.stringify(data)).toLowerCase();
  return normalized.includes(term.toLowerCase());
};

