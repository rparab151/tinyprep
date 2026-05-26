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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.kicker}>{cuisineLabel} toddler plan</Text>
          <Text style={styles.title}>Weekly Plan</Text>
        </View>
        <Button label="Shuffle" onPress={onShufflePlan} variant="secondary" />
      </View>

      <View style={styles.actions}>
        <Button label="Meals" onPress={() => navigation.navigate("MealLibrary")} variant="secondary" />
        <Button label="Groceries" onPress={() => navigation.navigate("GroceryList")} variant="secondary" />
        <Button label="Prep Day" onPress={() => navigation.navigate("PrepDay")} variant="secondary" />
        <Button label="Settings" onPress={() => navigation.navigate("SettingsPrivacy")} variant="secondary" />
      </View>

      {weeklyPlan.days.map((day) => (
        <Card key={day.day}>
          <View style={styles.dayHeader}>
            <Text style={styles.day}>{day.day}</Text>
            <Chip label={cuisineLabel} tone="green" />
          </View>
          {Object.entries(day.meals).map(([slot, meal]) => (
            <ListRow
              key={`${day.day}-${slot}`}
              title={meal.name}
              subtitle={`${slot} | ${meal.prepMinutes} min | ${meal.textureNote}`}
              trailing="Open"
              onPress={() => navigation.navigate("MealDetail", { mealId: meal.id })}
            />
          ))}
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
  }
});
