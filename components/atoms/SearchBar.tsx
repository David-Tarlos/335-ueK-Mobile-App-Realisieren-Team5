import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";

/** Props for the {@link SearchBar} component. */
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

/**
 * A search input field with a magnify icon on the right.
 * Used in the country list header to filter countries by name or capital.
 */
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search Countries",
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
      />
      <MaterialCommunityIcons name="magnify" size={18} color={COLORS.textMuted} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 47,
    borderRadius: 12,
    backgroundColor: COLORS.borderMuted,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: 0,
    marginRight: 10,
  },
});

export default SearchBar;
