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
} from "react-native";
import { getOsijekData } from "../data/osijekData";
import QRCode from "react-native-qrcode-svg";

type ContentProps = {
  activeTab: string;
  language: string;
};

export default function ContentArea({ activeTab, language }: ContentProps) {
  const currentData = getOsijekData(language);
  const [selectedItem, setSelectedItem] = useState<any>(null);

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
      title = language === "HR" ? "Događanja u Osijeku" : "Events in Osijek";
      break;
    case "usluge":
      dataToRender = currentData.usluge;
      title = language === "HR" ? "Usluge i Prijevoz" : "Services & Transport";
      break;
    case "karta":
      return (
        <View style={styles.mainContent}>
          <View style={styles.contentBox}>
            <Text style={styles.contentTitle}>
              {language === "HR"
                ? "Interaktivna karta grada"
                : "Interactive City Map"}
            </Text>

            <View style={styles.mapContainer}>
              {Platform.OS === "web" ? (
                createElement("iframe", {
                  src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89260.67104033107!2d18.6146059!3d45.5414341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475ce7a869728075%3A0x5b8c725621a41136!2sOsijek!5e0!3m2!1sen!2shr!4v1715000000000!5m2!1sen!2shr",
                  style: {
                    width: "100%",
                    height: "100%",
                    border: "0",
                    borderRadius: "12px",
                  },
                  allowFullScreen: true,
                  loading: "lazy",
                  referrerPolicy: "no-referrer-when-downgrade",
                })
              ) : (
                <Text style={styles.mapText}>
                  Karta je dostupna samo u web pregledu.
                </Text>
              )}
            </View>
          </View>
        </View>
      );
    default:
      return null;
  }

  return (
    <View style={styles.mainContent}>
      <View style={styles.contentBox}>
        <Text style={styles.contentTitle}>{title}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {dataToRender.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => setSelectedItem(item)}
            >
              {item.slika && (
                <Image source={item.slika} style={styles.cardImage} />
              )}
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.naziv}</Text>
                {item.vrijeme && (
                  <Text style={styles.cardSubtitle}>{item.vrijeme}</Text>
                )}
                <Text numberOfLines={3} style={styles.cardDescription}>
                  {item.opis}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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

              <View style={styles.galleryContainer}>
                {selectedItem?.galerija
                  ? selectedItem.galerija.map((img: any, index: number) => (
                      <Image
                        key={index}
                        source={img}
                        style={styles.galleryImage}
                      />
                    ))
                  : selectedItem?.slika && (
                      <Image
                        source={selectedItem.slika}
                        style={styles.fullImage}
                      />
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
                      ? "Skeniraj za dodatne info"
                      : "Scan for more info"}
                  </Text>
                </View>
                {selectedItem?.qrLink ? (
                  <View style={styles.qrCodeWrapper}>
                    <QRCode
                      value={selectedItem.qrLink}
                      size={100}
                      color="#0A2540"
                      backgroundColor="#FFF"
                    />
                  </View>
                ) : (
                  <View style={styles.qrPlaceholder}>
                    <Text style={{ fontSize: 30 }}>🔗</Text>
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                      NEMA LINKA
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    padding: 32,
  },
  contentBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  contentTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0A2540",
    marginBottom: 24,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderLeftColor: "#00D4B2",
  },
  cardImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginRight: 24,
    backgroundColor: "#E2E8F0",
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0A2540",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00D4B2",
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 18,
    color: "#4A5568",
    lineHeight: 28,
  },
  cardInfo: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "#2B6CB0",
  },
  mapContainer: {
    flex: 1,
    width: "100%",
    minHeight: 400,
    backgroundColor: "#E2E8F0",
    borderRadius: 12,
    overflow: "hidden",
  },
  mapText: {
    color: "#4A5568",
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(10, 37, 64, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  modalContent: {
    width: "90%",
    height: "90%",
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 40,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "#F1F5F9",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: { fontSize: 24, fontWeight: "bold", color: "#0A2540" },
  modalScroll: { alignItems: "center" },
  modalTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#0A2540",
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
    color: "#4A5568",
    lineHeight: 34,
    textAlign: "center",
    maxWidth: 800,
  },

  qrSection: {
    marginTop: 50,
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  qrTextContent: { marginRight: 30 },
  qrTitle: { fontSize: 24, fontWeight: "bold", color: "#0A2540" },
  qrSub: { fontSize: 16, color: "#64748B" },
  qrPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#FFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0A2540",
  },
  qrCodeWrapper: { padding: 10, backgroundColor: "#FFF", borderRadius: 8 },
});
