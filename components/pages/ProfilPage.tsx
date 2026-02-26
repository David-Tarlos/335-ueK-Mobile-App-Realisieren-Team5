import React, { useState, useEffect } from "react";
import ProfileTemplate from "../templates/ProfileTemplate";
import BASE_URL from "../../constants/api";

export default function ProfilPage() {
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

    if (loading) return null;

    return (
        <ProfileTemplate
            headerTitle="Profil"
            fullName={`${userData?.firstName || "Error loading First Name"} ${userData?.lastName || "Error loading Last Name"}`}
            email={userData?.email || "Error loading Email"}
            firstName={userData?.firstName || "Error loading First Name"}
            lastName={userData?.lastName || "Error loading Last Name"}
        />
    );
}
