import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";

/** Props for the {@link Logo} component. */
interface LogoProps {
    size?: number;
    color?: string;
}

/**
 * The app logo displayed on authentication screens.
 * Renders an earth icon inside a rounded square box.
 */
const Logo: React.FC<LogoProps> = ({ size = 36, color = COLORS.primary }) => {
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
        backgroundColor: COLORS.primarySoft,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,
    },
});

export default Logo;
