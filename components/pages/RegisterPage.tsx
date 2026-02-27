import React, { useState } from "react";
import axios from "axios";
import AuthTemplate from "../templates/AuthTemplate";
import RegisterForm from "../organisms/RegisterForm";
import * as SecureStore from "expo-secure-store";
import BASE_URL from "../../constants/api";

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function RegisterPage({ navigation }: any) {
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
    const registerUrl = `${BASE_URL}/register`;
    console.log("[Register] Starting request", {
      url: registerUrl,
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });

    try {
      const response = await axios.post(registerUrl, {
        email: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      console.log("[Register] Success response", {
        status: response.status,
        data: response.data,
      });

      if (response.data?.user?.id) {
        await SecureStore.setItemAsync("userId", response.data.user.id.toString());
      }
      const accessToken = response.data?.accessToken || response.data?.token;
      if (accessToken) {
        await SecureStore.setItemAsync("token", accessToken);
      }

      console.log("[Register] Stored credentials successfully");
      navigation.navigate("Home");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("[Register] Axios error response", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
        const message =
          (error.response.data as { message?: string } | undefined)?.message ||
          "Registration failed. Please try again.";
        setEmailError(message);
      } else {
        console.log("[Register] Network/unknown error", error);
        setEmailError("Connection error. Please try again.");
      }
    } finally {
      console.log("[Register] Request finished");
      setLoading(false);
    }
  };

  return (
    <AuthTemplate
      title="CountryCruxCH"
      formTitle="Register"
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
