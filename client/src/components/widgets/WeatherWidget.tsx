import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { getOsijekWeather, WeatherData } from "../../services/weatherService";
import { useTheme } from "../../context/ThemeContext";

type WeatherWidgetProps = {
  variant?: "screensaver" | "sidebar";
  textColor?: string;
  language?: string;
};

export default function WeatherWidget({
  variant = "screensaver",
  textColor = "#FFFFFF",
  language = "HR",
}: WeatherWidgetProps) {
  const { colors } = useTheme();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const isHR = language === "HR";
  const modalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetModalTimer = useCallback(() => {
    if (modalTimer.current) {
      clearTimeout(modalTimer.current);
    }

    if (modalVisible) {
      modalTimer.current = setTimeout(() => {
        setModalVisible(false);
      }, 60000);
    }
  }, [modalVisible]);

  useEffect(() => {
    resetModalTimer();
    return () => {
      if (modalTimer.current) clearTimeout(modalTimer.current);
    };
  }, [resetModalTimer]);

  useEffect(() => {
    const fetchWeather = () => getOsijekWeather().then(setWeather);
    fetchWeather();
    const interval = setInterval(fetchWeather, 900000);
    return () => clearInterval(interval);
  }, []);

  const weeklyForecast = weather?.weekly || [];
  const isScreen = variant === "screensaver";
  const color = isScreen ? "#FFFFFF" : textColor;

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        style={[styles.container, isScreen ? styles.screen : styles.side]}
      >
        <Feather
          name={(weather?.icon || "sun") as keyof typeof Feather.glyphMap}
          size={24}
          color={color}
        />
        <Text style={[styles.text, { color }]}>
          {weather ? `${weather.temperature}°C` : "--°C"}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={resetModalTimer}>
          <View
            style={[
              styles.modalOverlay,
              { backgroundColor: colors.background + "E6" },
            ]}
          >
            <TouchableWithoutFeedback>
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
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    style={[styles.closeText, { color: colors.textPrimary }]}
                  >
                    X
                  </Text>
                </TouchableOpacity>

                <Text
                  style={[styles.modalTitle, { color: colors.textPrimary }]}
                >
                  {isHR
                    ? "Tjedna vremenska prognoza"
                    : "Weekly Weather Forecast"}
                </Text>

                <View style={styles.currentSection}>
                  <Feather
                    name={
                      (weather?.icon || "sun") as keyof typeof Feather.glyphMap
                    }
                    size={48}
                    color={colors.accent}
                  />
                  <Text
                    style={[styles.modalTemp, { color: colors.textPrimary }]}
                  >
                    {weather ? `${weather.temperature}°C` : "--°C"}
                  </Text>
                  <Text
                    style={[styles.modalSub, { color: colors.textSecondary }]}
                  >
                    {isHR
                      ? "Osijek - Trenutno stanje"
                      : "Osijek - Current conditions"}
                  </Text>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.forecastScroll}
                  onScrollBeginDrag={resetModalTimer}
                >
                  {weeklyForecast.map((item, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dayCard,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.dayText, { color: colors.textPrimary }]}
                      >
                        {item.day}
                      </Text>
                      <Feather
                        name={item.icon as keyof typeof Feather.glyphMap}
                        size={28}
                        color={colors.accent}
                        style={styles.dayIcon}
                      />
                      <Text
                        style={[styles.dayTemp, { color: colors.textPrimary }]}
                      >
                        {item.temp}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  screen: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    zIndex: 9999,
  },
  side: {
    paddingVertical: 4,
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  modalContent: {
    width: "100%",
    maxWidth: 700,
    borderRadius: 30,
    padding: 40,
    borderWidth: 1,
    position: "relative",
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
  modalTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  currentSection: {
    alignItems: "center",
    marginBottom: 35,
  },
  modalTemp: {
    fontSize: 54,
    fontWeight: "bold",
    marginTop: 10,
  },
  modalSub: {
    fontSize: 18,
    marginTop: 5,
  },
  forecastScroll: {
    flexDirection: "row",
    marginTop: 10,
  },
  dayCard: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 15,
    minWidth: 110,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dayIcon: {
    marginVertical: 15,
  },
  dayTemp: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
