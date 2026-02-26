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
}

const AppButton: React.FC<AppButtonProps> = ({
    onPress,
    loading,
    disabled,
    children,
    mode = "contained",
    style,
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
        >
            {children}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 12,
        borderRadius: 8,
        backgroundColor: "#1d4ed8",
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
