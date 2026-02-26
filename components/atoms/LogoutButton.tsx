import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "./Typography";

interface LogoutButtonProps {
    onPress: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.content}>
                <MaterialCommunityIcons name="logout" size={20} color="#ef4444" />
                <Typography variant="link" style={styles.label}>
                    Logout Account
                </Typography>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 24,
        width: "100%",
        height: 56,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#fecaca",
        backgroundColor: "#fff5f5",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        marginLeft: 8,
        marginTop: 0,
        color: "#ef4444",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default LogoutButton;
