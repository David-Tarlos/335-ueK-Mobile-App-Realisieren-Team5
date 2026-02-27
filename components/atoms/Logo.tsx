import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface LogoProps {
    size?: number;
    color?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 36, color = "#135BEC" }) => {
    return (
        <View style={styles.logoBox}>
            <MaterialCommunityIcons name="earth" size={size} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    logoBox: {
        width: 72,
        height: 64,
        borderRadius: 18,
        backgroundColor: "#dbeafe",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,
    },
});

export default Logo;
