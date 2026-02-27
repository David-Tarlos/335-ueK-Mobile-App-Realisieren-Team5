import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search countries",
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748B"
        style={styles.input}
      />
      <MaterialCommunityIcons name="magnify" size={18} color="#94A3B8" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 47,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
    paddingVertical: 0,
    marginRight: 10,
  },
});

export default SearchBar;
