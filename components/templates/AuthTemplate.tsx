import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Logo from "../atoms/Logo";
import Typography from "../atoms/Typography";

interface AuthTemplateProps {
  title: string;
  subtitle?: string;
  formTitle: string;
  children: React.ReactNode;
  paddingTop?: number;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({
  title,
  subtitle,
  formTitle,
  children,
  paddingTop,
}) => {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        paddingTop !== undefined && { paddingTop },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Logo />
      <Typography variant="title" style={styles.title}>
        {title}
      </Typography>
      {subtitle && <Typography variant="subtitle">{subtitle}</Typography>}

      <View style={styles.form}>
        <Typography variant="formTitle" style={styles.formTitle}>
          {formTitle}
        </Typography>
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 85,
    paddingBottom: 40,
  },
  form: {
    width: "100%",
  },
  title: {
    marginBottom: 8,
  },
  formTitle: {
    marginTop: 5,
    marginBottom: 32,
  },
});

export default AuthTemplate;
