import React from "react";
import { StyleSheet } from "react-native";
import AppButton from "../atoms/AppButton";
import { COLORS } from "../../theme/colors";

interface LogoutButtonProps {
    onPress: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
    return (
        <AppButton
            onPress={onPress}
            mode="outlined"
            icon="logout-variant"
            textColor={COLORS.dangerSoft}
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
        borderColor: COLORS.dangerBorder,
        borderWidth: 1.5,
        backgroundColor: COLORS.dangerBackground,
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
