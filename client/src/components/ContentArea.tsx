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
import EmergencyBox from "./EmergencyBox";
import ServiceFilters from "./ServiceFilters";
import TaxiDirectory, { TaxiService } from "./TaxiDirectory";
import HeroCard from "./HeroCard";
import GridCard from "./GridCard";

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
  const [transportSubCategory, setTransportSubCategory] =
    useState<string>("sve");

  const [prevActiveTab, setPrevActiveTab] = useState<string>(activeTab);

  if (activeTab !== prevActiveTab) {
    setPrevActiveTab(activeTab);
    setServiceCategory("sve");
    setAccommodationSubCategory("sve");
    setTransportSubCategory("sve");
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
        if (transportSubCategory === "taksi") {
          isTaxiView = true;
          taxiData =
            (currentData.usluge as unknown as { taksi: TaxiService[] }).taksi ||
            [];
        } else if (transportSubCategory === "javni") {
          dataToRender = currentData.usluge.prijevoz as ContentItem[];
        } else {
          dataToRender = currentData.usluge.prijevoz as ContentItem[];
          isTaxiView = true;
          taxiData =
            (currentData.usluge as unknown as { taksi: TaxiService[] }).taksi ||
            [];
        }
      } else if (serviceCategory === "gradskeUsluge") {
        dataToRender = currentData.usluge.gradskeUsluge as ContentItem[];
      } else if (serviceCategory === "muzeji") {
        dataToRender = (
          "muzeji" in currentData
            ? (currentData as { muzeji: ContentItem[] }).muzeji
            : []
        ) as ContentItem[];
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
    { key: "muzeji", label: language === "HR" ? "Muzeji" : "Museums" },
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

  const transportCategories = [
    {
      key: "sve",
      label: language === "HR" ? "Svi prijevozi" : "All Transport",
    },
    {
      key: "javni",
      label: language === "HR" ? "Javni prijevoz" : "Public Transport",
    },
    { key: "taksi", label: language === "HR" ? "Taksi" : "Taxi" },
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
        triggerKey={`${activeTab}-${language}-${serviceCategory}-${accommodationSubCategory}-${transportSubCategory}`}
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
                setTransportSubCategory("sve");
              }}
              colors={colors}
            />
          )}

          {activeTab === "usluge" && serviceCategory === "prijevoz" && (
            <ServiceFilters
              items={transportCategories}
              activeKey={transportSubCategory}
              onSelect={setTransportSubCategory}
              colors={colors}
              isSubFilter={true}
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
            <HeroCard
              item={heroItem}
              colors={colors}
              onPress={setSelectedItem}
            />
          )}

          {heroItem && (
            <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
              {language === "HR" ? "Ostalo u ponudi" : "More to explore"}
            </Text>
          )}

          {listItems.length > 0 && (
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
          )}

          {isTaxiView && (
            <View style={{ marginTop: listItems.length > 0 ? 40 : 0 }}>
              {listItems.length > 0 && (
                <Text
                  style={[
                    styles.subTitle,
                    { color: colors.textSecondary, marginTop: 0 },
                  ]}
                >
                  {language === "HR" ? "Taksi službe" : "Taxi Services"}
                </Text>
              )}
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
  gridContainer: { flexDirection: "row", flexWrap: "wrap", gap: 24 },
});
