import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../atoms/Typography";
import { COLORS } from "../../theme/colors";

/** Props for the {@link BottomNavItem} component. */
interface BottomNavItemProps {
  label: string;
  active?: boolean;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
}

/**
 * A single item in the bottom navigation bar.
 * Renders an icon and a label, highlighted when active.
 */
const BottomNavItem: React.FC<BottomNavItemProps> = ({
  label,
  active = false,
  icon,
  onPress,
}) => {
  const activeColor = COLORS.primary;
  const inactiveColor = COLORS.textMuted;
  const handlePress = onPress ?? (() => {});

  return (
    <TouchableRipple
      style={styles.bottomItem}
      borderless
      rippleColor="rgba(19, 91, 236, 0.2)"
      onPress={handlePress}
    >
      <View style={styles.bottomItemInner}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={active ? activeColor : inactiveColor}
        />
        <Typography
          variant="text"
          style={[
            styles.bottomItemLabel,
            { color: active ? activeColor : inactiveColor },
          ]}
        >
          {label}
        </Typography>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  bottomItem: {
    borderRadius: 10,
    flex: 1,
  },
  bottomItemInner: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 39,
    gap: 4,
  },
  bottomItemLabel: {
    marginTop: 0,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "500",
    letterSpacing: 0.25,
    marginBottom: 0,
  },
});

export default BottomNavItem;
