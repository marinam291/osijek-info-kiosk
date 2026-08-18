import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeColors } from "../context/ThemeContext";

type EmergencyProps = {
  language: string;
  colors: ThemeColors;
};

const EMERGENCY_NUMBERS = [
  { key: "policija", hr: "Policija", en: "Police", number: "192" },
  { key: "hitna", hr: "Hitna", en: "Ambulance", number: "194" },
  { key: "vatrogasci", hr: "Vatrogasci", en: "Fire", number: "193" },
  { key: "zurni", hr: "Žurni", en: "112", number: "112" },
];

export default function EmergencyBox({ language, colors }: EmergencyProps) {
  const isHR = language === "HR";

  return (
    <View
      style={[
        styles.emergencyBox,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.emergencyTitle, { color: colors.accent }]}>
        {isHR ? "HITNI BROJEVI" : "EMERGENCY"}
      </Text>
      <View style={styles.emergencyGrid}>
        {EMERGENCY_NUMBERS.map((item) => (
          <View
            key={item.key}
            style={[
              styles.emergencyCard,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[styles.emergencyLabel, { color: colors.textSecondary }]}
              numberOfLines={1}
            >
              {isHR ? item.hr : item.en}
            </Text>
            <Text style={[styles.emergencyNumber, { color: colors.accent }]}>
              {item.number}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emergencyBox: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
    alignSelf: "center",
    width: "100%",
    maxWidth: 650,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  emergencyGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  emergencyCard: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  emergencyLabel: {
    fontSize: 11,
    marginBottom: 2,
    fontWeight: "500",
  },
  emergencyNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
