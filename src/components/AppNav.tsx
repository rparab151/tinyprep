import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { RootStackParamList } from "../domain/models";
import { colors, spacing } from "../theme";

type NavKey = keyof Pick<RootStackParamList, "Intro" | "WeeklyPlan" | "Cuisine" | "MealLibrary" | "GroceryList" | "PrepDay">;

type Destination = {
  key: NavKey;
  label: string;
};

const destinations: Destination[] = [
  { key: "Intro", label: "Intro" },
  { key: "WeeklyPlan", label: "Today" },
  { key: "Cuisine", label: "Cuisine" },
  { key: "MealLibrary", label: "Meals" },
  { key: "GroceryList", label: "List" },
  { key: "PrepDay", label: "Cook" }
];

type AppNavProps = {
  active: Destination["key"];
  navigation: {
    navigate: (screen: NavKey) => void;
  };
};

export function AppNav({ active, navigation }: AppNavProps) {
  return (
    <View style={styles.nav}>
      {destinations.map((destination) => {
        const selected = active === destination.key;
        return (
          <Pressable
            accessibilityRole="button"
            key={destination.key}
            onPress={() => navigation.navigate(destination.key)}
            style={[styles.item, selected && styles.selectedItem]}
          >
            <Text style={[styles.label, selected && styles.selectedLabel]}>{destination.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    gap: 2,
    borderRadius: 8,
    backgroundColor: colors.surface,
    padding: 4,
    shadowColor: "#172026",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md
  },
  item: {
    flex: 1,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingHorizontal: 4
  },
  selectedItem: {
    backgroundColor: colors.surfaceWarm
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900"
  },
  selectedLabel: {
    color: colors.primaryDark
  }
});
