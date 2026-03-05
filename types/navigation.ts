export type PendingDeletionCountry = {
  id: number;
  country_name: string;
  capital: string | null;
  continent: string | null;
  population: number | null;
  flag_url: string | null;
  language?: string | null;
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  CountryDetail: { id: number };
  CountryEdit: { id: number };
  CountryAdd: undefined;
  Explore: { pendingDeletion?: PendingDeletionCountry } | undefined;
};

export type BottomNavRoute = 'Home' | 'Explore' | 'Profile';
