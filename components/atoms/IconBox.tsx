import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";

interface IconBoxProps {
    name: keyof typeof MaterialCommunityIcons.glyphMap;
    color?: string;
    backgroundColor?: string;
}

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
