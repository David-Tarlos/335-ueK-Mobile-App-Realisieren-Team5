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
                icon="home"
                active={currentRoute === "Home"}
                onPress={() => onNavigate("Home")}
            />
            <BottomNavItem
                label="Explore"
                icon="compass"
                active={currentRoute === "Explore"}
                onPress={() => onNavigate("Explore")}
            />
            <BottomNavItem
                label="Profile"
                icon="person"
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
