import React, { createElement, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { getOsijekData } from "../data/osijekData";

type ContentProps = {
  activeTab: string;
  language: string;
};

export default function ContentArea({ activeTab, language }: ContentProps) {
  const currentData = getOsijekData(language);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [fullScreenImage, setFullScreenImage] = useState<any>(null); // NOVO: State za sliku preko cijelog ekrana

  let dataToRender: any[] = [];
  let title = "";

  switch (activeTab) {
    case "turizam":
      dataToRender = currentData.turizam;
      title =
        language === "HR" ? "Turizam i znamenitosti" : "Tourism & Landmarks";
      break;
    case "dogadjanja":
      dataToRender = currentData.dogadjanja;
      title = language === "HR" ? "Događanja" : "Events";
      break;
    case "usluge":
      dataToRender = currentData.usluge;
      title = language === "HR" ? "Usluge i prijevoz" : "Services & Transport";
      break;
    case "karta":
      return (
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>
            {language === "HR" ? "Karta grada" : "City Map"}
          </Text>
          <View style={styles.mapContainer}>
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
    default:
      return null;
  }

  const heroItem = dataToRender[0];
  const listItems = dataToRender.slice(1);

  return (
    <View style={styles.mainContent}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{title}</Text>

        {heroItem && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setSelectedItem(heroItem)}
          >
            <ImageBackground
              source={heroItem.slika}
              style={styles.heroContainer}
              imageStyle={{ borderRadius: 20 }}
            >
              <View style={styles.heroOverlay}>
                <Text style={styles.heroTitle}>{heroItem.naziv}</Text>
                {heroItem.vrijeme && (
                  <Text style={styles.heroSubtitle}>{heroItem.vrijeme}</Text>
                )}
                <Text numberOfLines={2} style={styles.heroDescription}>
                  {heroItem.opis}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}

        <Text style={styles.subTitle}>
          {language === "HR" ? "Ostalo u ponudi" : "More to explore"}
        </Text>

        <View style={styles.gridContainer}>
          {listItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridCard}
              onPress={() => setSelectedItem(item)}
            >
              {item.slika ? (
                <Image source={item.slika} style={styles.gridImage} />
              ) : (
                <View
                  style={[styles.gridImage, { backgroundColor: "#1E293B" }]}
                />
              )}
              <View style={styles.gridTextContainer}>
                <Text style={styles.gridTitle} numberOfLines={1}>
                  {item.naziv}
                </Text>
                {item.vrijeme && (
                  <Text style={styles.gridSubtitle}>{item.vrijeme}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* DETALJNI MODAL */}
      <Modal
        visible={selectedItem !== null}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedItem(null)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.modalScroll}>
              <Text style={styles.modalTitle}>{selectedItem?.naziv}</Text>

              {/* NOVO: Dodan TouchableOpacity oko slika kako bi se mogle povećati */}
              <View style={styles.galleryContainer}>
                {selectedItem?.galerija
                  ? selectedItem.galerija.map((img: any, index: number) => (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => setFullScreenImage(img)}
                      >
                        <Image source={img} style={styles.galleryImage} />
                      </TouchableOpacity>
                    ))
                  : selectedItem?.slika && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setFullScreenImage(selectedItem.slika)}
                      >
                        <Image
                          source={selectedItem.slika}
                          style={styles.fullImage}
                        />
                      </TouchableOpacity>
                    )}
              </View>

              <Text style={styles.modalDescription}>{selectedItem?.opis}</Text>

              <View style={styles.qrSection}>
                <View style={styles.qrTextContent}>
                  <Text style={styles.qrTitle}>
                    {language === "HR"
                      ? "Ponesi informacije sa sobom"
                      : "Take info with you"}
                  </Text>
                  <Text style={styles.qrSub}>
                    {language === "HR"
                      ? "Skeniraj za navigaciju"
                      : "Scan for navigation"}
                  </Text>
                </View>
                {selectedItem?.qrLink ? (
                  <View style={styles.qrCodeWrapper}>
                    <QRCode
                      value={selectedItem.qrLink}
                      size={100}
                      color="#000"
                      backgroundColor="#FFF"
                    />
                  </View>
                ) : (
                  <View style={styles.qrPlaceholder}>
                    <Text style={{ fontSize: 30 }}>🔗</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* NOVO: Modal za prikaz slike preko cijelog ekrana */}
      <Modal
        visible={fullScreenImage !== null}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.fullScreenOverlay}>
          <TouchableOpacity
            style={styles.fullScreenCloseButton}
            onPress={() => setFullScreenImage(null)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Image
            source={fullScreenImage}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: { flex: 1, padding: 40, backgroundColor: "#0B0F19" },
  sectionTitle: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 24,
    letterSpacing: 1,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#94A3B8",
    marginTop: 40,
    marginBottom: 20,
  },
  heroContainer: {
    width: "100%",
    height: 400,
    justifyContent: "flex-end",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  heroOverlay: {
    backgroundColor: "rgba(11, 15, 25, 0.7)",
    padding: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00D4B2",
    marginBottom: 8,
  },
  heroDescription: { fontSize: 18, color: "#CBD5E1", maxWidth: "80%" },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", gap: 24 },
  gridCard: {
    width: "31%",
    backgroundColor: "#1E293B",
    borderRadius: 16,
    overflow: "hidden",
  },
  gridImage: { width: "100%", height: 200 },
  gridTextContainer: { padding: 16 },
  gridTitle: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
  gridSubtitle: { fontSize: 14, color: "#00D4B2", marginTop: 4 },
  mapContainer: {
    flex: 1,
    minHeight: 600,
    borderRadius: 16,
    overflow: "hidden",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  modalContent: {
    width: "90%",
    height: "90%",
    backgroundColor: "#0F172A",
    borderRadius: 30,
    padding: 40,
    position: "relative",
    borderWidth: 1,
    borderColor: "#334155",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "#1E293B",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: { fontSize: 24, fontWeight: "bold", color: "#FFFFFF" },
  modalScroll: { alignItems: "center" },
  modalTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
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
    color: "#CBD5E1",
    lineHeight: 34,
    textAlign: "center",
    maxWidth: 800,
  },
  qrSection: {
    marginTop: 50,
    flexDirection: "row",
    backgroundColor: "#1E293B",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  qrTextContent: { marginRight: 30 },
  qrTitle: { fontSize: 24, fontWeight: "bold", color: "#FFFFFF" },
  qrSub: { fontSize: 16, color: "#94A3B8" },
  qrCodeWrapper: { padding: 10, backgroundColor: "#FFF", borderRadius: 8 },
  qrPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#334155",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  // Stilovi za prikaz slike preko cijelog ekrana
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
    backgroundColor: "#1E293B",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "90%",
    height: "90%",
  },
});
