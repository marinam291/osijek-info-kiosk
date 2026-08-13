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
import EmergencyBox from "./EmergencyBox";
import ServiceFilters from "./ServiceFilters";
import TaxiDirectory, { TaxiService } from "./TaxiDirectory";

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

  const [serviceCategory, setServiceCategory] = useState<string>("sve");
  const [accommodationSubCategory, setAccommodationSubCategory] =
    useState<string>("sve");
  const [prevActiveTab, setPrevActiveTab] = useState<string>(activeTab);

  if (activeTab !== prevActiveTab) {
    setPrevActiveTab(activeTab);
    setServiceCategory("sve");
    setAccommodationSubCategory("sve");
  }

  if (activeTab === "karta") {
    return (
      <FadeInView triggerKey={`${activeTab}-${language}`}>
        <MapTab language={language} colors={colors} />
      </FadeInView>
    );
  }

  let dataToRender: ContentItem[] = [];
  let taxiData: TaxiService[] = [];
  let title = "";
  let isTaxiView = false;

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
      } else if (serviceCategory === "taksi") {
        isTaxiView = true;
        taxiData = currentData.usluge.taksi as unknown as TaxiService[];
      } else if (serviceCategory === "gradskeUsluge") {
        dataToRender = currentData.usluge.gradskeUsluge as ContentItem[];
      } else if (serviceCategory === "smjestaj") {
        if (accommodationSubCategory === "hoteli") {
          dataToRender = currentData.smjestaj.hoteli as ContentItem[];
        } else if (accommodationSubCategory === "apartmani") {
          dataToRender = currentData.smjestaj.apartmani as ContentItem[];
        } else if (accommodationSubCategory === "hosteli") {
          dataToRender = currentData.smjestaj.hosteli as ContentItem[];
        } else {
          dataToRender = [
            ...(currentData.smjestaj.hoteli as ContentItem[]),
            ...(currentData.smjestaj.apartmani as ContentItem[]),
            ...(currentData.smjestaj.hosteli as ContentItem[]),
          ];
        }
      } else if (serviceCategory === "trgovine") {
        dataToRender = (
          "trgovine" in currentData
            ? (currentData as { trgovine: ContentItem[] }).trgovine
            : []
        ) as ContentItem[];
      } else {
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

  const serviceCategories = [
    { key: "sve", label: language === "HR" ? "Sve usluge" : "All Services" },
    { key: "zdravstvo", label: language === "HR" ? "Zdravstvo" : "Healthcare" },
    { key: "prijevoz", label: language === "HR" ? "Prijevoz" : "Transport" },
    { key: "taksi", label: language === "HR" ? "Taksi" : "Taxi" },
    {
      key: "gradskeUsluge",
      label: language === "HR" ? "Gradske usluge" : "City Services",
    },
    {
      key: "smjestaj",
      label: language === "HR" ? "Smještaj" : "Accommodation",
    },
    {
      key: "trgovine",
      label: language === "HR" ? "Trgovine i šoping" : "Shopping",
    },
  ];

  const accommodationCategories = [
    { key: "sve", label: language === "HR" ? "Svi smještaji" : "All" },
    { key: "hoteli", label: language === "HR" ? "Hoteli" : "Hotels" },
    { key: "apartmani", label: language === "HR" ? "Apartmani" : "Apartments" },
    { key: "hosteli", label: language === "HR" ? "Hosteli" : "Hostels" },
  ];

  return (
    <View style={[styles.mainContent, { backgroundColor: colors.background }]}>
      <FadeInView
        triggerKey={`${activeTab}-${language}-${serviceCategory}-${accommodationSubCategory}`}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {title}
          </Text>

          {activeTab === "usluge" && (
            <ServiceFilters
              items={serviceCategories}
              activeKey={serviceCategory}
              onSelect={(key) => {
                setServiceCategory(key);
                setAccommodationSubCategory("sve");
              }}
              colors={colors}
            />
          )}

          {activeTab === "usluge" && serviceCategory === "smjestaj" && (
            <ServiceFilters
              items={accommodationCategories}
              activeKey={accommodationSubCategory}
              onSelect={setAccommodationSubCategory}
              colors={colors}
              isSubFilter={true}
            />
          )}

          {activeTab === "usluge" && serviceCategory === "sve" && (
            <EmergencyBox language={language} colors={colors} />
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

          {isTaxiView ? (
            <TaxiDirectory
              items={taxiData}
              colors={colors}
              onItemPress={(item) =>
                setSelectedItem({
                  id: item.id,
                  naziv: item.naziv,
                  opis: item.opis,
                  info: item.telefon,
                  qrLink: item.qrLink,
                })
              }
            />
          ) : (
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
                  {item.slika && (
                    <Image source={item.slika} style={styles.gridImage} />
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
  gridImage: { width: "100%", height: 180 },
  gridTextContainer: { padding: 16 },
  gridTitle: { fontSize: 20, fontWeight: "bold" },
  gridSubtitle: { fontSize: 14, marginTop: 4 },
  gridInfo: { fontSize: 14, marginTop: 4, fontWeight: "bold" },
});
