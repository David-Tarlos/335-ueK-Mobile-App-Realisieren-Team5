import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import LabeledInput from "../molecules/LabeledInput";
import AppButton from "../atoms/AppButton";
import Typography from "../atoms/Typography";

/** Props for the {@link LoginForm} component. */
interface LoginFormProps {
    email: string;
    setEmail: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    emailError: string;
    passwordError: string;
    loading: boolean;
    showPassword: boolean;
    setShowPassword: (val: boolean) => void;
    onLogin: () => void;
    onNavigateToRegister: () => void;
}

/**
 * The login form with email and password fields, a submit button, and a link to the register screen.
 * All state and handlers are provided by the parent ({@link LoginPage}).
 */
const LoginForm: React.FC<LoginFormProps> = ({
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    loading,
    showPassword,
    setShowPassword,
    onLogin,
    onNavigateToRegister,
}) => {
    return (
        <>
            <LabeledInput
                label="E-mail"
                placeholder="user@example.com"
                value={email}
                onChangeText={setEmail}
                error={emailError}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.emailField}
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

            <AppButton onPress={onLogin} loading={loading} disabled={loading} style={styles.loginButton}>
                Login
            </AppButton>

            <View style={styles.registerLinkRow}>
                <Typography variant="text">Dont have an Account yet?</Typography>
                <TouchableOpacity onPress={onNavigateToRegister}>
                    <Typography variant="link">Create an Account</Typography>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    emailField: {
        marginTop: -22,
    },
    passwordField: {
        marginTop: 8,
    },
    loginButton: {
        marginTop: 35,
    },
    registerLinkRow: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 14,
    },
});

export default LoginForm;
