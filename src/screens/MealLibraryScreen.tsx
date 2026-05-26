import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AppNav } from "../components/AppNav";
import { Card } from "../components/Card";
import { ListRow } from "../components/ListRow";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"MealLibrary"> & SharedScreenProps;

export function MealLibraryScreen({ navigation, cuisineLabel, meals }: Props) {
  const [query, setQuery] = useState("");

  const filteredMeals = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return meals;
    return meals.filter((meal) =>
      `${meal.name} ${meal.slot} ${meal.ingredients.map((x) => x.name).join(" ")}`
        .toLowerCase()
        .includes(normalized)
    );
  }, [meals, query]);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search meals or ingredients"
        placeholderTextColor={colors.muted}
        style={styles.input}
        />

        <Text style={styles.kicker}>{cuisineLabel} 15-20 minute toddler meals</Text>

        {filteredMeals.map((meal) => (
          <Card key={meal.id}>
            <ListRow
              title={meal.name}
              subtitle={`${meal.slot} | ${meal.prepMinutes} min`}
              trailing="Open"
              onPress={() => navigation.navigate("MealDetail", { mealId: meal.id })}
            />
          </Card>
        ))}
      </ScrollView>
      <AppNav active="MealLibrary" navigation={navigation} />
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
  kicker: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
});
