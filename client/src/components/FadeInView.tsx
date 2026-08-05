import React, { useEffect, useRef, ReactNode } from "react";
import { Animated, StyleSheet } from "react-native";

type FadeInViewProps = {
  children: ReactNode;
  triggerKey?: any;
  duration?: number;
};

export default function FadeInView({
  children,
  triggerKey,
  duration = 500,
}: FadeInViewProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    translateYAnim.setValue(30);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [triggerKey]);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
