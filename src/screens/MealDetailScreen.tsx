import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { ListRow } from "../components/ListRow";
import type { Meal } from "../domain/models";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"MealDetail"> & SharedScreenProps;

export function MealDetailScreen({ route, meals }: Props) {
  const meal = meals.find((item) => item.id === route.params.mealId);

  if (!meal) {
    return (
      <View style={styles.missing}>
        <Text style={styles.title}>Meal not found</Text>
      </View>
    );
  }

  const steps = meal.recipeSteps ?? defaultRecipeSteps(meal);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{meal.name}</Text>
        <Text style={styles.subtitle}>{meal.prepMinutes} min | {meal.batchYield}</Text>
      </View>

      <View style={styles.chips}>
        {meal.tags.map((tag) => <Chip key={tag} label={tag} />)}
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {meal.ingredients.map((ingredient) => (
          <ListRow key={ingredient.id} title={ingredient.name} />
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Recipe</Text>
        {steps.map((step, index) => (
          <ListRow key={`${meal.id}-step-${index}`} title={`${index + 1}. ${step}`} />
        ))}
      </Card>
    </ScrollView>
  );
}

function defaultRecipeSteps(meal: Meal): string[] {
  if (meal.tags.includes("no-cook")) {
    return [
      `Prep ${meal.ingredients.slice(0, 3).map((item) => item.name.toLowerCase()).join(", ")}.`,
      "Combine ingredients in a bowl or blender.",
      "Stir or blend until the texture is smooth and even.",
      "Chill briefly if the mixture needs time to soften."
    ];
  }

  return [
    `Prep ${meal.ingredients.slice(0, 3).map((item) => item.name.toLowerCase()).join(", ")}.`,
    "Cook the main ingredients together until hot and soft.",
    "Stir in remaining ingredients and loosen with water, milk, yogurt, or broth as needed.",
    "Mash, shred, or cut into small pieces."
  ];
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md
  },
  header: {
    gap: spacing.xs
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 36
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: spacing.sm
  },
  missing: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "center"
  }
});
