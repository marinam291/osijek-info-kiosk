import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import Screensaver from "../components/widgets/Screensaver";
import ContentArea from "../components/views/ContentArea";
import FadeInView from "../components/common/FadeInView";
import Clock from "../components/common/Clock";
import WeatherWidget from "../components/widgets/WeatherWidget";

function KioskMain() {
  const { theme, setTheme, colors } = useTheme();
  const [isScreensaverActive, setIsScreensaverActive] = useState(true);
  const [isAppStarted, setIsAppStarted] = useState(false);
  const [screensaverOpacity] = useState(() => new Animated.Value(1));
  const [language, setLanguage] = useState<string>("HR");
  const [activeTab, setActiveTab] = useState<string>("pocetna");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    resetInactivityTimer();
    return () => {
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
    <TouchableWithoutFeedback onPress={resetInactivityTimer}>
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
                    },
                  ]}
                  onPress={() => setActiveTab("pocetna")}
                  activeOpacity={0.8}
                >
                  <Feather
                    name="arrow-left"
                    size={28}
                    color={colors.textPrimary}
                  />
                  <Text
                    style={[
                      styles.backButtonText,
                      { color: colors.textPrimary },
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
                    },
                  ]}
                >
                  <View style={styles.homeLogoContainer}>
                    <Image
                      source={require("../../assets/images/logo.png")}
                      style={styles.homeLogoImage}
                      resizeMode="contain"
                    />
                    <View>
                      <Text
                        style={[styles.homeLogoBadge, { color: colors.accent }]}
                      >
                        {language === "HR" ? "INFO KIOSK" : "INFO KIOSK"}
                      </Text>
                      <Text
                        style={[
                          styles.homeLogoText,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {language === "HR" ? "GRAD OSIJEK" : "CITY OF OSIJEK"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.homeTimeContainer}>
                    <Clock language={language} colors={colors} />
                    <View style={{ marginTop: 8 }}>
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
            />
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
    top: 40,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 10,
    padding: 20,
    borderRadius: 20,
  },
  homeLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  homeLogoImage: {
    width: 60,
    height: 70,
  },
  homeLogoBadge: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 4,
  },
  homeLogoText: {
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  homeTimeContainer: {
    alignItems: "flex-end",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 50,
    borderWidth: 2,
    zIndex: 100,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  backButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
