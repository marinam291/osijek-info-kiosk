import React, { useState, useEffect } from "react";
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

type ExtendedContentItem = ContentItem & {
  nazivHr?: string;
  nazivEn?: string;
  link?: string;
  detaljniOpis?: string;
};

export default function EventsView({
  title,
  standardData: initialData,
  selectedItem,
  setSelectedItem,
  colors,
  language,
}: EventsViewProps) {
  const isHR = language === "HR";
  const { width } = useWindowDimensions();
  const scale = width / 1920;

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [eventsData, setEventsData] = useState<ExtendedContentItem[]>(
    initialData || [],
  );
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchEventsForMonth() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/items?mjesec=${currentMonth}&godina=${currentYear}`,
        );
        if (response.ok && isMounted) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setEventsData(data);
          }
        }
      } catch {
        // Tiho hvatanje greške
      }
    }

    fetchEventsForMonth();

    return () => {
      isMounted = false;
    };
  }, [currentMonth, currentYear]);

  useEffect(() => {
    if (!selectedItem) return;

    let active = true;

    async function loadAllDayDescriptions() {
      const sameDayItems = eventsData.filter(
        (item) => item.datum === selectedItem?.datum,
      ) as ExtendedContentItem[];

      const itemsNeedingDetails = sameDayItems.filter(
        (ev) => ev.link && !ev.detaljniOpis,
      );

      if (itemsNeedingDetails.length === 0) return;

      setLoadingDetails(true);
      try {
        await Promise.all(
          itemsNeedingDetails.map(async (ev) => {
            try {
              const res = await fetch(
                `http://localhost:5000/api/event-details?url=${encodeURIComponent(
                  ev.link!,
                )}`,
              );
              if (res.ok && active) {
                const data = await res.json();
                if (data.opis) {
                  setEventsData((prev) =>
                    prev.map((item) =>
                      item.id === ev.id
                        ? { ...item, detaljniOpis: data.opis }
                        : item,
                    ),
                  );
                }
              }
            } catch {
              // Pojedinačna greška
            }
          }),
        );
      } finally {
        if (active) {
          setLoadingDetails(false);
        }
      }
    }

    loadAllDayDescriptions();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem?.datum]);

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
            events={eventsData
              .filter(
                (item): item is ExtendedContentItem & { datum: string } =>
                  !!item.datum,
              )
              .map((item) => {
                let resolvedNaziv = "";
                if (typeof item.naziv === "object" && item.naziv !== null) {
                  resolvedNaziv = item.naziv[isHR ? "HR" : "EN"] || "";
                } else if (typeof item.naziv === "string") {
                  resolvedNaziv = item.naziv;
                } else {
                  resolvedNaziv = isHR
                    ? item.nazivHr || ""
                    : item.nazivEn || item.nazivHr || "";
                }

                return {
                  ...item,
                  naziv: resolvedNaziv,
                };
              })}
            colors={colors}
            language={language}
            onEventPress={setSelectedItem}
            onMonthChange={(mjesec, godina) => {
              setCurrentMonth(mjesec);
              setCurrentYear(godina);
            }}
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
            (() => {
              const rawSameDayEvents = eventsData.filter(
                (item) => item.datum === selectedItem.datum,
              );

              const uniqueMap = new Map<string, ExtendedContentItem>();

              rawSameDayEvents.forEach((item) => {
                let naziv = "";
                if (typeof item.naziv === "object" && item.naziv !== null) {
                  naziv = item.naziv[isHR ? "HR" : "EN"] || "";
                } else if (typeof item.naziv === "string") {
                  naziv = item.naziv;
                } else {
                  naziv = isHR
                    ? item.nazivHr || ""
                    : item.nazivEn || item.nazivHr || "";
                }

                if (naziv && !uniqueMap.has(naziv)) {
                  uniqueMap.set(naziv, { ...item, naziv });
                } else if (naziv && uniqueMap.has(naziv)) {
                  const existing = uniqueMap.get(naziv)!;
                  if (item.detaljniOpis && !existing.detaljniOpis) {
                    existing.detaljniOpis = item.detaljniOpis;
                  }
                }
              });

              const sameDayEvents = Array.from(uniqueMap.values());

              return (
                <View style={{ gap: 20 * scale }}>
                  <Text
                    style={{
                      color: colors.accent,
                      fontSize: 20 * scale,
                      fontWeight: "700",
                      marginBottom: 8 * scale,
                    }}
                  >
                    {isHR ? "Datum: " : "Date: "} {selectedItem.datum}
                  </Text>

                  {sameDayEvents.map((event, index) => {
                    const eventNaziv = event.naziv as string;
                    const finalOpis =
                      event.detaljniOpis || event.opis || event.opisHr;

                    return (
                      <View
                        key={event.id || index}
                        style={{
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                          borderWidth: 1.5 * scale,
                          borderRadius: 16 * scale,
                          padding: 20 * scale,
                          gap: 12 * scale,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          elevation: 3,
                        }}
                      >
                        <Text
                          style={{
                            color: colors.textPrimary,
                            fontSize: 22 * scale,
                            fontWeight: "bold",
                            letterSpacing: 0.5,
                          }}
                        >
                          {eventNaziv}
                        </Text>

                        {finalOpis && finalOpis !== eventNaziv ? (
                          <Text
                            style={{
                              color: colors.textSecondary,
                              fontSize: 16 * scale,
                              fontWeight: "normal",
                              lineHeight: 24 * scale,
                            }}
                          >
                            {finalOpis}
                          </Text>
                        ) : null}

                        {loadingDetails && !event.detaljniOpis ? (
                          <Text
                            style={{
                              color: colors.accent,
                              fontSize: 14 * scale,
                              fontStyle: "italic",
                            }}
                          >
                            {isHR
                              ? "Učitavam duži opis sa stranice..."
                              : "Loading longer description..."}
                          </Text>
                        ) : null}

                        {event.info ? (
                          <Text
                            style={{
                              color: colors.accent,
                              fontSize: 14 * scale,
                              fontStyle: "italic",
                              marginTop: 4 * scale,
                            }}
                          >
                            {event.info}
                          </Text>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              );
            })()
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
  detailsPlaceholder: {
    fontStyle: "italic",
  },
});
