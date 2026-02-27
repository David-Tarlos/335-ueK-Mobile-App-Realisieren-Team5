import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Appbar,
  Card,
  Divider,
  Surface,
  TouchableRipple,
} from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "../atoms/AppButton";
import Typography from "../atoms/Typography";

const WORLD_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png";

type BottomItemProps = {
  label: string;
  active?: boolean;
  icon: React.ReactNode;
};

function BottomItem({ label, active = false, icon }: BottomItemProps) {
  const activeColor = "#2563eb";
  const inactiveColor = "#94a3b8";

  return (
    <TouchableRipple style={styles.bottomItem} borderless onPress={() => {}}>
      <View style={styles.bottomItemInner}>
        {icon}
        <Typography
          variant="text"
          style={[
            styles.bottomItemLabel,
            { color: active ? activeColor : inactiveColor },
          ]}
        >
          {label}
        </Typography>
      </View>
    </TouchableRipple>
  );
}

export default function HomePage() {
  const handleGoToCountries = () => {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Appbar.Header mode="small" style={styles.header}>
          <Appbar.Content title="Home" titleStyle={styles.headerTitle} />
        </Appbar.Header>
        <Divider />

        <ScrollView contentContainerStyle={styles.content}>
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
        </ScrollView>

        <Surface style={styles.bottomBar} elevation={1}>
          <BottomItem
            label="Home"
            active
            icon={<Ionicons name="home-outline" size={22} color="#2563eb" />}
          />
          <BottomItem
            label="Explore"
            icon={<Ionicons name="compass-outline" size={22} color="#94a3b8" />}
          />
          <BottomItem
            label="Profile"
            icon={<Ionicons name="person-outline" size={22} color="#94a3b8" />}
          />
        </Surface>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#ffffff",
    elevation: 0,
  },
  headerTitle: {
    fontWeight: "700",
    color: "#0f172a",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
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
  buttonContent: {
    height: 58,
    flexDirection: "row-reverse",
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: "#dbeafe",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 12,
  },
  bottomItem: {
    borderRadius: 10,
  },
  bottomItemInner: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 88,
  },
  bottomItemLabel: {
    marginTop: 4,
    fontSize: 11,
    marginBottom: 0,
  },
});
