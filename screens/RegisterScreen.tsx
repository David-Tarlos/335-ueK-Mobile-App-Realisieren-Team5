import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BASE_URL from "../constants/api";

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function RegisterScreen({ navigation }: any) {
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
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* ===== LOGO BEREICH ===== */}
      <View style={styles.logoBox}>
        <MaterialCommunityIcons name="earth" size={36} color="#1d4ed8" />
      </View>

      <Text style={styles.title}>CountryCruxCH</Text>

      {/* ===== FORMULAR ===== */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>Register</Text>

        {/* First Name + Last Name nebeneinander*/}
        <View style={styles.nameRow}>
          <View style={styles.nameField}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              mode="outlined"
              placeholder="Joe"
              value={firstName}
              onChangeText={(val) => {
                setFirstName(val);
                setFirstNameError("");
              }}
              error={!!firstNameError}
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />
            <HelperText
              type="error"
              visible={!!firstNameError}
              style={styles.helperText}
            >
              {firstNameError}
            </HelperText>
          </View>

          {/* Last Name — nimmt die andere 50% (flex: 1) mit Abstand links */}
          <View style={[styles.nameField, styles.nameFieldRight]}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              mode="outlined"
              placeholder="Doe"
              value={lastName}
              onChangeText={(val) => {
                setLastName(val);
                setLastNameError("");
              }}
              error={!!lastNameError}
              style={styles.input}
              outlineStyle={styles.inputOutline}
            />
            <HelperText
              type="error"
              visible={!!lastNameError}
              style={styles.helperText}
            >
              {lastNameError}
            </HelperText>
          </View>
        </View>

        {/* --- E-Mail Feld (volle Breite) --- */}
        <Text style={styles.label}>E-Mail</Text>
        <TextInput
          mode="outlined"
          placeholder="user@example.com"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            setEmailError("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!emailError}
          style={styles.input}
          outlineStyle={styles.inputOutline}
        />
        <HelperText
          type="error"
          visible={!!emailError}
          style={styles.helperText}
        >
          {emailError}
        </HelperText>

        {/* --- Passwort Feld --- */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          mode="outlined"
          placeholder="Password"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            setPasswordError("");
          }}
          secureTextEntry={!showPassword}
          error={!!passwordError}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword((v) => !v)}
            />
          }
          style={styles.input}
          outlineStyle={styles.inputOutline}
        />
        <HelperText
          type="error"
          visible={!!passwordError}
          style={styles.helperText}
        >
          {passwordError}
        </HelperText>

        {/* --- Register Button --- */}
        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Register
        </Button>

        {/* --- Link zum Login --- */}
        {/* flexDirection: 'row' damit "Already..." und "Login" auf der gleichen Zeile sind */}
        <View style={styles.loginLinkRow}>
          <Text style={styles.loginLinkText}>Already got a Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 28,
  },
  form: {
    width: "100%",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  nameRow: {
    flexDirection: "row",
  },
  nameField: {
    flex: 1,
  },
  nameFieldRight: {
    marginLeft: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
    marginTop: 4,
  },
  input: {
    backgroundColor: "#ffffff",
  },
  inputOutline: {
    borderRadius: 8,
  },
  helperText: {
    paddingHorizontal: 0,
    marginBottom: 2,
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: "#1d4ed8",
  },
  buttonContent: {
    paddingVertical: 6,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  loginLinkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },
  loginLinkText: {
    fontSize: 14,
    color: "#6b7280",
  },
  link: {
    color: "#1d4ed8",
    fontSize: 14,
    fontWeight: "500",
  },
});
