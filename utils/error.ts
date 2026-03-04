import axios from "axios";

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

export const apiErrorContains = (error: unknown, term: string): boolean => {
  if (!axios.isAxiosError(error) || !error.response?.data) {
    return false;
  }

  const data = error.response.data;
  const normalized = (typeof data === "string" ? data : JSON.stringify(data)).toLowerCase();
  return normalized.includes(term.toLowerCase());
};

