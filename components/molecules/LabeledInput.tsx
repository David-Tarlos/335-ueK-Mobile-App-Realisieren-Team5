import React from "react";
import { View, Text, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../atoms/Typography";
import AppTextInput from "../atoms/AppTextInput";
import { COLORS } from "../../theme/colors";

/** Props for the {@link LabeledInput} component. */
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
    style?: StyleProp<ViewStyle>;
}

/**
 * A form field combining a label, a text input, and an inline error message.
 * Wraps {@link AppTextInput} and adds a label above and an error row below.
 */
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
                        <MaterialCommunityIcons name="alert-circle-outline" size={16} color={COLORS.danger} />
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
        color: COLORS.danger,
        flex: 1,
    },
});

export default LabeledInput;
