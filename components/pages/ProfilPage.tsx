import React, { useState, useEffect } from "react";
import ProfileTemplate from "../templates/ProfileTemplate";
import BASE_URL from "../../constants/api";

export default function ProfilPage({ navigation }: any) {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data[0] || {});
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        navigation.navigate("Login");
    };

    if (loading) return null;

    return (
        <ProfileTemplate
            headerTitle="Profil"
            fullName={`${userData?.firstName || "Alex"} ${userData?.lastName || "Johnson"}`}
            email={userData?.email || "example@mail.com"}
            firstName={userData?.firstName || "Joe"}
            lastName={userData?.lastName || "Doe"}
            age={userData?.age?.toString() || "67"}
            onLogout={handleLogout}
        />
    );
}
