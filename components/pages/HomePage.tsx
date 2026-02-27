import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "../atoms/AppButton";
import Typography from "../atoms/Typography";
import MainTemplate from "../templates/MainTemplate";

const WORLD_IMAGE =
  "https://media.istockphoto.com/id/1197369584/vector/detailed-world-map-with-countries.jpg?s=612x612&w=0&k=20&c=pW9R8Os-vNEZc1-TKLgHhva-e-OL277-peZdPJKT6Qg=";

export default function HomePage({ navigation }: any) {
  const handleGoToCountries = () => {
    navigation.navigate("Explore");
  };

  return (
    <MainTemplate
      title="Home"
      currentRoute="Home"
      onNavigate={(route) => navigation.navigate(route)}
    >
      <Typography variant="title" style={styles.title}>
        Welcome
      </Typography>
      <Typography variant="subtitle" style={styles.subtitle}>
        This site is about the Countries of this World
      </Typography>

      <Card mode="outlined" style={styles.card}>
        <Card.Content style={styles.cardImageWrapper}>
          <Image source={{ uri: WORLD_IMAGE }} style={styles.image} />
        </Card.Content>
        <Card.Content>
          <View style={styles.countryRow}>
            <MaterialCommunityIcons name="earth" size={20} color="#2563eb" />
            <Typography variant="title" style={styles.countryCount}>
              195 Countries
            </Typography>
          </View>
          <Typography variant="text" style={styles.countrySubtitle}>
            Big world!
          </Typography>
        </Card.Content>
      </Card>

      <AppButton onPress={handleGoToCountries} style={styles.button}>
        Go to Countries
      </AppButton>
    </MainTemplate>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 10,
  },
  subtitle: {
    color: "#64748b",
    marginBottom: 24,
    fontSize: 18,
  },
  card: {
    borderRadius: 14,
    borderColor: "#e2e8f0",
    overflow: "hidden",
    marginBottom: 26,
    backgroundColor: "#ffffff",
  },
  cardImageWrapper: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#f1f5f9",
  },
  countryRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  countryCount: {
    marginLeft: 8,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 0,
    fontSize: 24,
  },
  countrySubtitle: {
    color: "#64748b",
    marginTop: 4,
    marginBottom: 8,
    fontSize: 16,
  },
  button: {
    borderRadius: 12,
    backgroundColor: "#2563eb",
  },
});
