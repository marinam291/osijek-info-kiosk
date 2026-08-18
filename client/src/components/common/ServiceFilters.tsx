import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
  return (
    <View
      style={[
        styles.filterContainer,
        isSubFilter && { marginTop: -10, marginBottom: 20 },
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
                borderWidth: isSubFilter ? 1.5 : 1,
              },
            ]}
            onPress={() => onSelect(cat.key)}
          >
            <Text
              style={[
                styles.filterButtonText,
                {
                  color: isActive ? "#FFFFFF" : colors.textPrimary,
                  fontSize: isSubFilter ? 14 : 16,
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
    gap: 12,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  filterButtonText: {
    fontWeight: "bold",
  },
});
