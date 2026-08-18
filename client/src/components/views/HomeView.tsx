import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
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
    paddingHorizontal: 30,
    paddingTop: 130,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "100%",
    maxWidth: 1200,
  },
  card: {
    width: 200,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    padding: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
