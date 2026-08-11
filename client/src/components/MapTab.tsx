import React, { createElement } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useTheme } from "../context/ThemeContext";

type MapTabProps = {
  language: string;
  colors: ReturnType<typeof useTheme>["colors"];
};

export default function MapTab({ language, colors }: MapTabProps) {
  return (
    <View style={[styles.mainContent, { backgroundColor: colors.background }]}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        {language === "HR" ? "Karta grada" : "City Map"}
      </Text>
      <View
        style={[
          styles.mapContainer,
          { backgroundColor: colors.cardBackground },
        ]}
      >
        {Platform.OS === "web"
          ? createElement("iframe", {
              src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89260.67104033107!2d18.6146059!3d45.5414341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475ce7a869728075%3A0x5b8c725621a41136!2sOsijek!5e0!3m2!1sen!2shr!4v1715000000000!5m2!1sen!2shr",
              style: {
                width: "100%",
                height: "100%",
                border: "0",
                borderRadius: "16px",
              },
            })
          : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    padding: 40,
  },
  sectionTitle: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 24,
    letterSpacing: 1,
  },
  mapContainer: {
    flex: 1,
    minHeight: 600,
    borderRadius: 16,
    overflow: "hidden",
  },
});
