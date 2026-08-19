import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { LocationItem } from "../../data/mapLocations";
import { useTheme } from "../../context/ThemeContext";

type MapLocationModalProps = {
  selectedLocation: LocationItem | null;
  onClose: () => void;
  language: string;
  colors: ReturnType<typeof useTheme>["colors"];
};

export default function MapLocationModal({
  selectedLocation,
  onClose,
  language,
  colors,
}: MapLocationModalProps) {
  const langKey = language === "HR" ? "HR" : "EN";

  return (
    <Modal
      visible={selectedLocation !== null}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: colors.background }]}
            onPress={onClose}
          >
            <Text style={[styles.closeText, { color: colors.textPrimary }]}>
              ✕
            </Text>
          </TouchableOpacity>

          {selectedLocation && (
            <>
              <View style={styles.modalHeader}>
                <Text
                  style={[styles.modalTitle, { color: colors.textPrimary }]}
                >
                  {selectedLocation.naziv[langKey]}
                </Text>
                <Text
                  style={[styles.modalDesc, { color: colors.textSecondary }]}
                >
                  {selectedLocation.opis[langKey]}
                </Text>
                <Text style={[styles.modalDistance, { color: colors.accent }]}>
                  {language === "HR"
                    ? "Procijenjeno vrijeme hoda od Šetača: "
                    : "Est. walking time from Šetač: "}
                  {selectedLocation.vrijemeHoda[langKey]}
                </Text>
              </View>

              <View
                style={[
                  styles.qrBox,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.qrTitle, { color: colors.textPrimary }]}>
                  {language === "HR"
                    ? "Preuzmite navigaciju"
                    : "Get Directions"}
                </Text>
                <Text style={[styles.qrSub, { color: colors.textSecondary }]}>
                  {language === "HR"
                    ? "Skenirajte kod mobitelom za točnu pješačku rutu od Šetača do cilja."
                    : "Scan with your phone to open walking directions starting from Šetač."}
                </Text>

                <View style={styles.qrWrapper}>
                  <QRCode
                    value={selectedLocation.googleMapsUrl}
                    size={200}
                    color="#000000"
                    backgroundColor="#FFFFFF"
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "70%",
    maxWidth: 600,
    borderRadius: 30,
    padding: 40,
    borderWidth: 1,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalDesc: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  modalDistance: {
    fontSize: 22,
    fontWeight: "bold",
  },
  qrBox: {
    width: "100%",
    alignItems: "center",
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
  },
  qrTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  qrSub: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  qrWrapper: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
  },
});
