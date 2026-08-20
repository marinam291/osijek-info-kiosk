import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { osijekLocations, LocationItem } from "../../data/mapLocations";
import MapLocationModal from "../common/MapLocationModal";

type MapTabProps = {
  language: string;
  colors: ReturnType<typeof useTheme>["colors"];
};

export default function MapTab({ language, colors }: MapTabProps) {
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(
    null,
  );

  const { width } = useWindowDimensions();
  const scale = width / 1920;
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
        <View
          style={[
            styles.container,
            {
              marginTop: 110 * scale,
              marginBottom: 40 * scale,
              marginHorizontal: 40 * scale,
              borderRadius: 25 * scale,
            },
          ]}
        >
          <View style={[styles.mapWrapper, { borderRadius: 25 * scale }]}>
            {React.createElement("iframe", {
              src: mapEmbedUrl,
              style: {
                width: "100%",
                height: "100%",
                border: 0,
                borderRadius: 25 * scale,
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
                top: 35 * scale,
                right: 35 * scale,
                paddingVertical: 16 * scale,
                paddingHorizontal: 28 * scale,
                borderRadius: 35 * scale,
                borderWidth: 2.5 * scale,
              },
            ]}
          >
            <View
              style={[
                styles.kioskDot,
                {
                  backgroundColor: colors.accent,
                  width: 18 * scale,
                  height: 18 * scale,
                  borderRadius: 9 * scale,
                  marginRight: 12 * scale,
                },
              ]}
            />
            <Text
              style={[
                styles.kioskBadgeText,
                {
                  color: colors.textPrimary,
                  fontSize: 22 * scale,
                },
              ]}
            >
              {language === "HR" ? "VI STE OVDJE" : "YOU ARE HERE"}
            </Text>
          </View>

          <View
            style={[
              styles.markersBar,
              {
                bottom: 30 * scale,
                left: 25 * scale,
                right: 25 * scale,
                gap: 16 * scale,
              },
            ]}
          >
            {osijekLocations.map((loc, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.markerButton,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.accent,
                    paddingVertical: 16 * scale,
                    paddingHorizontal: 28 * scale,
                    borderRadius: 30 * scale,
                    borderWidth: 2 * scale,
                  },
                ]}
                onPress={() => setSelectedLocation(loc)}
              >
                <Text
                  style={[
                    styles.markerButtonText,
                    {
                      color: colors.textPrimary,
                      fontSize: 22 * scale,
                    },
                  ]}
                >
                  {loc.naziv[langKey]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <MapLocationModal
            selectedLocation={selectedLocation}
            onClose={() => setSelectedLocation(null)}
            language={language}
            colors={colors}
          />
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
    overflow: "hidden",
    position: "relative",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  mapWrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  kioskBadge: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  kioskDot: {},
  kioskBadgeText: {
    fontWeight: "bold",
    letterSpacing: 1,
  },
  markersBar: {
    position: "absolute",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  markerButton: {
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  markerButtonText: {
    fontWeight: "bold",
  },
});
