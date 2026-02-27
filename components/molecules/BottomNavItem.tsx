import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Typography from "../atoms/Typography";

interface BottomNavItemProps {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    active?: boolean;
    onPress: () => void;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({
    label,
    icon,
    active = false,
    onPress,
}) => {
    const activeColor = "#2563eb";
    const inactiveColor = "#94a3b8";

    return (
        <TouchableRipple style={styles.container} borderless onPress={onPress}>
            <View style={styles.content}>
                <Ionicons
                    name={active ? icon : (`${icon}-outline` as any)}
                    size={24}
                    color={active ? activeColor : inactiveColor}
                />
                <Typography
                    variant="text"
                    style={[
                        styles.label,
                        { color: active ? activeColor : inactiveColor },
                    ]}
                >
                    {label}
                </Typography>
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        flex: 1,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
    },
    label: {
        marginTop: 4,
        fontSize: 11,
        fontWeight: "500",
    },
});

export default BottomNavItem;
