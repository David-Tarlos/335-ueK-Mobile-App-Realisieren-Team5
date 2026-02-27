import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
            <View style={styles.errorRow}>
                {!!error && (
                    <>
                        <MaterialCommunityIcons name="alert-circle-outline" size={16} color="#b91c1c" />
                        <Text style={styles.errorText}>{error}</Text>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    errorRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 4,
        marginBottom: 2,
        minHeight: 20,
        gap: 6,
    },
    errorText: {
        fontSize: 13,
        color: "#b91c1c",
        flex: 1,
    },
});

export default LabeledInput;
