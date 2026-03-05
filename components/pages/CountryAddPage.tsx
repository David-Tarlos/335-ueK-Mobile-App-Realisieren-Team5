import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createCountry } from "../../constants/api";
import { COLORS } from "../../theme/colors";
import { getApiErrorMessage } from "../../utils/error";
import { pickFlagImage } from "../../utils/imagePicker";
import DetailTemplate from "../templates/DetailTemplate";
import AppAlertDialog from "../molecules/AppAlertDialog";
import CountryBanner from "../molecules/CountryBanner";
import CountryForm from "../organisms/CountryForm";
import AppButton from "../atoms/AppButton";
import { useCountries } from "../../context/CountryContext";
import { RootStackParamList } from "../../types/navigation";
import {
    CountryFormErrors,
    sanitizePopulationInput,
    validateCountryForm,
} from "../../utils/validation";

type CountryAddPageProps = NativeStackScreenProps<RootStackParamList, "CountryAdd">;

/**
 * Add-country screen for creating a new country entry.
 * Provides a flag image picker and a form for name, capital, population, region, and language.
 * Saves the new country via the API and appends it to the shared country context.
 */

export default function CountryAddPage({ navigation }: CountryAddPageProps) {
    const { setCountries, countries } = useCountries();
    const [saving, setSaving] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const [name, setName] = useState("");
    const [capital, setCapital] = useState("");
    const [population, setPopulation] = useState("");
    const [region, setRegion] = useState("");
    const [language, setLanguage] = useState("");
    const [flagUrl, setFlagUrl] = useState("");

    const [errors, setErrors] = useState<CountryFormErrors>({});

    const handlePickImage = async () => {
        const uri = await pickFlagImage();
        if (uri) setFlagUrl(uri);
    };

    const handleSave = async () => {
        const newErrors = validateCountryForm({
            name,
            capital,
            population,
            continent: region,
            language,
        });
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setSaving(true);
        const popValue = parseInt(sanitizePopulationInput(population), 10) || 0;

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

            setShowSuccessDialog(true);
        } catch (error) {
            Alert.alert("Error", getApiErrorMessage(error, "Failed to add country"));
        } finally {
            setSaving(false);
        }
    };

    const handleSuccessConfirm = () => {
        setShowSuccessDialog(false);
        navigation.navigate("Explore");
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
                    setCapital={(val) => {
                        setCapital(val);
                        if (errors.capital) setErrors({ ...errors, capital: undefined });
                    }}
                    population={population}
                    setPopulation={(val) => {
                        setPopulation(sanitizePopulationInput(val));
                        if (errors.population) setErrors({ ...errors, population: undefined });
                    }}
                    continent={region}
                    setContinent={(val) => {
                        setRegion(val);
                        if (errors.continent) setErrors({ ...errors, continent: undefined });
                    }}
                    language={language}
                    setLanguage={(val) => {
                        setLanguage(val);
                        if (errors.language) setErrors({ ...errors, language: undefined });
                    }}
                    errors={errors}
                />
            </View>

            <AppAlertDialog
                visible={showSuccessDialog}
                title="Success"
                message="Country added successfully"
                onConfirm={handleSuccessConfirm}
            />
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
