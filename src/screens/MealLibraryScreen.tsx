import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { ListRow } from "../components/ListRow";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"MealLibrary"> & SharedScreenProps;

export function MealLibraryScreen({ navigation, cuisineLabel, meals }: Props) {
  const [query, setQuery] = useState("");

  const filteredMeals = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return meals;
    return meals.filter((meal) =>
      `${meal.name} ${meal.tags.join(" ")} ${meal.ingredients.map((x) => x.name).join(" ")}`
        .toLowerCase()
        .includes(normalized)
    );
  }, [meals, query]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.nav}>
        <Button label="Today" onPress={() => navigation.navigate("WeeklyPlan")} variant="secondary" />
        <Button label="Groceries" onPress={() => navigation.navigate("GroceryList")} variant="secondary" />
        <Button label="Cook" onPress={() => navigation.navigate("PrepDay")} variant="secondary" />
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search meals, tags, ingredients"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      <Text style={styles.kicker}>{cuisineLabel} 15-20 minute toddler meals</Text>

      {filteredMeals.map((meal) => (
        <Card key={meal.id}>
          <View style={styles.chips}>
            <Chip label={meal.slot} tone="blue" />
          </View>
          <ListRow
            title={meal.name}
            subtitle={`${meal.prepMinutes} min | ${meal.textureNote}`}
            trailing="Open"
            onPress={() => navigation.navigate("MealDetail", { mealId: meal.id })}
          />
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md
  },
  input: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    color: colors.ink,
    fontSize: 16
  },
  kicker: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginBottom: spacing.xs
  },
  nav: {
    gap: spacing.sm
  }
});
