import { Platform } from 'react-native';
import axios from 'axios';
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

type RegisterPayload = AuthPayload & {
  firstName: string;
  lastName: string;
};

type CountryPayload = {
  country_name: string;
  capital: string;
  population: number;
  continent: string;
  flag_url: string;
  language: string;
};

export const loginUser = async (payload: AuthPayload) =>
  api.post('/login', payload);

export const registerUser = async (payload: RegisterPayload) =>
  api.post('/register', payload);

export const getCountries = async () => api.get('/countries');

export const getCountryById = async (id: number | string) => {
  const response = await api.get(`/countries?id=${id}`);
  return Array.isArray(response.data) ? response.data[0] : response.data;
};

export const createCountry = async (payload: CountryPayload) =>
  api.post('/countries', payload);

export const updateCountryById = async (
  id: number | string,
  payload: CountryPayload,
) => api.put(`/countries/${id}`, payload);

export const deleteCountryById = async (id: number | string) =>
  api.delete(`/countries/${id}`);

export const getUserById = async (id: number | string) => api.get(`/users/${id}`);

export default BASE_URL;
