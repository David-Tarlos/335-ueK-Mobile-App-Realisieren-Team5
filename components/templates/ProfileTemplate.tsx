import React from "react";
import { StyleSheet, View } from "react-native";
import Avatar from "../atoms/Avatar";
import ProfileCard from "../organisms/ProfileCard";
import MainTemplate from "./MainTemplate";
import Typography from "../atoms/Typography";
import LogoutButton from "../molecules/LogoutButton";
import { BottomNavRoute } from "../../types/navigation";
interface ProfileTemplateProps {
  fullName: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  currentRoute: BottomNavRoute;
  onNavigate: (route: BottomNavRoute) => void;
  onLogout: () => void;
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({
    fullName,
    email,
    firstName,
    lastName,
    age,
    currentRoute,
    onNavigate,
    onLogout,
}) => {
    return (
        <MainTemplate
            title="Profile"
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
            <LogoutButton onPress={onLogout} />
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
