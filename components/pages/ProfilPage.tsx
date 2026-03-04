import React, { useState, useEffect } from "react";
import ProfileTemplate from "../templates/ProfileTemplate";
import { getUserById } from "../../constants/api";
import * as SecureStore from "expo-secure-store";

export default function ProfilPage({ navigation }: any) {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userId = await SecureStore.getItemAsync("userId");
            if (!userId) return;

            const response = await getUserById(userId);
            if (response.status === 200) {
                setUserData(response.data || {});
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null;

    const firstName = userData?.firstName;
    const lastName = userData?.lastName;
    const fullName = firstName || lastName
        ? `${firstName || ""} ${lastName || ""}`.trim()
        : "No name found";

    const handleLogout = async () => {
        try {
            await SecureStore.deleteItemAsync("userId");
            await SecureStore.deleteItemAsync("token");
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
        }
    };

    return (
        <ProfileTemplate
            fullName={fullName}
            email={userData?.email}
            firstName={firstName}
            lastName={lastName}
            age={userData?.age?.toString()}
            currentRoute="Profile"
            onNavigate={(route) => navigation.navigate(route)}
            onLogout={handleLogout}
        />
    );
}
