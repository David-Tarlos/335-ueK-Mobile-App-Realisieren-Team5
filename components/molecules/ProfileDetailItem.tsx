import React from "react";
import { View, StyleSheet } from "react-native";
import IconBox from "../atoms/IconBox";
import Typography from "../atoms/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";

/** Props for the {@link ProfileDetailItem} component. */
interface ProfileDetailItemProps {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    label: string;
    value: string;
    showDivider?: boolean;
}

/**
 * A single detail row inside the profile card.
 * Shows an {@link IconBox}, a small label above, and the corresponding value below.
 */
const ProfileDetailItem: React.FC<ProfileDetailItemProps> = ({
    icon,
    label,
    value,
    showDivider = true,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <IconBox name={icon} />
                <View style={styles.textContainer}>
                    <Typography variant="detailLabel">{label}</Typography>
                    <Typography variant="detailValue">{value}</Typography>
                </View>
            </View>
            {showDivider && <View style={styles.divider} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    textContainer: {
        marginLeft: 16,
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.borderSubtle,
        marginLeft: 76,
    },
});

export default ProfileDetailItem;
