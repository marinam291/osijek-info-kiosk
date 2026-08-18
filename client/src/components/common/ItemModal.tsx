import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "../../context/ThemeContext";

type ItemType = {
  id: string | number;
  naziv?: string;
  opis?: string;
  slika?: ImageSourcePropType;
  galerija?: ImageSourcePropType[];
  qrLink?: string;
  vrijeme?: string;
} | null;

type ItemModalProps = {
  selectedItem: ItemType;
  setSelectedItem: (item: ItemType) => void;
  fullScreenImage: ImageSourcePropType | null;
  setFullScreenImage: (img: ImageSourcePropType | null) => void;
  language: string;
  colors: ReturnType<typeof useTheme>["colors"];
};

export default function ItemModal({
  selectedItem,
  setSelectedItem,
  fullScreenImage,
  setFullScreenImage,
  language,
  colors,
}: ItemModalProps) {
  const isHR = language === "HR";

  return (
    <>
      <Modal
        visible={selectedItem !== null}
        animationType="fade"
        transparent={true}
      >
        <View
          style={[
            styles.modalOverlay,
            { backgroundColor: colors.modalBackground },
          ]}
        >
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
              style={[
                styles.closeButton,
                { backgroundColor: colors.cardBackground },
              ]}
              onPress={() => setSelectedItem(null)}
            >
              <Text
                style={[styles.closeButtonText, { color: colors.textPrimary }]}
              >
                ✕
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
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
                {selectedItem?.naziv}
              </Text>

              <View style={styles.galleryContainer}>
                {selectedItem?.galerija ? (
                  selectedItem.galerija.map((img, index) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      onPress={() => setFullScreenImage(img)}
                    >
                      <Image source={img} style={styles.galleryImage} />
                    </TouchableOpacity>
                  ))
                ) : selectedItem?.slika ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      setFullScreenImage(
                        selectedItem.slika as ImageSourcePropType,
                      )
                    }
                  >
                    <Image
                      source={selectedItem.slika as ImageSourcePropType}
                      style={styles.fullImage}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>

              <Text
                style={[
                  styles.modalDescription,
                  { color: colors.textSecondary },
                ]}
              >
                {selectedItem?.opis}
              </Text>

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
                    {isHR
                      ? "Ponesi informacije sa sobom"
                      : "Take info with you"}
                  </Text>
                  <Text style={[styles.qrSub, { color: colors.textSecondary }]}>
                    {isHR ? "Skeniraj za navigaciju" : "Scan for navigation"}
                  </Text>
                </View>

                {selectedItem?.qrLink ? (
                  <View style={styles.qrCodeWrapper}>
                    <QRCode
                      value={selectedItem.qrLink}
                      size={100}
                      color="#000000"
                      backgroundColor="#FFFFFF"
                    />
                  </View>
                ) : (
                  <View
                    style={[
                      styles.qrPlaceholder,
                      { backgroundColor: colors.border },
                    ]}
                  >
                    <Text
                      style={[
                        styles.qrPlaceholderText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {isHR ? "NEMA LINKA" : "NO LINK"}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={fullScreenImage !== null}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.fullScreenOverlay}>
          <TouchableOpacity
            style={[
              styles.fullScreenCloseButton,
              { backgroundColor: colors.cardBackground },
            ]}
            onPress={() => setFullScreenImage(null)}
          >
            <Text
              style={[styles.closeButtonText, { color: colors.textPrimary }]}
            >
              ✕
            </Text>
          </TouchableOpacity>
          <Image
            source={fullScreenImage as ImageSourcePropType}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
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
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginBottom: 30,
  },
  galleryImage: { width: 350, height: 250, borderRadius: 20 },
  fullImage: { width: 600, height: 400, borderRadius: 20 },
  modalDescription: {
    fontSize: 22,
    lineHeight: 34,
    textAlign: "center",
    maxWidth: 800,
  },
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
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenCloseButton: {
    position: "absolute",
    top: 40,
    right: 40,
    zIndex: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: { width: "90%", height: "90%" },
});
