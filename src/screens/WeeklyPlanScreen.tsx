import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { ListRow } from "../components/ListRow";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"WeeklyPlan"> & SharedScreenProps;

export function WeeklyPlanScreen({ navigation, cuisineLabel, weeklyPlan, onShufflePlan }: Props) {
  const today = weeklyPlan.days[0];
  if (!today) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Today's meals</Text>
        <Card>
          <ListRow title="No meals found" subtitle="Refresh to build a new set of quick options." />
        </Card>
        <Button label="Refresh" onPress={onShufflePlan} />
      </ScrollView>
    );
  }

  const todayMeals = Object.entries(today.meals);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.kicker}>{cuisineLabel} | 15-20 minute toddler meals</Text>
          <Text style={styles.title}>Today's meals</Text>
        </View>
        <Button label="Refresh" onPress={onShufflePlan} variant="secondary" />
      </View>

      <View style={styles.actions}>
        <Button label="Meals" onPress={() => navigation.navigate("MealLibrary")} variant="secondary" />
        <Button label="Groceries" onPress={() => navigation.navigate("GroceryList")} variant="secondary" />
        <Button label="Cook" onPress={() => navigation.navigate("PrepDay")} variant="secondary" />
      </View>

      <Card>
        <View style={styles.dayHeader}>
          <View>
            <Text style={styles.day}>Quick picks for today</Text>
            <Text style={styles.daySubtext}>Four balanced options, all ready fast.</Text>
          </View>
          <Chip label={cuisineLabel} tone="green" />
        </View>
        {todayMeals.map(([slot, meal]) => (
          <ListRow
            key={`${today.day}-${slot}`}
            title={meal.name}
            subtitle={`${slot} | ${meal.prepMinutes} min | ${meal.textureNote}`}
            trailing="Open"
            onPress={() => navigation.navigate("MealDetail", { mealId: meal.id })}
          />
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Daily rhythm</Text>
        <ListRow title="Breakfast" subtitle="Soft start with a familiar texture and one fruit or yogurt side." />
        <ListRow title="Lunch or dinner" subtitle="Use the same base ingredient twice to keep cooking simple." />
        <ListRow title="Snack" subtitle="Offer a small protein, a soft carb, and water." />
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
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  headerCopy: {
    flex: 1
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
  actions: {
    gap: spacing.sm
  },
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs
  },
  day: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  daySubtext: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 2
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: spacing.sm
  }
});
