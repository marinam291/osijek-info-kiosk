import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import ItemQrSection from "./ItemQrSection";
import TrainScheduleWidget from "../widgets/TrainScheduleWidget";
import GppWebViewWidget from "../widgets/GppWebViewWidget";
import EmobiWebViewWidget from "../widgets/EmobiWebViewWidget";
import { ContentItem } from "../views/ContentArea";

type ItemModalProps = {
  selectedItem: ContentItem | null;
  setSelectedItem: (item: ContentItem | null) => void;
  language: string;
  colors: ReturnType<typeof useTheme>["colors"];
};

export default function ItemModal({
  selectedItem,
  setSelectedItem,
  language,
  colors,
}: ItemModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHR = language === "HR";

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    closeTimer.current = setTimeout(() => {
      setSelectedItem(null);
      setIsClosing(false);
      closeTimer.current = null;
    }, 200);
  };

  const displayNaziv =
    typeof selectedItem?.naziv === "object" && selectedItem.naziv !== null
      ? selectedItem.naziv[isHR ? "HR" : "EN"]
      : selectedItem?.naziv;

  const displayOpis =
    typeof selectedItem?.opis === "object" && selectedItem.opis !== null
      ? selectedItem.opis[isHR ? "HR" : "EN"]
      : selectedItem?.opis;

  const hidesQrCode =
    selectedItem?.categoryKey === "turizam" ||
    selectedItem?.categoryKey === "muzeji" ||
    selectedItem?.categoryKey === "smjestaj" ||
    selectedItem?.categoryKey === "trgovine" ||
    ["zdravstvo", "gradskeUsluge"].includes(selectedItem?.subCategory ?? "");

  const shouldShowQrCode = selectedItem !== null && !hidesQrCode;

  const modalBody = (
    <View
      style={[
        styles.modalContent,
        {
          backgroundColor: colors.modalContent,
          borderColor: colors.border,
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.closeButton, { backgroundColor: colors.cardBackground }]}
        onPress={handleClose}
      >
        <Text style={[styles.closeButtonText, { color: colors.textPrimary }]}>
          X
        </Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.modalScroll}
        showsVerticalScrollIndicator={false}
        style={
          {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as unknown as ViewStyle
        }
      >
        {selectedItem && (
          <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
            {displayNaziv}
          </Text>
        )}

        {selectedItem?.id === "u_p2" ? (
          <View style={{ width: "100%", marginTop: 10 }}>
            <TrainScheduleWidget language={language} colors={colors} />
          </View>
        ) : selectedItem?.id === "u_p1" ? (
          <View style={{ width: "100%", marginTop: 10 }}>
            <GppWebViewWidget colors={colors} />
          </View>
        ) : selectedItem?.id === "u_p4" ? (
          <View style={{ width: "100%", marginTop: 10 }}>
            <EmobiWebViewWidget colors={colors} />
          </View>
        ) : (
          <>
            <Text
              style={[
                styles.modalDescription,
                {
                  color: colors.textSecondary,
                  fontSize: hidesQrCode ? 32 : 22,
                  lineHeight: hidesQrCode ? 48 : 34,
                  maxWidth: hidesQrCode ? 1200 : 800,
                },
              ]}
            >
              {displayOpis ||
                (isHR
                  ? "Opis za ovu stavku trenutno nije dostupan."
                  : "A description for this item is currently unavailable.")}
            </Text>

            {shouldShowQrCode && (
              <ItemQrSection
                qrLink={selectedItem?.qrLink}
                isHR={isHR}
                colors={colors}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );

  if (Platform.OS === "web") {
    return selectedItem !== null && !isClosing ? (
      <View
        style={[
          styles.modalOverlay,
          styles.webModalOverlay,
          { backgroundColor: colors.modalBackground },
        ]}
      >
        {modalBody}
      </View>
    ) : null;
  }

  return (
    <Modal
      visible={selectedItem !== null && !isClosing}
      animationType="fade"
      transparent={true}
    >
      <View
        style={[
          styles.modalOverlay,
          { backgroundColor: colors.modalBackground },
        ]}
      >
        {modalBody}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  webModalOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  modalContent: {
    width: "90%",
    height: "90%",
    borderRadius: 30,
    padding: 40,
    position: "relative",
    borderWidth: 1,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: { fontSize: 24, fontWeight: "bold" },
  modalScroll: { alignItems: "center" },
  modalTitle: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 22,
    lineHeight: 34,
    textAlign: "center",
    maxWidth: 800,
  },
});
