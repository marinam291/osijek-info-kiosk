import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
};

export default function Sidebar({
  activeTab,
  setActiveTab,
  language,
}: SidebarProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.sidebar,
        {
          backgroundColor: colors.sidebarBackground,
          borderRightColor: colors.border,
        },
      ]}
    >
      <View style={styles.logoContainer}>
        <Text style={[styles.logoBadge, { color: colors.accent }]}>
          INFO KIOSK
        </Text>
        <Text style={[styles.logoText, { color: colors.textPrimary }]}>
          GRAD OSIJEK
        </Text>
        <Text style={[styles.logoSubtext, { color: colors.textSecondary }]}>
          {language === "HR" ? "Službeni portal" : "Official Portal"}
        </Text>
      </View>

      <View style={styles.menuItems}>
        {["turizam", "dogadjanja", "usluge", "karta"].map((tab) => {
          const isActive = activeTab === tab;
          const labels: Record<string, { hr: string; en: string }> = {
            turizam: { hr: "Turizam", en: "Tourism" },
            dogadjanja: { hr: "Događanja", en: "Events" },
            usluge: { hr: "Usluge", en: "Services" },
            karta: { hr: "Karta", en: "Map" },
          };

          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.menuButton,
                isActive && {
                  backgroundColor: colors.cardBackground,
                  borderLeftWidth: 4,
                  borderLeftColor: colors.accent,
                },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.menuButtonText,
                  {
                    color: isActive ? colors.textPrimary : colors.textSecondary,
                  },
                ]}
              >
                {language === "HR" ? labels[tab].hr : labels[tab].en}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 280,
    borderRightWidth: 1,
    padding: 32,
    justifyContent: "flex-start",
  },
  logoContainer: {
    marginBottom: 48,
  },
  logoBadge: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 6,
  },
  logoText: {
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  logoSubtext: {
    fontSize: 14,
    marginTop: 2,
  },
  menuItems: {
    gap: 12,
  },
  menuButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
