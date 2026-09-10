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

type GppWebProps = {
  colors: ThemeColors;
};

export default function GppWebViewWidget({ colors }: GppWebProps) {
  const gppUrl = "https://web.gpp-osijek.com/polasci-2/";

  return (
    <View
      style={[
        styles.container,
        { borderColor: colors.border, backgroundColor: colors.cardBackground },
      ]}
    >
      {Platform.OS === "web" ? (
        <iframe
          src={gppUrl}
          style={{
            width: "100%",
            height: "600px",
            border: "none",
            borderRadius: 16,
          }}
          title="GPP Polasci"
        />
      ) : (
        <WebView source={{ uri: gppUrl }} style={styles.webview} />
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
