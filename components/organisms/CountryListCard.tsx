import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../atoms/Typography";

interface CountryListCardProps {
  name: string;
  capital: string;
  imageUrl: string;
  large?: boolean;
  onPress?: () => void;
}

const CountryListCard: React.FC<CountryListCardProps> = ({
  name,
  capital,
  imageUrl,
  large = false,
  onPress,
}) => {
  return (
    <TouchableRipple
      onPress={onPress}
      style={styles.ripple}
      borderless
      rippleColor="rgba(19, 91, 236, 0.1)"
    >
      <View style={styles.card}>
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, large ? styles.largeImage : styles.smallImage]}
        />
        <View style={styles.content}>
          <Typography variant="text" style={styles.countryName}>
            {name}
          </Typography>
          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="office-building-outline" size={12} color="#64748B" />
            <Typography variant="text" style={styles.capital}>
              {capital}
            </Typography>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: "100%",
  },
  largeImage: {
    height: 344,
  },
  smallImage: {
    height: 173,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 8,
  },
  countryName: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 0,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  capital: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
    marginBottom: 0,
  },
  ripple: {
    borderRadius: 12,
  },
});

export default CountryListCard;
