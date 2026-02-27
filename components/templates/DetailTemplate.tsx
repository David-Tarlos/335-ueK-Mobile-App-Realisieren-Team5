import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../atoms/Typography";

interface DetailTemplateProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

const DetailTemplate: React.FC<DetailTemplateProps> = ({ title, onClose, children }) => {
    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <MaterialCommunityIcons name="close" size={28} color="#0f172a" />
                </TouchableOpacity>
                <Typography variant="header" style={styles.headerTitle}>{title}</Typography>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    closeButton: {
        padding: 4,
    },
    headerTitle: {
        marginLeft: 16,
        fontSize: 20,
        fontWeight: "700",
    },
    content: {
        paddingBottom: 40,
        backgroundColor: "#f8fafc",
    },
});

export default DetailTemplate;
