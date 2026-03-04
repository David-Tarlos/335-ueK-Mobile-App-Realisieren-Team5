import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../atoms/Typography";
import { COLORS } from "../../theme/colors";

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
                    <MaterialCommunityIcons name="camera-plus-outline" size={80} color={COLORS.textMuted} />
                </View>
            )}
            {editable && flagUrl && (
                <View style={styles.cameraOverlay}>
                    <MaterialCommunityIcons name="camera-plus-outline" size={60} color={COLORS.white} />
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
        backgroundColor: COLORS.borderLight,
    },
    placeholder: {
        backgroundColor: "rgba(148, 163, 184, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.borderLight,
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
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 2,
    },
    title: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: "700",
    },
    noRadius: {
        borderRadius: 0,
    },
});

export default CountryBanner;
