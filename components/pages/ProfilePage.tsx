import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ProfileTemplate from "../templates/ProfileTemplate";
import { getUserById, UserDto } from "../../constants/api";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "../../types/navigation";
import { STORAGE_KEYS } from "../../constants/storage";
import { getApiErrorMessage } from "../../utils/error";

type ProfilePageProps = NativeStackScreenProps<RootStackParamList, "Profile">;

/**
 * Profile screen displaying the currently logged-in user's personal details.
 * Fetches user data from the API using the stored user ID, and provides a logout action that clears secure storage and resets navigation to Login.
 */
export default function ProfilePage({ navigation }: ProfilePageProps) {
  const [userData, setUserData] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = await SecureStore.getItemAsync(STORAGE_KEYS.userId);
      if (!userId) return;

      const response = await getUserById(userId);
      if (response.status === 200) {
        setUserData(response.data || {});
      }
    } catch (error) {
      Alert.alert("Error", getApiErrorMessage(error, "Could not load profile data. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  const firstName = userData?.firstName;
  const lastName = userData?.lastName;
  const fullName =
    firstName || lastName
      ? `${firstName || ""} ${lastName || ""}`.trim()
      : "No name found";

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.userId);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.token);
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

