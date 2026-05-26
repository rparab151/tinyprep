import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { colors, spacing } from "../theme";
import type { ScreenProps } from "./types";

type Props = ScreenProps<"Onboarding"> & {
  onComplete: () => void;
};

export function OnboardingScreen({ navigation, onComplete }: Props) {
  function start() {
    onComplete();
    navigation.replace("WeeklyPlan");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.kicker}>Free, offline toddler meal prep</Text>
      <Text style={styles.title}>Prep once. Feed calmly all week.</Text>
      <Text style={styles.body}>
        TinyPrep helps parents plan toddler meals, prep freezer batches, keep a grocery
        list, and remember what foods are accepted, trying, or worth retrying later.
      </Text>

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
  cardText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  }
});
