import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BASE_URL from "../constants/api";

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function LoginScreen({ navigation }: any) {
  // useState speichert Werte die sich ändern können (Eingabefelder, Fehler, etc.)
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
      // MUSS-Anforderung: Minimum 8 Zeichen
      setPasswordError("Password too short. Minimum length is 8 characters.");
      valid = false;
    }

    return valid;
  };

  // Wird ausgeführt wenn der "Login" Button gedrückt wird
  const handleLogin = async () => {
    if (!validate()) return; // Abbrechen wenn lokale Validation fehlschlägt

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // MUSS-Anforderung: Bei fehlerhaftem Login muss Fehlermeldung angezeigt werden
        setPasswordError("Wrong credentials. Please try again.");
        return;
      }

      const data = await response.json();
      console.log("Login erfolgreich:", data);
      // TODO: Nach erfolgreichem Login → navigation.navigate('Countries');
    } catch {
      setPasswordError("Connection error. Please try again.");
    } finally {
      setLoading(false); // Ladeanimation immer beenden, egal ob Erfolg oder Fehler
    }
  };

  return (
    // ScrollView damit die Seite scrollbar ist wenn Keyboard aufgeht
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* ===== LOGO BEREICH ===== */}
      <View style={styles.logoBox}>
        <MaterialCommunityIcons name="earth" size={36} color="#1d4ed8" />
      </View>

      <Text style={styles.title}>Country Details</Text>
      <Text style={styles.subtitle}>Check global data instantly</Text>

      {/* ===== FORMULAR ===== */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>Login</Text>

        {/* --- E-Mail Feld --- */}
        <Text style={styles.label}>E-mail</Text>
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
        {/* HelperText von React Native Paper — zeigt roten Text unter dem Feld */}
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
            setPasswordError(""); // Fehler löschen beim Tippen
          }}
          secureTextEntry={!showPassword} // true = Punkte statt Buchstaben
          error={!!passwordError} // roter Rahmen bei Fehler (z.B. "Wrong credentials")
          right={
            // Auge-Icon rechts im Feld zum Ein/Ausblenden
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

        {/* --- Login Button --- */}
        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading} // zeigt Spinner wenn API-Call läuft
          disabled={loading} // Button deaktivieren während Laden
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Login
        </Button>

        {/* --- Link zu Register --- */}
        {/* TouchableOpacity = anklickbarer Bereich (wird leicht transparent beim Drücken) */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f2f5",
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
  link: {
    color: "#1d4ed8",
    textAlign: "center",
    marginTop: 14,
    fontSize: 14,
    fontWeight: "500",
  },
});
