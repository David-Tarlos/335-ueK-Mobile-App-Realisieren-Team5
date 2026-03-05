import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthTemplate from "../templates/AuthTemplate";
import LoginForm from "../organisms/LoginForm";
import { loginUser } from "../../constants/api";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "../../types/navigation";
import { STORAGE_KEYS } from "../../constants/storage";
import { getApiErrorMessage } from "../../utils/error";
import { isValidEmail } from "../../utils/validation";

type LoginPageProps = NativeStackScreenProps<RootStackParamList, "Login">;

/**
 * Login page that handles user authentication.
 * Validates email and password, calls the login API, stores the access token securely, and navigates to the Home screen on success.
 */
export default function LoginPage({ navigation }: LoginPageProps) {
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

    try {
      const response = await loginUser({
        email: email.trim(),
        password,
      });

      await SecureStore.setItemAsync(STORAGE_KEYS.userId, response.data.user.id.toString());
      const accessToken = response.data?.accessToken || response.data?.token;
      if (accessToken) {
        await SecureStore.setItemAsync(STORAGE_KEYS.token, accessToken);
      }

      navigation.navigate("Home");
    } catch (error) {
      const message = getApiErrorMessage(error, "Connection error. Please try again.");
      setPasswordError(message === "Connection error. Please try again." ? "Connection error. Please try again." : "Wrong credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthTemplate
      title="CountryCruxCH"
      subtitle="Welcome to this site"
      formTitle="Login"
      paddingTop={160}
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
