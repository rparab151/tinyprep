import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { ListRow } from "../components/ListRow";
import { colors, spacing } from "../theme";
import type { ScreenProps, SharedScreenProps } from "./types";

type Props = ScreenProps<"SettingsPrivacy"> & SharedScreenProps;

export function SettingsPrivacyScreen({ navigation, preferences }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.nav}>
        <Button label="Plan" onPress={() => navigation.navigate("WeeklyPlan")} variant="secondary" />
        <Button label="Meals" onPress={() => navigation.navigate("MealLibrary")} variant="secondary" />
        <Button label="Groceries" onPress={() => navigation.navigate("GroceryList")} variant="secondary" />
      </View>
      <Text style={styles.title}>Settings & Privacy</Text>
      <Text style={styles.subtitle}>TinyPrep is designed as an offline-first planning tool.</Text>

      <Card>
        <ListRow title="Storage" subtitle="Meal plan preferences are stored locally on this device." />
        <ListRow title="Account" subtitle="No account signup is required." />
        <ListRow title="Analytics" subtitle="No analytics, ad, or tracking SDKs are included." />
        <ListRow title="Sensitive data" subtitle="Do not enter child names, birthdates, health data, or sensitive personal details." />
      </Card>

      <Card>
        <ListRow title="Onboarding completed" trailing={preferences.hasCompletedOnboarding ? "Yes" : "No"} />
        <ListRow title="Favorite meals" trailing={`${preferences.favoriteMealIds.length}`} />
        <ListRow title="Prep day" trailing={preferences.prepDay} />
      </Card>

      <DisclaimerBanner />
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
  nav: {
    gap: spacing.sm
  }
});
