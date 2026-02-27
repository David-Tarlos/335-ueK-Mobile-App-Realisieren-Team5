import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface AppTextInputProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    error?: boolean;
    right?: React.ReactNode;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    style?: any;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    error,
    right,
    keyboardType,
    autoCapitalize,
    style,
}) => {
    return (
        <TextInput
            mode="outlined"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            error={error}
            right={right}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            style={[styles.input, style]}
            outlineStyle={styles.inputOutline}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#ffffff",
    },
    inputOutline: {
        borderRadius: 12,
    },
});

export default AppTextInput;
