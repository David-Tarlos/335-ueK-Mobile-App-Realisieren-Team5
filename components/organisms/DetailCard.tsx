import React from "react";
import { View, StyleSheet } from "react-native";
import InfoRow from "../molecules/InfoRow";

interface DetailCardProps {
    data: {
        icon: any;
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
        backgroundColor: "#ffffff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        overflow: "hidden",
        marginTop: 24,
    },
});

export default DetailCard;
