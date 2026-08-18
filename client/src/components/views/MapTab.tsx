import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "../../context/ThemeContext";

export const osijekLocations = [
  {
    id: "ChIJs67LHLnnXEcRT6Ko9pivzn0",
    naziv: {
      HR: "Tvrđa",
      EN: "Tvrđa (Old Town)",
    },
    opis: {
      HR: "Stara barokna jezgra grada i središte noćnog života.",
      EN: "The old Baroque city core and the center of nightlife.",
    },
    vrijemeHoda: {
      HR: "20 min",
      EN: "20 min walk",
    },
    latitude: 45.5585723,
    longitude: 18.6980934,
    googleMapsUrl:
      "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5585723,18.6980934&dirflg=w",
  },
  {
    id: "ChIJ98TtjqfnXEcRqvgTMTfIkwI",
    naziv: {
      HR: "Konkatedrala sv. Petra i Pavla",
      EN: "Co-cathedral of St. Peter and St. Paul",
    },
    opis: {
      HR: "Prekrasna neogotička građevina u samom centru, visoka 90 metara.",
      EN: "A stunning Neo-Gothic building in the city center, 90 meters tall.",
    },
    vrijemeHoda: {
      HR: "3 min",
      EN: "3 min walk",
    },
    latitude: 45.5608813,
    longitude: 18.6757071,
    googleMapsUrl:
      "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5608813,18.6757071&dirflg=w",
  },
  {
    id: "ChIJTRT26KPnXEcRYHxqE1AZzlY",
    naziv: {
      HR: "Pješački most",
      EN: "Pedestrian Bridge",
    },
    opis: {
      HR: "Simbol Osijeka preko rijeke Drave s predivnim pogledom.",
      EN: "Symbol of Osijek over the Drava River with a scenic view.",
    },
    vrijemeHoda: {
      HR: "10 min",
      EN: "10 min walk",
    },
    latitude: 45.5636021,
    longitude: 18.6853641,
    googleMapsUrl:
      "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5636021,18.6853641&dirflg=w",
  },
  {
    id: "ChIJhUEOzhLnXEcRvIYNugrSoJg",
    naziv: {
      HR: "Zoološki vrt",
      EN: "Osijek Zoo",
    },
    opis: {
      HR: "Najveći zoološki vrt u Hrvatskoj, smješten na lijevoj obali Drave.",
      EN: "The largest zoo in Croatia, located on the left bank of the Drava River.",
    },
    vrijemeHoda: {
      HR: "40 min hoda",
      EN: "40 min walk",
    },
    latitude: 45.5686912,
    longitude: 18.6675451,
    googleMapsUrl:
      "https://maps.google.com/?saddr=45.5585522,18.678293&daddr=45.5686912,18.6675451&dirflg=w",
  },
];

type MapTabProps = {
  language: string;
  colors: ReturnType<typeof useTheme>["colors"];
};

export default function MapTab({ language, colors }: MapTabProps) {
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof osijekLocations)[0] | null
  >(null);

  const langKey = language === "HR" ? "HR" : "EN";
  const mapEmbedUrl = `https://maps.google.com/maps?q=45.5585522,18.678293&hl=${langKey.toLowerCase()}&z=15&output=embed`;

  return (
    <ImageBackground
      source={require("../../../assets/images/pocetna.png")}
      style={styles.bgContainer}
    >
      <View
        style={[
          styles.bgOverlay,
          { backgroundColor: colors.background + "99" },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.mapWrapper}>
            {React.createElement("iframe", {
              src: mapEmbedUrl,
              style: {
                width: "100%",
                height: "100%",
                border: 0,
                borderRadius: 20,
              },
              title: language === "HR" ? "Karta Osijeka" : "Map of Osijek",
            })}
          </View>

          <View
            style={[
              styles.kioskBadge,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.accent,
              },
            ]}
          >
            <View
              style={[styles.kioskDot, { backgroundColor: colors.accent }]}
            />
            <Text
              style={[styles.kioskBadgeText, { color: colors.textPrimary }]}
            >
              {language === "HR" ? "VI STE OVDJE" : "YOU ARE HERE"}
            </Text>
          </View>

          <View style={styles.markersBar}>
            {osijekLocations.map((loc, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.markerButton,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.accent,
                  },
                ]}
                onPress={() => setSelectedLocation(loc)}
              >
                <Text
                  style={[
                    styles.markerButtonText,
                    { color: colors.textPrimary },
                  ]}
                >
                  {loc.naziv[langKey]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Modal
            visible={selectedLocation !== null}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.modalContent,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.closeButton,
                    { backgroundColor: colors.background },
                  ]}
                  onPress={() => setSelectedLocation(null)}
                >
                  <Text
                    style={[styles.closeText, { color: colors.textPrimary }]}
                  >
                    ✕
                  </Text>
                </TouchableOpacity>

                {selectedLocation && (
                  <>
                    <View style={styles.modalHeader}>
                      <Text
                        style={[
                          styles.modalTitle,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {selectedLocation.naziv[langKey]}
                      </Text>
                      <Text
                        style={[
                          styles.modalDesc,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {selectedLocation.opis[langKey]}
                      </Text>
                      <Text
                        style={[styles.modalDistance, { color: colors.accent }]}
                      >
                        {language === "HR"
                          ? "Procijenjeno vrijeme hoda od Šetača: "
                          : "Est. walking time from Šetač: "}
                        {selectedLocation.vrijemeHoda[langKey]}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.qrBox,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.qrTitle, { color: colors.textPrimary }]}
                      >
                        {language === "HR"
                          ? "Preuzmite navigaciju"
                          : "Get Directions"}
                      </Text>
                      <Text
                        style={[styles.qrSub, { color: colors.textSecondary }]}
                      >
                        {language === "HR"
                          ? "Skenirajte kod mobitelom za točnu pješačku rutu od Šetača do cilja."
                          : "Scan with your phone to open walking directions starting from Šetač."}
                      </Text>

                      <View style={styles.qrWrapper}>
                        <QRCode
                          value={selectedLocation.googleMapsUrl}
                          size={200}
                          color="#000000"
                          backgroundColor="#FFFFFF"
                        />
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bgOverlay: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    marginTop: 110,
    marginBottom: 40,
    marginHorizontal: 40,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  mapWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  kioskBadge: {
    position: "absolute",
    top: 30,
    right: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderWidth: 2,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  kioskDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
  },
  kioskBadgeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  markersBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  markerButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  markerButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "70%",
    maxWidth: 600,
    borderRadius: 30,
    padding: 40,
    borderWidth: 1,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalDesc: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  modalDistance: {
    fontSize: 22,
    fontWeight: "bold",
  },
  qrBox: {
    width: "100%",
    alignItems: "center",
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
  },
  qrTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  qrSub: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  qrWrapper: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
  },
});
