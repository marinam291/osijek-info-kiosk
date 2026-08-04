import React, { createElement } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { getOsijekData } from "../data/osijekData";

type ContentProps = {
  activeTab: string;
  language: string;
};

type KioskItem = {
  id: string;
  naziv: string;
  opis: string;
  slika?: any;
  vrijeme?: string;
  info?: string;
};

export default function ContentArea({ activeTab, language }: ContentProps) {
  const currentData = getOsijekData(language);
  let dataToRender: KioskItem[] = [];
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {dataToRender.map((item) => (
            <View key={item.id} style={styles.card}>
              {item.slika && (
                <Image source={item.slika} style={styles.cardImage} />
              )}

              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.naziv}</Text>
                {item.vrijeme && (
                  <Text style={styles.cardSubtitle}>{item.vrijeme}</Text>
                )}
                <Text style={styles.cardDescription}>{item.opis}</Text>
                {item.info && <Text style={styles.cardInfo}>{item.info}</Text>}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
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
});
