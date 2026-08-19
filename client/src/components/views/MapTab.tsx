import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
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
          {/* Karta */}
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

          {/* Badge "Vi ste ovdje" */}
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
});
