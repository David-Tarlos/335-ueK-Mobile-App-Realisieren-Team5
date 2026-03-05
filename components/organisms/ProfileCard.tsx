import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileDetailItem from "../molecules/ProfileDetailItem";
import { COLORS } from "../../theme/colors";

/** Props for the {@link ProfileCard} component. */
interface ProfileCardProps {
    email?: string;
    firstName?: string;
    lastName?: string;
    age?: string;
}

/**
 * A card displaying the logged-in user's profile details (email, first name, last name, age).
 * Only fields with a value are rendered.
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
    email,
    firstName,
    lastName,
    age,
}) => {
    const items: {
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
        label: string;
        value?: string;
    }[] = [
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
                    icon={item.icon}
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
        backgroundColor: COLORS.white,
        borderRadius: 12,
        marginTop: 32,
        width: "100%",
        elevation: 2,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});

export default ProfileCard;
