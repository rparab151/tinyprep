import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ListRow } from "../components/ListRow";
import type { Meal } from "../domain/models";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"PrepDay"> & SharedScreenProps;

export function PrepDayScreen({ navigation, cuisineLabel, meals }: Props) {
  const quickMeals = meals.filter((meal) => meal.prepMinutes >= 15 && meal.prepMinutes <= 20);
  const featuredMeals = quickMeals.slice(0, 6);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.nav}>
        <Button label="Today" onPress={() => navigation.navigate("WeeklyPlan")} variant="secondary" />
        <Button label="Meals" onPress={() => navigation.navigate("MealLibrary")} variant="secondary" />
        <Button label="Groceries" onPress={() => navigation.navigate("GroceryList")} variant="secondary" />
      </View>
      <Text style={styles.title}>Cook today</Text>
      <Text style={styles.subtitle}>Pick one {cuisineLabel} meal and cook from the ingredient list and steps below.</Text>

      {featuredMeals.map((meal) => (
        <CookCard
          key={meal.id}
          meal={meal}
          onOpen={() => navigation.navigate("MealDetail", { mealId: meal.id })}
        />
      ))}
    </ScrollView>
  );
}

function CookCard({ meal, onOpen }: { meal: Meal; onOpen: () => void }) {
  const steps = meal.recipeSteps ?? defaultRecipeSteps(meal);

  return (
    <Card>
      <View style={styles.mealHeader}>
        <View style={styles.mealCopy}>
          <Text style={styles.mealName}>{meal.name}</Text>
          <Text style={styles.mealMeta}>{meal.slot} | {meal.prepMinutes} min | {meal.batchYield}</Text>
        </View>
        <Button label="Details" onPress={onOpen} variant="secondary" />
      </View>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      <View style={styles.ingredients}>
        {meal.ingredients.map((ingredient) => (
          <Text key={ingredient.id} style={styles.ingredient}>- {ingredient.name}</Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recipe</Text>
      {steps.map((step, index) => (
        <ListRow key={`${meal.id}-step-${index}`} title={`${index + 1}. ${step}`} />
      ))}
    </Card>
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
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: spacing.sm
  },
  mealHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    marginBottom: spacing.md
  },
  mealCopy: {
    flex: 1
  },
  mealName: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  mealMeta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4
  },
  ingredients: {
    gap: 4,
    marginBottom: spacing.md
  },
  ingredient: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 20
  },
  nav: {
    gap: spacing.sm
  }
});
