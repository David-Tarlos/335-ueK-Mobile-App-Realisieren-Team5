import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../atoms/Typography";
import { COLORS } from "../../theme/colors";

const CountriesEmptyState: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="text" style={styles.title}>
        No countries found
      </Typography>
      <Typography variant="text" style={styles.description}>
        Your List is currently Empty. Start by adding some
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 29,
    paddingTop: 14,
    gap: 10,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 0,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.textSecondary,
    textAlign: "center",
    maxWidth: 344,
    marginBottom: 0,
  },
});

export default CountriesEmptyState;
