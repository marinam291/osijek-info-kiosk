import React from "react";
import { View, Text, StyleSheet } from "react-native";

type ThemeColors = {
  cardBackground: string;
  border: string;
  accent: string;
  textPrimary: string;
};

type EmergencyProps = {
  language: string;
  colors: ThemeColors;
};

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
        {isHR ? "HITNI BROJEVI" : "EMERGENCY NUMBERS"}
      </Text>
      <View style={styles.emergencyGrid}>
        <Text style={[styles.emergencyItem, { color: colors.textPrimary }]}>
          {isHR ? "Policija" : "Police"}:{" "}
          <Text style={{ fontWeight: "bold" }}>192</Text>
        </Text>
        <Text style={[styles.emergencyItem, { color: colors.textPrimary }]}>
          {isHR ? "Hitna pomoć" : "Ambulance"}:{" "}
          <Text style={{ fontWeight: "bold" }}>194</Text>
        </Text>
        <Text style={[styles.emergencyItem, { color: colors.textPrimary }]}>
          {isHR ? "Vatrogasci" : "Fire Department"}:{" "}
          <Text style={{ fontWeight: "bold" }}>193</Text>
        </Text>
        <Text style={[styles.emergencyItem, { color: colors.textPrimary }]}>
          {isHR ? "Žurni centar" : "Emergency Center"}:{" "}
          <Text style={{ fontWeight: "bold" }}>112</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emergencyBox: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 30,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  emergencyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  emergencyItem: {
    fontSize: 16,
    width: "45%",
  },
});
