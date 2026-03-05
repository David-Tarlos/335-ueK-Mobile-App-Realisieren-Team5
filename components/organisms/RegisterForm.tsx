import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import LabeledInput from "../molecules/LabeledInput";
import AppButton from "../atoms/AppButton";
import Typography from "../atoms/Typography";

/** Props for the {@link RegisterForm} component. */
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

/**
 * The registration form with first name, last name, email, and password fields.
 * Includes a link back to the login screen and a submit button.
 * All state and handlers are provided by the parent ({@link RegisterPage}).
 */
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
                label="E-mail"
                placeholder="user@example.com"
                value={email}
                onChangeText={setEmail}
                error={emailError}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <LabeledInput
                label="Password"
                style={styles.passwordField}
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

            <AppButton onPress={onRegister} loading={loading} disabled={loading} style={styles.registerButton}>
                Sign up
            </AppButton>

            <View style={styles.loginLinkRow}>
                <Typography variant="text">Already got an Account?</Typography>
                <TouchableOpacity onPress={onNavigateToLogin}>
                    <Typography variant="link">Login</Typography>
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
    passwordField: {
        marginTop: 8,
    },
    registerButton: {
        marginTop: 35,
    },
    loginLinkRow: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 14,
    },
});

export default RegisterForm;
