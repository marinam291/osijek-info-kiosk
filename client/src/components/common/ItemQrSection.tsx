import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "../../context/ThemeContext";

type ItemQrSectionProps = {
  qrLink?: string;
  isHR: boolean;
  colors: ReturnType<typeof useTheme>["colors"];
};

export default function ItemQrSection({
  qrLink,
  isHR,
  colors,
}: ItemQrSectionProps) {
  return (
    <View
      style={[
        styles.qrSection,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.qrTextContent}>
        <Text style={[styles.qrTitle, { color: colors.textPrimary }]}>
          {isHR ? "Ponesi informacije sa sobom" : "Take info with you"}
        </Text>
        <Text style={[styles.qrSub, { color: colors.textSecondary }]}>
          {isHR ? "Skeniraj za navigaciju" : "Scan for navigation"}
        </Text>
      </View>

      {qrLink ? (
        <View style={styles.qrCodeWrapper}>
          <QRCode
            value={qrLink}
            size={100}
            color="#000000"
            backgroundColor="#FFFFFF"
          />
        </View>
      ) : (
        <View
          style={[styles.qrPlaceholder, { backgroundColor: colors.border }]}
        >
          <Text
            style={[styles.qrPlaceholderText, { color: colors.textSecondary }]}
          >
            {isHR ? "NEMA LINKA" : "NO LINK"}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  qrSection: {
    marginTop: 50,
    flexDirection: "row",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
  },
  qrTextContent: { marginRight: 30 },
  qrTitle: { fontSize: 24, fontWeight: "bold" },
  qrSub: { fontSize: 16 },
  qrCodeWrapper: { padding: 10, backgroundColor: "#FFFFFF", borderRadius: 8 },
  qrPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  qrPlaceholderText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
