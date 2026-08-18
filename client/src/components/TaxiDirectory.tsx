import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export type TaxiService = {
  id: string;
  naziv: string;
  telefon: string;
  opis: string;
  qrLink?: string;
};

type ThemeColors = {
  cardBackground: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
};

type TaxiProps = {
  items: TaxiService[];
  colors: ThemeColors;
  onItemPress: (item: TaxiService) => void;
};

export default function TaxiDirectory({
  items,
  colors,
  onItemPress,
}: TaxiProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={item.qrLink ? 0.7 : 1}
          onPress={() => {
            if (item.qrLink) {
              onItemPress(item);
            }
          }}
          style={[
            styles.card,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.infoContainer}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {item.naziv}
            </Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {item.opis}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <Text style={[styles.phone, { color: colors.accent }]}>
              {item.telefon}
            </Text>
            {item.qrLink && (
              <Text style={[styles.qrText, { color: colors.accent }]}>
                QR Kod
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 40,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
  },
  actionContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  phone: {
    fontSize: 18,
    fontWeight: "bold",
  },
  qrText: {
    fontSize: 14,
    marginTop: 4,
    textDecorationLine: "underline",
  },
});
