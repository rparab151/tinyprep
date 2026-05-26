import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { ListRow } from "../components/ListRow";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"MealLibrary"> & SharedScreenProps;

export function MealLibraryScreen({ navigation, meals, preferences }: Props) {
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
        <Button label="Plan" onPress={() => navigation.navigate("WeeklyPlan")} variant="secondary" />
        <Button label="Groceries" onPress={() => navigation.navigate("GroceryList")} variant="secondary" />
        <Button label="Prep Day" onPress={() => navigation.navigate("PrepDay")} variant="secondary" />
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search meals, tags, ingredients"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      {filteredMeals.map((meal) => (
        <Card key={meal.id}>
          <View style={styles.chips}>
            <Chip label={meal.slot} tone="blue" />
            <Chip label={preferences.foodStatuses[meal.id] ?? "trying"} tone="green" />
            {preferences.favoriteMealIds.includes(meal.id) ? <Chip label="favorite" tone="rose" /> : null}
          </View>
          <ListRow
            title={meal.name}
            subtitle={`${meal.batchYield} | ${meal.freezerNotes}`}
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
