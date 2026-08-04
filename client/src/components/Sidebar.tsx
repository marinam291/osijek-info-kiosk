import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <View style={styles.sidebar}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>GRAD OSIJEK</Text>
        <Text style={styles.logoSubtext}>Info Panel</Text>
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
            Turizam
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
            Događanja
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
            Usluge
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
            Karta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: "25%",
    backgroundColor: "#0A2540",
    padding: 24,
    justifyContent: "space-between",
  },
  logoContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  logoSubtext: {
    color: "#00D4B2",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },
  menuItems: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  menuButton: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  menuButtonActive: {
    backgroundColor: "#00D4B2",
  },
  menuButtonText: {
    color: "#A0AEC0",
    fontSize: 22,
    fontWeight: "600",
  },
  menuButtonTextActive: {
    color: "#0A2540",
    fontWeight: "bold",
  },
});
