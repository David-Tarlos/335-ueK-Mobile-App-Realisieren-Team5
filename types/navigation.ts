/** Snapshot of a country passed as a navigation param when deletion is pending (undo-delete pattern). */
export type PendingDeletionCountry = {
  id: number;
  country_name: string;
  capital: string | null;
  continent: string | null;
  population: number | null;
  flag_url: string | null;
  language?: string | null;
};

/** Defines all screens in the app's navigation stack and their route params. */
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

/** The three routes accessible via the bottom navigation bar. */
export type BottomNavRoute = 'Home' | 'Explore' | 'Profile';
