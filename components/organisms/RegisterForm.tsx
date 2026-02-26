import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import LabeledInput from "../molecules/LabeledInput";
import AppButton from "../atoms/AppButton";
import Typography from "../atoms/Typography";

interface RegisterFormProps {
    firstName: string;
    setFirstName: (val: string) => void;
    lastName: string;
    setLastName: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    firstNameError: string;
    lastNameError: string;
    emailError: string;
    passwordError: string;
    loading: boolean;
    showPassword: boolean;
    setShowPassword: (val: boolean) => void;
    onRegister: () => void;
    onNavigateToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    loading,
    showPassword,
    setShowPassword,
    onRegister,
    onNavigateToLogin,
}) => {
    return (
        <>
            <View style={styles.nameRow}>
                <LabeledInput
                    label="First Name"
                    placeholder="Joe"
                    value={firstName}
                    onChangeText={setFirstName}
                    error={firstNameError}
                    style={styles.nameField}
                />
                <LabeledInput
                    label="Last Name"
                    placeholder="Doe"
                    value={lastName}
                    onChangeText={setLastName}
                    error={lastNameError}
                    style={[styles.nameField, styles.nameFieldRight]}
                />
            </View>

            <LabeledInput
                label="E-Mail"
                placeholder="user@example.com"
                value={email}
                onChangeText={setEmail}
                error={emailError}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <LabeledInput
                label="Password"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                error={passwordError}
                secureTextEntry={!showPassword}
                right={
                    <TextInput.Icon
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <AppButton onPress={onRegister} loading={loading} disabled={loading}>
                Register
            </AppButton>

            <View style={styles.loginLinkRow}>
                <Typography variant="text">Already got a Account? </Typography>
                <TouchableOpacity onPress={onNavigateToLogin}>
                    <Typography variant="link" style={styles.linkNoMargin}>Login</Typography>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    nameRow: {
        flexDirection: "row",
    },
    nameField: {
        flex: 1,
    },
    nameFieldRight: {
        marginLeft: 10,
    },
    loginLinkRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 14,
    },
    linkNoMargin: {
        marginTop: 0,
    },
});

export default RegisterForm;
