import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ListRow } from "../components/ListRow";
import type { PrepDay } from "../domain/models";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"PrepDay"> & SharedScreenProps;

const prepDays: PrepDay[] = ["Saturday", "Sunday", "Monday"];

export function PrepDayScreen({ navigation, meals, preferences, onPatchPreferences }: Props) {
  const prepMeals = meals.filter((meal) => meal.tags.includes("freezer") || meal.tags.includes("lunchbox"));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.nav}>
        <Button label="Plan" onPress={() => navigation.navigate("WeeklyPlan")} variant="secondary" />
        <Button label="Meals" onPress={() => navigation.navigate("MealLibrary")} variant="secondary" />
        <Button label="Groceries" onPress={() => navigation.navigate("GroceryList")} variant="secondary" />
      </View>
      <Text style={styles.title}>{preferences.prepDay} prep day</Text>
      <Text style={styles.subtitle}>Batch cook flexible bases and keep reheating notes close.</Text>

      <View style={styles.dayButtons}>
        {prepDays.map((day) => (
          <Button
            key={day}
            label={day}
            variant={preferences.prepDay === day ? "primary" : "secondary"}
            onPress={() => onPatchPreferences({ prepDay: day })}
          />
        ))}
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Batch queue</Text>
        {prepMeals.map((meal) => (
          <ListRow
            key={meal.id}
            title={meal.name}
            subtitle={`${meal.batchYield} | ${meal.prepMinutes} min | ${meal.freezerNotes}`}
            trailing={meal.slot}
          />
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Storage reminders</Text>
        <ListRow title="Cool quickly" subtitle="Move cooked food into shallow containers before refrigerating." />
        <ListRow title="Label freezer meals" subtitle="Add meal name, date, and reheating note." />
        <ListRow title="Reheat evenly" subtitle="Stir well, check hot spots, and cool before serving." />
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
  dayButtons: {
    gap: spacing.sm
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
