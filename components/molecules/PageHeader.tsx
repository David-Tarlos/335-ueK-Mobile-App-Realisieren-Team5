import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import Typography from "../atoms/Typography";
import { COLORS } from "../../theme/colors";

/** Props for the {@link PageHeader} component. */
interface PageHeaderProps {
  title: string;
}

/**
 * A page header with a title and a horizontal divider below it.
 * Used at the top of main screens to identify the current section.
 */
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
