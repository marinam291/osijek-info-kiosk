import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";

type ThemeColors = {
  cardBackground: string;
  border: string;
  textPrimary: string;
  accent: string;
  background: string;
};

type HomeViewProps = {
  language: string;
  colors: ThemeColors;
  onNavigate: (tab: string) => void;
};

const screenWidth = Dimensions.get("window").width;
const isLargeScreen = screenWidth > 1600;

export default function HomeView({
  language,
  colors,
  onNavigate,
}: HomeViewProps) {
  const isHR = language === "HR";

  const menuItems = [
    {
      id: "turizam",
      title: isHR ? "Turizam i znamenitosti" : "Tourism & Landmarks",
    },
    { id: "dogadjanja", title: isHR ? "Događanja" : "Events" },
    {
      id: "usluge",
      title: isHR ? "Važne usluge i imenik" : "Important Services & Directory",
    },
    { id: "karta", title: isHR ? "Karta grada" : "City Map" },
    {
      id: "gradonacelnik",
      title: isHR ? "Kontaktirajte gradonačelnika" : "Contact the Mayor",
    },
  ];

  return (
    <ImageBackground
      source={require("../../../assets/images/pocetna.png")}
      style={styles.background}
    >
      <View
        style={[styles.overlay, { backgroundColor: colors.background + "99" }]}
      >
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.accent,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => onNavigate(item.id)}
            >
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    paddingTop: isLargeScreen ? 140 : 120,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: isLargeScreen ? 35 : 24,
    width: "100%",
    maxWidth: isLargeScreen ? 1400 : 1000,
  },
  card: {
    flex: 1,
    maxWidth: isLargeScreen ? 320 : 240,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: isLargeScreen ? 30 : 24,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    padding: isLargeScreen ? 28 : 20,
  },
  cardTitle: {
    fontSize: isLargeScreen ? 30 : 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
