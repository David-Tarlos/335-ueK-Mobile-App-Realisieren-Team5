import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import BASE_URL from "../../constants/api";
import DetailTemplate from "../templates/DetailTemplate";
import DetailCard from "../organisms/DetailCard";
import Typography from "../atoms/Typography";
import AppButton from "../atoms/AppButton";

export default function CountryDetailPage({ route, navigation }: any) {
    const { id } = route.params || {};
    const [country, setCountry] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchCountry();
    }, [id]);

    const fetchCountry = async () => {
        try {
            const token = await SecureStore.getItemAsync("token");
            const resp = await axios.get(`${BASE_URL}/countries?id=${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            const data = Array.isArray(resp.data) ? resp.data[0] : resp.data;
            if (!data) throw new Error();
            setCountry(data);
        } catch (e) {
            Alert.alert("Error", "No country was found");
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        Alert.alert("Delete", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    try {
                        const token = await SecureStore.getItemAsync("token");
                        await axios.delete(`${BASE_URL}/countries/${id}`, {
                            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                        });
                        navigation.navigate("Explore");
                    } catch (e) {
                        Alert.alert("Error", "Failed to delete");
                    }
                },
            },
        ]);
    };

    if (loading || !country) return null;

    const detailData = [
        { icon: "office-building-marker", label: "Capital", value: country.capital || "N/A" },
        { icon: "account-group", label: "Population", value: country.population?.toLocaleString() || "N/A" },
        { icon: "earth", label: "Continent", value: country.continent || "N/A" },
        { icon: "ruler-square", label: "Area", value: country.area_km2 ? `${country.area_km2} km²` : "N/A" },
        { icon: "cash-multiple", label: "Currency", value: country.currency || "N/A" },
    ];

    return (
        <DetailTemplate title="Detail View" onClose={() => navigation.goBack()}>
            <Image
                source={{ uri: country.flag_url || "https://media.istockphoto.com/id/1197369584/vector/detailed-world-map-with-countries.jpg?s=612x612&w=0&k=20&c=pW9R8Os-vNEZc1-TKLgHhva-e-OL277-peZdPJKT6Qg=" }}
                style={styles.mapImage}
            />

            <View style={styles.contentPadding}>
                <Typography variant="header" style={styles.countryName}>
                    {country.country_name || "Unknown"}
                </Typography>

                <DetailCard data={detailData} />

                <View style={styles.buttonContainer}>
                    <AppButton
                        mode="contained"
                        onPress={handleDelete}
                        style={styles.deleteButton}
                        labelStyle={styles.deleteButtonLabel}
                        icon="delete-outline"
                    >
                        Delete
                    </AppButton>
                    <AppButton
                        mode="contained"
                        onPress={() => { }}
                        style={styles.editButton}
                        icon="pencil-outline"
                    >
                        Edit
                    </AppButton>
                </View>
            </View>
        </DetailTemplate>
    );
}

const styles = StyleSheet.create({
    mapImage: {
        width: "100%",
        height: 250,
        backgroundColor: "#e2e8f0",
    },
    contentPadding: {
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    countryName: {
        fontSize: 40,
        fontWeight: "800",
        color: "#0f172a",
    },
    buttonContainer: {
        marginTop: 24,
        gap: 12,
    },
    deleteButton: {
        backgroundColor: "#e2e8f0",
        marginTop: 0,
    },
    deleteButtonLabel: {
        color: "#0f172a",
    },
    editButton: {
        backgroundColor: "#135BEC",
        marginTop: 0,
    },
});
