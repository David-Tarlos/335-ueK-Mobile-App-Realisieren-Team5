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
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: COLORS.textTertiary,
        marginBottom: 28,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: 12,
    },
    label: {
        fontSize: 13,
        fontWeight: "500",
        color: COLORS.textSecondary,
        marginBottom: 4,
        marginTop: 4,
    },
    link: {
        color: COLORS.textLink,
        textAlign: "center",
        marginTop: 9,
        fontSize: 14,
        fontWeight: "500",
    },
    text: {
        fontSize: 14,
        color: COLORS.textTertiary,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.textPrimary,
    },
    detailLabel: {
        fontSize: 10,
        fontWeight: "bold",
        color: COLORS.textMuted,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginTop: 2,
    },
    secondaryText: {
        fontSize: 14,
        color: COLORS.textTertiary,
    }
});

export default Typography;
