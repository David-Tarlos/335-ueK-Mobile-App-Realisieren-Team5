import React from "react";
import axios from "axios";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Appbar,
  Button,
  Card,
  Divider,
  Surface,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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
        <Text
          variant="labelSmall"
          style={{ color: active ? activeColor : inactiveColor, marginTop: 4 }}
        >
          {label}
        </Text>
      </View>
    </TouchableRipple>
  );
}

export default function HomePage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Appbar.Header mode="small" style={styles.header}>
          <Appbar.Content title="Home" titleStyle={styles.headerTitle} />
        </Appbar.Header>
        <Divider />

        <ScrollView contentContainerStyle={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            Welcome
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            This site is about the Countries of this World
          </Text>

          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardImageWrapper}>
              <Image source={{ uri: WORLD_IMAGE }} style={styles.image} />
            </Card.Content>
            <Card.Content>
              <View style={styles.countryRow}>
                <MaterialCommunityIcons name="earth" size={20} color="#2563eb" />
                <Text variant="headlineSmall" style={styles.countryCount}>
                  195 Countries
                </Text>
              </View>
              <Text variant="titleMedium" style={styles.countrySubtitle}>
                Big world!
              </Text>
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            contentStyle={styles.buttonContent}
            style={styles.button}
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name="arrow-right"
                size={size}
                color={color}
              />
            )}
          >
            Go to Countries
          </Button>
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
  },
  countrySubtitle: {
    color: "#64748b",
    marginTop: 4,
    marginBottom: 8,
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
});
