import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Typography from "../atoms/Typography";

interface BottomNavItemProps {
  label: string;
  active?: boolean;
  icon: React.ReactNode;
  onPress?: () => void;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({
  label,
  active = false,
  icon,
  onPress,
}) => {
  const activeColor = "#2563eb";
  const inactiveColor = "#94a3b8";

  return (
    <TouchableRipple style={styles.bottomItem} borderless onPress={onPress}>
      <View style={styles.bottomItemInner}>
        {icon}
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
  },
  bottomItemInner: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 88,
  },
  bottomItemLabel: {
    marginTop: 4,
    fontSize: 11,
    marginBottom: 0,
  },
});

export default BottomNavItem;
