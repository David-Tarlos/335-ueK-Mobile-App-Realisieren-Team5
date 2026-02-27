import React, { useState } from "react";
import axios from "axios";
import AuthTemplate from "../templates/AuthTemplate";
import LoginForm from "../organisms/LoginForm";
import BASE_URL from "../../constants/api";
import * as SecureStore from "expo-secure-store";

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function LoginPage({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

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
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    const loginUrl = `${BASE_URL}/login`;
    console.log("[Login] Starting request", {
      url: loginUrl,
      email: email.trim(),
    });

    try {
      const response = await axios.post(loginUrl, {
        email: email.trim(),
        password,
      });
      console.log("[Login] Success response", {
        status: response.status,
        data: response.data,
      });

      await SecureStore.setItemAsync("userId", response.data.user.id.toString());
      const accessToken = response.data?.accessToken || response.data?.token;
      if (accessToken) {
        await SecureStore.setItemAsync("token", accessToken);
      }

      console.log("[Login] Stored credentials successfully");
      navigation.navigate("Home");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("[Login] Axios error response", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
        setPasswordError("Wrong credentials. Please try again.");
      } else {
        console.log("[Login] Network/unknown error", error);
        setPasswordError("Connection error. Please try again.");
      }
    } finally {
      console.log("[Login] Request finished");
      setLoading(false);
    }
  };

  return (
    <AuthTemplate
      title="Country Details"
      subtitle="Check global data instantly"
      formTitle="Login"
    >
      <LoginForm
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
        emailError={emailError}
        passwordError={passwordError}
        loading={loading}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onLogin={handleLogin}
        onNavigateToRegister={() => navigation.navigate("Register")}
      />
    </AuthTemplate>
  );
}
