import React, { useState } from "react";
import AuthTemplate from "../templates/AuthTemplate";
import RegisterForm from "../organisms/RegisterForm";
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
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setEmailError(data.message || "Registration failed. Please try again.");
        return;
      }
      navigation.navigate("Login");
    } catch {
      setEmailError("Connection error. Please try again.");
    } finally {
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
