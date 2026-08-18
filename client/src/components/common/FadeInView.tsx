import React, { useEffect, ReactNode, useState } from "react";
import { Animated, StyleSheet } from "react-native";

type FadeInViewProps = {
  children: ReactNode;
  triggerKey?: string | number | boolean;
  duration?: number;
};

export default function FadeInView({
  children,
  triggerKey,
  duration = 500,
}: FadeInViewProps) {
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [translateYAnim] = useState(() => new Animated.Value(30));

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
  }, [triggerKey, fadeAnim, translateYAnim, duration]);

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
