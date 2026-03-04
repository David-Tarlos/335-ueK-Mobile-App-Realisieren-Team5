import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import HomePage from "./components/pages/HomePage";
import ProfilPage from "./components/pages/ProfilPage";

import CountryDetailPage from "./components/pages/CountryDetailPage";
import CountryEditPage from "./components/pages/CountryEditPage";
import ExplorePage from "./components/pages/ExplorePage";
import { CountryProvider } from "./context/CountryContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <CountryProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="Profile" component={ProfilPage} />
            <Stack.Screen name="country" component={CountryDetailPage} />
            <Stack.Screen name="CountryEdit" component={CountryEditPage} />
            <Stack.Screen name="Explore" component={ExplorePage} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </CountryProvider>
    </PaperProvider>
  );
}
