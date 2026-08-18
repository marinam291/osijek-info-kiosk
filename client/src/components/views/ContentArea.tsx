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
import MapTab from "../views/MapTab";
import ItemModal from "../common/ItemModal";
import FadeInView from "../common/FadeInView";
import GridCard from "../common/GridCard";
import HomeView from "../views/HomeView";
import ServicesView from "../views/ServicesView";
import ServiceFilters from "../common/ServiceFilters";
import CalendarWidget from "../widgets/CalendarWidget";

export type ContentItem = {
  id: string | number;
  naziv?: string;
  opis?: string;
  info?: string;
  slika?: ImageSourcePropType;
  galerija?: ImageSourcePropType[];
  qrLink?: string;
  vrijeme?: string;
  datum?: string;
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
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.sectionTitle, { color: colors.textPrimary }]}
              >
                {title}
              </Text>

              <View style={styles.calendarWrapper}>
                <ScrollView
                  style={styles.calendarLeft}
                  showsVerticalScrollIndicator={false}
                >
                  <CalendarWidget
                    events={standardData.filter(
                      (item): item is ContentItem & { datum: string } =>
                        !!item.datum,
                    )}
                    colors={colors}
                    language={language}
                    onEventPress={setSelectedItem}
                  />
                </ScrollView>

                <ScrollView
                  style={[
                    styles.calendarRight,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                  contentContainerStyle={styles.calendarRightContent}
                  showsVerticalScrollIndicator={false}
                >
                  <Text
                    style={[styles.detailsTitle, { color: colors.textPrimary }]}
                  >
                    {isHR ? "Detalji događaja" : "Event Details"}
                  </Text>
                  {selectedItem ? (
                    <View style={styles.detailsContent}>
                      <Text
                        style={[
                          styles.detailsItemTitle,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {selectedItem.naziv}
                      </Text>
                      {selectedItem.datum && (
                        <Text
                          style={[
                            styles.detailsItemSub,
                            { color: colors.accent },
                          ]}
                        >
                          {isHR ? "Datum: " : "Date: "} {selectedItem.datum}
                        </Text>
                      )}
                      {selectedItem.opis && (
                        <Text
                          style={[
                            styles.detailsItemDescription,
                            { color: colors.textSecondary },
                          ]}
                        >
                          {selectedItem.opis}
                        </Text>
                      )}
                      {selectedItem.info && (
                        <Text
                          style={[
                            styles.detailsItemInfo,
                            { color: colors.textSecondary },
                          ]}
                        >
                          {selectedItem.info}
                        </Text>
                      )}
                    </View>
                  ) : (
                    <Text
                      style={[
                        styles.detailsPlaceholder,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {isHR
                        ? "Odaberite događaj iz kalendara za prikaz informacija."
                        : "Select an event from the calendar to view information."}
                    </Text>
                  )}
                </ScrollView>
              </View>
            </View>
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
  calendarWrapper: {
    flex: 1,
    flexDirection: "row",
    gap: 30,
    marginTop: 10,
  },
  calendarLeft: {
    flex: 0.65,
  },
  calendarRight: {
    flex: 0.35,
    borderRadius: 20,
    borderWidth: 1,
  },
  calendarRightContent: {
    padding: 24,
    justifyContent: "flex-start",
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  detailsContent: {
    marginTop: 10,
  },
  detailsItemTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailsItemSub: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  detailsItemDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  detailsItemInfo: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
  detailsPlaceholder: {
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 20,
  },
});
