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
  },
  grid: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    width: "100%",
    marginTop: 120,
  },
  card: {
    flex: 1,
    maxWidth: 240,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    padding: 20,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
});
