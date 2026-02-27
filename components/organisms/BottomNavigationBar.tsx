import React from "react";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import BottomNavItem from "../molecules/BottomNavItem";

interface BottomNavigationBarProps {
    currentRoute: string;
    onNavigate: (route: string) => void;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
    currentRoute,
    onNavigate,
}) => {
    return (
        <Surface style={styles.container} elevation={1}>
            <BottomNavItem
                label="Home"
                icon="home-outline"
                active={currentRoute === "Home"}
                onPress={() => onNavigate("Home")}
            />
            <BottomNavItem
                label="Explore"
                icon="compass-outline"
                active={currentRoute === "Explore"}
                onPress={() => onNavigate("Explore")}
            />
            <BottomNavItem
                label="Profile"
                icon="account-outline"
                active={currentRoute === "Profile"}
                onPress={() => onNavigate("Profile")}
            />
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: "#94A3B8",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingBottom: 32,
        paddingTop: 8,
    },
});

export default BottomNavigationBar;
