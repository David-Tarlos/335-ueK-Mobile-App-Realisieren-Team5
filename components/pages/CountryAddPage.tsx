import React, { useState } from "react";
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

export default function CountryAddPage({ navigation }: any) {
    const { setCountries, countries } = useCountries();
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");
    const [capital, setCapital] = useState("");
    const [population, setPopulation] = useState("");
    const [region, setRegion] = useState("");
    const [language, setLanguage] = useState("");
    const [flagUrl, setFlagUrl] = useState("");

    const [errors, setErrors] = useState<any>({});

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

    const validate = () => {
        const newErrors: any = {};
        if (!name.trim()) newErrors.name = "Country name is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        setSaving(true);
        const popValue = parseInt(population.replace(/[^0-9]/g, "")) || 0;

        try {
            const token = await SecureStore.getItemAsync("token");
            const newCountry = {
                country_name: name.trim(),
                capital: capital.trim(),
                population: popValue,
                continent: region,
                flag_url: flagUrl,
                language: language.trim(),
            };

            const response = await axios.post(`${BASE_URL}/countries`, newCountry, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });

            const createdCountry = response.data;
            setCountries([...countries, createdCountry]);

            Alert.alert("Success", "Country added successfully");
            navigation.navigate("Explore");
        } catch (e) {
            Alert.alert("Error", "Failed to add country");
        } finally {
            setSaving(false);
        }
    };

    const footer = (
        <View style={styles.buttonContainer}>
            <AppButton
                mode="contained"
                onPress={() => navigation.goBack()}
                style={styles.cancelButton}
                labelStyle={styles.cancelButtonLabel}
            >
                Cancel
            </AppButton>
            <AppButton
                mode="contained"
                onPress={handleSave}
                loading={saving}
                disabled={saving}
                style={styles.saveButton}
            >
                Save
            </AppButton>
        </View>
    );

    return (
        <DetailTemplate title="Add Country" onClose={() => navigation.goBack()} footer={footer}>
            <View style={styles.formPadding}>
                <CountryBanner
                    flagUrl={flagUrl}
                    height={200}
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
                    continent={region}
                    setContinent={setRegion}
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
