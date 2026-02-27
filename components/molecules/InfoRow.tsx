import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../atoms/Typography";

interface InfoRowProps {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    label: string;
    value: string;
    showDivider?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, showDivider = true }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.left}>
                    <MaterialCommunityIcons name={icon} size={24} color="#3b82f6" />
                    <Typography variant="text" style={styles.label}>{label}</Typography>
                </View>
                <Typography variant="title" style={styles.value}>{value}</Typography>
            </View>
            {showDivider && <View style={styles.divider} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        marginLeft: 12,
        color: "#64748b",
        fontSize: 16,
    },
    value: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 0,
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginHorizontal: 16,
    },
});

export default InfoRow;
