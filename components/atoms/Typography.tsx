import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { COLORS } from "../../theme/colors";

interface TypographyProps {
    variant: "title" | "subtitle" | "label" | "formTitle" | "link" | "text" | "header" | "detailLabel" | "detailValue" | "secondaryText";
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
}

const Typography: React.FC<TypographyProps> = ({ variant, children, style }) => {
    return (
        <Text style={[styles[variant], style]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontFamily: "Inter_700Bold",
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        fontFamily: "Inter_400Regular",
        color: COLORS.textTertiary,
        marginBottom: 28,
    },
    formTitle: {
        fontSize: 20,
        fontFamily: "Inter_700Bold",
        color: COLORS.textPrimary,
        marginBottom: 12,
    },
    label: {
        fontSize: 13,
        fontFamily: "Inter_500Medium",
        color: COLORS.textSecondary,
        marginBottom: 4,
        marginTop: 4,
    },
    link: {
        color: COLORS.textLink,
        textAlign: "center",
        marginTop: 9,
        fontSize: 14,
        fontFamily: "Inter_500Medium",
    },
    text: {
        fontSize: 14,
        fontFamily: "Inter_400Regular",
        color: COLORS.textTertiary,
    },
    header: {
        fontSize: 24,
        fontFamily: "Inter_700Bold",
        color: COLORS.textPrimary,
    },
    detailLabel: {
        fontSize: 10,
        fontFamily: "Inter_700Bold",
        color: COLORS.textMuted,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    detailValue: {
        fontSize: 16,
        fontFamily: "Inter_700Bold",
        color: COLORS.textPrimary,
        marginTop: 2,
    },
    secondaryText: {
        fontSize: 14,
        fontFamily: "Inter_400Regular",
        color: COLORS.textTertiary,
    }
});

export default Typography;
