import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { deleteCountryById, getCountryById } from "../../constants/api";
import DetailTemplate from "../templates/DetailTemplate";
import DetailCard from "../organisms/DetailCard";
import Typography from "../atoms/Typography";
import AppButton from "../atoms/AppButton";
import CountryBanner from "../molecules/CountryBanner";

import { useCountries } from "../../context/CountryContext";

export default function CountryDetailPage({ route, navigation }: any) {
    const { id } = route.params || {};
    const { countries, setCountries, deleteCountry } = useCountries();
    const countryFromContext = countries.find(c => c.id === id);
    const [displayCountry, setDisplayCountry] = useState(countryFromContext);
    const [loading, setLoading] = useState(!countryFromContext);

    useEffect(() => {
        if (countryFromContext) {
            setDisplayCountry(countryFromContext);
            setLoading(false);
        }
    }, [countryFromContext]);

    useEffect(() => {
        if (id && !displayCountry) fetchCountry();
    }, [id]);

    const fetchCountry = async () => {
        try {
            const data = await getCountryById(id);
            if (!data) throw new Error();

            setCountries([...countries, data]);
            setDisplayCountry(data);
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
                        await deleteCountryById(id);
                        navigation.navigate("Explore");
                        deleteCountry(id);
                    } catch (e) {
                        Alert.alert("Error", "Failed to delete");
                    }
                },
            },
        ]);
    };

    if (loading || !displayCountry) return null;

    const country = displayCountry;

    const formatPopulation = (num: number) => {
        if (!num) return "N/A";
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)} Million`;
        return num.toLocaleString();
    };

    const detailData = [
        { icon: "office-building-marker", label: "Capital", value: country.capital || "N/A" },
        { icon: "account-group", label: "Population", value: formatPopulation(country.population || 0) },
        { icon: "earth", label: "Continent", value: country.continent || "N/A" },
        { icon: "translate", label: "Language", value: country.language || "N/A" },
    ];

    const footer = (
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
                onPress={() => navigation.navigate("CountryEdit", { id })}
                style={styles.editButton}
                icon="pencil-outline"
            >
                Edit
            </AppButton>
        </View>
    );

    return (
        <DetailTemplate title="Detail View" onClose={() => navigation.goBack()} footer={footer}>
            {country.flag_url && (
                <CountryBanner
                    flagUrl={country.flag_url}
                    height={300}
                    rounded={false}
                />
            )}

            <View style={styles.contentPadding}>
                <Typography variant="header" style={styles.countryName}>
                    {country.country_name || "Unknown"}
                </Typography>

                <DetailCard data={detailData} />
            </View>
        </DetailTemplate>
    );
}

const styles = StyleSheet.create({
    contentPadding: {
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    countryName: {
        fontSize: 48,
        fontWeight: "900",
        color: "#0f172a",
        marginBottom: 24,
    },
    buttonContainer: {
        gap: 10,
    },
    deleteButton: {
        backgroundColor: "#e2e8f0",
        borderRadius: 20,
    },
    deleteButtonLabel: {
        color: "#0f172a",
        fontWeight: "700",
    },
    editButton: {
        backgroundColor: "#135BEC",
        borderRadius: 20,
    },
});
