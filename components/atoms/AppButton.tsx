import React from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../../theme/colors";

interface AppButtonProps {
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    icon?: string;
    textColor?: string;
    contentStyle?: StyleProp<ViewStyle>;
}

const AppButton: React.FC<AppButtonProps> = ({
    onPress,
    loading,
    disabled,
    children,
    mode = "contained",
    style,
    labelStyle,
    icon,
    textColor,
    contentStyle,
}) => {
    return (
        <Button
            mode={mode}
            onPress={onPress}
            loading={loading}
            disabled={disabled}
            textColor={textColor}
            style={[styles.button, style]}
            contentStyle={[styles.buttonContent, contentStyle]}
            labelStyle={[styles.buttonLabel, labelStyle]}
            icon={icon}
        >
            {children}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        backgroundColor: COLORS.primary,
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
