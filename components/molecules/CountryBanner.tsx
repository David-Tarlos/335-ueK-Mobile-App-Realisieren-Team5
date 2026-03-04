import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../atoms/Typography";

interface CountryBannerProps {
    flagUrl: string;
    description?: string;
    title?: string;
    height?: number;
    editable?: boolean;
    rounded?: boolean;
    onPress?: () => void;
}

const CountryBanner: React.FC<CountryBannerProps> = ({
    flagUrl,
    description,
    title,
    height = 180,
    editable = false,
    rounded = true,
    onPress
}) => {
    return (
        <Pressable
            onPress={editable ? onPress : undefined}
            style={[
                styles.headerImageContainer,
                { height },
                !rounded && styles.noRadius
            ]}
        >
            {flagUrl ? (
                <Image
                    source={{ uri: flagUrl }}
                    style={styles.headerImage}
                />
            ) : (
                <View style={[styles.headerImage, styles.placeholder]}>
                    <MaterialCommunityIcons name="camera-plus-outline" size={80} color="#94a3b8" />
                </View>
            )}
            {editable && flagUrl && (
                <View style={styles.cameraOverlay}>
                    <MaterialCommunityIcons name="camera-plus-outline" size={60} color="#ffffff" />
                </View>
            )}
            {(description || title) && (
                <View style={styles.overlay}>
                    {description && (
                        <Typography variant="text" style={styles.description}>
                            {description}
                        </Typography>
                    )}
                    {title && (
                        <Typography variant="header" style={styles.title}>
                            {title}
                        </Typography>
                    )}
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    headerImageContainer: {
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
    },
    headerImage: {
        width: "100%",
        height: "100%",
        backgroundColor: "#e2e8f0",
    },
    placeholder: {
        backgroundColor: "#94a3b833",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderStyle: "dashed",
    },
    cameraOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: "rgba(0,0,0,0.15)",
    },
    description: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 2,
    },
    title: {
        color: "#ffffff",
        fontSize: 24,
        fontWeight: "700",
    },
    noRadius: {
        borderRadius: 0,
    },
});

export default CountryBanner;
