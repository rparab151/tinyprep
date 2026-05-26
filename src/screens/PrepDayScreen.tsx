import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ListRow } from "../components/ListRow";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"PrepDay"> & SharedScreenProps;

export function PrepDayScreen({ navigation, cuisineLabel, meals }: Props) {
  const quickMeals = meals.filter((meal) => meal.prepMinutes >= 15 && meal.prepMinutes <= 20);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.nav}>
        <Button label="Today" onPress={() => navigation.navigate("WeeklyPlan")} variant="secondary" />
        <Button label="Meals" onPress={() => navigation.navigate("MealLibrary")} variant="secondary" />
        <Button label="Groceries" onPress={() => navigation.navigate("GroceryList")} variant="secondary" />
      </View>
      <Text style={styles.title}>Cook today</Text>
      <Text style={styles.subtitle}>Healthy {cuisineLabel.toLowerCase()} toddler meals designed for a 15-20 minute kitchen window.</Text>

      <Card>
        <Text style={styles.sectionTitle}>Quick options</Text>
        {quickMeals.map((meal) => (
          <ListRow
            key={meal.id}
            title={meal.name}
            subtitle={`${meal.slot} | ${meal.prepMinutes} min | ${meal.servingTip}`}
            trailing={meal.slot}
            onPress={() => navigation.navigate("MealDetail", { mealId: meal.id })}
          />
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Kitchen rhythm</Text>
        <ListRow title="Start with the base" subtitle="Rice, noodles, oats, tortilla, or yogurt can anchor the plate." />
        <ListRow title="Add gentle protein" subtitle="Use beans, egg, tofu, lentils, yogurt, fish, turkey, or chicken." />
        <ListRow title="Finish soft" subtitle="Mash, shred, slice thinly, and cool before serving." />
      </Card>
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
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: spacing.sm
  },
  nav: {
    gap: spacing.sm
  }
});
