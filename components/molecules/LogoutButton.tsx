import React from "react";
import { StyleSheet } from "react-native";
import AppButton from "../atoms/AppButton";

interface LogoutButtonProps {
    onPress: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
    return (
        <AppButton
            onPress={onPress}
            mode="outlined"
            icon="logout-variant"
            textColor="#c73b45"
            style={styles.button}
            contentStyle={styles.content}
            labelStyle={styles.label}
        >
            Logout Account
        </AppButton>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        marginTop: 16,
        borderRadius: 12,
        borderColor: "#efc7ca",
        borderWidth: 1.5,
        backgroundColor: "#fff7f8",
    },
    content: {
        minHeight: 64,
    },
    label: {
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.2,
    },
});

export default LogoutButton;
