import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../atoms/Typography";
import { COLORS } from "../../theme/colors";

/** Props for the {@link DetailTemplate} component. */
interface DetailTemplateProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

/**
 * Layout template for detail and edit screens presented modally.
 * Provides a header row with a close button and title, a scrollable content area, and an optional sticky footer.
 */
const DetailTemplate: React.FC<DetailTemplateProps> = ({ title, onClose, children, footer }) => {
    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <MaterialCommunityIcons name="close" size={28} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Typography variant="header" style={styles.headerTitle}>{title}</Typography>
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
                {children}
            </ScrollView>
            {footer && (
                <View style={styles.footer}>
                    {footer}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderMuted,
    },
    closeButton: {
        padding: 4,
    },
    headerTitle: {
        marginLeft: 16,
        fontSize: 20,
        fontWeight: "700",
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingBottom: 20,
        backgroundColor: COLORS.borderMuted,
    },
    footer: {
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderMuted,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 24,
    },
});

export default DetailTemplate;
