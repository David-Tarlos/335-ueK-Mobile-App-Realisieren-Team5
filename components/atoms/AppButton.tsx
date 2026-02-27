import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface AppButtonProps {
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
    style?: any;
    icon?: string;
}

const AppButton: React.FC<AppButtonProps> = ({
    onPress,
    loading,
    disabled,
    children,
    mode = "contained",
    style,
    icon,
}) => {
    return (
        <Button
            mode={mode}
            onPress={onPress}
            loading={loading}
            disabled={disabled}
            style={[styles.button, style]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            icon={icon}
        >
            {children}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 35,
        borderRadius: 12,
        backgroundColor: "#135BEC",
    },
    buttonContent: {
        paddingVertical: 6,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: "600",
    },
});

export default AppButton;
