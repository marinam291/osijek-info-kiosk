import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, StatusBar, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Sidebar from "../components/Sidebar";
import ContentArea from "../components/ContentArea";
import Screensaver from "../components/Screensaver";

export default function App() {
  const [activeTab, setActiveTab] = useState("turizam");
  const [language, setLanguage] = useState("HR");
  const [showScreensaver, setShowScreensaver] = useState(true);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetInactivityTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setShowScreensaver(true);
      setActiveTab("turizam");
    }, 60000);
  };

  useEffect(() => {
    if (!showScreensaver) {
      resetInactivityTimer();

      if (Platform.OS === "web" && typeof window !== "undefined") {
        const activityEvents = [
          "mousedown",
          "mousemove",
          "keypress",
          "scroll",
          "touchstart",
        ];

        const handleGlobalActivity = () => {
          resetInactivityTimer();
        };

        activityEvents.forEach((event) => {
          window.addEventListener(event, handleGlobalActivity);
        });

        return () => {
          if (timerRef.current) clearTimeout(timerRef.current);
          activityEvents.forEach((event) => {
            window.removeEventListener(event, handleGlobalActivity);
          });
        };
      }
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [showScreensaver]);

  return (
    <View style={{ flex: 1 }} onTouchStart={resetInactivityTimer}>
      {showScreensaver && (
        <Screensaver onStart={() => setShowScreensaver(false)} />
      )}

      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />

        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          language={language}
          setLanguage={setLanguage}
        />

        <ContentArea activeTab={activeTab} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F4F6F8",
  },
});
