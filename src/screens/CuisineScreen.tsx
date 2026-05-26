import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { cuisineOptions } from "../data/cuisines";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"Cuisine"> & SharedScreenProps;

export function CuisineScreen({ navigation, preferences, onSetCuisine }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.nav}>
        <Button label="Today" onPress={() => navigation.navigate("WeeklyPlan")} variant="secondary" />
        <Button label="Meals" onPress={() => navigation.navigate("MealLibrary")} variant="secondary" />
        <Button label="Groceries" onPress={() => navigation.navigate("GroceryList")} variant="secondary" />
      </View>

      <View style={styles.header}>
        <Text style={styles.kicker}>Meal style</Text>
        <Text style={styles.title}>Choose a cuisine</Text>
        <Text style={styles.subtitle}>Your daily meals, groceries, and cook list update around this choice.</Text>
      </View>

      {cuisineOptions.map((option) => {
        const selected = preferences.cuisine === option.id;
        return (
          <Card key={option.id}>
            <View style={styles.optionHeader}>
              <View style={styles.optionCopy}>
                <Text style={styles.optionTitle}>{option.label}</Text>
                <Text style={styles.optionText}>{option.description}</Text>
              </View>
              {selected ? <Chip label="Selected" tone="green" /> : null}
            </View>
            <Button
              label={selected ? "Current cuisine" : `Use ${option.label}`}
              variant={selected ? "secondary" : "primary"}
              onPress={() => {
                onSetCuisine(option.id);
                navigation.navigate("WeeklyPlan");
              }}
            />
          </Card>
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
  nav: {
    gap: spacing.sm
  },
  header: {
    gap: spacing.xs
  },
  kicker: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
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
  optionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    marginBottom: spacing.md
  },
  optionCopy: {
    flex: 1
  },
  optionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  optionText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4
  }
});
