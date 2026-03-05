import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Country {
    id: number;
    country_name: string;
    capital: string | null;
    continent: string | null;
    population: number | null;
    flag_url: string | null;
    language?: string | null;
}

interface CountryContextType {
    countries: Country[];
    setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
    updateCountry: (updatedCountry: Country) => void;
    deleteCountry: (id: number) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
    const [countries, setCountries] = useState<Country[]>([]);

    const updateCountry = (updatedCountry: Country) => {
        setCountries((prev) =>
            prev.map((c) => (c.id === updatedCountry.id ? updatedCountry : c))
        );
    };

    const deleteCountry = (id: number) => {
        setCountries((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <CountryContext.Provider value={{ countries, setCountries, updateCountry, deleteCountry }}>
            {children}
        </CountryContext.Provider>
    );
};

export const useCountries = () => {
    const context = useContext(CountryContext);
    if (!context) {
        throw new Error("useCountries must be used within a CountryProvider");
    }
    return context;
};
