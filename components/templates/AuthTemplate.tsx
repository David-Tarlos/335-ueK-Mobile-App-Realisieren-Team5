import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Logo from "../atoms/Logo";
import Typography from "../atoms/Typography";

interface AuthTemplateProps {
    title: string;
    subtitle?: string;
    formTitle: string;
    children: React.ReactNode;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({
    title,
    subtitle,
    formTitle,
    children,
}) => {
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <Logo />
            <Typography variant="title">{title}</Typography>
            {subtitle && <Typography variant="subtitle">{subtitle}</Typography>}

            <View style={styles.form}>
                <Typography variant="formTitle">{formTitle}</Typography>
                {children}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f0f2f5",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 40,
    },
    form: {
        width: "100%",
    },
});

export default AuthTemplate;
