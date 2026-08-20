import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ServiceFilters from "../common/ServiceFilters";
import EmergencyBox from "../widgets/EmergencyBox";
import GridCard from "../common/GridCard";
import TaxiDirectory, { TaxiService } from "../widgets/TaxiDirectory";
import GppScheduleWidget from "../widgets/GppScheduleWidget";
import { ContentItem } from "./ContentArea";
import { ThemeColors } from "@/context/ThemeContext";
import { getOsijekData } from "@/data/osijekData";
import FadeInView from "../common/FadeInView";

type GppLine = {
  id: string;
  naziv: string;
  vrsta: string;
  polasci?: string[];
};

const getServiceCategories = (isHR: boolean) => [
  { key: "sve", label: isHR ? "Sve usluge" : "All Services" },
  { key: "zdravstvo", label: isHR ? "Zdravstvo" : "Healthcare" },
  { key: "prijevoz", label: isHR ? "Prijevoz" : "Transport" },
  { key: "gradskeUsluge", label: isHR ? "Gradske usluge" : "City Services" },
  { key: "smjestaj", label: isHR ? "Smještaj" : "Accommodation" },
  { key: "trgovine", label: isHR ? "Trgovine i šoping" : "Shopping" },
];

const getTransportCategories = (isHR: boolean) => [
  { key: "sve", label: isHR ? "Svi prijevozi" : "All Transport" },
  { key: "javni", label: isHR ? "Javni prijevoz" : "Public Transport" },
  { key: "taksi", label: isHR ? "Taksi" : "Taxi" },
];

const getAccommodationCategories = (isHR: boolean) => [
  { key: "sve", label: isHR ? "Svi smještaji" : "All" },
  { key: "hoteli", label: isHR ? "Hoteli" : "Hotels" },
  { key: "apartmani", label: isHR ? "Apartmani" : "Apartments" },
  { key: "hosteli", label: isHR ? "Hosteli" : "Hostels" },
];

type ServicesViewProps = {
  currentData: ReturnType<typeof getOsijekData>;
  language: string;
  colors: ThemeColors;
  onItemPress: (item: ContentItem) => void;
};

export default function ServicesView({
  currentData,
  language,
  colors,
  onItemPress,
}: ServicesViewProps) {
  const isHR = language === "HR";
  const [serviceCategory, setServiceCategory] = useState<string>("sve");
  const [accommodationSubCategory, setAccommodationSubCategory] =
    useState<string>("sve");
  const [transportSubCategory, setTransportSubCategory] =
    useState<string>("sve");

  let dataToRender: ContentItem[] = [];
  let taxiData: TaxiService[] = [];
  let isTaxiView = false;
  let isJavniPrijevozView = false;

  if (serviceCategory === "zdravstvo") {
    dataToRender = currentData.usluge.zdravstvo;
  } else if (serviceCategory === "prijevoz") {
    if (transportSubCategory === "taksi") {
      isTaxiView = true;
      taxiData = currentData.usluge.taksi || [];
    } else if (transportSubCategory === "javni") {
      isJavniPrijevozView = true;
      dataToRender = currentData.usluge.prijevoz.filter((p) => p.id === "u_p1");
    } else {
      dataToRender = currentData.usluge.prijevoz;
      isTaxiView = true;
      taxiData = currentData.usluge.taksi || [];
    }
  } else if (serviceCategory === "gradskeUsluge") {
    dataToRender = currentData.usluge.gradskeUsluge;
  } else if (serviceCategory === "smjestaj") {
    if (accommodationSubCategory === "hoteli") {
      dataToRender = currentData.smjestaj.hoteli;
    } else if (accommodationSubCategory === "apartmani") {
      dataToRender = currentData.smjestaj.apartmani;
    } else if (accommodationSubCategory === "hosteli") {
      dataToRender = currentData.smjestaj.hosteli;
    } else {
      dataToRender = [
        ...(currentData.smjestaj.hoteli || []),
        ...(currentData.smjestaj.apartmani || []),
        ...(currentData.smjestaj.hosteli || []),
      ];
    }
  } else if (serviceCategory === "trgovine") {
    dataToRender = currentData.trgovine || [];
  } else {
    dataToRender = [
      ...(currentData.usluge.zdravstvo || []),
      ...(currentData.usluge.prijevoz || []),
      ...(currentData.usluge.gradskeUsluge || []),
    ];
  }

  const gppItem = currentData.usluge.prijevoz.find((p) => p.id === "u_p1");
  const gppLinije = (gppItem as { linije?: GppLine[] })?.linije || [];

  return (
    <View style={styles.container}>
      <ServiceFilters
        items={getServiceCategories(isHR)}
        activeKey={serviceCategory}
        onSelect={(key) => {
          setServiceCategory(key);
          setAccommodationSubCategory("sve");
          setTransportSubCategory("sve");
        }}
        colors={colors}
      />

      {serviceCategory === "prijevoz" && (
        <ServiceFilters
          items={getTransportCategories(isHR)}
          activeKey={transportSubCategory}
          onSelect={setTransportSubCategory}
          colors={colors}
          isSubFilter={true}
        />
      )}
      {serviceCategory === "smjestaj" && (
        <ServiceFilters
          items={getAccommodationCategories(isHR)}
          activeKey={accommodationSubCategory}
          onSelect={setAccommodationSubCategory}
          colors={colors}
          isSubFilter={true}
        />
      )}

      {serviceCategory === "sve" && (
        <EmergencyBox language={language} colors={colors} />
      )}

      <FadeInView
        triggerKey={`${serviceCategory}-${transportSubCategory}-${accommodationSubCategory}`}
      >
        {dataToRender.length > 0 && (
          <View style={styles.gridContainer}>
            {dataToRender.map((item) => (
              <GridCard
                key={item.id}
                item={item}
                colors={colors}
                onPress={onItemPress}
              />
            ))}
          </View>
        )}

        {isJavniPrijevozView && gppLinije.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <GppScheduleWidget
              linije={gppLinije}
              language={language}
              colors={colors}
            />
          </View>
        )}

        {isTaxiView && (
          <View style={{ marginTop: dataToRender.length > 0 ? 40 : 0 }}>
            {dataToRender.length > 0 && (
              <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
                {isHR ? "Taksi službe" : "Taxi Services"}
              </Text>
            )}
            <TaxiDirectory
              items={taxiData}
              colors={colors}
              onItemPress={(item) =>
                onItemPress({
                  id: item.id,
                  naziv: item.naziv,
                  opis: item.opis,
                  info: item.telefon,
                  qrLink: item.qrLink,
                } as ContentItem)
              }
            />
          </View>
        )}
      </FadeInView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 20 },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 20,
  },
  subTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
