import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppNav } from "../components/AppNav";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ListRow } from "../components/ListRow";
import type { Meal } from "../domain/models";
import { ingredientLine, recipeStepsForMeal } from "../domain/recipes";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"PrepDay"> & SharedScreenProps;

export function PrepDayScreen({ navigation, cuisineLabel, meals }: Props) {
  const quickMeals = meals.filter((meal) => meal.prepMinutes >= 15 && meal.prepMinutes <= 20);
  const featuredMeals = quickMeals.slice(0, 6);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
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
      <AppNav active="PrepDay" navigation={navigation} />
    </View>
  );
}

function CookCard({ meal, onOpen }: { meal: Meal; onOpen: () => void }) {
  const steps = recipeStepsForMeal(meal);

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
          <Text key={ingredient.id} style={styles.ingredient}>- {ingredientLine(ingredient)}</Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recipe</Text>
      {steps.map((step, index) => (
        <ListRow key={`${meal.id}-step-${index}`} title={`${index + 1}. ${step}`} />
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    padding: spacing.md,
    gap: spacing.md,
    paddingBottom: spacing.lg
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
});
