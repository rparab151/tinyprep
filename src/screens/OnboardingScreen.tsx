import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { cuisineOptions } from "../data/cuisines";
import type { Cuisine } from "../domain/models";
import { colors, spacing } from "../theme";
import type { ScreenProps } from "./types";

type Props = ScreenProps<"Onboarding"> & {
  selectedCuisine: Cuisine;
  onSelectCuisine: (cuisine: Cuisine) => void;
  onComplete: () => void;
};

export function OnboardingScreen({ navigation, selectedCuisine, onSelectCuisine, onComplete }: Props) {
  function start() {
    onComplete();
    navigation.replace("WeeklyPlan");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.kicker}>Free, offline toddler meal prep</Text>
      <Text style={styles.title}>Prep once. Feed calmly all week.</Text>
      <Text style={styles.body}>
        TinyPrep helps parents plan toddler meals by cuisine, prep freezer batches,
        keep a grocery list, and remember what foods are accepted, trying, or worth retrying later.
      </Text>

      <Text style={styles.sectionTitle}>Choose your meal style</Text>
      <View style={styles.stack}>
        {cuisineOptions.map((option) => (
          <Card key={option.id}>
            <Text style={styles.cardText}>{option.label}</Text>
            <Text style={styles.optionText}>{option.description}</Text>
            <Button
              label={selectedCuisine === option.id ? "Selected" : `Choose ${option.label}`}
              variant={selectedCuisine === option.id ? "primary" : "secondary"}
              onPress={() => onSelectCuisine(option.id)}
            />
          </Card>
        ))}
      </View>

      <View style={styles.stack}>
        {["No account signup", "No ads or subscriptions", "No analytics SDKs", "Local-only storage by default"].map((text) => (
          <Card key={text}>
            <Text style={styles.cardText}>{text}</Text>
          </Card>
        ))}
      </View>

      <DisclaimerBanner />
      <Button label="Start planning" onPress={start} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md
  },
  kicker: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  title: {
    color: colors.ink,
    fontSize: 36,
    fontWeight: "900",
    lineHeight: 42
  },
  body: {
    color: colors.muted,
    fontSize: 17,
    lineHeight: 25
  },
  stack: {
    gap: spacing.sm
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  cardText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  },
  optionText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
    marginTop: 4
  }
});
