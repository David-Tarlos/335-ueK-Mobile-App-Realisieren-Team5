import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Typography from "../atoms/Typography";
import { COLORS } from "../../theme/colors";

interface RegionTabProps {
  label: string;
  active?: boolean;
  onPress: () => void;
}

const RegionTab: React.FC<RegionTabProps> = ({ label, active = false, onPress }) => {
  return (
    <Pressable onPress={onPress} style={[styles.tab, active && styles.activeTab]}>
      <Typography variant="text" style={[styles.text, active && styles.activeText]}>
        {label}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: COLORS.primaryAlt,
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textSecondary,
    marginBottom: 0,
  },
  activeText: {
    color: COLORS.primaryAlt,
  },
});

export default RegionTab;
