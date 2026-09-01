import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import Screensaver from "../components/widgets/Screensaver";
import ContentArea from "../components/views/ContentArea";
import FadeInView from "../components/common/FadeInView";
import Clock from "../components/common/Clock";
import WeatherWidget from "../components/widgets/WeatherWidget";
import ServerStatusWidget from "../components/widgets/ServerStatusWidget";
import { setupKioskMode } from "../utils/kioskMode";

function KioskMain() {
  const { theme, setTheme, colors } = useTheme();
  const [isScreensaverActive, setIsScreensaverActive] = useState(true);
  const [isAppStarted, setIsAppStarted] = useState(false);
  const [screensaverOpacity] = useState(() => new Animated.Value(1));
  const [language, setLanguage] = useState<string>("HR");
  const [activeTab, setActiveTab] = useState<string>("pocetna");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { width } = useWindowDimensions();
  const scale = width / 1920;

  useEffect(() => {
    setupKioskMode();
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (isAppStarted && !isScreensaverActive) {
      timer.current = setTimeout(() => {
        setIsScreensaverActive(true);
        setIsAppStarted(false);
        setActiveTab("pocetna");
        Animated.timing(screensaverOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 60000);
    }
  }, [isAppStarted, isScreensaverActive, screensaverOpacity]);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "touchstart", "click", "keydown"];

    const handleActivity = () => {
      resetInactivityTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    resetInactivityTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if (timer.current) clearTimeout(timer.current);
    };
  }, [resetInactivityTimer]);

  const handleStartApp = () => {
    setIsAppStarted(true);

    Animated.timing(screensaverOpacity, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      setIsScreensaverActive(false);
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isAppStarted && (
        <FadeInView triggerKey="main-layout" duration={600}>
          <View style={styles.mainLayout}>
            {activeTab !== "pocetna" && (
              <TouchableOpacity
                style={[
                  styles.backButton,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                    paddingVertical: 14 * scale,
                    paddingHorizontal: 24 * scale,
                    borderRadius: 50 * scale,
                    top: 30 * scale,
                    left: 30 * scale,
                  },
                ]}
                onPress={() => setActiveTab("pocetna")}
                activeOpacity={0.8}
              >
                <Feather
                  name="arrow-left"
                  size={28 * scale}
                  color={colors.textPrimary}
                />
                <Text
                  style={[
                    styles.backButtonText,
                    {
                      color: colors.textPrimary,
                      fontSize: 22 * scale,
                    },
                  ]}
                >
                  {language === "HR" ? "Natrag" : "Back"}
                </Text>
              </TouchableOpacity>
            )}

            <ContentArea
              activeTab={activeTab}
              language={language}
              onNavigate={setActiveTab}
            />

            {activeTab === "pocetna" && (
              <View
                style={[
                  styles.homeHeaderAbsolute,
                  {
                    backgroundColor:
                      theme === "light"
                        ? "rgba(255, 255, 255, 0.7)"
                        : "rgba(0, 0, 0, 0.5)",
                    top: 40 * scale,
                    left: 40 * scale,
                    right: 40 * scale,
                    padding: 20 * scale,
                    borderRadius: 20 * scale,
                  },
                ]}
              >
                <View style={[styles.homeLogoContainer, { gap: 16 * scale }]}>
                  <Image
                    source={require("../../assets/images/logo.png")}
                    style={[
                      styles.homeLogoImage,
                      {
                        width: 80 * scale,
                        height: 95 * scale,
                      },
                    ]}
                    resizeMode="contain"
                  />
                  <View>
                    <Text
                      style={[
                        styles.homeLogoBadge,
                        {
                          color: colors.accent,
                          fontSize: 14 * scale,
                          marginBottom: 4 * scale,
                        },
                      ]}
                    >
                      INFO KIOSK
                    </Text>
                    <Text
                      style={[
                        styles.homeLogoText,
                        {
                          color: colors.textPrimary,
                          fontSize: 36 * scale,
                        },
                      ]}
                    >
                      {language === "HR" ? "GRAD OSIJEK" : "CITY OF OSIJEK"}
                    </Text>
                  </View>
                </View>

                <View style={styles.homeTimeContainer}>
                  <Clock language={language} colors={colors} scale={scale} />
                  <View
                    style={{
                      marginTop: 8 * scale,
                      transform: [{ scale: scale }],
                      transformOrigin: "top right",
                    }}
                  >
                    <WeatherWidget
                      variant="sidebar"
                      language={language}
                      textColor={colors.textPrimary}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </FadeInView>
      )}

      {isScreensaverActive && (
        <Animated.View
          style={[styles.screensaverWrapper, { opacity: screensaverOpacity }]}
        >
          <Screensaver
            onStart={handleStartApp}
            language={language}
            setLanguage={setLanguage}
            theme={theme}
            setTheme={setTheme}
            scale={scale}
          />
        </Animated.View>
      )}

      <ServerStatusWidget language={language} />
    </View>
  );
}

export default function Index() {
  return <KioskMain />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainLayout: {
    flex: 1,
    flexDirection: "row",
  },
  screensaverWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  homeHeaderAbsolute: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 10,
  },
  homeLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  homeLogoImage: {},
  homeLogoBadge: {
    fontWeight: "bold",
    letterSpacing: 2,
  },
  homeLogoText: {
    fontWeight: "bold",
    letterSpacing: 1,
  },
  homeTimeContainer: {
    alignItems: "flex-end",
  },
  backButton: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    zIndex: 100,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  backButtonText: {
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
