import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

type ScreensaverProps = {
  onStart: () => void;
};

export default function Screensaver({ onStart }: ScreensaverProps) {
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

      <View style={styles.overlay}>
        <Text style={styles.title}>Dobrodošli u Osijek</Text>
        <Text style={styles.subtitle}>Grad na Dravi</Text>

        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Dodirni za početak</Text>
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
    backgroundColor: "#000",
    zIndex: 1000,
  },
  video: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10, 37, 64, 0.4)",
    justifyContent: "center",
    alignItems: "center",
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
