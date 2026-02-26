import React from "react";
import { View, StyleSheet } from "react-native";
import { HelperText } from "react-native-paper";
import Typography from "../atoms/Typography";
import AppTextInput from "../atoms/AppTextInput";

interface LabeledInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    error?: string;
    right?: React.ReactNode;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    style?: any;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
    label,
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
        <View style={style}>
            <Typography variant="label">{label}</Typography>
            <AppTextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                error={!!error}
                right={right}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
            <HelperText type="error" visible={!!error} style={styles.helperText}>
                {error}
            </HelperText>
        </View>
    );
};

const styles = StyleSheet.create({
    helperText: {
        paddingHorizontal: 0,
        marginBottom: 2,
    },
});

export default LabeledInput;
