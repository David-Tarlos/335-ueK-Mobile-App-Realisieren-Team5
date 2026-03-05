import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";

/** Props for the {@link IconBox} component. */
interface IconBoxProps {
    name: keyof typeof MaterialCommunityIcons.glyphMap;
    color?: string;
    backgroundColor?: string;
}

/**
 * A small square box displaying a single MaterialCommunityIcon.
 * Used as a decorative icon container in list items and detail rows.
 */
const IconBox: React.FC<IconBoxProps> = ({
    name,
    color = COLORS.textLink,
    backgroundColor = COLORS.primaryTint,
}) => {
    return (
        <View style={[styles.box, { backgroundColor }]}>
            <MaterialCommunityIcons name={name} size={24} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        width: 44,
        height: 44,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default IconBox;
