import React from "react";
import { View, StyleSheet } from "react-native";
import ProfileDetailItem from "../molecules/ProfileDetailItem";

interface ProfileCardProps {
    email?: string;
    firstName?: string;
    lastName?: string;
    age?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    email,
    firstName,
    lastName,
    age,
}) => {
    const items = [
        { icon: "email-outline", label: "E-MAIL", value: email },
        { icon: "account-outline", label: "FIRST NAME", value: firstName },
        { icon: "badge-account-outline", label: "LAST NAME", value: lastName },
        { icon: "calendar-outline", label: "AGE", value: age },
    ].filter((item) => item.value);

    return (
        <View style={styles.card}>
            {items.map((item, index) => (
                <ProfileDetailItem
                    key={item.label}
                    icon={item.icon as any}
                    label={item.label}
                    value={item.value!}
                    showDivider={index < items.length - 1}
                />
            ))}
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
