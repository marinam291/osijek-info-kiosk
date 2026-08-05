import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { ThemeMode } from "../context/ThemeContext";

type ScreensaverProps = {
  onStart: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

export default function Screensaver({
  onStart,
  language,
  setLanguage,
  theme,
  setTheme,
}: ScreensaverProps) {
  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/videos/osijek.mp4")}
        style={styles.video}
        shouldPlay
        isLooping
        isMuted
        resizeMode={ResizeMode.COVER}
      />

      <View style={styles.controlsContainer}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.ctrlButton,
              language === "HR" && styles.ctrlButtonActive,
            ]}
            onPress={() => setLanguage("HR")}
          >
            <Text
              style={[
                styles.ctrlText,
                language === "HR" && styles.ctrlTextActive,
              ]}
            >
              HR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ctrlButton,
              language === "EN" && styles.ctrlButtonActive,
            ]}
            onPress={() => setLanguage("EN")}
          >
            <Text
              style={[
                styles.ctrlText,
                language === "EN" && styles.ctrlTextActive,
              ]}
            >
              EN
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.ctrlButton,
              theme === "light" && styles.ctrlButtonActive,
            ]}
            onPress={() => setTheme("light")}
          >
            <Text
              style={[
                styles.ctrlText,
                theme === "light" && styles.ctrlTextActive,
              ]}
            >
              {language === "HR" ? "SVIJETLO" : "LIGHT"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ctrlButton,
              theme === "dark" && styles.ctrlButtonActive,
            ]}
            onPress={() => setTheme("dark")}
          >
            <Text
              style={[
                styles.ctrlText,
                theme === "dark" && styles.ctrlTextActive,
              ]}
            >
              {language === "HR" ? "TAMNO" : "DARK"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.overlay}>
        <Text style={styles.title}>
          {language === "HR" ? "Dobrodošli u Osijek" : "Welcome to Osijek"}
        </Text>
        <Text style={styles.subtitle}>
          {language === "HR" ? "Grad na Dravi" : "City on the Drava River"}
        </Text>

        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>
            {language === "HR" ? "Dodirni za početak" : "Touch to start"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    zIndex: 1000,
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(10, 37, 64, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  controlsContainer: {
    position: "absolute",
    top: 40,
    right: 40,
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 12,
    zIndex: 1001,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
  },
  ctrlButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
  },
  ctrlButtonActive: {
    backgroundColor: "#00D4B2",
    borderColor: "#00D4B2",
  },
  ctrlText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  ctrlTextActive: {
    color: "#0A2540",
  },
  title: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 32,
    color: "#00D4B2",
    fontWeight: "600",
    marginBottom: 80,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  button: {
    backgroundColor: "#00D4B2",
    paddingVertical: 24,
    paddingHorizontal: 64,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0A2540",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
