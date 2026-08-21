import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  ImageSourcePropType,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import MapTab from "../views/MapTab";
import ItemModal from "../common/ItemModal";
import FadeInView from "../common/FadeInView";
import GridCard from "../common/GridCard";
import HomeView from "../views/HomeView";
import ServicesView from "../views/ServicesView";
import ServiceFilters from "../common/ServiceFilters";
import MayorContactWidget from "../widgets/MayorContactWidget";
import EventsView from "../views/EventsView";

export type GppDepartureType = {
  id: number;
  departureTime: string;
};

export type GppLineType = {
  id: string;
  naziv: string;
  vrsta: string;
  GppDepartures?: GppDepartureType[];
};

export type ContentItem = {
  id: string | number;
  categoryKey?: string;
  subCategory?: string;
  nazivHr?: string;
  nazivEn?: string;
  naziv?: string;
  opisHr?: string;
  opisEn?: string;
  opis?: string;
  infoHr?: string;
  infoEn?: string;
  info?: string;
  vrijemeHr?: string;
  vrijemeEn?: string;
  vrijeme?: string;
  datum?: string;
  slika?: ImageSourcePropType;
  ItemGalleries?: { imagePath: string }[];
  qrLink?: string;
  GppLines?: GppLineType[];
};

export type ServicesDataStructure = {
  usluge: {
    zdravstvo: ContentItem[];
    prijevoz: ContentItem[];
    taksi: ContentItem[];
    gradskeUsluge: ContentItem[];
  };
  smjestaj: {
    hoteli: ContentItem[];
    apartmani: ContentItem[];
    hosteli: ContentItem[];
  };
  trgovine: ContentItem[];
};

type ContentProps = {
  activeTab: string;
  language: string;
  onNavigate: (tab: string) => void;
};

const TAB_TITLES: Record<string, { HR: string; EN: string }> = {
  turizam: { HR: "Turizam i znamenitosti", EN: "Tourism & Landmarks" },
  dogadjanja: { HR: "Događanja", EN: "Events" },
  usluge: { HR: "Važne usluge i imenik", EN: "Important Services & Directory" },
  gradonacelnik: {
    HR: "Kontaktirajte gradonačelnika",
    EN: "Contact the Mayor",
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

  const [allItems, setAllItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [fullScreenImage, setFullScreenImage] =
    useState<ImageSourcePropType | null>(null);

  const [tourismCategory, setTourismCategory] = useState<string>("sve");
  const [prevActiveTab, setPrevActiveTab] = useState<string>(activeTab);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json() as Promise<ContentItem[]>)
      .then((data) => {
        setAllItems(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (activeTab !== prevActiveTab) {
    setPrevActiveTab(activeTab);
    if (tourismCategory !== "sve") setTourismCategory("sve");
    setSelectedItem(null);
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

  if (loading) {
    return (
      <View
        style={[
          styles.backgroundImage,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  const title = TAB_TITLES[activeTab]?.[language as "HR" | "EN"] || "";
  const isHR = language === "HR";

  let standardData: ContentItem[] = [];

  const formattedItems: ContentItem[] = allItems.map((item) => ({
    ...item,
    naziv: isHR ? item.nazivHr : item.nazivEn,
    opis: isHR ? item.opisHr : item.opisEn,
    vrijeme: isHR ? item.vrijemeHr : item.vrijemeEn,
    info: isHR ? item.infoHr : item.infoEn,
  }));

  if (activeTab === "turizam") {
    const landmarks = formattedItems.filter((i) => i.categoryKey === "turizam");
    const museums = formattedItems.filter((i) => i.categoryKey === "muzeji");
    if (tourismCategory === "znamenitosti") standardData = landmarks;
    else if (tourismCategory === "muzeji") standardData = museums;
    else standardData = [...landmarks, ...museums];
  } else if (activeTab === "dogadjanja") {
    standardData = formattedItems.filter((i) => i.categoryKey === "dogadjanja");
  }

  const currentDataForServices: ServicesDataStructure = {
    usluge: {
      zdravstvo: formattedItems.filter((i) => i.subCategory === "zdravstvo"),
      prijevoz: formattedItems.filter((i) => i.subCategory === "prijevoz"),
      taksi: formattedItems.filter((i) => i.subCategory === "taksi"),
      gradskeUsluge: formattedItems.filter(
        (i) => i.subCategory === "gradskeUsluge",
      ),
    },
    smjestaj: {
      hoteli: formattedItems.filter((i) => i.subCategory === "hoteli"),
      apartmani: formattedItems.filter((i) => i.subCategory === "apartmani"),
      hosteli: formattedItems.filter((i) => i.subCategory === "hosteli"),
    },
    trgovine: formattedItems.filter((i) => i.categoryKey === "trgovine"),
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/pocetna.png")}
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
          {activeTab === "dogadjanja" ? (
            <EventsView
              title={title}
              standardData={standardData}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              colors={colors}
              language={language}
            />
          ) : activeTab === "gradonacelnik" ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={[styles.sectionTitle, { color: colors.textPrimary }]}
              >
                {title}
              </Text>
              <MayorContactWidget colors={colors} language={language} />
            </ScrollView>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={[styles.sectionTitle, { color: colors.textPrimary }]}
              >
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
                  currentData={currentDataForServices}
                  language={language}
                  colors={colors}
                  onItemPress={setSelectedItem}
                />
              ) : (
                <View style={styles.gridContainer}>
                  {standardData.map((item) => (
                    <GridCard
                      key={String(item.id)}
                      item={item}
                      colors={colors}
                      onPress={setSelectedItem}
                    />
                  ))}
                </View>
              )}
            </ScrollView>
          )}
        </FadeInView>

        <ItemModal
          selectedItem={activeTab === "dogadjanja" ? null : selectedItem}
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
