import React, { useState } from "react";
import AuthTemplate from "../templates/AuthTemplate";
import LoginForm from "../organisms/LoginForm";
import BASE_URL from "../../constants/api";

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
    } else if (password.length < 8) {
      setPasswordError("Password too short. Minimum length is 8 characters.");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setPasswordError("Wrong credentials. Please try again.");
        return;
      }

      const data = await response.json();
      console.log("Login erfolgreich:", data);
      navigation.navigate("Home");
    } catch {
      setPasswordError("Connection error. Please try again.");
    } finally {
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
