import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";

import { osijekData } from "../data/osijekData";

type KioskItem = {
  id: string;
  naziv: string;
  opis: string;
  slika?: string;
  vrijeme?: string;
  info?: string;
};

export default function App() {
  const [activeTab, setActiveTab] = useState("turizam");
  const [language, setLanguage] = useState("HR");

  const renderContent = () => {
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
          <View style={styles.contentBox}>
            <Text style={styles.contentTitle}>🗺️ Karta grada</Text>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapText}>
                Ovdje ćemo kasnije ubaciti sliku karte s pinovima.
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }

    return (
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
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />

      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>GRAD OSIJEK</Text>
          <Text style={styles.logoSubtext}>Info Panel</Text>
        </View>

        <View style={styles.menuItems}>
          <TouchableOpacity
            style={[
              styles.menuButton,
              activeTab === "turizam" && styles.menuButtonActive,
            ]}
            onPress={() => setActiveTab("turizam")}
          >
            <Text
              style={[
                styles.menuButtonText,
                activeTab === "turizam" && styles.menuButtonTextActive,
              ]}
            >
              Turizam
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuButton,
              activeTab === "dogadjanja" && styles.menuButtonActive,
            ]}
            onPress={() => setActiveTab("dogadjanja")}
          >
            <Text
              style={[
                styles.menuButtonText,
                activeTab === "dogadjanja" && styles.menuButtonTextActive,
              ]}
            >
              Događanja
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuButton,
              activeTab === "usluge" && styles.menuButtonActive,
            ]}
            onPress={() => setActiveTab("usluge")}
          >
            <Text
              style={[
                styles.menuButtonText,
                activeTab === "usluge" && styles.menuButtonTextActive,
              ]}
            >
              Usluge
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuButton,
              activeTab === "karta" && styles.menuButtonActive,
            ]}
            onPress={() => setActiveTab("karta")}
          >
            <Text
              style={[
                styles.menuButtonText,
                activeTab === "karta" && styles.menuButtonTextActive,
              ]}
            >
              Karta
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.langContainer}>
          <TouchableOpacity
            style={[
              styles.langButton,
              language === "HR" && styles.langButtonActive,
            ]}
            onPress={() => setLanguage("HR")}
          >
            <Text
              style={[
                styles.langText,
                language === "HR" && styles.langTextActive,
              ]}
            >
              HR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.langButton,
              language === "EN" && styles.langButtonActive,
            ]}
            onPress={() => setLanguage("EN")}
          >
            <Text
              style={[
                styles.langText,
                language === "EN" && styles.langTextActive,
              ]}
            >
              EN
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainContent}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F4F6F8",
  },
  sidebar: {
    width: "25%",
    backgroundColor: "#0A2540",
    padding: 24,
    justifyContent: "space-between",
  },
  logoContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  logoSubtext: {
    color: "#00D4B2",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },
  menuItems: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  menuButton: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  menuButtonActive: {
    backgroundColor: "#00D4B2",
  },
  menuButtonText: {
    color: "#A0AEC0",
    fontSize: 22,
    fontWeight: "600",
  },
  menuButtonTextActive: {
    color: "#0A2540",
    fontWeight: "bold",
  },
  langContainer: {
    flexDirection: "row",
    gap: 12,
  },
  langButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#A0AEC0",
    alignItems: "center",
  },
  langButtonActive: {
    backgroundColor: "#00D4B2",
    borderColor: "#00D4B2",
  },
  langText: {
    color: "#A0AEC0",
    fontWeight: "bold",
    fontSize: 18,
  },
  langTextActive: {
    color: "#0A2540",
  },
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
