import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";

/** Props for the {@link Avatar} component. */
interface AvatarProps {
    size?: number;
}

/**
 * A circular avatar placeholder displaying a generic account icon.
 * Used on the profile screen when no user photo is available.
 */
const Avatar: React.FC<AvatarProps> = ({ size = 120 }) => {
    return (
        <View style={[styles.avatarContainer, { width: size, height: size, borderRadius: size / 2 }]}>
            <MaterialCommunityIcons name="account" size={size * 0.6} color={COLORS.white} />
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        backgroundColor: COLORS.warning,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: COLORS.warningBorder,
    },
});

export default Avatar;
