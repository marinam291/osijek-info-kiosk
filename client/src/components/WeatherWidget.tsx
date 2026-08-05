import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getOsijekWeather, WeatherData } from "../services/weatherService";

export default function WeatherWidget({
  variant = "screensaver",
  textColor = "#FFFFFF",
}: {
  variant?: "screensaver" | "sidebar";
  textColor?: string;
}) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = () => getOsijekWeather().then(setWeather);
    fetchWeather();
    const interval = setInterval(fetchWeather, 900000);
    return () => clearInterval(interval);
  }, []);

  if (!weather) return null;

  const isScreen = variant === "screensaver";
  const color = isScreen ? "#FFFFFF" : textColor;

  return (
    <View style={[styles.container, isScreen ? styles.screen : styles.side]}>
      <Feather name={weather.icon as any} size={24} color={color} />
      <Text style={[styles.text, { color }]}>{weather.temperature}°C</Text>
    </View>
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
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
