import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

type ScreensaverProps = {
  onStart: () => void;
  language: string;
  setLanguage: (lang: string) => void;
};

export default function Screensaver({
  onStart,
  language,
  setLanguage,
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

      <View style={styles.langContainer}>
        <TouchableOpacity
          style={[
            styles.langButton,
            language === "HR" && styles.langButtonActive,
          ]}
          onPress={() => setLanguage("HR")}
        >
          <Text
            style={[
              styles.langText,
              language === "HR" && styles.langTextActive,
            ]}
          >
            HR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.langButton,
            language === "EN" && styles.langButtonActive,
          ]}
          onPress={() => setLanguage("EN")}
        >
          <Text
            style={[
              styles.langText,
              language === "EN" && styles.langTextActive,
            ]}
          >
            EN
          </Text>
        </TouchableOpacity>
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
  langContainer: {
    position: "absolute",
    top: 40,
    right: 40,
    flexDirection: "row",
    gap: 12,
    zIndex: 1001,
  },
  langButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
  },
  langButtonActive: {
    backgroundColor: "#00D4B2",
    borderColor: "#00D4B2",
  },
  langText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  langTextActive: {
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
