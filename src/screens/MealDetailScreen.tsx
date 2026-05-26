import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { ListRow } from "../components/ListRow";
import type { FoodStatus } from "../domain/models";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"MealDetail"> & SharedScreenProps;

const statuses: { label: string; value: FoodStatus }[] = [
  { label: "Accepted", value: "accepted" },
  { label: "Trying", value: "trying" },
  { label: "Retry later", value: "retryLater" }
];

export function MealDetailScreen({ route, meals, preferences, onToggleFavorite, onSetFoodStatus }: Props) {
  const meal = meals.find((item) => item.id === route.params.mealId);

  if (!meal) {
    return (
      <View style={styles.missing}>
        <Text style={styles.title}>Meal not found</Text>
      </View>
    );
  }

  const isFavorite = preferences.favoriteMealIds.includes(meal.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{meal.name}</Text>
        <Text style={styles.subtitle}>{meal.prepMinutes} min | {meal.batchYield}</Text>
      </View>

      <View style={styles.chips}>
        {meal.tags.map((tag) => <Chip key={tag} label={tag} />)}
      </View>

      <Button
        label={isFavorite ? "Remove favorite" : "Save favorite"}
        variant={isFavorite ? "secondary" : "primary"}
        onPress={() => onToggleFavorite(meal.id)}
      />

      <Card>
        <Text style={styles.sectionTitle}>Food status</Text>
        <View style={styles.statusButtons}>
          {statuses.map((status) => (
            <Button
              key={status.value}
              label={status.label}
              variant={preferences.foodStatuses[meal.id] === status.value ? "primary" : "secondary"}
              onPress={() => onSetFoodStatus(meal.id, status.value)}
            />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Notes</Text>
        <ListRow title="Cook" subtitle={meal.reheatingNotes} />
        <ListRow title="Texture" subtitle={meal.textureNote} />
        <ListRow title="Serving tip" subtitle={meal.servingTip} />
        <ListRow title="Leftovers" subtitle={meal.freezerNotes} />
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {meal.ingredients.map((ingredient) => (
          <ListRow key={ingredient.id} title={ingredient.name} subtitle={ingredient.category} />
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
  statusButtons: {
    gap: spacing.sm
  },
  missing: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "center"
  }
});
