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

export type BottomNavRoute = 'Home' | 'Explore' | 'Profile';
