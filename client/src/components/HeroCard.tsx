import React from "react";
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { ContentItem } from "./ContentArea";

type ThemeColors = {
  background: string;
  textPrimary: string;
  accent: string;
  textSecondary: string;
};

type HeroCardProps = {
  item: ContentItem;
  colors: ThemeColors;
  onPress: (item: ContentItem) => void;
};

export default function HeroCard({ item, colors, onPress }: HeroCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(item)}>
      <ImageBackground
        source={item.slika as ImageSourcePropType}
        style={styles.heroContainer}
        imageStyle={{ borderRadius: 20 }}
      >
        <View
          style={[
            styles.heroOverlay,
            { backgroundColor: colors.background + "B3" },
          ]}
        >
          <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>
            {item.naziv}
          </Text>
          {item.vrijeme && (
            <Text style={[styles.heroSubtitle, { color: colors.accent }]}>
              {item.vrijeme}
            </Text>
          )}
          <Text
            numberOfLines={2}
            style={[styles.heroDescription, { color: colors.textSecondary }]}
          >
            {item.opis}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: 400,
    justifyContent: "flex-end",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  heroOverlay: {
    padding: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 18,
    maxWidth: "80%",
  },
});
