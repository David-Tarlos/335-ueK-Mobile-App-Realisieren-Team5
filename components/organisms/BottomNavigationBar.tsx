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
                active={false}
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
        borderTopColor: "#f1f5f9",
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 24,
        paddingTop: 8,
    },
});

export default BottomNavigationBar;
