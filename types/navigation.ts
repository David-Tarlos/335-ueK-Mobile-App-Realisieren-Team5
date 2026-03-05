/** Defines all screens in the app's navigation stack and their route params. */
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  CountryDetail: { id: number };
  CountryEdit: { id: number };
  CountryAdd: undefined;
  Explore: undefined;
};

/** The three routes accessible via the bottom navigation bar. */
export type BottomNavRoute = 'Home' | 'Explore' | 'Profile';
