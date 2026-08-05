import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
  return (
    <View style={styles.sidebar}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoBadge}>INFO KIOSK</Text>
        <Text style={styles.logoText}>GRAD OSIJEK</Text>
        <Text style={styles.logoSubtext}>
          {language === "HR" ? "Službeni portal" : "Official Portal"}
        </Text>
      </View>

      <View style={styles.menuItems}>
        <TouchableOpacity
          style={[
            styles.menuButton,
            activeTab === "turizam" && styles.menuButtonActive,
          ]}
          onPress={() => setActiveTab("turizam")}
        >
          <Text
            style={[
              styles.menuButtonText,
              activeTab === "turizam" && styles.menuButtonTextActive,
            ]}
          >
            {language === "HR" ? "Turizam" : "Tourism"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuButton,
            activeTab === "dogadjanja" && styles.menuButtonActive,
          ]}
          onPress={() => setActiveTab("dogadjanja")}
        >
          <Text
            style={[
              styles.menuButtonText,
              activeTab === "dogadjanja" && styles.menuButtonTextActive,
            ]}
          >
            {language === "HR" ? "Događanja" : "Events"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuButton,
            activeTab === "usluge" && styles.menuButtonActive,
          ]}
          onPress={() => setActiveTab("usluge")}
        >
          <Text
            style={[
              styles.menuButtonText,
              activeTab === "usluge" && styles.menuButtonTextActive,
            ]}
          >
            {language === "HR" ? "Usluge" : "Services"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuButton,
            activeTab === "karta" && styles.menuButtonActive,
          ]}
          onPress={() => setActiveTab("karta")}
        >
          <Text
            style={[
              styles.menuButtonText,
              activeTab === "karta" && styles.menuButtonTextActive,
            ]}
          >
            {language === "HR" ? "Karta" : "Map"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 280,
    backgroundColor: "#070A12",
    borderRightWidth: 1,
    borderRightColor: "#1E293B",
    padding: 32,
    justifyContent: "flex-start",
  },
  logoContainer: {
    marginBottom: 48,
  },
  logoBadge: {
    color: "#00D4B2",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 6,
  },
  logoText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  logoSubtext: {
    fontSize: 14,
    color: "#64748B",
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
  menuButtonActive: {
    backgroundColor: "#1E293B",
    borderLeftWidth: 4,
    borderLeftColor: "#00D4B2",
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#94A3B8",
  },
  menuButtonTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
