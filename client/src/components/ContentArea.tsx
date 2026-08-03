import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { osijekData } from "../data/osijekData";

type ContentProps = {
  activeTab: string;
};

type KioskItem = {
  id: string;
  naziv: string;
  opis: string;
  slika?: string;
  vrijeme?: string;
  info?: string;
};

export default function ContentArea({ activeTab }: ContentProps) {
  let dataToRender: KioskItem[] = [];
  let title = "";

  switch (activeTab) {
    case "turizam":
      dataToRender = osijekData.turizam;
      title = "Turizam i znamenitosti";
      break;
    case "dogadjanja":
      dataToRender = osijekData.dogadjanja;
      title = "Događanja u Osijeku";
      break;
    case "usluge":
      dataToRender = osijekData.usluge;
      title = "Usluge & Prijevoz";
      break;
    case "karta":
      return (
        <View style={styles.mainContent}>
          <View style={styles.contentBox}>
            <Text style={styles.contentTitle}>Karta grada</Text>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapText}>
                Ovdje ćemo kasnije ubaciti sliku karte s pinovima.
              </Text>
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
    width: "75%",
    padding: 36,
  },
  contentBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 36,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  contentTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0A2540",
    marginBottom: 30,
  },
  scrollContainer: {
    paddingBottom: 40,
    gap: 24,
  },
  card: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0A2540",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 18,
    color: "#00D4B2",
    fontWeight: "bold",
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 20,
    color: "#4A5568",
    lineHeight: 32,
  },
  cardInfo: {
    fontSize: 18,
    color: "#718096",
    fontWeight: "600",
    marginTop: 16,
    fontStyle: "italic",
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#E2E8F0",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  mapText: {
    fontSize: 20,
    color: "#718096",
  },
});
