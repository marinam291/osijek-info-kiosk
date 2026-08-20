import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useTheme } from "../../context/ThemeContext";

type ClockProps = {
  language: string;
  colors: ReturnType<typeof useTheme>["colors"];
  scale?: number;
};

export default function Clock({
  language,
  colors,
  scale: propScale,
}: ClockProps) {
  const [time, setTime] = useState(new Date());
  const { width } = useWindowDimensions();
  const scale = propScale ?? width / 1920;

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
    <View
      style={[
        styles.timeContainer,
        {
          marginTop: 20 * scale,
          paddingTop: 20 * scale,
        },
      ]}
    >
      <Text
        style={[
          styles.timeText,
          {
            color: colors.textPrimary,
            fontSize: 34 * scale,
          },
        ]}
      >
        {formattedTime}
      </Text>
      <Text
        style={[
          styles.dateText,
          {
            color: colors.textSecondary,
            fontSize: 18 * scale,
            marginTop: 6 * scale,
          },
        ]}
      >
        {formattedDate}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(148, 163, 184, 0.2)",
    width: "100%",
  },
  timeText: {
    fontWeight: "bold",
    letterSpacing: 1,
  },
  dateText: {
    textTransform: "uppercase",
  },
});
