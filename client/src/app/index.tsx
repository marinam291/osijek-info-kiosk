import React, { useState, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import Screensaver from "../components/Screensaver";
import Sidebar from "../components/Sidebar";
import ContentArea from "../components/ContentArea";
import FadeInView from "../components/FadeInView";

function KioskMain() {
  const { theme, setTheme, colors } = useTheme();
  const [isScreensaverActive, setIsScreensaverActive] = useState(true);
  const [isAppStarted, setIsAppStarted] = useState(false);
  const screensaverOpacity = useRef(new Animated.Value(1)).current;
  const [language, setLanguage] = useState<string>("HR");
  const [activeTab, setActiveTab] = useState<string>("turizam");

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
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              language={language}
            />
            <ContentArea activeTab={activeTab} language={language} />
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
  );
}

export default function Index() {
  return (
    <ThemeProvider>
      <KioskMain />
    </ThemeProvider>
  );
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
});
