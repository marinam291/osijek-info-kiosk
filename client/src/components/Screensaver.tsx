import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemeMode, useTheme } from "../context/ThemeContext";

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
  const { colors } = useTheme();

  const slideAnim = useRef(
    new Animated.Value(theme === "light" ? 0 : 40),
  ).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: theme === "light" ? 0 : 40,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isLight = theme === "light";
  const overlayColor = isLight
    ? "rgba(255, 255, 255, 0.4)"
    : "rgba(10, 37, 64, 0.6)";
  const textColor = isLight ? "#0A2540" : "#FFFFFF";
  const controlBg = isLight ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.6)";
  const controlBorder = isLight ? "#0A2540" : "#FFFFFF";

  return (
    <View style={styles.container}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source
          src={require("../../assets/videos/osijek.mp4")}
          type="video/mp4"
        />
        Vaš preglednik ne podržava video.
      </video>

      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        <View style={styles.controlsContainer}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.langButton,
                { borderColor: controlBorder, backgroundColor: controlBg },
                language === "HR" && {
                  backgroundColor: colors.accent,
                  borderColor: colors.accent,
                },
              ]}
              onPress={() => setLanguage("HR")}
            >
              <Text
                style={[
                  styles.langText,
                  { color: textColor },
                  language === "HR" && { color: colors.accentText },
                ]}
              >
                HR
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.langButton,
                { borderColor: controlBorder, backgroundColor: controlBg },
                language === "EN" && {
                  backgroundColor: colors.accent,
                  borderColor: colors.accent,
                },
              ]}
              onPress={() => setLanguage("EN")}
            >
              <Text
                style={[
                  styles.langText,
                  { color: textColor },
                  language === "EN" && { color: colors.accentText },
                ]}
              >
                EN
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleTheme}
            style={[
              styles.themeToggleContainer,
              { backgroundColor: controlBg, borderColor: controlBorder },
            ]}
          >
            <View style={styles.toggleBackgroundIcons}>
              <Feather
                name="sun"
                size={16}
                color={isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"}
              />
              <Feather
                name="moon"
                size={16}
                color={isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"}
              />
            </View>

            <Animated.View
              style={[
                styles.toggleThumb,
                {
                  transform: [{ translateX: slideAnim }],
                  backgroundColor: isLight ? "#0A2540" : "#FFFFFF",
                },
              ]}
            >
              <Feather
                name={isLight ? "sun" : "moon"}
                size={18}
                color={isLight ? "#FFFFFF" : "#0A2540"}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logoScreensaver}
          resizeMode="contain"
        />

        <Text style={[styles.title, { color: textColor }]}>
          {language === "HR" ? "Dobrodošli u Osijek" : "Welcome to Osijek"}
        </Text>
        <Text style={[styles.subtitle, { color: colors.accent }]}>
          {language === "HR" ? "Grad na Dravi" : "City on the Drava River"}
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={onStart}
        >
          <Text style={[styles.buttonText, { color: colors.accentText }]}>
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
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controlsContainer: {
    position: "absolute",
    top: 40,
    right: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
  },
  langButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
  },
  langText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  themeToggleContainer: {
    width: 80,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  toggleBackgroundIcons: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  toggleThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  logoScreensaver: {
    width: 150,
    height: 180,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 72,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 80,
    textAlign: "center",
  },
  button: {
    paddingVertical: 24,
    paddingHorizontal: 64,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
