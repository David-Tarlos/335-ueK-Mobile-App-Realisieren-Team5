import React from "react";
import { View, StyleSheet } from "react-native";
import ProfileDetailItem from "../molecules/ProfileDetailItem";

interface ProfileCardProps {
    email: string;
    firstName: string;
    lastName: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    email,
    firstName,
    lastName,
}) => {
    return (
        <View style={styles.card}>
            <ProfileDetailItem icon="email-outline" label="E-MAIL" value={email} />
            <ProfileDetailItem icon="account-outline" label="FIRST NAME" value={firstName} />
            <ProfileDetailItem icon="badge-account-outline" label="LAST NAME" value={lastName} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        marginTop: 32,
        width: "100%",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});

export default ProfileCard;
