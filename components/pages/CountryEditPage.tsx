import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getCountryById, updateCountryById } from "../../constants/api";
import { COLORS } from "../../theme/colors";
import { getApiErrorMessage } from "../../utils/error";
import { pickFlagImage } from "../../utils/imagePicker";
import DetailTemplate from "../templates/DetailTemplate";
import CountryBanner from "../molecules/CountryBanner";
import CountryForm from "../organisms/CountryForm";
import AppButton from "../atoms/AppButton";

import { Country, useCountries } from "../../context/CountryContext";
import { RootStackParamList } from "../../types/navigation";
import { CountryFormErrors } from "../../utils/validation";

type CountryEditPageProps = NativeStackScreenProps<RootStackParamList, "CountryEdit">;

/**
 * Edit screen for updating an existing country's data.
 * Pre-fills the form from context or fetches the country from the API.
 * Allows picking a new flag image from the device library, and saves changes via the update API.
 * Also provides a Delete action.
 */

export default function CountryEditPage({ route, navigation }: CountryEditPageProps) {
    const { id } = route.params;
    const { countries, updateCountry, deleteCountry, setCountries } = useCountries();
    const [loading, setLoading] = useState(!countries.find(c => c.id === id));
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");
    const [capital, setCapital] = useState("");
    const [population, setPopulation] = useState("");
    const [continent, setContinent] = useState("");
    const [language, setLanguage] = useState("");
    const [flagUrl, setFlagUrl] = useState("");

    const [errors, setErrors] = useState<CountryFormErrors>({});

    useEffect(() => {
        const country = countries.find(c => c.id === id);
        if (country) {
            setName(country.country_name || "");
            setCapital(country.capital || "");
            setPopulation(country.population ? country.population.toString() : "");
            setContinent(country.continent || "");
            setLanguage(country.language || "");
            setFlagUrl(country.flag_url || "");
            setLoading(false);
        } else if (id) {
            fetchCountry();
        }
    }, [id]);

    const fetchCountry = async () => {
        try {
            const data = await getCountryById(id);
            if (data) {
                setCountries([...countries, data]);
                setName(data.country_name || "");
                setCapital(data.capital || "");
                setPopulation(data.population ? data.population.toString() : "");
                setContinent(data.continent || "");
                setLanguage(data.language || "");
                setFlagUrl(data.flag_url || "");
            }
        } catch (error) {
            Alert.alert("Error", getApiErrorMessage(error, "Could not load country data"));
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const handlePickImage = async () => {
        const uri = await pickFlagImage();
        if (uri) setFlagUrl(uri);
    };

    const handleSave = async () => {
        if (!name.trim()) {
            setErrors({ name: "Country name is required" });
            return;
        }

        setSaving(true);
        const updatedPop = parseInt(population.replace(/[^0-9]/g, "")) || 0;
        try {
            const updatedData = {
                country_name: name.trim(),
                capital: capital.trim(),
                population: updatedPop,
                continent: continent.trim(),
                language: language.trim(),
                flag_url: flagUrl,
            };

            await updateCountryById(id, updatedData);

            updateCountry({ id, ...updatedData } as Country);
            Alert.alert("Success", "Country details updated");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", getApiErrorMessage(error, "Failed to save changes"));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        Alert.alert("Delete", "Are you sure you want to delete this country?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    const countryToDelete = countries.find((country) => country.id === id) ?? {
                        id,
                        country_name: name.trim(),
                        capital: capital.trim() || null,
                        population: parseInt(population.replace(/[^0-9]/g, "")) || 0,
                        continent: continent.trim() || null,
                        language: language.trim() || null,
                        flag_url: flagUrl || null,
                    };

                    deleteCountry(id);
                    navigation.navigate("Explore", { pendingDeletion: countryToDelete });
                },
            },
        ]);
    };

    if (loading) return null;

    const footer = (
        <View style={styles.buttonContainer}>
            <AppButton
                mode="contained"
                onPress={handleDelete}
                style={styles.cancelButton}
                labelStyle={styles.cancelButtonLabel}
                icon="delete-outline"
            >
                Delete
            </AppButton>
            <AppButton
                mode="contained"
                onPress={handleSave}
                loading={saving}
                disabled={saving}
                style={styles.saveButton}
                icon="pencil-outline"
            >
                Save
            </AppButton>
        </View>
    );

    return (
        <DetailTemplate title="Edit" onClose={() => navigation.goBack()} footer={footer}>
            <View style={styles.formPadding}>
                <CountryBanner
                    flagUrl={flagUrl}
                    description="Currently Editing"
                    title={name}
                    height={180}
                    editable={true}
                    onPress={handlePickImage}
                />

                <CountryForm
                    name={name}
                    setName={(val) => {
                        setName(val);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    capital={capital}
                    setCapital={setCapital}
                    population={population}
                    setPopulation={setPopulation}
                    continent={continent}
                    setContinent={setContinent}
                    language={language}
                    setLanguage={setLanguage}
                    errors={errors}
                />
            </View>
        </DetailTemplate>
    );
}

const styles = StyleSheet.create({
    formPadding: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    buttonContainer: {
        gap: 10,
    },
    cancelButton: {
        backgroundColor: COLORS.neutralButton,
        borderRadius: 20,
    },
    cancelButtonLabel: {
        color: COLORS.textPrimary,
        fontWeight: "700",
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
    },
});
