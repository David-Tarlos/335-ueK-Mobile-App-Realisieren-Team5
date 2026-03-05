import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getCountryById } from "../../constants/api";
import { COLORS } from "../../theme/colors";
import { getApiErrorMessage } from "../../utils/error";
import DetailTemplate from "../templates/DetailTemplate";
import DetailCard from "../organisms/DetailCard";
import Typography from "../atoms/Typography";
import AppButton from "../atoms/AppButton";
import CountryBanner from "../molecules/CountryBanner";

import { Country, useCountries } from "../../context/CountryContext";
import { RootStackParamList } from "../../types/navigation";

type CountryDetailPageProps = NativeStackScreenProps<RootStackParamList, "CountryDetail">;

/**
 * Detail screen for a single country.
 * Reads the country from context if available, otherwise fetches it from the API.
 * Displays the flag banner, country name, and a detail card with capital, population, continent and language.
 * Delete navigates back to Explore with a pendingDeletion param, enabling the undo-delete snackbar.
 */
export default function CountryDetailPage({ route, navigation }: CountryDetailPageProps) {
    const { id } = route.params;
    const { countries, setCountries, deleteCountry } = useCountries();
    const countryFromContext = countries.find((c) => c.id === id);
    const [displayCountry, setDisplayCountry] = useState<Country | undefined>(countryFromContext);
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
        } catch (error) {
            Alert.alert("Error", getApiErrorMessage(error, "No country was found"));
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
                onPress: () => {
                    const countryToDelete = displayCountry;
                    if (!countryToDelete) return;

                    deleteCountry(id);
                    navigation.navigate("Explore", { pendingDeletion: countryToDelete });
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

    const detailData: {
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
        label: string;
        value: string;
    }[] = [
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
        color: COLORS.textPrimary,
        marginBottom: 24,
    },
    buttonContainer: {
        gap: 10,
    },
    deleteButton: {
        backgroundColor: COLORS.neutralButton,
        borderRadius: 20,
    },
    deleteButtonLabel: {
        color: COLORS.textPrimary,
        fontWeight: "700",
    },
    editButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
    },
});
