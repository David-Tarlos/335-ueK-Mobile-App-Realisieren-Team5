import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import Typography from "../atoms/Typography";
import { COLORS } from "../../theme/colors";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Typography variant="header" style={styles.title}>
          {title}
        </Typography>
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  topBar: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: 0,
  },
});

export default PageHeader;
