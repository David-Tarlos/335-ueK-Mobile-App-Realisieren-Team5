import React, { useRef } from "react";
import { Animated, Modal, Pressable, StyleSheet, View } from "react-native";
import Typography from "../atoms/Typography";
import { COLORS } from "../../theme/colors";

interface AppAlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  cancelLabel?: string;
  onCancel?: () => void;
  confirmLabel?: string;
  confirmTone?: "default" | "destructive";
  onConfirm: () => void;
}

type DialogActionButtonProps = {
  label: string;
  onPress: () => void;
  textStyle: object;
};

const DialogActionButton: React.FC<DialogActionButtonProps> = ({ label, onPress, textStyle }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const animatePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.9,
        speed: 22,
        bounciness: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.6,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        speed: 18,
        bounciness: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <Pressable
        onPress={onPress}
        onPressIn={animatePressIn}
        onPressOut={animatePressOut}
        style={styles.button}
      >
        <Typography variant="link" style={[styles.buttonText, textStyle]}>
          {label}
        </Typography>
      </Pressable>
    </Animated.View>
  );
};

const AppAlertDialog: React.FC<AppAlertDialogProps> = ({
  visible,
  title,
  message,
  cancelLabel,
  onCancel,
  confirmLabel = "OK",
  confirmTone = "default",
  onConfirm,
}) => {
  const showCancelButton = Boolean(onCancel);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={showCancelButton ? onCancel : onConfirm}
    >
      <View style={styles.backdrop}>
        <View style={styles.dialog}>
          <Typography variant="title" style={styles.title}>
            {title}
          </Typography>
          <Typography variant="text" style={styles.message}>
            {message}
          </Typography>

          <View style={styles.actions}>
            {showCancelButton && (
              <DialogActionButton
                label={cancelLabel ?? "Cancel"}
                onPress={onCancel}
                textStyle={styles.cancelText}
              />
            )}

            <DialogActionButton
              label={confirmLabel}
              onPress={onConfirm}
              textStyle={confirmTone === "destructive" ? styles.destructiveText : styles.confirmText}
            />
          </View>
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
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  actions: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  buttonText: {
    marginTop: 0,
    fontFamily: "Inter_500Medium",
  },
  cancelText: {
    color: COLORS.textSecondary,
  },
  confirmText: {
    color: COLORS.primary,
  },
  destructiveText: {
    color: COLORS.danger,
  },
});

export default AppAlertDialog;

