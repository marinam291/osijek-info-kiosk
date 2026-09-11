import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeColors } from "../../context/ThemeContext";

type EventItem = {
  id: string | number;
  naziv?: string;
  nazivHr?: string;
  nazivEn?: string;
  datum: string;
  opis?: string;
};

type CalendarViewProps = {
  events: EventItem[];
  colors: ThemeColors;
  language: string;
  onEventPress: (event: EventItem) => void;
  onMonthChange?: (mjesec: number, godina: number) => void;
};

export default function CalendarView({
  events,
  colors,
  language,
  onEventPress,
  onMonthChange,
}: CalendarViewProps) {
  const isHR = language === "HR";
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    if (onMonthChange) {
      onMonthChange(month + 1, year);
    }
  }, [month, year, onMonthChange]);

  const monthNamesHR = [
    "Siječanj",
    "Veljača",
    "Ožujak",
    "Travanj",
    "Svibanj",
    "Lipanj",
    "Srpanj",
    "Kolovoz",
    "Rujan",
    "Listopad",
    "Studeni",
    "Prosinac",
  ];

  const monthNamesEN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeekHR = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];
  const daysOfWeekEN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    daysArray.push(d);
  }

  const getEventForDate = (day: number) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const dateString = `${year}-${formattedMonth}-${formattedDay}`;
    return events.find((e) => e.datum === dateString);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.navButton,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            },
          ]}
          onPress={handlePrevMonth}
        >
          <Text style={[styles.navButtonText, { color: colors.textPrimary }]}>
            ◀
          </Text>
        </TouchableOpacity>

        <Text style={[styles.monthTitle, { color: colors.textPrimary }]}>
          {isHR ? monthNamesHR[month] : monthNamesEN[month]} {year}
        </Text>

        <TouchableOpacity
          style={[
            styles.navButton,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            },
          ]}
          onPress={handleNextMonth}
        >
          <Text style={[styles.navButtonText, { color: colors.textPrimary }]}>
            ▶
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDaysRow}>
        {(isHR ? daysOfWeekHR : daysOfWeekEN).map((dayName, idx) => (
          <Text
            key={idx}
            style={[styles.weekDayText, { color: colors.textSecondary }]}
          >
            {dayName}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {daysArray.map((day, index) => {
          if (day === null) {
            return <View key={`empty-${index}`} style={styles.dayCellEmpty} />;
          }

          const matchedEvent = getEventForDate(day);

          return (
            <TouchableOpacity
              key={`day-${day}`}
              style={[
                styles.dayCell,
                {
                  backgroundColor: matchedEvent
                    ? colors.accent + "20"
                    : colors.cardBackground,
                  borderColor: matchedEvent ? colors.accent : colors.border,
                },
              ]}
              onPress={() => matchedEvent && onEventPress(matchedEvent)}
              disabled={!matchedEvent}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayNumber, { color: colors.textPrimary }]}>
                {day}
              </Text>
              {matchedEvent && (
                <Text
                  style={[styles.eventLabel, { color: colors.accent }]}
                  numberOfLines={2}
                >
                  {matchedEvent.naziv || matchedEvent.nazivHr}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  monthTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  weekDayText: {
    width: "13%",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-start",
  },
  dayCellEmpty: {
    width: "13%",
    aspectRatio: 0.9,
  },
  dayCell: {
    width: "13%",
    aspectRatio: 0.9,
    borderRadius: 12,
    borderWidth: 2,
    padding: 8,
    justifyContent: "flex-start",
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: "900",
  },
  eventLabel: {
    fontSize: 14,
    marginTop: 6,
    fontWeight: "800",
  },
});
