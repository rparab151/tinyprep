import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"GroceryList"> & SharedScreenProps;

export function GroceryListScreen({ navigation, groceryList, preferences, onToggleGroceryItem }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.nav}>
        <Button label="Plan" onPress={() => navigation.navigate("WeeklyPlan")} variant="secondary" />
        <Button label="Meals" onPress={() => navigation.navigate("MealLibrary")} variant="secondary" />
        <Button label="Prep Day" onPress={() => navigation.navigate("PrepDay")} variant="secondary" />
      </View>
      <Text style={styles.title}>Deduped grocery list</Text>
      <Text style={styles.subtitle}>Grouped by ingredient so repeat meals do not clutter your shop.</Text>

      {groceryList.map((item) => {
        const checked = preferences.groceryCheckedIds.includes(item.id);
        return (
          <Pressable key={item.id} onPress={() => onToggleGroceryItem(item.id)}>
            <Card>
              <View style={styles.row}>
                <View style={[styles.check, checked && styles.checked]}>
                  <Text style={styles.checkText}>{checked ? "x" : ""}</Text>
                </View>
                <View style={styles.copy}>
                  <Text style={[styles.itemName, checked && styles.itemChecked]}>{item.name}</Text>
                  <Text style={styles.meta}>Used in {item.mealCount} planned meals</Text>
                  <Text style={styles.meals}>{item.mealNames.join(", ")}</Text>
                </View>
                <Chip label={item.category} tone="blue" />
              </View>
            </Card>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  checked: {
    backgroundColor: colors.primary
  },
  checkText: {
    color: "#FFFFFF",
    fontWeight: "900"
  },
  copy: {
    flex: 1
  },
  itemName: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900"
  },
  itemChecked: {
    textDecorationLine: "line-through",
    color: colors.muted
  },
  meta: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 4
  },
  meals: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4
  },
  nav: {
    gap: spacing.sm
  }
});
