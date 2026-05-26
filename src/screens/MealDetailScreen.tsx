import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ListRow } from "../components/ListRow";
import { ingredientLine, recipeStepsForMeal } from "../domain/recipes";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"MealDetail"> & SharedScreenProps;

export function MealDetailScreen({ navigation, route, meals }: Props) {
  const meal = meals.find((item) => item.id === route.params.mealId);

  if (!meal) {
    return (
      <View style={styles.missing}>
        <Text style={styles.title}>Meal not found</Text>
      </View>
    );
  }

  const steps = recipeStepsForMeal(meal);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <Button label="Back" onPress={() => navigation.goBack()} variant="secondary" style={styles.backButton} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{meal.name}</Text>
        <Text style={styles.subtitle}>{meal.prepMinutes} min | {meal.batchYield}</Text>
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {meal.ingredients.map((ingredient) => (
          <ListRow key={ingredient.id} title={ingredientLine(ingredient)} />
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

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md
  },
  header: {
    gap: spacing.xs
  },
  topBar: {
    alignItems: "flex-start"
  },
  backButton: {
    minHeight: 40,
    paddingHorizontal: spacing.sm
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
