import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SearchBar from "../atoms/SearchBar";
import PageHeader from "../molecules/PageHeader";
import RegionTab from "../molecules/RegionTab";
import { COLORS } from "../../theme/colors";

/** Props for the {@link CountryFiltersHeader} component. */
interface CountryFiltersHeaderProps {
  searchValue: string;
  onChangeSearch: (text: string) => void;
  activeRegion: string;
  regions: string[];
  onSelectRegion: (region: string) => void;
}

/**
 * Header for the country list screen combining a page title, a search bar, and scrollable region tabs.
 * Allows the user to filter the list by text search and geographic region simultaneously.
 */
const CountryFiltersHeader: React.FC<CountryFiltersHeaderProps> = ({
  searchValue,
  onChangeSearch,
  activeRegion,
  regions,
  onSelectRegion,
}) => {
  return (
    <View style={styles.wrapper}>
      <PageHeader title="Country List" />

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
    backgroundColor: COLORS.white,
  },
  filtersSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  tabsScroll: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  tabsContainer: {
    alignItems: "center",
  },
});

export default CountryFiltersHeader;
