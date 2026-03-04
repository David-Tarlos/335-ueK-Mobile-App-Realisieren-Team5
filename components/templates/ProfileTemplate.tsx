import React from "react";
import { StyleSheet, View } from "react-native";
import Avatar from "../atoms/Avatar";
import ProfileCard from "../organisms/ProfileCard";
import MainTemplate from "./MainTemplate";
import Typography from "../atoms/Typography";
interface ProfileTemplateProps {
  fullName: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({
    fullName,
    email,
    firstName,
    lastName,
    age,
    currentRoute,
    onNavigate,
}) => {
    return (
        <MainTemplate
            title="Profil"
            currentRoute={currentRoute}
            onNavigate={onNavigate}
        >
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
        </MainTemplate>
    );
};

const styles = StyleSheet.create({
    avatarSection: {
        alignItems: "center",
        marginTop: 32,
    },
    fullName: {
        marginTop: 16,
        fontSize: 24,
        fontWeight: "800",
        textAlign: "center",
    },
});

export default ProfileTemplate;
