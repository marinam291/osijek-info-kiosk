import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ServiceFilters from "../common/ServiceFilters";
import EmergencyBox from "../widgets/EmergencyBox";
import GridCard from "../common/GridCard";
import TaxiDirectory, { TaxiService } from "../widgets/TaxiDirectory";
import { ContentItem, ServicesDataStructure } from "./ContentArea";
import { ThemeColors } from "@/context/ThemeContext";
import FadeInView from "../common/FadeInView";
import {
  getAccommodationCategories,
  getServiceCategories,
  getTransportCategories,
} from "../../config/serviceCategories";

type ServicesViewProps = {
  currentData: ServicesDataStructure;
  language: string;
  colors: ThemeColors;
  onItemPress: (item: ContentItem) => void;
};

function mapTaxiServices(items: ContentItem[], isHR: boolean): TaxiService[] {
  return items.map((item) => ({
    id: String(item.id),
    naziv: isHR ? item.nazivHr || "" : item.nazivEn || "",
    telefon: isHR ? item.infoHr || "" : item.infoEn || "",
    opis: isHR ? item.opisHr || "" : item.opisEn || "",
    qrLink: item.qrLink,
  }));
}

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
  const resultsScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      resultsScrollRef.current?.scrollTo({ y: 0, animated: false });
    });
  }, [serviceCategory, accommodationSubCategory, transportSubCategory]);

  let dataToRender: ContentItem[] = [];
  let taxiData: TaxiService[] = [];
  let isTaxiView = false;

  const usluge = currentData?.usluge || {
    zdravstvo: [],
    prijevoz: [],
    taksi: [],
    gradskeUsluge: [],
  };
  const smjestaj = currentData?.smjestaj || {
    hoteli: [],
    apartmani: [],
    hosteli: [],
  };
  const trgovine = currentData?.trgovine || [];

  if (serviceCategory === "zdravstvo") {
    dataToRender = usluge.zdravstvo;
  } else if (serviceCategory === "prijevoz") {
    if (transportSubCategory === "taksi") {
      isTaxiView = true;
      taxiData = mapTaxiServices(usluge.taksi || [], isHR);
    } else if (transportSubCategory === "javni") {
      dataToRender = usluge.prijevoz.filter((p) => p.id === "u_p1");
    } else {
      dataToRender = usluge.prijevoz;
      isTaxiView = true;
      taxiData = mapTaxiServices(usluge.taksi || [], isHR);
    }
  } else if (serviceCategory === "gradskeUsluge") {
    dataToRender = usluge.gradskeUsluge;
  } else if (serviceCategory === "smjestaj") {
    if (accommodationSubCategory === "hoteli") {
      dataToRender = smjestaj.hoteli;
    } else if (accommodationSubCategory === "apartmani") {
      dataToRender = smjestaj.apartmani;
    } else if (accommodationSubCategory === "hosteli") {
      dataToRender = smjestaj.hosteli;
    } else {
      dataToRender = [
        ...(smjestaj.hoteli || []),
        ...(smjestaj.apartmani || []),
        ...(smjestaj.hosteli || []),
      ];
    }
  } else if (serviceCategory === "trgovine") {
    dataToRender = trgovine;
  } else {
    dataToRender = [
      ...(usluge.zdravstvo || []),
      ...(usluge.prijevoz || []),
      ...(usluge.gradskeUsluge || []),
    ];
  }

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

      <ScrollView
        ref={resultsScrollRef}
        style={styles.resultsScroll}
        showsVerticalScrollIndicator={false}
      >
        <FadeInView
          triggerKey={`${serviceCategory}-${transportSubCategory}-${accommodationSubCategory}`}
        >
          {dataToRender.length > 0 && (
            <View style={styles.gridContainer}>
              {dataToRender.map((item) => (
                <GridCard
                  key={String(item.id)}
                  item={{
                    ...item,
                    naziv: isHR ? item.nazivHr : item.nazivEn,
                    opis: isHR ? item.opisHr : item.opisEn,
                    info: isHR ? item.infoHr : item.infoEn,
                  }}
                  colors={colors}
                  onPress={onItemPress}
                />
              ))}
            </View>
          )}

          {isTaxiView && (
            <View style={{ marginTop: dataToRender.length > 0 ? 40 : 0 }}>
              {dataToRender.length > 0 && (
                <Text
                  style={[styles.subTitle, { color: colors.textSecondary }]}
                >
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 20 },
  resultsScroll: { flex: 1 },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 20,
  },
  subTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
