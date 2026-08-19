import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import NewsTicker from "../widgets/NewsTicker";

type ThemeColors = {
  cardBackground: string;
  border: string;
  textPrimary: string;
  accent: string;
  background: string;
  textSecondary: string;
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
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 1600;

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
        style={[
          styles.overlay,
          {
            backgroundColor: colors.background + "99",
            paddingTop: isLargeScreen ? 200 : 180,
          },
        ]}
      >
        <View
          style={[
            styles.grid,
            {
              gap: isLargeScreen ? 35 : 24,
              maxWidth: isLargeScreen ? 1400 : 1000,
            },
          ]}
        >
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.accent,
                  maxWidth: isLargeScreen ? 320 : 240,
                  borderRadius: isLargeScreen ? 30 : 24,
                  padding: isLargeScreen ? 28 : 20,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => onNavigate(item.id)}
            >
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color: colors.textPrimary,
                    fontSize: isLargeScreen ? 30 : 24,
                  },
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={[
            styles.tickerContainer,
            {
              maxWidth: isLargeScreen ? 1400 : 1000,
              marginTop: isLargeScreen ? 50 : 30,
            },
          ]}
        >
          <NewsTicker language={language} colors={colors} />
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
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  tickerContainer: {
    width: "100%",
  },
  card: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
