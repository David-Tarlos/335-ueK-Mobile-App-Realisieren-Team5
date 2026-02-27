import React from "react";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import BottomNavItem from "../molecules/BottomNavItem";

type IconName = keyof typeof Ionicons.glyphMap;

interface BottomNavigationItem {
  label: string;
  iconName: IconName;
  active?: boolean;
  onPress?: () => void;
}

interface BottomNavigationBarProps {
  items: BottomNavigationItem[];
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ items }) => {
  return (
    <Surface style={styles.bottomBar} elevation={1}>
      {items.map((item) => (
        <BottomNavItem
          key={item.label}
          label={item.label}
          active={item.active}
          onPress={item.onPress}
          icon={
            <Ionicons
              name={item.iconName}
              size={22}
              color={item.active ? "#2563eb" : "#94a3b8"}
            />
          }
        />
      ))}
    </Surface>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: "#dbeafe",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 12,
  },
});

export default BottomNavigationBar;
