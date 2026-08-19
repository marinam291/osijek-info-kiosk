import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

type FilterItem = {
  key: string;
  label: string;
};

type ThemeColors = {
  accent: string;
  cardBackground: string;
  border: string;
  textPrimary: string;
};

type FilterProps = {
  items: FilterItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  colors: ThemeColors;
  isSubFilter?: boolean;
};

export default function ServiceFilters({
  items,
  activeKey,
  onSelect,
  colors,
  isSubFilter = false,
}: FilterProps) {
  const { width } = useWindowDimensions();
  const scale = width / 1920;

  return (
    <View
      style={[
        styles.filterContainer,
        { gap: 16 * scale, marginBottom: 24 * scale },
        isSubFilter && { marginTop: -10 * scale, marginBottom: 20 * scale },
      ]}
    >
      {items.map((cat) => {
        const isActive = activeKey === cat.key;
        return (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.filterButton,
              {
                backgroundColor: isActive
                  ? colors.accent
                  : colors.cardBackground,
                borderColor: isSubFilter ? colors.accent : colors.border,
                borderWidth: (isSubFilter ? 1.5 : 1) * Math.max(scale, 0.8),
                paddingVertical: 16 * scale,
                paddingHorizontal: 30 * scale,
                borderRadius: 25 * scale,
              },
            ]}
            onPress={() => onSelect(cat.key)}
          >
            <Text
              style={[
                styles.filterButtonText,
                {
                  color: isActive ? "#FFFFFF" : colors.textPrimary,
                  fontSize: (isSubFilter ? 18 : 22) * scale,
                },
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonText: {
    fontWeight: "bold",
  },
});
