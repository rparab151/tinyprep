import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppNav } from "../components/AppNav";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
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
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.kicker}>{cuisineLabel} | 15-20 minute toddler meals</Text>
          <Text style={styles.title}>What can I cook today?</Text>
        </View>
        <Button label="Refresh" onPress={onShufflePlan} variant="secondary" />
        </View>

        <Card>
          <View style={styles.dayHeader}>
            <Text style={styles.day}>Quick picks for today</Text>
            <Text style={styles.daySubtext}>Four balanced options, all ready fast.</Text>
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
      </ScrollView>
      <AppNav active="WeeklyPlan" navigation={navigation} />
    </View>
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
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 39
  },
  dayHeader: {
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
