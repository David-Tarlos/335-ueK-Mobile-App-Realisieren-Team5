import { Platform } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from './storage';

const API_PORT = 3030;

const API_HOST = Platform.select({
  android: '10.0.2.2',
  ios: 'localhost',
  default: 'localhost',
}) ?? 'localhost';

const BASE_URL = `http://${API_HOST}:${API_PORT}`;

/**
 * Configured Axios instance with the backend base URL.
 * Automatically attaches the Bearer token from SecureStore to every request via a request interceptor.
 */
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync(STORAGE_KEYS.token);

      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {}

    return config;
  },
  async (error) => Promise.reject(error),
);


/** Payload for login and register requests. */
type AuthPayload = {
  email: string;
  password: string;
};

/** Data transfer object representing a user returned by the API. */
export type UserDto = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  age?: number;
};

/** Response body returned by the login and register endpoints. */
type AuthResponse = {
  user: UserDto;
  accessToken?: string;
  token?: string;
};

/** Payload for the register endpoint, extending {@link AuthPayload} with name fields. */
type RegisterPayload = AuthPayload & {
  firstName: string;
  lastName: string;
};

/** Data transfer object representing a country returned by the API. */
export type CountryDto = {
  id: number;
  country_name: string;
  capital: string | null;
  population: number | null;
  continent: string | null;
  flag_url: string | null;
  language?: string | null;
};

type CountryPayload = Omit<CountryDto, 'id'>;

/**
 * Authenticates a user with email and password.
 * @param payload - The email and password credentials.
 * @returns The authenticated user data and access token.
 */
export const loginUser = async (payload: AuthPayload): Promise<AxiosResponse<AuthResponse>> =>
  api.post('/login', payload);

/**
 * Registers a new user account.
 * @param payload - First name, last name, email and password for the new account.
 * @returns The created user data and access token.
 */
export const registerUser = async (
  payload: RegisterPayload,
): Promise<AxiosResponse<AuthResponse>> =>
  api.post('/register', payload);

/**
 * Fetches the full list of countries from the API.
 * @returns An array of all country records.
 */
export const getCountries = async (): Promise<AxiosResponse<CountryDto[]>> =>
  api.get('/countries');

/**
 * Fetches a single country by its ID.
 * @param id - The country's numeric or string ID.
 * @returns The matching country, or `undefined` if not found.
 */
export const getCountryById = async (id: number | string): Promise<CountryDto | undefined> => {
  const response = await api.get<CountryDto[] | CountryDto>(`/countries?id=${id}`);
  return Array.isArray(response.data) ? response.data[0] : response.data;
};

/**
 * Creates a new country entry.
 * @param payload - The country data to save (without ID).
 * @returns The newly created country record including its assigned ID.
 */
export const createCountry = async (
  payload: CountryPayload,
): Promise<AxiosResponse<CountryDto>> =>
  api.post('/countries', payload);

/**
 * Updates an existing country by its ID.
 * @param id - The ID of the country to update.
 * @param payload - The updated country data (without ID).
 * @returns The updated country record.
 */
export const updateCountryById = async (
  id: number | string,
  payload: CountryPayload,
): Promise<AxiosResponse<CountryDto>> => api.put(`/countries/${id}`, payload);

/**
 * Deletes a country by its ID.
 * @param id - The ID of the country to delete.
 */
export const deleteCountryById = async (id: number | string) =>
  api.delete(`/countries/${id}`);

/**
 * Fetches a single user by their ID.
 * @param id - The user's numeric or string ID.
 * @returns The user record.
 */
export const getUserById = async (id: number | string): Promise<AxiosResponse<UserDto>> =>
  api.get(`/users/${id}`);
