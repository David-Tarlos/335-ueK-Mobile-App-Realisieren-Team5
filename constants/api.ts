import { Platform } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_PORT = 3030;

const API_HOST = Platform.select({
  android: '10.0.2.2',
  ios: 'localhost',
  default: 'localhost',
}) ?? 'localhost';

const BASE_URL = `http://${API_HOST}:${API_PORT}`;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('token');

      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error reading token from SecureStore:', error);
    }

    return config;
  },
  async (error) => Promise.reject(error),
);


type AuthPayload = {
  email: string;
  password: string;
};

export type UserDto = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  age?: number;
};

type AuthResponse = {
  user: UserDto;
  accessToken?: string;
  token?: string;
};

type RegisterPayload = AuthPayload & {
  firstName: string;
  lastName: string;
};

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

export const loginUser = async (payload: AuthPayload): Promise<AxiosResponse<AuthResponse>> =>
  api.post('/login', payload);

export const registerUser = async (
  payload: RegisterPayload,
): Promise<AxiosResponse<AuthResponse>> =>
  api.post('/register', payload);

export const getCountries = async (): Promise<AxiosResponse<CountryDto[]>> =>
  api.get('/countries');

export const getCountryById = async (id: number | string): Promise<CountryDto | undefined> => {
  const response = await api.get<CountryDto[] | CountryDto>(`/countries?id=${id}`);
  return Array.isArray(response.data) ? response.data[0] : response.data;
};

export const createCountry = async (
  payload: CountryPayload,
): Promise<AxiosResponse<CountryDto>> =>
  api.post('/countries', payload);

export const updateCountryById = async (
  id: number | string,
  payload: CountryPayload,
): Promise<AxiosResponse<CountryDto>> => api.put(`/countries/${id}`, payload);

export const deleteCountryById = async (id: number | string) =>
  api.delete(`/countries/${id}`);

export const getUserById = async (id: number | string): Promise<AxiosResponse<UserDto>> =>
  api.get(`/users/${id}`);

export default BASE_URL;
