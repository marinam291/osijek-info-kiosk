import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { ThemeColors } from "../../context/ThemeContext";

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
  const { width } = useWindowDimensions();
  const scale = width / 1920;

  return (
    <View
      style={[
        styles.emergencyBox,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          padding: 24 * scale,
          borderRadius: 20 * scale,
          marginBottom: 30 * scale,
          maxWidth: 900 * scale,
        },
      ]}
    >
      <Text
        style={[
          styles.emergencyTitle,
          {
            color: colors.accent,
            fontSize: 22 * scale,
            marginBottom: 16 * scale,
          },
        ]}
      >
        {isHR ? "HITNI BROJEVI" : "EMERGENCY"}
      </Text>
      <View style={[styles.emergencyGrid, { gap: 16 * scale }]}>
        {EMERGENCY_NUMBERS.map((item) => (
          <View
            key={item.key}
            style={[
              styles.emergencyCard,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
                paddingVertical: 16 * scale,
                paddingHorizontal: 12 * scale,
                borderRadius: 14 * scale,
              },
            ]}
          >
            <Text
              style={[
                styles.emergencyLabel,
                {
                  color: colors.textSecondary,
                  fontSize: 18 * scale,
                  marginBottom: 6 * scale,
                },
              ]}
              numberOfLines={1}
            >
              {isHR ? item.hr : item.en}
            </Text>
            <Text
              style={[
                styles.emergencyNumber,
                {
                  color: colors.accent,
                  fontSize: 32 * scale,
                },
              ]}
            >
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
    borderWidth: 1.5,
    alignSelf: "center",
    width: "100%",
  },
  emergencyTitle: {
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  emergencyGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emergencyCard: {
    flex: 1,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyLabel: {
    fontWeight: "600",
  },
  emergencyNumber: {
    fontWeight: "bold",
  },
});
