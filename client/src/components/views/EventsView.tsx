import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
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
  const { width } = useWindowDimensions();
  const scale = width / 1920;

  const displayNaziv =
    typeof selectedItem?.naziv === "object" && selectedItem.naziv !== null
      ? selectedItem.naziv[isHR ? "HR" : "EN"]
      : selectedItem?.naziv;

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.textPrimary,
            fontSize: 42 * scale,
            marginBottom: 24 * scale,
          },
        ]}
      >
        {title}
      </Text>

      <View
        style={[
          styles.calendarWrapper,
          { gap: 30 * scale, marginTop: 10 * scale },
        ]}
      >
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
              borderRadius: 20 * scale,
              borderWidth: 1.5 * scale,
            },
          ]}
          contentContainerStyle={[
            styles.calendarRightContent,
            { padding: 28 * scale },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={[
              styles.detailsTitle,
              {
                color: colors.textPrimary,
                fontSize: 26 * scale,
                marginBottom: 20 * scale,
              },
            ]}
          >
            {isHR ? "Detalji događaja" : "Event Details"}
          </Text>
          {selectedItem ? (
            <View style={[styles.detailsContent, { marginTop: 10 * scale }]}>
              <Text
                style={[
                  styles.detailsItemTitle,
                  {
                    color: colors.textPrimary,
                    fontSize: 28 * scale,
                    marginBottom: 12 * scale,
                  },
                ]}
              >
                {displayNaziv}
              </Text>
              {selectedItem.datum && (
                <Text
                  style={[
                    styles.detailsItemSub,
                    {
                      color: colors.accent,
                      fontSize: 20 * scale,
                      marginBottom: 16 * scale,
                    },
                  ]}
                >
                  {isHR ? "Datum: " : "Date: "} {selectedItem.datum}
                </Text>
              )}
              {selectedItem.opis && (
                <Text
                  style={[
                    styles.detailsItemDescription,
                    {
                      color: colors.textSecondary,
                      fontSize: 20 * scale,
                      lineHeight: 30 * scale,
                      marginBottom: 14 * scale,
                    },
                  ]}
                >
                  {selectedItem.opis}
                </Text>
              )}
              {selectedItem.info && (
                <Text
                  style={[
                    styles.detailsItemInfo,
                    {
                      color: colors.textSecondary,
                      fontSize: 18 * scale,
                      lineHeight: 26 * scale,
                    },
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
                {
                  color: colors.textSecondary,
                  fontSize: 20 * scale,
                  marginTop: 20 * scale,
                },
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
    fontWeight: "bold",
    letterSpacing: 1,
  },
  calendarWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  calendarLeft: {
    flex: 0.65,
  },
  calendarRight: {
    flex: 0.35,
  },
  calendarRightContent: {
    justifyContent: "flex-start",
  },
  detailsTitle: {
    fontWeight: "bold",
  },
  detailsContent: {},
  detailsItemTitle: {
    fontWeight: "bold",
  },
  detailsItemSub: {
    fontWeight: "600",
  },
  detailsItemDescription: {},
  detailsItemInfo: {
    fontStyle: "italic",
  },
  detailsPlaceholder: {
    fontStyle: "italic",
  },
});
