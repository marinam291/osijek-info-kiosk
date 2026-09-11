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

type EmobiWebProps = {
  colors: ThemeColors;
};

export default function EmobiWebViewWidget({ colors }: EmobiWebProps) {
  const emobiUrl = "https://sustavjavnihbicikala.hr/";

  return (
    <View
      style={[
        styles.container,
        { borderColor: colors.border, backgroundColor: colors.cardBackground },
      ]}
    >
      {Platform.OS === "web" ? (
        <iframe
          src={emobiUrl}
          style={{
            width: "100%",
            height: "600px",
            border: "none",
            borderRadius: 16,
          }}
          title="eMobi Bicikli"
        />
      ) : (
        <WebView source={{ uri: emobiUrl }} style={styles.webview} />
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
