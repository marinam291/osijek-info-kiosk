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
  if (!qrLink) {
    return (
      <View style={[styles.qrPlaceholder, { backgroundColor: colors.border }]}>
        <Text
          style={[styles.qrPlaceholderText, { color: colors.textSecondary }]}
        >
          {isHR ? "NEMA LINKA" : "NO LINK"}
        </Text>
      </View>
    );
  }

  let dualLinks: { android: string; ios: string } | null = null;
  try {
    const parsed = JSON.parse(qrLink);
    if (parsed && parsed.android && parsed.ios) {
      dualLinks = parsed;
    }
  } catch {
    // Nije JSON, običan pojedinačni link
  }

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
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {isHR ? "Preuzmite aplikaciju" : "Download App"}
        </Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>
          {dualLinks
            ? isHR
              ? "Skenirajte kod prema vašem uređaju"
              : "Scan code for your device"
            : isHR
              ? "Skenirajte za više informacija"
              : "Scan for more info"}
        </Text>
      </View>

      {dualLinks ? (
        <View style={styles.dualQrContainer}>
          <View style={styles.qrWrapper}>
            <QRCode
              value={dualLinks.android}
              size={100}
              color="#000000"
              backgroundColor="#FFFFFF"
            />
            <Text style={[styles.platformTitle, { color: colors.textPrimary }]}>
              Android
            </Text>
            <Text style={[styles.platformSub, { color: colors.textSecondary }]}>
              {isHR ? "Za Android korisnike" : "For Android users"}
            </Text>
          </View>

          {/* iOS dio */}
          <View style={styles.qrWrapper}>
            <QRCode
              value={dualLinks.ios}
              size={100}
              color="#000000"
              backgroundColor="#FFFFFF"
            />
            <Text style={[styles.platformTitle, { color: colors.textPrimary }]}>
              iOS
            </Text>
            <Text style={[styles.platformSub, { color: colors.textSecondary }]}>
              {isHR ? "Za iPhone / iOS korisnike" : "For iOS users"}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.singleQrWrapper}>
          <QRCode
            value={qrLink}
            size={120}
            color="#000000"
            backgroundColor="#FFFFFF"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  qrSection: {
    marginTop: 40,
    width: "100%",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    flexDirection: "row",
  },
  qrTextContent: { flex: 1, marginRight: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 6 },
  sub: { fontSize: 18 },
  singleQrWrapper: {
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  dualQrContainer: {
    flexDirection: "row",
    gap: 30,
  },
  qrWrapper: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  platformTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  platformSub: {
    marginTop: 2,
    fontSize: 12,
    textAlign: "center",
  },
  qrPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  qrPlaceholderText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
