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
      dataToRender = currentData.usluge as ContentItem[];
      title = language === "HR" ? "Usluge i prijevoz" : "Services & Transport";
      break;
  }

  const heroItem = dataToRender[0];
  const listItems = dataToRender.slice(1);

  return (
    <View style={[styles.mainContent, { backgroundColor: colors.background }]}>
      <FadeInView triggerKey={`${activeTab}-${language}`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {title}
          </Text>

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

          <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
            {language === "HR" ? "Ostalo u ponudi" : "More to explore"}
          </Text>

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
                      { backgroundColor: colors.border },
                    ]}
                  />
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
  gridImage: { width: "100%", height: 200 },
  gridTextContainer: { padding: 16 },
  gridTitle: { fontSize: 20, fontWeight: "bold" },
  gridSubtitle: { fontSize: 14, marginTop: 4 },
});
