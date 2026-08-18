import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CalendarWidget from "../widgets/CalendarWidget";
import { ContentItem } from "./ContentArea";
import { useTheme } from "../../context/ThemeContext";

type EventsViewProps = {
  title: string;
  standardData: ContentItem[];
  selectedItem: ContentItem | null;
  setSelectedItem: (item: ContentItem | null) => void;
  colors: ReturnType<typeof useTheme>["colors"];
  language: string;
};

export default function EventsView({
  title,
  standardData,
  selectedItem,
  setSelectedItem,
  colors,
  language,
}: EventsViewProps) {
  const isHR = language === "HR";

  // Sigurno izvlačenje naziva ovisno o jeziku
  const displayNaziv =
    typeof selectedItem?.naziv === "object" && selectedItem.naziv !== null
      ? selectedItem.naziv[isHR ? "HR" : "EN"]
      : selectedItem?.naziv;

  return (
    <View style={{ flex: 1 }}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        {title}
      </Text>

      <View style={styles.calendarWrapper}>
        <ScrollView
          style={styles.calendarLeft}
          showsVerticalScrollIndicator={false}
        >
          <CalendarWidget
            events={standardData
              .filter(
                (item): item is ContentItem & { datum: string } => !!item.datum,
              )
              .map((item) => ({
                ...item,
                naziv:
                  typeof item.naziv === "object" && item.naziv !== null
                    ? item.naziv[isHR ? "HR" : "EN"]
                    : item.naziv,
              }))}
            colors={colors}
            language={language}
            onEventPress={setSelectedItem}
          />
        </ScrollView>

        <ScrollView
          style={[
            styles.calendarRight,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            },
          ]}
          contentContainerStyle={styles.calendarRightContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.detailsTitle, { color: colors.textPrimary }]}>
            {isHR ? "Detalji događaja" : "Event Details"}
          </Text>
          {selectedItem ? (
            <View style={styles.detailsContent}>
              <Text
                style={[styles.detailsItemTitle, { color: colors.textPrimary }]}
              >
                {displayNaziv}
              </Text>
              {selectedItem.datum && (
                <Text style={[styles.detailsItemSub, { color: colors.accent }]}>
                  {isHR ? "Datum: " : "Date: "} {selectedItem.datum}
                </Text>
              )}
              {selectedItem.opis && (
                <Text
                  style={[
                    styles.detailsItemDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  {selectedItem.opis}
                </Text>
              )}
              {selectedItem.info && (
                <Text
                  style={[
                    styles.detailsItemInfo,
                    { color: colors.textSecondary },
                  ]}
                >
                  {selectedItem.info}
                </Text>
              )}
            </View>
          ) : (
            <Text
              style={[
                styles.detailsPlaceholder,
                { color: colors.textSecondary },
              ]}
            >
              {isHR
                ? "Odaberite događaj iz kalendara za prikaz informacija."
                : "Select an event from the calendar to view information."}
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 24,
    letterSpacing: 1,
  },
  calendarWrapper: {
    flex: 1,
    flexDirection: "row",
    gap: 30,
    marginTop: 10,
  },
  calendarLeft: {
    flex: 0.65,
  },
  calendarRight: {
    flex: 0.35,
    borderRadius: 20,
    borderWidth: 1,
  },
  calendarRightContent: {
    padding: 24,
    justifyContent: "flex-start",
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  detailsContent: {
    marginTop: 10,
  },
  detailsItemTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailsItemSub: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  detailsItemDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  detailsItemInfo: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
  detailsPlaceholder: {
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 20,
  },
});
