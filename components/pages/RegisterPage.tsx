import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthTemplate from "../templates/AuthTemplate";
import RegisterForm from "../organisms/RegisterForm";
import * as SecureStore from "expo-secure-store";
import { registerUser } from "../../constants/api";
import { RootStackParamList } from "../../types/navigation";
import { STORAGE_KEYS } from "../../constants/storage";
import { apiErrorContains, getApiErrorMessage } from "../../utils/error";

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

type RegisterPageProps = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterPage({ navigation }: RegisterPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    let valid = true;
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");

    if (!firstName.trim()) {
      setFirstNameError("First name is required.");
      valid = false;
    }
    if (!lastName.trim()) {
      setLastNameError("Last name is required.");
      valid = false;
    }
    if (!email.trim()) {
      setEmailError("E-Mail is required.");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid E-Mail.");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password too short. Minimum length is 8 characters.");
      valid = false;
    }

    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await registerUser({
        email: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      if (response.data?.user?.id) {
        await SecureStore.setItemAsync(STORAGE_KEYS.userId, response.data.user.id.toString());
      }
      const accessToken = response.data?.accessToken || response.data?.token;
      if (accessToken) {
        await SecureStore.setItemAsync(STORAGE_KEYS.token, accessToken);
      }

      navigation.navigate("Home");
    } catch (error) {
      if (apiErrorContains(error, "already exists")) {
        setEmailError("This email address is already in use.");
      } else {
        setEmailError(getApiErrorMessage(error, "Registration failed. Please try again."));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthTemplate
      title="CountryCruxCH"
      subtitle="Welcome to this site"
      formTitle="Create an Account"
    >
      <RegisterForm
        firstName={firstName}
        setFirstName={(val) => {
          setFirstName(val);
          setFirstNameError("");
        }}
        lastName={lastName}
        setLastName={(val) => {
          setLastName(val);
          setLastNameError("");
        }}
        email={email}
        setEmail={(val) => {
          setEmail(val);
          setEmailError("");
        }}
        password={password}
        setPassword={(val) => {
          setPassword(val);
          setPasswordError("");
        }}
        firstNameError={firstNameError}
        lastNameError={lastNameError}
        emailError={emailError}
        passwordError={passwordError}
        loading={loading}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onRegister={handleRegister}
        onNavigateToLogin={() => navigation.navigate("Login")}
      />
    </AuthTemplate>
  );
}
