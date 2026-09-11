import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { apiUrl } from "@/services/api";

type ServerStatusWidgetProps = {
  language: string;
};

export default function ServerStatusWidget({
  language,
}: ServerStatusWidgetProps) {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const { width } = useWindowDimensions();
  const scale = width / 1920;
  const isHR = language === "HR";

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(apiUrl("/api/health"));
        if (response.ok) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      } catch {
        setIsOnline(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isOnline) return null;

  return (
    <View style={[styles.banner, { padding: 20 * scale }]}>
      <Feather name="alert-triangle" size={32 * scale} color="#FFFFFF" />
      <Text
        style={[styles.text, { fontSize: 20 * scale, marginLeft: 15 * scale }]}
      >
        {isHR
          ? "Upozorenje: Veza sa serverom je izgubljena. Neke funkcije privremeno nisu dostupne."
          : "Warning: Connection to the server is lost. Some functions are temporarily unavailable."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#D32F2F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
    elevation: 10,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
