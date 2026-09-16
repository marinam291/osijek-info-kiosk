import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemeMode, useTheme } from "../../context/ThemeContext";
import WeatherWidget from "./WeatherWidget";

type ScreensaverProps = {
  onStart: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  scale?: number;
};

export default function Screensaver({
  onStart,
  language,
  setLanguage,
  theme,
  setTheme,
  scale = 1,
}: ScreensaverProps) {
  const { colors } = useTheme();

  const [slideAnim] = useState(
    () => new Animated.Value(theme === "light" ? 0 : 65 * scale),
  );

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: theme === "light" ? 0 : 65 * scale,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [theme, slideAnim, scale]);

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
          src={require("../../../assets/videos/osijek.mp4")}
          type="video/mp4"
        />
        Vaš preglednik ne podržava video.
      </video>

      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        <View
          style={[
            styles.controlsContainer,
            {
              top: 40 * scale,
              right: 40 * scale,
              gap: 24 * scale,
            },
          ]}
        >
          <View style={[styles.buttonGroup, { gap: 12 * scale }]}>
            <TouchableOpacity
              style={[
                styles.langButton,
                {
                  borderColor: controlBorder,
                  backgroundColor: controlBg,
                  paddingVertical: 15 * scale,
                  paddingHorizontal: 28 * scale,
                  borderRadius: 14 * scale,
                  borderWidth: 2 * scale,
                },
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
                  {
                    fontSize: 22 * scale,
                    color: language === "HR" ? colors.accentText : textColor,
                  },
                ]}
              >
                HR
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.langButton,
                {
                  borderColor: controlBorder,
                  backgroundColor: controlBg,
                  paddingVertical: 15 * scale,
                  paddingHorizontal: 28 * scale,
                  borderRadius: 14 * scale,
                  borderWidth: 2 * scale,
                },
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
                  {
                    fontSize: 22 * scale,
                    color: language === "EN" ? colors.accentText : textColor,
                  },
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
              {
                backgroundColor: controlBg,
                borderColor: controlBorder,
                width: 125 * scale,
                height: 60 * scale,
                borderRadius: 30 * scale,
                borderWidth: 2 * scale,
                paddingHorizontal: 5 * scale,
              },
            ]}
          >
            <View
              style={[
                styles.toggleBackgroundIcons,
                { paddingHorizontal: 12 * scale },
              ]}
            >
              <Feather
                name="sun"
                size={22 * scale}
                color={isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"}
              />
              <Feather
                name="moon"
                size={22 * scale}
                color={isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"}
              />
            </View>

            <Animated.View
              style={[
                styles.toggleThumb,
                {
                  transform: [{ translateX: slideAnim }],
                  backgroundColor: isLight ? "#0A2540" : "#FFFFFF",
                  width: 50 * scale,
                  height: 50 * scale,
                  borderRadius: 25 * scale,
                  top: 3 * scale,
                  left: 3 * scale,
                },
              ]}
            >
              <Feather
                name={isLight ? "sun" : "moon"}
                size={26 * scale}
                color={isLight ? "#FFFFFF" : "#0A2540"}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../../assets/images/logo.png")}
          style={[
            styles.logoScreensaver,
            {
              width: 150 * scale,
              height: 180 * scale,
              marginBottom: 20 * scale,
            },
          ]}
          resizeMode="contain"
        />

        <Text
          style={[
            styles.title,
            {
              color: textColor,
              fontSize: 72 * scale,
              marginBottom: 16 * scale,
            },
          ]}
        >
          {language === "HR" ? "Dobrodošli u Osijek" : "Welcome to Osijek"}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.accent,
              fontSize: 32 * scale,
              marginBottom: 80 * scale,
            },
          ]}
        >
          {language === "HR" ? "Grad na Dravi" : "City on the Drava River"}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.accent,
              paddingVertical: 24 * scale,
              paddingHorizontal: 64 * scale,
              borderRadius: 50 * scale,
            },
          ]}
          onPress={onStart}
        >
          <Text
            style={[
              styles.buttonText,
              { color: colors.accentText, fontSize: 32 * scale },
            ]}
          >
            {language === "HR" ? "Dodirni za početak" : "Touch to start"}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.topLeftContainer,
          {
            top: 40 * scale,
            left: 40 * scale,
            transform: [{ scale: scale }],
            transformOrigin: "top left",
          },
        ]}
      >
        <WeatherWidget language={language} />
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
    flexDirection: "row",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
  },
  langButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  langText: {
    fontWeight: "bold",
  },
  themeToggleContainer: {
    justifyContent: "center",
    position: "relative",
  },
  toggleBackgroundIcons: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggleThumb: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    position: "absolute",
  },
  logoScreensaver: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "600",
    textAlign: "center",
  },
  button: {},
  buttonText: {
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  topLeftContainer: {
    position: "absolute",
  },
});
