import React, { useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Sidebar from "../components/Sidebar";
import ContentArea from "../components/ContentArea";

export default function App() {
  const [activeTab, setActiveTab] = useState("turizam");
  const [language, setLanguage] = useState("HR");

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F4F6F8",
  },
});
