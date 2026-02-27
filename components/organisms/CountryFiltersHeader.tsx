import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Typography from "../atoms/Typography";
import SearchBar from "../atoms/SearchBar";
import RegionTab from "../molecules/RegionTab";

interface CountryFiltersHeaderProps {
  searchValue: string;
  onChangeSearch: (text: string) => void;
  activeRegion: string;
  regions: string[];
  onSelectRegion: (region: string) => void;
}

const CountryFiltersHeader: React.FC<CountryFiltersHeaderProps> = ({
  searchValue,
  onChangeSearch,
  activeRegion,
  regions,
  onSelectRegion,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topBar}>
        <Typography variant="text" style={styles.title}>
          Country List
        </Typography>
      </View>

      <View style={styles.filtersSection}>
        <SearchBar value={searchValue} onChangeText={onChangeSearch} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
          style={styles.tabsScroll}
        >
          {regions.map((region) => (
            <RegionTab
              key={region}
              label={region}
              active={region === activeRegion}
              onPress={() => onSelectRegion(region)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  topBar: {
    height: 92,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
    marginBottom: 0,
  },
  filtersSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  tabsScroll: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tabsContainer: {
    alignItems: "center",
  },
});

export default CountryFiltersHeader;
