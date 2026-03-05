import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { COLORS } from "../../theme/colors";

/** Props for the {@link UndoDeleteSnackbar} component. */
interface UndoDeleteSnackbarProps {
  visible: boolean;
  countryName: string;
  onUndo: () => void;
  onDismiss: () => void;
}

/**
 * A snackbar shown after a country is deleted, giving the user 5 seconds to undo the action.
 * The actual API delete call is deferred until the snackbar dismisses without undo.
 */
const UndoDeleteSnackbar: React.FC<UndoDeleteSnackbarProps> = ({
  visible,
  countryName,
  onUndo,
  onDismiss,
}) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={5000}
      style={styles.snackbar}
      theme={{ colors: { inverseOnSurface: COLORS.textPrimary } }}
      action={{
        label: "Undo",
        onPress: onUndo,
        textColor: COLORS.primary,
      }}
    >
      {`"${countryName}" deleted`}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
});

export default UndoDeleteSnackbar;

