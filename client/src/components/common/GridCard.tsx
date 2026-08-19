import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { ContentItem } from "../views/ContentArea";

type ThemeColors = {
  cardBackground: string;
  border: string;
  textPrimary: string;
  accent: string;
};

type GridCardProps = {
  item: ContentItem;
  colors: ThemeColors;
  onPress: (item: ContentItem) => void;
  language?: string;
};

export default function GridCard({
  item,
  colors,
  onPress,
  language = "HR",
}: GridCardProps) {
  const isHR = language === "HR";

  // Sigurno izvlačenje naziva (podržava i string i objekt)
  const displayName =
    typeof item.naziv === "object" && item.naziv !== null
      ? item.naziv[isHR ? "HR" : "EN"]
      : item.naziv;

  return (
    <TouchableOpacity
      style={[
        styles.gridCard,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
      onPress={() => onPress(item)}
    >
      {item.slika && <Image source={item.slika} style={styles.gridImage} />}
      <View style={styles.gridTextContainer}>
        <Text
          style={[styles.gridTitle, { color: colors.textPrimary }]}
          numberOfLines={1}
        >
          {displayName}
        </Text>
        {item.vrijeme && (
          <Text style={[styles.gridSubtitle, { color: colors.accent }]}>
            {item.vrijeme}
          </Text>
        )}
        {item.info && (
          <Text style={[styles.gridInfo, { color: colors.accent }]}>
            {item.info}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gridCard: {
    width: "31%",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  gridImage: {
    width: "100%",
    height: 180,
  },
  gridTextContainer: {
    padding: 16,
  },
  gridTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  gridSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  gridInfo: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "bold",
  },
});
