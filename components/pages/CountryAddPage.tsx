import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createCountry } from "../../constants/api";
import { COLORS } from "../../theme/colors";
import { getApiErrorMessage } from "../../utils/error";
import DetailTemplate from "../templates/DetailTemplate";
import CountryBanner from "../molecules/CountryBanner";
import CountryForm from "../organisms/CountryForm";
import AppButton from "../atoms/AppButton";
import { useCountries } from "../../context/CountryContext";
import { RootStackParamList } from "../../types/navigation";

type CountryAddPageProps = NativeStackScreenProps<RootStackParamList, "CountryAdd">;

/**
 * Add-country screen for creating a new country entry.
 * Provides a flag image picker and a form for name, capital, population, region, and language.
 * Saves the new country via the API and appends it to the shared country context.
 */

type CountryFormErrors = {
    name?: string;
    capital?: string;
    population?: string;
    continent?: string;
    language?: string;
};

export default function CountryAddPage({ navigation }: CountryAddPageProps) {
    const { setCountries, countries } = useCountries();
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");
    const [capital, setCapital] = useState("");
    const [population, setPopulation] = useState("");
    const [region, setRegion] = useState("");
    const [language, setLanguage] = useState("");
    const [flagUrl, setFlagUrl] = useState("");

    const [errors, setErrors] = useState<CountryFormErrors>({});

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "Sorry, we need camera roll permissions to make this work!");
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

    const validate = (): boolean => {
        const newErrors: CountryFormErrors = {};
        if (!name.trim()) newErrors.name = "Country name is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        setSaving(true);
        const popValue = parseInt(population.replace(/[^0-9]/g, "")) || 0;

        try {
            const newCountry = {
                country_name: name.trim(),
                capital: capital.trim(),
                population: popValue,
                continent: region,
                flag_url: flagUrl,
                language: language.trim(),
            };

            const response = await createCountry(newCountry);

            const createdCountry = response.data;
            setCountries([...countries, createdCountry]);

            Alert.alert("Success", "Country added successfully");
            navigation.navigate("Explore");
        } catch (error) {
            Alert.alert("Error", getApiErrorMessage(error, "Failed to add country"));
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
