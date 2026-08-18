import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { getOsijekData } from "../data/osijekData";
import { useTheme } from "../context/ThemeContext";
import MapTab from "./MapTab";
import ItemModal from "./ItemModal";
import FadeInView from "./FadeInView";
import HeroCard from "./HeroCard";
import GridCard from "./GridCard";
import HomeView from "./HomeView";
import ServicesView from "./ServicesView";

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
  onNavigate: (tab: string) => void;
};

const tabTitles: Record<string, { HR: string; EN: string }> = {
  turizam: { HR: "Turizam i znamenitosti", EN: "Tourism & Landmarks" },
  dogadjanja: { HR: "Događanja", EN: "Events" },
  usluge: {
    HR: "Važne usluge i imenik",
    EN: "Important Services & Directory",
  },
};

export default function ContentArea({
  activeTab,
  language,
  onNavigate,
}: ContentProps) {
  const { colors } = useTheme();
  const currentData = getOsijekData(language);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [fullScreenImage, setFullScreenImage] =
    useState<ImageSourcePropType | null>(null);

  if (activeTab === "pocetna") {
    return (
      <FadeInView triggerKey={`${activeTab}-${language}`}>
        <HomeView language={language} colors={colors} onNavigate={onNavigate} />
      </FadeInView>
    );
  }

  if (activeTab === "karta") {
    return (
      <FadeInView triggerKey={`${activeTab}-${language}`}>
        <MapTab language={language} colors={colors} />
      </FadeInView>
    );
  }

  const title = tabTitles[activeTab]?.[language as "HR" | "EN"] || "";
  const isStandardTab = activeTab === "turizam" || activeTab === "dogadjanja";
  const standardData = isStandardTab
    ? (currentData[activeTab as keyof typeof currentData] as ContentItem[])
    : [];
  const heroItem = standardData.length > 0 ? standardData[0] : null;
  const listItems = standardData.length > 1 ? standardData.slice(1) : [];

  return (
    <View style={[styles.mainContent, { backgroundColor: colors.background }]}>
      <FadeInView triggerKey={`${activeTab}-${language}`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {title}
          </Text>

          {activeTab === "usluge" ? (
            <ServicesView
              currentData={currentData}
              language={language}
              colors={colors}
              onItemPress={setSelectedItem}
            />
          ) : (
            <View>
              {heroItem && (
                <HeroCard
                  item={heroItem}
                  colors={colors}
                  onPress={setSelectedItem}
                />
              )}
              {heroItem && (
                <Text
                  style={[styles.subTitle, { color: colors.textSecondary }]}
                >
                  {language === "HR" ? "Ostalo u ponudi" : "More to explore"}
                </Text>
              )}
              <View style={styles.gridContainer}>
                {listItems.map((item) => (
                  <GridCard
                    key={item.id}
                    item={item}
                    colors={colors}
                    onPress={setSelectedItem}
                  />
                ))}
              </View>
            </View>
          )}
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
  mainContent: {
    flex: 1,
    paddingHorizontal: 40,
    paddingBottom: 40,
    paddingTop: 110,
  },
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
  gridContainer: { flexDirection: "row", flexWrap: "wrap", gap: 24 },
});
