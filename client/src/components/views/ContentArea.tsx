import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import { getOsijekData } from "../../data/osijekData";
import { useTheme } from "../../context/ThemeContext";
import MapTab from "./MapTab";
import ItemModal from "../common/ItemModal";
import FadeInView from "../common/FadeInView";
import GridCard from "../common/GridCard";
import HomeView from "./HomeView";
import ServicesView from "./ServicesView";
import ServiceFilters from "../common/ServiceFilters";

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

const TAB_TITLES: Record<string, { HR: string; EN: string }> = {
  turizam: { HR: "Turizam i znamenitosti", EN: "Tourism & Landmarks" },
  dogadjanja: { HR: "Događanja", EN: "Events" },
  usluge: {
    HR: "Važne usluge i imenik",
    EN: "Important Services & Directory",
  },
};

const getTourismCategories = (isHR: boolean) => [
  { key: "sve", label: isHR ? "Sve" : "All" },
  { key: "znamenitosti", label: isHR ? "Znamenitosti" : "Landmarks" },
  { key: "muzeji", label: isHR ? "Muzeji" : "Museums" },
];

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

  const [tourismCategory, setTourismCategory] = useState<string>("sve");
  const [prevActiveTab, setPrevActiveTab] = useState<string>(activeTab);

  if (activeTab !== prevActiveTab) {
    setPrevActiveTab(activeTab);
    if (tourismCategory !== "sve") {
      setTourismCategory("sve");
    }
  }

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

  const title = TAB_TITLES[activeTab]?.[language as "HR" | "EN"] || "";
  const isHR = language === "HR";

  let standardData: ContentItem[] = [];
  if (activeTab === "turizam") {
    const landmarks = currentData.turizam || [];
    const museums = currentData.muzeji || [];
    if (tourismCategory === "znamenitosti") {
      standardData = landmarks;
    } else if (tourismCategory === "muzeji") {
      standardData = museums;
    } else {
      standardData = [...landmarks, ...museums];
    }
  } else if (activeTab === "dogadjanja") {
    standardData = (currentData.dogadjanja as ContentItem[]) || [];
  }

  return (
    <ImageBackground
      source={require("../assets/pocetna.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View
        style={[
          styles.mainContent,
          { backgroundColor: colors.background + "E6" },
        ]}
      >
        <FadeInView triggerKey={`${activeTab}-${language}-${tourismCategory}`}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              {title}
            </Text>

            {activeTab === "turizam" && (
              <ServiceFilters
                items={getTourismCategories(isHR)}
                activeKey={tourismCategory}
                onSelect={setTourismCategory}
                colors={colors}
              />
            )}

            {activeTab === "usluge" ? (
              <ServicesView
                currentData={currentData}
                language={language}
                colors={colors}
                onItemPress={setSelectedItem}
              />
            ) : (
              <View style={styles.gridContainer}>
                {standardData.map((item) => (
                  <GridCard
                    key={item.id}
                    item={item}
                    colors={colors}
                    onPress={setSelectedItem}
                  />
                ))}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 10,
  },
});
