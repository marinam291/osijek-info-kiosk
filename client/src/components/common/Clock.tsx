import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

type ClockProps = {
  language: string;
  colors: ReturnType<typeof useTheme>["colors"];
};

export default function Clock({ language, colors }: ClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString(
    language === "HR" ? "hr-HR" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <View style={styles.timeContainer}>
      <Text style={[styles.timeText, { color: colors.textPrimary }]}>
        {formattedTime}
      </Text>
      <Text style={[styles.dateText, { color: colors.textSecondary }]}>
        {formattedDate}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(148, 163, 184, 0.2)",
    width: "100%",
  },
  timeText: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  dateText: {
    fontSize: 14,
    textTransform: "uppercase",
    marginTop: 4,
  },
});
