import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CountryFiltersHeader from "../organisms/CountryFiltersHeader";
import CountryListCard from "../organisms/CountryListCard";
import CountriesEmptyState from "../molecules/CountriesEmptyState";
import BottomNavigationBar from "../organisms/BottomNavigationBar";
import Typography from "../atoms/Typography";
import { CountryDto, getCountries } from "../../constants/api";
import { RootStackParamList } from "../../types/navigation";
import { COLORS } from "../../theme/colors";
import { getApiErrorMessage } from "../../utils/error";

import { useCountries, Country } from "../../context/CountryContext";

type ExplorePageProps = NativeStackScreenProps<RootStackParamList, "Explore">;

const REGIONS = ["All Regions", "Europe", "Asia", "Americas", "Africa", "Oceania"];

const matchesRegion = (countryRegion: string, selectedRegion: string): boolean => {
  if (selectedRegion === "All Regions") return true;
  if (selectedRegion === "Americas") {
    return ["americas", "america", "north america", "south america"].includes(
      countryRegion.toLowerCase()
    );
  }
  return countryRegion.toLowerCase() === selectedRegion.toLowerCase();
};

export default function ExplorePage({ navigation }: ExplorePageProps) {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState("All Regions");
  const { countries, setCountries } = useCountries();
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      if (countries.length > 0) return;

      setLoading(true);
      setLoadError("");

      try {
        const response = await getCountries();

        const mappedCountries: Country[] = response.data.map((country: CountryDto) => ({
          id: country.id,
          country_name: country.country_name,
          capital: country.capital || "Unknown capital",
          continent: country.continent || "Unknown",
          flag_url: country.flag_url,
          population: country.population,
        }));

        setCountries(mappedCountries);
      } catch (error) {
        setLoadError(getApiErrorMessage(error, "Countries could not be loaded."));
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [countries.length, setCountries]);

  const filteredCountries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return countries.filter((country) => {
      const regionMatches = matchesRegion(country.continent || "", activeRegion);
      const searchMatches =
        normalizedSearch.length === 0 ||
        country.country_name.toLowerCase().includes(normalizedSearch) ||
        (country.capital || "").toLowerCase().includes(normalizedSearch);

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
                  name={country.country_name}
                  capital={country.capital || "Unknown"}
                  imageUrl={country.flag_url || "https://flagcdn.com/w320/un.png"}
                  large={index === 0}
                  onPress={() => navigation.navigate("CountryDetail", { id: country.id })}
                />
              ))}
            </View>
          )}
        </ScrollView>

        <Pressable style={styles.fab} onPress={() => navigation.navigate("CountryAdd")}>
          <MaterialCommunityIcons name="plus" size={24} color={COLORS.white} />
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
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    color: COLORS.textSecondary,
    fontSize: 16,
    marginBottom: 0,
  },
  errorText: {
    marginTop: 12,
    textAlign: "center",
    color: COLORS.danger,
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
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
    zIndex: 10,
  },
});
