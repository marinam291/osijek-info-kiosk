import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import { getOsijekData } from "../data/osijekData";
import { useTheme } from "../context/ThemeContext";
import MapTab from "./MapTab";
import ItemModal from "./ItemModal";
import FadeInView from "./FadeInView";

export type ContentItem = {
  id: string | number;
  naziv?: string;
  opis?: string;
  info?: string;
  slika?: ImageSourcePropType;
  galerija?: ImageSourcePropType[];
  qrLink?: string;
  vrijeme?: string;
};

type ContentProps = {
  activeTab: string;
  language: string;
};

export default function ContentArea({ activeTab, language }: ContentProps) {
  const { colors } = useTheme();
  const currentData = getOsijekData(language);

  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [fullScreenImage, setFullScreenImage] =
    useState<ImageSourcePropType | null>(null);

  // Stanje za filtriranje usluga (sve, zdravstvo, prijevoz, gradskeUsluge)
  const [serviceCategory, setServiceCategory] = useState<string>("sve");

  if (activeTab === "karta") {
    return (
      <FadeInView triggerKey={`${activeTab}-${language}`}>
        <MapTab language={language} colors={colors} />
      </FadeInView>
    );
  }

  let dataToRender: ContentItem[] = [];
  let title = "";

  switch (activeTab) {
    case "turizam":
      dataToRender = currentData.turizam as ContentItem[];
      title =
        language === "HR" ? "Turizam i znamenitosti" : "Tourism & Landmarks";
      break;
    case "dogadjanja":
      dataToRender = currentData.dogadjanja as ContentItem[];
      title = language === "HR" ? "Događanja" : "Events";
      break;
    case "usluge":
      title =
        language === "HR"
          ? "Važne usluge i imenik"
          : "Important Services & Directory";
      if (serviceCategory === "zdravstvo") {
        dataToRender = currentData.usluge.zdravstvo as ContentItem[];
      } else if (serviceCategory === "prijevoz") {
        dataToRender = currentData.usluge.prijevoz as ContentItem[];
      } else if (serviceCategory === "gradskeUsluge") {
        dataToRender = currentData.usluge.gradskeUsluge as ContentItem[];
      } else {
        // "sve" - spajamo sve
        dataToRender = [
          ...(currentData.usluge.zdravstvo as ContentItem[]),
          ...(currentData.usluge.prijevoz as ContentItem[]),
          ...(currentData.usluge.gradskeUsluge as ContentItem[]),
        ];
      }
      break;
  }

  const heroItem = activeTab !== "usluge" ? dataToRender[0] : null;
  const listItems =
    activeTab !== "usluge" ? dataToRender.slice(1) : dataToRender;

  return (
    <View style={[styles.mainContent, { backgroundColor: colors.background }]}>
      <FadeInView triggerKey={`${activeTab}-${language}-${serviceCategory}`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {title}
          </Text>

          {/* Ako smo na kartici Usluge, prikazujemo gumbe za filtriranje kategorija */}
          {activeTab === "usluge" && (
            <View style={styles.filterContainer}>
              {[
                {
                  key: "sve",
                  label: language === "HR" ? "Sve usluge" : "All Services",
                },
                {
                  key: "zdravstvo",
                  label: language === "HR" ? "Zdravstvo" : "Healthcare",
                },
                {
                  key: "prijevoz",
                  label: language === "HR" ? "Prijevoz" : "Transport",
                },
                {
                  key: "gradskeUsluge",
                  label: language === "HR" ? "Gradske usluge" : "City Services",
                },
              ].map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor:
                        serviceCategory === cat.key
                          ? colors.accent
                          : colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => setServiceCategory(cat.key)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      {
                        color:
                          serviceCategory === cat.key
                            ? "#FFFFFF"
                            : colors.textPrimary,
                      },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Hitni brojevi - prilagođeni odabranom jeziku */}
          {activeTab === "usluge" && (
            <View
              style={[
                styles.emergencyBox,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.emergencyTitle, { color: colors.accent }]}>
                🚨 {language === "HR" ? "HITNI BROJEVI" : "EMERGENCY NUMBERS"}
              </Text>
              <View style={styles.emergencyGrid}>
                <Text
                  style={[styles.emergencyItem, { color: colors.textPrimary }]}
                >
                  {language === "HR" ? "Policija" : "Police"}:{" "}
                  <Text style={{ fontWeight: "bold" }}>192</Text>
                </Text>
                <Text
                  style={[styles.emergencyItem, { color: colors.textPrimary }]}
                >
                  {language === "HR" ? "Hitna pomoć" : "Ambulance"}:{" "}
                  <Text style={{ fontWeight: "bold" }}>194</Text>
                </Text>
                <Text
                  style={[styles.emergencyItem, { color: colors.textPrimary }]}
                >
                  {language === "HR" ? "Vatrogasci" : "Fire Department"}:{" "}
                  <Text style={{ fontWeight: "bold" }}>193</Text>
                </Text>
                <Text
                  style={[styles.emergencyItem, { color: colors.textPrimary }]}
                >
                  {language === "HR" ? "Žurni centar" : "Emergency Center"}:{" "}
                  <Text style={{ fontWeight: "bold" }}>112</Text>
                </Text>
              </View>
            </View>
          )}

          {heroItem && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedItem(heroItem)}
            >
              <ImageBackground
                source={heroItem.slika as ImageSourcePropType}
                style={styles.heroContainer}
                imageStyle={{ borderRadius: 20 }}
              >
                <View
                  style={[
                    styles.heroOverlay,
                    { backgroundColor: colors.background + "B3" },
                  ]}
                >
                  <Text
                    style={[styles.heroTitle, { color: colors.textPrimary }]}
                  >
                    {heroItem.naziv}
                  </Text>
                  {heroItem.vrijeme && (
                    <Text
                      style={[styles.heroSubtitle, { color: colors.accent }]}
                    >
                      {heroItem.vrijeme}
                    </Text>
                  )}
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.heroDescription,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {heroItem.opis}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}

          {heroItem && (
            <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
              {language === "HR" ? "Ostalo u ponudi" : "More to explore"}
            </Text>
          )}

          <View style={styles.gridContainer}>
            {listItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.gridCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setSelectedItem(item)}
              >
                {item.slika ? (
                  <Image source={item.slika} style={styles.gridImage} />
                ) : (
                  <View
                    style={[
                      styles.gridImage,
                      {
                        backgroundColor: colors.border,
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 40 }}>ℹ️</Text>
                  </View>
                )}
                <View style={styles.gridTextContainer}>
                  <Text
                    style={[styles.gridTitle, { color: colors.textPrimary }]}
                    numberOfLines={1}
                  >
                    {item.naziv}
                  </Text>
                  {item.vrijeme && (
                    <Text
                      style={[styles.gridSubtitle, { color: colors.accent }]}
                    >
                      {item.vrijeme}
                    </Text>
                  )}
                  {item.info && (
                    <Text style={[styles.gridInfo, { color: colors.accent }]}>
                      {item.info}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </FadeInView>

      <ItemModal
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        fullScreenImage={fullScreenImage}
        setFullScreenImage={setFullScreenImage}
        language={language}
        colors={colors}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: { flex: 1, padding: 40 },
  sectionTitle: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 24,
    letterSpacing: 1,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emergencyBox: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 30,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  emergencyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  emergencyItem: {
    fontSize: 16,
    width: "45%",
  },
  heroContainer: {
    width: "100%",
    height: 400,
    justifyContent: "flex-end",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  heroOverlay: {
    padding: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: { fontSize: 36, fontWeight: "bold", marginBottom: 8 },
  heroSubtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  heroDescription: { fontSize: 18, maxWidth: "80%" },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", gap: 24 },
  gridCard: {
    width: "31%",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  gridImage: { width: "100%", height: 180 },
  gridTextContainer: { padding: 16 },
  gridTitle: { fontSize: 20, fontWeight: "bold" },
  gridSubtitle: { fontSize: 14, marginTop: 4 },
  gridInfo: { fontSize: 14, marginTop: 4, fontWeight: "bold" },
});
