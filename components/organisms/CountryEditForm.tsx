import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { TextInput, Menu } from "react-native-paper";
import LabeledInput from "../molecules/LabeledInput";

interface CountryEditFormProps {
    name: string;
    setName: (val: string) => void;
    capital: string;
    setCapital: (val: string) => void;
    population: string;
    setPopulation: (val: string) => void;
    continent: string;
    setContinent: (val: string) => void;
}

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const CountryEditForm: React.FC<CountryEditFormProps> = ({
    name,
    setName,
    capital,
    setCapital,
    population,
    setPopulation,
    continent,
    setContinent,
}) => {
    const [menuVisible, setMenuVisible] = React.useState(false);

    return (
        <View style={styles.container}>
            <LabeledInput
                label="Country Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter country name"
                style={styles.inputStyle}
            />
            <LabeledInput
                label="Capital City"
                value={capital}
                onChangeText={setCapital}
                placeholder="Enter capital city"
                style={styles.inputStyle}
            />
            <LabeledInput
                label="Population"
                value={population}
                onChangeText={setPopulation}
                placeholder="Enter population"
                keyboardType="numeric"
                style={styles.inputStyle}
            />

            <View style={styles.inputStyle}>
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
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    inputStyle: {
        marginBottom: 8,
    },
});

export default CountryEditForm;
