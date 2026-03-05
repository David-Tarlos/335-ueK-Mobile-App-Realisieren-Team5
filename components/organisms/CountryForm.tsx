import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { TextInput, Menu } from "react-native-paper";
import LabeledInput from "../molecules/LabeledInput";

/** Props for the {@link CountryForm} component. */
interface CountryFormProps {
    name: string;
    setName: (val: string) => void;
    capital: string;
    setCapital: (val: string) => void;
    population: string;
    setPopulation: (val: string) => void;
    continent: string;
    setContinent: (val: string) => void;
    language: string;
    setLanguage: (val: string) => void;
    errors?: {
        name?: string;
        capital?: string;
        population?: string;
        continent?: string;
        language?: string;
    };
}

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

/**
 * A form for entering or editing country data (name, capital, population, region, language).
 * The region field uses a dropdown menu instead of a free-text input.
 */
const CountryForm: React.FC<CountryFormProps> = ({
    name,
    setName,
    capital,
    setCapital,
    population,
    setPopulation,
    continent,
    setContinent,
    language,
    setLanguage,
    errors,
}) => {
    const [menuVisible, setMenuVisible] = React.useState(false);

    return (
        <View style={styles.container}>
            <LabeledInput
                label="Country Name *"
                value={name}
                onChangeText={setName}
                placeholder="Enter country name"
                error={errors?.name}
                style={styles.inputStyle}
            />
            <LabeledInput
                label="Capital"
                value={capital}
                onChangeText={setCapital}
                placeholder="Enter capital city"
                error={errors?.capital}
                style={styles.inputStyle}
            />

            <View style={styles.row}>
                <LabeledInput
                    label="Population"
                    value={population}
                    onChangeText={setPopulation}
                    placeholder="e.g. 1000000"
                    keyboardType="numeric"
                    error={errors?.population}
                    style={styles.flex1}
                />
                <View style={[styles.flex1, styles.marginLeft]}>
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <Pressable onPress={() => setMenuVisible(true)}>
                                <View pointerEvents="none">
                                    <LabeledInput
                                        label="Region"
                                        value={continent}
                                        onChangeText={() => { }}
                                        placeholder="Select region"
                                        error={errors?.continent}
                                        right={<TextInput.Icon icon="chevron-down" />}
                                    />
                                </View>
                            </Pressable>
                        }
                    >
                        {regions.map((region) => (
                            <Menu.Item
                                key={region}
                                onPress={() => {
                                    setContinent(region);
                                    setMenuVisible(false);
                                }}
                                title={region}
                            />
                        ))}
                    </Menu>
                </View>
            </View>

            <LabeledInput
                label="Main Language"
                value={language}
                onChangeText={setLanguage}
                placeholder="Enter language"
                error={errors?.language}
                style={styles.inputStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    inputStyle: {
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        marginBottom: 8,
    },
    flex1: {
        flex: 1,
    },
    marginLeft: {
        marginLeft: 16,
    },
});

export default CountryForm;
