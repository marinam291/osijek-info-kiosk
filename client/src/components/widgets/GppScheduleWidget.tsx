import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type Linija = {
  id: string;
  naziv: string;
  vrsta: string;
  polasci?: string[];
};

type GppScheduleProps = {
  linije?: Linija[];
  language: string;
  colors: {
    accent: string;
    cardBackground: string;
    border: string;
    textPrimary: string;
    background: string;
    textSecondary: string;
  };
};

export default function GppScheduleWidget({
  linije = [],
  language,
  colors,
}: GppScheduleProps) {
  const [selectedLineId, setSelectedLineId] = useState(
    linije.length > 0 ? linije[0].id : "",
  );

  const { width } = useWindowDimensions();
  const scale = width / 1920;

  const isHR = language === "HR";
  const selectedLine = linije.find((l) => l.id === selectedLineId) || linije[0];
  const departuresList = selectedLine?.polasci || [];

  if (!linije || linije.length === 0) return null;

  return (
    <View style={[styles.container, { marginTop: 25 * scale }]}>
      <Text
        style={[
          styles.title,
          {
            color: colors.textPrimary,
            fontSize: 32 * scale,
            marginBottom: 24 * scale,
          },
        ]}
      >
        {isHR ? "Vozni red linija (GPP)" : "Line Timetable (GPP)"}
      </Text>

      <View
        style={[styles.linesRow, { gap: 20 * scale, marginBottom: 30 * scale }]}
      >
        {linije.map((line) => {
          const isActive = line.id === selectedLineId;
          return (
            <TouchableOpacity
              key={line.id}
              style={[
                styles.lineButton,
                {
                  backgroundColor: isActive
                    ? colors.accent
                    : colors.cardBackground,
                  borderColor: colors.border,
                  paddingVertical: 18 * scale,
                  paddingHorizontal: 32 * scale,
                  borderRadius: 25 * scale,
                  borderWidth: 2 * scale,
                },
              ]}
              onPress={() => setSelectedLineId(line.id)}
            >
              <Feather
                name="navigation"
                size={24 * scale}
                color={isActive ? "#FFFFFF" : colors.textPrimary}
                style={{ marginRight: 12 * scale }}
              />
              <Text
                style={[
                  styles.lineButtonText,
                  {
                    color: isActive ? "#FFFFFF" : colors.textPrimary,
                    fontSize: 22 * scale,
                  },
                ]}
              >
                {line.id}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedLine && (
        <View
          style={[
            styles.scheduleCard,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
              borderRadius: 30 * scale,
              padding: 30 * scale,
              borderWidth: 2 * scale,
            },
          ]}
        >
          <Text
            style={[
              styles.selectedLineTitle,
              {
                color: colors.accent,
                fontSize: 26 * scale,
                marginBottom: 24 * scale,
              },
            ]}
          >
            {selectedLine.id}: {selectedLine.naziv}
          </Text>

          <ScrollView
            contentContainerStyle={[styles.departuresGrid, { gap: 16 * scale }]}
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: 400 * scale }}
          >
            {departuresList.map((time, index) => (
              <View
                key={index}
                style={[
                  styles.timeBadge,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    paddingVertical: 16 * scale,
                    paddingHorizontal: 28 * scale,
                    borderRadius: 18 * scale,
                    borderWidth: 1.5 * scale,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.timeText,
                    {
                      color: colors.textPrimary,
                      fontSize: 24 * scale,
                    },
                  ]}
                >
                  {time}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  title: { fontWeight: "bold" },
  linesRow: { flexDirection: "row", flexWrap: "wrap" },
  lineButton: { flexDirection: "row", alignItems: "center" },
  lineButtonText: { fontWeight: "bold" },
  scheduleCard: { width: "100%" },
  selectedLineTitle: { fontWeight: "bold" },
  departuresGrid: { flexDirection: "row", flexWrap: "wrap" },
  timeBadge: { alignItems: "center", justifyContent: "center", minWidth: 130 },
  timeText: { fontWeight: "bold" },
});
