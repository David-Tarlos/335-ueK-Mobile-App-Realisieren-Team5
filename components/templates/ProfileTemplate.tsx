import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Typography from "../atoms/Typography";
import Avatar from "../atoms/Avatar";
import ProfileCard from "../organisms/ProfileCard";
import LogoutButton from "../atoms/LogoutButton";

interface ProfileTemplateProps {
    headerTitle: string;
    fullName: string;
    email: string;
    firstName: string;
    lastName: string;
    age: string;
    onLogout: () => void;
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({
    headerTitle,
    fullName,
    email,
    firstName,
    lastName,
    age,
    onLogout,
}) => {
    return (
        <View style={styles.container}>
            <Typography variant="header">{headerTitle}</Typography>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.avatarSection}>
                    <Avatar />
                    <Typography variant="title" style={styles.fullName}>
                        {fullName}
                    </Typography>
                </View>

                <ProfileCard
                    email={email}
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                />

                <LogoutButton onPress={onLogout} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: "center",
    },
    avatarSection: {
        alignItems: "center",
        marginTop: 32,
    },
    fullName: {
        marginTop: 16,
        fontSize: 24,
        fontWeight: "800",
    },
});

export default ProfileTemplate;
