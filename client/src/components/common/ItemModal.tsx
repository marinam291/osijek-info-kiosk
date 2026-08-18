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
import { useTheme } from "../../context/ThemeContext";
import ItemImageGallery from "./ItemImageGallery";
import ItemQrSection from "./ItemQrSection";

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

              <ItemImageGallery
                galerija={selectedItem?.galerija}
                slika={selectedItem?.slika}
                onImagePress={setFullScreenImage}
              />

              <Text
                style={[
                  styles.modalDescription,
                  { color: colors.textSecondary },
                ]}
              >
                {selectedItem?.opis}
              </Text>

              <ItemQrSection
                qrLink={selectedItem?.qrLink}
                isHR={isHR}
                colors={colors}
              />
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
  modalDescription: {
    fontSize: 22,
    lineHeight: 34,
    textAlign: "center",
    maxWidth: 800,
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
