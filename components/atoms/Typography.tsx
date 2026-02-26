import React from "react";
import { Text, StyleSheet } from "react-native";

interface TypographyProps {
    variant: "title" | "subtitle" | "label" | "formTitle" | "link" | "text";
    children: React.ReactNode;
    style?: any;
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
        color: "#111827",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: "#6b7280",
        marginBottom: 28,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 12,
    },
    label: {
        fontSize: 13,
        fontWeight: "500",
        color: "#374151",
        marginBottom: 4,
        marginTop: 4,
    },
    link: {
        color: "#1d4ed8",
        textAlign: "center",
        marginTop: 14,
        fontSize: 14,
        fontWeight: "500",
    },
    text: {
        fontSize: 14,
        color: "#6b7280",
    },
});

export default Typography;
