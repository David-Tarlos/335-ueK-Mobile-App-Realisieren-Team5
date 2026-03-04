import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";

interface AvatarProps {
    size?: number;
}

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
