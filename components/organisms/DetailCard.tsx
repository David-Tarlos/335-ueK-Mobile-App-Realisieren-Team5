import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InfoRow from "../molecules/InfoRow";
import { COLORS } from "../../theme/colors";

interface DetailCardProps {
    data: {
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
        label: string;
        value: string;
    }[];
}

const DetailCard: React.FC<DetailCardProps> = ({ data }) => {
    return (
        <View style={styles.card}>
            {data.map((item, index) => (
                <InfoRow
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    showDivider={index < data.length - 1}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        overflow: "hidden",
        marginTop: 24,
    },
});

export default DetailCard;
