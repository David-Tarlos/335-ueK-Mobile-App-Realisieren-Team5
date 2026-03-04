import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import BASE_URL from "../../constants/api";
import DetailTemplate from "../templates/DetailTemplate";
import CountryBanner from "../molecules/CountryBanner";
import CountryForm from "../organisms/CountryForm";
import AppButton from "../atoms/AppButton";

import { useCountries, Country } from "../../context/CountryContext";

export default function CountryEditPage({ route, navigation }: any) {
    const { id } = route.params || {};
    const { countries, updateCountry, deleteCountry, setCountries } = useCountries();
    const [loading, setLoading] = useState(!countries.find(c => c.id === id));
    const [saving, setSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [name, setName] = useState("");
    const [capital, setCapital] = useState("");
    const [population, setPopulation] = useState("");
    const [continent, setContinent] = useState("");
    const [language, setLanguage] = useState("");
    const [flagUrl, setFlagUrl] = useState("");

    const [errors, setErrors] = useState<any>({});

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
            const token = await SecureStore.getItemAsync("token");
            const resp = await axios.get(`${BASE_URL}/countries?id=${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            const data = Array.isArray(resp.data) ? resp.data[0] : resp.data;
            if (data) {
                setCountries([...countries, data]);
                setName(data.country_name || "");
                setCapital(data.capital || "");
                setPopulation(data.population ? data.population.toString() : "");
                setContinent(data.continent || "");
                setLanguage(data.language || "");
                setFlagUrl(data.flag_url || "");
            }
        } catch (e) {
            Alert.alert("Error", "Could not load country data");
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setFlagUrl(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!name.trim()) {
            setErrors({ name: "Country name is required" });
            return;
        }

        setSaving(true);
        const updatedPop = parseInt(population.replace(/[^0-9]/g, "")) || 0;
        try {
            const token = await SecureStore.getItemAsync("token");
            const updatedData = {
                country_name: name.trim(),
                capital: capital.trim(),
                population: updatedPop,
                continent: continent.trim(),
                language: language.trim(),
                flag_url: flagUrl,
            };

            await axios.put(`${BASE_URL}/countries/${id}`, updatedData, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });

            updateCountry({ id, ...updatedData });
            Alert.alert("Success", "Country details updated");
            navigation.goBack();
        } catch (e) {
            Alert.alert("Error", "Failed to save changes");
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
                onPress: async () => {
                    try {
                        const token = await SecureStore.getItemAsync("token");
                        await axios.delete(`${BASE_URL}/countries/${id}`, {
                            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                        });
                        setIsDeleting(true);
                        navigation.navigate("Explore");
                        deleteCountry(id);
                    } catch (e) {
                        Alert.alert("Error", "Failed to delete");
                    }
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
        backgroundColor: "#e2e8f0",
        borderRadius: 20,
    },
    cancelButtonLabel: {
        color: "#0f172a",
        fontWeight: "700",
    },
    saveButton: {
        backgroundColor: "#135BEC",
        borderRadius: 20,
    },
});
