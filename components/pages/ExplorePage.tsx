import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import CountryFiltersHeader from "../organisms/CountryFiltersHeader";
import CountryListCard from "../organisms/CountryListCard";
import CountriesEmptyState from "../molecules/CountriesEmptyState";
import BottomNavigationBar from "../organisms/BottomNavigationBar";
import Typography from "../atoms/Typography";
import BASE_URL from "../../constants/api";

const REGIONS = ["All Regions", "Europe", "Asia", "Americas", "Africa", "Oceania"];

interface ApiCountry {
  id: number;
  country_name: string;
  capital: string | null;
  continent: string | null;
  population: number | null;
  area_km2: number | null;
  flag_url: string | null;
  currency: string | null;
}

interface CountryItem {
  id: number;
  name: string;
  capital: string;
  region: string;
  imageUrl: string;
}

const matchesRegion = (countryRegion: string, selectedRegion: string): boolean => {
  if (selectedRegion === "All Regions") return true;
  if (selectedRegion === "Americas") {
    return ["americas", "america", "north america", "south america"].includes(
      countryRegion.toLowerCase()
    );
  }
  return countryRegion.toLowerCase() === selectedRegion.toLowerCase();
};

export default function ExplorePage({ navigation }: any) {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState("All Regions");
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setLoadError("");

      try {
        const token = await SecureStore.getItemAsync("token");
        const response = await axios.get<ApiCountry[]>(`${BASE_URL}/countries`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        const mappedCountries = response.data.map((country) => ({
          id: country.id,
          name: country.country_name,
          capital: country.capital || "Unknown capital",
          region: country.continent || "Unknown",
          imageUrl: country.flag_url || "https://flagcdn.com/w320/un.png",
        }));

        setCountries(mappedCountries);
      } catch (error) {
        setLoadError("Countries could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return countries.filter((country) => {
      const regionMatches = matchesRegion(country.region, activeRegion);
      const searchMatches =
        normalizedSearch.length === 0 ||
        country.name.toLowerCase().includes(normalizedSearch) ||
        country.capital.toLowerCase().includes(normalizedSearch);

      return regionMatches && searchMatches;
    });
  }, [countries, search, activeRegion]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <CountryFiltersHeader
          searchValue={search}
          onChangeSearch={setSearch}
          activeRegion={activeRegion}
          regions={REGIONS}
          onSelectRegion={setActiveRegion}
        />

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {loading ? (
            <Typography variant="text" style={styles.infoText}>
              Loading countries...
            </Typography>
          ) : loadError ? (
            <Typography variant="text" style={styles.errorText}>
              {loadError}
            </Typography>
          ) : filteredCountries.length === 0 ? (
            <CountriesEmptyState />
          ) : (
            <View style={styles.cardsContainer}>
              {filteredCountries.map((country, index) => (
                <CountryListCard
                  key={country.id}
                  name={country.name}
                  capital={country.capital}
                  imageUrl={country.imageUrl}
                  large={index === 0}
                />
              ))}
            </View>
          )}
        </ScrollView>

        <Pressable style={styles.fab} onPress={() => {}}>
          <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
        </Pressable>

        <BottomNavigationBar
          currentRoute="Explore"
          onNavigate={(route) => navigation.navigate(route)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 29,
    paddingTop: 14,
    paddingBottom: 110,
  },
  cardsContainer: {
    gap: 14,
  },
  infoText: {
    marginTop: 12,
    textAlign: "center",
    color: "#64748B",
    fontSize: 16,
    marginBottom: 0,
  },
  errorText: {
    marginTop: 12,
    textAlign: "center",
    color: "#B91C1C",
    fontSize: 16,
    marginBottom: 0,
  },
  fab: {
    position: "absolute",
    right: 13,
    bottom: 92,
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#135BEC",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#135BEC",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
    zIndex: 10,
  },
});
