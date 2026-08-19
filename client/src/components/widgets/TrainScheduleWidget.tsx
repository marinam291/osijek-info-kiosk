import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";

type ThemeColors = {
  cardBackground: string;
  border: string;
  textPrimary: string;
  accent: string;
  background: string;
  textSecondary: string;
};

type TrainScheduleProps = {
  language: string;
  colors: ThemeColors;
};

export default function TrainScheduleWidget({ colors }: TrainScheduleProps) {
  const hzUrl = "https://www.hzpp.hr/";

  return (
    <View
      style={[
        styles.container,
        { borderColor: colors.border, backgroundColor: colors.cardBackground },
      ]}
    >
      {Platform.OS === "web" ? (
        <iframe
          src={hzUrl}
          style={{
            width: "100%",
            height: "600px",
            border: "none",
            borderRadius: 16,
          }}
          title="HŽ Vozni red"
        />
      ) : (
        <WebView source={{ uri: hzUrl }} style={styles.webview} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 650,
    borderRadius: 20,
    borderWidth: 2,
    overflow: "hidden",
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
