import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Typography from "../atoms/Typography";
import { COLORS } from "../../theme/colors";

interface AppAlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

const AppAlertDialog: React.FC<AppAlertDialogProps> = ({
  visible,
  title,
  message,
  confirmLabel = "OK",
  onConfirm,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onConfirm}>
      <View style={styles.backdrop}>
        <View style={styles.dialog}>
          <Typography variant="title" style={styles.title}>
            {title}
          </Typography>
          <Typography variant="text" style={styles.message}>
            {message}
          </Typography>

          <Pressable onPress={onConfirm} style={styles.button}>
            <Typography variant="link" style={styles.buttonText}>
              {confirmLabel}
            </Typography>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  dialog: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
  },
  title: {
    marginBottom: 12,
  },
  message: {
    color: COLORS.textPrimary,
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  buttonText: {
    marginTop: 0,
    fontFamily: "Inter_500Medium",
    color: COLORS.primary,
  },
});

export default AppAlertDialog;

