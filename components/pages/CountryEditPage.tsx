import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getCountryById, updateCountryById } from "../../constants/api";
import { COLORS } from "../../theme/colors";
import { getApiErrorMessage } from "../../utils/error";
import { pickFlagImage } from "../../utils/imagePicker";
import DetailTemplate from "../templates/DetailTemplate";
import AppAlertDialog from "../molecules/AppAlertDialog";
import CountryBanner from "../molecules/CountryBanner";
import CountryForm from "../organisms/CountryForm";
import AppButton from "../atoms/AppButton";

import { Country, useCountries } from "../../context/CountryContext";
import { RootStackParamList } from "../../types/navigation";
import {
    CountryFormErrors,
    sanitizePopulationInput,
    validateCountryForm,
} from "../../utils/validation";

type CountryEditPageProps = NativeStackScreenProps<RootStackParamList, "CountryEdit">;

/**
 * Edit screen for updating an existing country's data.
 * Pre-fills the form from context or fetches the country from the API.
 * Allows picking a new flag image from the device library, and saves changes via the update API.
 * Cancel exits immediately when unchanged, or asks for confirmation when there are unsaved changes.
 */

export default function CountryEditPage({ route, navigation }: CountryEditPageProps) {
    const { id } = route.params;
    const { countries, updateCountry, setCountries } = useCountries();
    const [loading, setLoading] = useState(!countries.find(c => c.id === id));
    const [saving, setSaving] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showDiscardDialog, setShowDiscardDialog] = useState(false);

    const [name, setName] = useState("");
    const [capital, setCapital] = useState("");
    const [population, setPopulation] = useState("");
    const [continent, setContinent] = useState("");
    const [language, setLanguage] = useState("");
    const [flagUrl, setFlagUrl] = useState("");

    const [errors, setErrors] = useState<CountryFormErrors>({});
    const [initialValues, setInitialValues] = useState<{
        name: string;
        capital: string;
        population: string;
        continent: string;
        language: string;
        flagUrl: string;
    } | null>(null);

    const setFormFromCountry = (country: Country) => {
        const countryName = country.country_name || "";
        const countryCapital = country.capital || "";
        const countryPopulation = country.population ? country.population.toString() : "";
        const countryContinent = country.continent || "";
        const countryLanguage = country.language || "";
        const countryFlagUrl = country.flag_url || "";

        setName(countryName);
        setCapital(countryCapital);
        setPopulation(countryPopulation);
        setContinent(countryContinent);
        setLanguage(countryLanguage);
        setFlagUrl(countryFlagUrl);
        setInitialValues({
            name: countryName.trim(),
            capital: countryCapital.trim(),
            population: sanitizePopulationInput(countryPopulation),
            continent: countryContinent.trim(),
            language: countryLanguage.trim(),
            flagUrl: countryFlagUrl.trim(),
        });
    };

    const hasUnsavedChanges = useMemo(() => {
        if (!initialValues) return false;

        return (
            initialValues.name !== name.trim() ||
            initialValues.capital !== capital.trim() ||
            initialValues.population !== sanitizePopulationInput(population) ||
            initialValues.continent !== continent.trim() ||
            initialValues.language !== language.trim() ||
            initialValues.flagUrl !== flagUrl.trim()
        );
    }, [initialValues, name, capital, population, continent, language, flagUrl]);

    useEffect(() => {
        const country = countries.find(c => c.id === id);
        if (country) {
            setFormFromCountry(country);
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
                setFormFromCountry(data);
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
        const newErrors = validateCountryForm({
            name,
            capital,
            population,
            continent,
            language,
        });
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setSaving(true);
        const updatedPop = parseInt(sanitizePopulationInput(population), 10) || 0;
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
            setShowSuccessDialog(true);
            setInitialValues({
                name: updatedData.country_name,
                capital: updatedData.capital,
                population: updatedData.population.toString(),
                continent: updatedData.continent,
                language: updatedData.language,
                flagUrl: updatedData.flag_url.trim(),
            });
        } catch (error) {
            Alert.alert("Error", getApiErrorMessage(error, "Failed to save changes"));
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (!hasUnsavedChanges) {
            navigation.goBack();
            return;
        }

        setShowDiscardDialog(true);
    };

    const handleDiscardConfirm = () => {
        setShowDiscardDialog(false);
        navigation.goBack();
    };

    const handleSuccessConfirm = () => {
        setShowSuccessDialog(false);
        navigation.goBack();
    };

    if (loading) return null;

    const footer = (
        <View style={styles.buttonContainer}>
            <AppButton
                mode="contained"
                onPress={handleCancel}
                style={styles.cancelButton}
                labelStyle={styles.cancelButtonLabel}
                icon="close"
            >
                Cancel
            </AppButton>
            <AppButton
                mode="contained"
                onPress={handleSave}
                loading={saving}
                disabled={saving}
                style={styles.saveButton}
                icon="pencil-outline"
            >
                Save Changes
            </AppButton>
        </View>
    );

    return (
        <DetailTemplate title="Edit" onClose={handleCancel} footer={footer}>
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
                    setCapital={(val) => {
                        setCapital(val);
                        if (errors.capital) setErrors({ ...errors, capital: undefined });
                    }}
                    population={population}
                    setPopulation={(val) => {
                        setPopulation(sanitizePopulationInput(val));
                        if (errors.population) setErrors({ ...errors, population: undefined });
                    }}
                    continent={continent}
                    setContinent={(val) => {
                        setContinent(val);
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
                message="Country details updated"
                onConfirm={handleSuccessConfirm}
            />

            <AppAlertDialog
                visible={showDiscardDialog}
                title="Discard changes"
                message="You have unsaved changes. Do you really want to discard them?"
                cancelLabel="Keep editing"
                onCancel={() => setShowDiscardDialog(false)}
                confirmLabel="Discard"
                confirmTone="destructive"
                onConfirm={handleDiscardConfirm}
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
